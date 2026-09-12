import { expect, test, type Locator, type Page } from "@playwright/test";
import { getProductTour } from "../src/content/tours";
import { worlds } from "../src/content/tours/worlds";

const products = Object.keys(worlds);

function filmByTitle(page: Page, title: string) {
  return page.getByTestId("product-film").filter({ has: page.getByRole("heading", { level: 3, name: title, exact: true }) });
}

async function expectVideoSourceShape(video: Locator, recording: { width: number; height: number }, browserName: string) {
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.videoWidth)).toBeGreaterThan(0);
  await expect(video).toHaveJSProperty("error", null);
  if (browserName === "webkit") {
    // Windows WebKit reports the fitted decoder size (for example 1082×730 for
    // a 1600×1080 source). Chromium verifies full metadata for the same assets.
    const dimensions = await video.evaluate((el: HTMLVideoElement) => ({ width: el.videoWidth, height: el.videoHeight }));
    expect(dimensions.height).toBeGreaterThan(0);
    expect(dimensions.width / dimensions.height).toBeCloseTo(recording.width / recording.height, 1);
  } else {
    await expect(video).toHaveJSProperty("videoWidth", recording.width);
    await expect(video).toHaveJSProperty("videoHeight", recording.height);
  }
}

async function expectBelowNavigation(page: Page, target: Locator) {
  await expect.poll(async () => {
    const box = await target.boundingBox();
    const navigation = await page.getByRole("navigation", { name: "Inside this project", exact: true }).boundingBox();
    return Boolean(box && navigation && box.y >= navigation.y + navigation.height - 2 && box.y < page.viewportSize()!.height - 30);
  }, { message: "The requested content should be visible below sticky project navigation" }).toBe(true);
}

for (const slug of products) {
  const world = worlds[slug];
  const tour = getProductTour(slug)!;

  test(`${slug}: configured screens, crops, films and captions have intact source assets`, async ({ request }) => {
    const ids = tour.screens.map(screen => screen.id);
    expect(new Set(ids).size).toBe(ids.length);
    const assets = new Map<string, string>([[`/media/projects/${slug}/depth/presentation-board.webp`, "image/"]]);
    for (const screen of tour.screens) {
      expect(screen.width).toBeGreaterThan(0);
      expect(screen.height).toBeGreaterThan(0);
      if (screen.focus) {
        expect(screen.focus.x).toBeGreaterThanOrEqual(0);
        expect(screen.focus.y).toBeGreaterThanOrEqual(0);
        expect(screen.focus.width).toBeGreaterThan(0);
        expect(screen.focus.height).toBeGreaterThan(0);
        expect(screen.focus.x + screen.focus.width, screen.id).toBeLessThanOrEqual(screen.width);
        expect(screen.focus.y + screen.focus.height, screen.id).toBeLessThanOrEqual(screen.height);
      }
      assets.set(screen.src, "image/");
    }
    for (const film of tour.films) {
      assets.set(film.src, "video/");
      assets.set(film.poster, "image/");
      expect(film.chapters.length).toBeGreaterThan(1);
      expect(film.chapters[0].at).toBeGreaterThanOrEqual(0);
      for (let i = 0; i < film.chapters.length; i++) {
        expect(film.chapters[i].at).toBeLessThan(film.duration);
        if (i) expect(film.chapters[i].at).toBeGreaterThan(film.chapters[i - 1].at);
      }
      if (film.captions) {
        const response = await request.get(film.captions);
        expect(response.status()).toBe(200);
        expect(await response.text()).toMatch(/^WEBVTT\s[\s\S]*-->/);
      }
      expect(film.chapters.every(chapter => chapter.description?.trim()), `${film.id} should offer a readable walkthrough`).toBe(true);
    }
    for (const [source, contentType] of assets) {
      const response = await request.head(source);
      expect(response.status(), source).toBe(200);
      expect(response.headers()["content-type"], source).toContain(contentType);
      expect(Number(response.headers()["content-length"]), source).toBeGreaterThan(0);
    }
    expect((await request.get(`/media/projects/${slug}/depth/research.md`)).status()).toBe(200);
  });

  for (const width of [320, 390, 1440]) {
    test(`${slug} at ${width}px: all story anchors expose their headings below navigation`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`/work/${slug}`);
      const navigation = page.getByRole("navigation", { name: "Inside this project", exact: true });
      for (const story of world.stories) {
        const target = page.locator(`[id="${story.id}"]`);
        await expect(target).toHaveCount(1);
        await navigation.locator(`a[href="#${story.id}"]`).click();
        await expect(page).toHaveURL(new RegExp(`#${story.id}$`));
        const heading = target.getByRole("heading", { level: 2, name: story.title, exact: true });
        await expect(heading).toBeVisible();
        await expectBelowNavigation(page, heading);
      }
      for (const id of ["overview", "deep-dive"]) {
        await navigation.locator(`a[href="#${id}"]`).click();
        await expectBelowNavigation(page, page.locator(`#${id} h2`).first());
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    });
  }

  test(`${slug}: every film chapter seeks and reveals the video, captions and transcript work`, async ({ page, browserName }) => {
    test.setTimeout(120_000);
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/work/${slug}`);
    await expect(page.getByTestId("product-film")).toHaveCount(tour.films.length);
    for (const story of world.stories) {
      await expect(page.locator(`[id="${story.id}"]`).getByTestId("product-screens").locator("figure")).toHaveCount(story.screens.length);
    }
    let previous: Locator | undefined;
    for (const recording of tour.films) {
      const film = filmByTitle(page, recording.title);
      await film.getByRole("button", { name: /^Play:/ }).click();
      const video = film.locator("video");
      await expect(video).toBeFocused();
      await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(.15);
      await expectVideoSourceShape(video, recording, browserName);
      expect(await video.evaluate((el: HTMLVideoElement) => el.duration)).toBeCloseTo(recording.duration, 0);
      if (previous) await expect(previous).toHaveJSProperty("paused", true);
      const chapters = film.locator('[aria-label="Video chapters"] button');
      await expect(chapters).toHaveCount(recording.chapters.length);
      for (let i = 0; i < recording.chapters.length; i++) {
        const at = recording.chapters[i].at;
        await chapters.nth(i).click();
        await expect(video).toBeFocused();
        await expect.poll(() => video.evaluate((el: HTMLVideoElement, expected) => Math.abs(el.currentTime - expected), at)).toBeLessThan(1.5);
        await expect(chapters.nth(i)).toHaveAttribute("aria-pressed", "true");
        await expectBelowNavigation(page, video);
      }
      if (recording.captions) {
        await expect(video.locator('track[kind="captions"][srclang="en"]')).toHaveAttribute("src", recording.captions);
        await video.evaluate((el: HTMLVideoElement) => { el.textTracks[0].mode = "hidden"; });
        await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.textTracks[0].cues?.length ?? 0)).toBeGreaterThan(0);
      }
      const transcript = film.locator("details");
      await transcript.locator("summary").click();
      await expect(transcript.locator("li")).toHaveCount(recording.chapters.length);
      await expect(transcript.locator("li").first()).toBeVisible();
      previous = video;
    }
    expect(errors).toEqual([]);
  });

  test(`${slug}: hero and companion links reach their full original screen`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/work/${slug}`);
    const overview = page.getByRole("link", { name: /^Download visual overview/ });
    await expect(overview).toHaveAttribute("href", `/media/projects/${slug}/depth/presentation-board.webp`);
    await expect(overview).toHaveAttribute("download", "");
    for (const screen of [tour.hero, tour.companion].filter(item => item !== undefined)) {
      await page.getByRole("link", { name: `Explore ${screen.title}`, exact: true }).click();
      const figure = page.locator(`[id="screen-${screen.id}"]`);
      await expect(figure).toHaveCount(1);
      await expect(figure).toBeVisible();
      await figure.getByRole("link", { name: `Expand: ${screen.title}`, exact: true }).click();
      const viewer = page.getByRole("dialog", { name: screen.title, exact: true });
      await expect(viewer.locator("img")).toHaveJSProperty("naturalWidth", screen.width);
      await expect(viewer.locator("img")).toHaveJSProperty("naturalHeight", screen.height);
      await page.keyboard.press("Escape");
    }
  });
}

for (const slug of products) {
  test(`${slug}: real product media loads on demand and the recording plays`, async ({ page, request, browserName }) => {
    const videoRequests: string[] = [];
    page.on("request", request => { if (/\.mp4(?:\?|$)/.test(request.url())) videoRequests.push(request.url()); });
    await page.goto(`/work/${slug}`);
    await expect(page.getByTestId("product-case-study")).toBeVisible();
    const screens = page.getByTestId("product-screens").locator("figure");
    expect(await screens.count()).toBeGreaterThanOrEqual(4);
    const film = page.getByTestId("product-film").first();
    await film.scrollIntoViewIfNeeded();
    await expect(film.locator("video")).toHaveCount(0);
    expect(videoRequests).toEqual([]);

    const manifest = await request.get(`/media/projects/${slug}/capture-manifest.json`);
    expect(manifest.status()).toBe(200);
    const capture = await manifest.json();
    expect(capture.sourceRevision).toMatch(/^[a-f0-9]{40}$/);

    await film.getByRole("button", { name: /^Play:/ }).click();
    const video = film.locator("video");
    await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(.3);
    expect(await video.evaluate((el: HTMLVideoElement) => el.videoWidth)).toBeGreaterThanOrEqual(1000);
    expect(await video.evaluate((el: HTMLVideoElement) => el.duration)).toBeGreaterThan(8);
    await video.evaluate((el: HTMLVideoElement) => el.pause());
    // Windows WebKit's native decoder does not expose all media requests here.
    if (browserName === "chromium") expect(videoRequests.length).toBeGreaterThan(0);
    expect(await video.evaluate((el: HTMLVideoElement) => el.currentSrc)).toMatch(/\.mp4$/);
  });
}

test("screen inspection supports zoom, keyboard navigation, Escape and focus recovery", async ({ page }) => {
  const tour = getProductTour("browser-coder")!;
  const screens = worlds["browser-coder"].stories[0].screens.map(id => tour.screens.find(screen => screen.id === id)!);
  await page.goto("/work/browser-coder");
  const trigger = page.getByRole("link", { name: `Expand: ${screens[0].title}`, exact: true });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const viewer = page.getByRole("dialog");
  await expect(viewer).toBeVisible();
  await expect(viewer).toHaveAccessibleName(screens[0].title);
  await expect(viewer.locator("img")).toHaveJSProperty("naturalWidth", screens[0].width);
  const fitted = viewer.getByLabel("Screenshot preview", { exact: true });
  expect(await fitted.evaluate(el => el.scrollHeight <= el.clientHeight + 1 && el.scrollWidth <= el.clientWidth + 1)).toBeTruthy();
  await viewer.getByRole("button", { name: "Zoom in", exact: true }).click();
  await expect(viewer.getByRole("button", { name: "Fit screen", exact: true })).toHaveAttribute("aria-pressed", "true");
  const inspection = viewer.getByLabel("Full-size screenshot. Scroll to inspect details.", { exact: true });
  expect(await inspection.evaluate(el => el.scrollWidth > el.clientWidth)).toBeTruthy();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("dialog")).toHaveAccessibleName(screens[1].title);
  await page.getByRole("button", { name: "Previous screen", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveAccessibleName(screens[0].title);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
});

test("chapters seek a real video and starting another film pauses the first", async ({ page }) => {
  await page.goto("/work/browser-coder");
  const films = page.getByTestId("product-film");
  const first = films.nth(0);
  const chapter = first.locator('[aria-label="Video chapters"] button').nth(1);
  const [minutes, seconds] = (await chapter.locator("span").innerText()).split(":").map(Number);
  await chapter.click();
  await expect.poll(() => first.locator("video").evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(minutes * 60 + seconds);
  await expect(chapter).toHaveAttribute("aria-pressed", "true");
  await films.nth(1).getByRole("button", { name: /^Play:/ }).click();
  await expect.poll(() => first.locator("video").evaluate((el: HTMLVideoElement) => el.paused)).toBe(true);
  await expect.poll(() => films.nth(1).locator("video").evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(.2);
});

test("keyboard playback moves focus into native video controls", async ({ page }) => {
  await page.goto("/work/browser-coder");
  const film = page.getByTestId("product-film").first();
  await film.getByRole("button", { name: /^Play:/ }).focus();
  await page.keyboard.press("Enter");
  const video = film.locator("video");
  await expect(video).toBeFocused();
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(.2);
  await page.keyboard.press("Space");
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true);
  const pausedAt = await video.evaluate((el: HTMLVideoElement) => el.currentTime);
  await page.keyboard.press("Space");
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(false);
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(pausedAt + .1);
});

test("Eventa's edited guest film preserves its native composition at every viewport", async ({ page, browserName }) => {
  const recording = getProductTour("eventa")!.films.find(film => film.id === "guest-connections")!;
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/work/eventa");
    const film = filmByTitle(page, recording.title);
    await film.getByRole("button", { name: /^Play:/ }).click();
    const video = film.locator("video");
    await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(.2);
    await expectVideoSourceShape(video, recording, browserName);
    const frame = await video.boundingBox();
    // Wide screens may letterbox within the capped stage; all original pixels must fit.
    await expect(video).toHaveCSS("object-fit", "contain");
    expect(frame!.width).toBeGreaterThan(0);
    expect(frame!.height).toBeGreaterThan(0);
    expect(frame!.x).toBeGreaterThanOrEqual(0);
    expect(frame!.x + frame!.width).toBeLessThanOrEqual(width + 1);
    await video.evaluate((el: HTMLVideoElement) => el.pause());
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
  }
});

test("320px reduced-motion visitors can inspect complete source pixels", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work/eventa");
  const screen = page.getByTestId("product-screens").getByRole("link").first();
  await screen.click();
  const viewer = page.getByRole("dialog");
  await expect(viewer).toBeVisible();
  await viewer.getByRole("button", { name: "Zoom in", exact: true }).click();
  expect(await viewer.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBeTruthy();
  await viewer.getByRole("button", { name: "Close screen viewer" }).click();
  await expect(screen).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
});

test("a failed video keeps screenshots and a direct recording link available", async ({ page, browserName }) => {
  if (browserName !== "webkit") await page.route(/\/media\/projects\/.*\.mp4(?:\?|$)/, route => route.abort());
  await page.goto("/work/browser-coder");
  const film = page.getByTestId("product-film").first();
  await film.getByRole("button", { name: /^Play:/ }).click();
  if (browserName === "webkit") {
    // Windows WebKit's native media loader bypasses Playwright request routing.
    // A genuinely missing local source produces the same native media error.
    await film.locator("video").evaluate((el: HTMLVideoElement) => {
      el.src = "/media/projects/browser-coder/intentionally-missing-test-video.mp4";
      el.load();
    });
  }
  await expect(film.getByRole("status")).toContainText("The video could not load");
  await expect(film.getByRole("link", { name: "Download video", exact: true })).toBeVisible();
  await page.getByTestId("product-screens").getByRole("link").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("without JavaScript, chapters, transcripts, screenshots and recordings remain accessible", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  try {
    await page.goto("/work/browser-coder");
    const story = worlds["browser-coder"].stories[0];
    await page.getByRole("navigation", { name: "Inside this project" }).locator(`a[href="#${story.id}"]`).click();
    await expect(page.locator(`#${story.id} h2`)).toBeVisible();
    const film = page.getByTestId("product-film").first();
    await expect(film.getByRole("link", { name: "Watch the recorded walkthrough", exact: true })).toBeVisible();
    await film.locator("summary").click();
    await expect(film.locator("details li").first()).toBeVisible();
    const screen = page.getByTestId("product-screens").getByRole("link").first();
    const source = await screen.getAttribute("href");
    expect(source).toMatch(/\.webp$/);
    await screen.click();
    await expect(page).toHaveURL(new RegExp(source!.replaceAll(".", "\\.") + "$"));
  } finally { await context.close(); }
});
