import { expect, test } from "@playwright/test";

const products = ["arc", "browser-coder", "applytide", "eventa"];

for (const slug of products) {
  test(`${slug}: real product media loads on demand and the recording plays`, async ({ page, request }) => {
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
    expect(videoRequests.length).toBeGreaterThan(0);
  });
}

test("screen inspection supports zoom, keyboard navigation, Escape and focus recovery", async ({ page }) => {
  await page.goto("/work/browser-coder");
  const trigger = page.getByRole("link", { name: "Expand: From code to a result", exact: true });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const viewer = page.getByRole("dialog", { name: "From code to a result", exact: true });
  await expect(viewer).toBeVisible();
  await expect(viewer.locator("img")).toHaveJSProperty("naturalWidth", 3200);
  const fitted = viewer.getByLabel("Screenshot preview", { exact: true });
  expect(await fitted.evaluate(el => el.scrollHeight <= el.clientHeight + 1 && el.scrollWidth <= el.clientWidth + 1)).toBeTruthy();
  await viewer.getByRole("button", { name: "Zoom in", exact: true }).click();
  await expect(viewer.getByRole("button", { name: "Fit screen", exact: true })).toHaveAttribute("aria-pressed", "true");
  const inspection = viewer.getByLabel("Full-size screenshot. Scroll to inspect details.", { exact: true });
  expect(await inspection.evaluate(el => el.scrollWidth > el.clientWidth)).toBeTruthy();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("dialog")).toHaveAccessibleName("See what the program knows");
  await page.getByRole("button", { name: "Previous screen", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveAccessibleName("From code to a result");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
});

test("chapters seek a real video and starting another film pauses the first", async ({ page }) => {
  await page.goto("/work/browser-coder");
  const films = page.getByTestId("product-film");
  const first = films.nth(0);
  const chapter = first.getByRole("button", { name: /Compare pause history/ });
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
});

test("Eventa's guest film preserves a usable phone viewport on desktop and mobile", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/work/eventa");
    const film = page.getByTestId("product-film").nth(1);
    await film.getByRole("button", { name: /^Play:/ }).click();
    const video = film.locator("video");
    await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(.2);
    await expect(video).toHaveJSProperty("videoWidth", 780);
    await expect(video).toHaveJSProperty("videoHeight", 1800);
    const frame = await video.boundingBox();
    expect(frame!.height).toBeLessThanOrEqual(800);
    expect(frame!.width).toBeLessThanOrEqual(410);
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

test("a failed video keeps screenshots and a direct recording link available", async ({ page }) => {
  await page.route(/\/media\/projects\/.*\.mp4(?:\?|$)/, route => route.abort());
  await page.goto("/work/browser-coder");
  const film = page.getByTestId("product-film").first();
  await film.getByRole("button", { name: /^Play:/ }).click();
  await expect(film.getByRole("status")).toContainText("The video could not load");
  await expect(film.getByRole("link", { name: "Download video", exact: true })).toBeVisible();
  await page.getByTestId("product-screens").getByRole("link").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("without JavaScript, screenshots and recordings remain directly accessible", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  try {
    await page.goto("/work/browser-coder");
    const film = page.getByTestId("product-film").first();
    await expect(film.getByRole("link", { name: "Watch the recorded walkthrough", exact: true })).toBeVisible();
    const screen = page.getByTestId("product-screens").getByRole("link").first();
    const source = await screen.getAttribute("href");
    expect(source).toMatch(/\.webp$/);
    await screen.click();
    await expect(page).toHaveURL(new RegExp(source!.replaceAll(".", "\\.") + "$"));
  } finally { await context.close(); }
});
