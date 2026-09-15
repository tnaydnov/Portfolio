import { expect, test, type Page } from "@playwright/test";
import { ALL_PROJECTS } from "../src/content/work";
import { engineeringStudies } from "../src/content/engineering";

const cases = ALL_PROJECTS.map(project => project.slug);
const publicPaths = ["/", "/work", "/about", "/contact", ...cases.map((slug) => `/work/${slug}`)];

async function expectEnglishPage(page: Page, path: string) {
  await expect(page).toHaveTitle("Tomer Naydnov");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Tomer Naydnov");
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "Tomer Naydnov");
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", "Tomer Naydnov");
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  const description = await page.locator('meta[name="description"]').getAttribute("content");
  expect(description?.length).toBeGreaterThan(40);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", description!);
  await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute("content", description!);
  const socialImage = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(socialImage).toMatch(/^https:\/\/tomer-naydnov\.com\//);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", socialImage!);
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).not.toHaveAttribute("dir", "rtl");
  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(new URL(canonical!).href).toBe(new URL(path, "https://tomer-naydnov.com").href);
  await expect(page.locator("a[hreflang], link[hreflang]")).toHaveCount(0);
  await expect(page.locator('a[href="/en"], a[href^="/en/"], a[href="/he"], a[href^="/he/"]')).toHaveCount(0);
  expect(await page.locator("body").innerText()).not.toMatch(/[\u0590-\u05ff]/u);
  expect(await page.locator("body").innerText()).not.toMatch(/(?!-)\p{Dash_Punctuation}|[\u00ad\u00af\u203e\u2212]/u);
  await expect(page.getByRole("group", { name: "Site language", exact: true })).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), path).toBeTruthy();
}

for (const width of [320, 390, 768, 1366, 2560]) {
  test(`${width}px: public pages are readable, English and canonical`, async ({ context }, testInfo) => {
    test.setTimeout(90_000);
    for (const path of publicPaths) {
      // Each direct-route audit gets its own document. Rapid full navigations on
      // one WebKit page can surface canceled prefetch errors from the old page.
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.setViewportSize({ width, height: 900 });
      try {
        const response = await page.goto(path);
        expect(response?.status(), path).toBe(200);
        await page.evaluate(() => document.fonts.ready);
        await expectEnglishPage(page, path);
        if (path === "/") await expect(page.locator("main h1")).toHaveAccessibleName("Hey, I'm Tomer.");
        expect(errors, path).toEqual([]);
      } catch (error) {
        await testInfo.attach(`${width}px-${path.replaceAll("/", "_")}`, { body: await page.screenshot({ fullPage: true }), contentType: "image/png" });
        throw error;
      } finally {
        await page.close();
      }
    }
  });
}

test("mobile menu supports keyboard, navigation and scroll recovery", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.locator('header button[aria-haspopup="dialog"]');
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await page.keyboard.press("Shift+Tab");
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBeTruthy();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page.locator("main")).not.toHaveAttribute("inert");
  await trigger.click();
  await dialog.locator('a[href="/work"]').click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
});

test("identity and direct links are available without waiting for the portrait", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const hero = page.getByTestId("welcome-hero");
  const heading = hero.getByRole("heading", { level: 1, name: "Hey, I'm Tomer.", exact: true });
  const work = hero.getByRole("link", { name: "Explore my work", exact: true });
  const about = hero.getByRole("link", { name: "A little about me", exact: true });
  expect(await heading.isVisible()).toBeTruthy();
  expect(await work.isVisible()).toBeTruthy();
  expect(await about.isVisible()).toBeTruthy();
  await expect(work).toHaveAttribute("href", "/work");
  await expect(about).toHaveAttribute("href", "/about");
  await expect(page.locator("header").getByRole("link", { name: "Tomer Naydnov - Home", exact: true })).toBeVisible();
  await work.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/work$/);
});

test("touching the portrait hero permits ordinary vertical page scrolling", async ({ browser, browserName, baseURL }) => {
  test.skip(browserName !== "chromium", "Native touch injection uses Chromium's CDP; responsive navigation is checked in both engines.");
  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  try {
    await page.goto("/");
    const hero = page.getByTestId("welcome-hero");
    await expect(hero).toBeVisible();
    const bounds = await hero.boundingBox();
    expect(bounds).toBeTruthy();
    const x = Math.round(bounds!.x + bounds!.width * .5);
    const y = Math.round(Math.min(650, bounds!.y + bounds!.height * .55));
    const beforeScroll = await page.evaluate(() => scrollY);
    const session = await context.newCDPSession(page);
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    for (let step = 1; step <= 6; step++) await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: y - step * 30 }] });
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(beforeScroll + 30);
  } finally { await context.close(); }
});

test("the portrait loads and its greeting can be replayed with the keyboard", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const portrait = page.getByTestId("living-portrait");
  await portrait.scrollIntoViewIfNeeded();
  await expect(portrait).toHaveAttribute("data-loaded", "true");
  await expect(portrait.getByRole("img", { name: "Tomer Naydnov smiling and raising a hand in welcome", exact: true })).toBeVisible();
  await expect(portrait).toHaveAttribute("data-moving", "true");
  // The first wave is automatic. Wait for it to finish before exercising replay.
  await expect(portrait.getByRole("button", { name: "Hey there!", exact: true })).toBeDisabled();
  const wave = portrait.getByRole("button", { name: "Wave hello", exact: true });
  await expect(wave).toBeEnabled();
  for (let replay = 0; replay < 2; replay++) {
    await wave.focus();
    await page.keyboard.press("Enter");
    await expect(portrait.getByRole("status")).toHaveText("Hey! Glad you stopped by.");
    await expect(portrait.getByRole("button", { name: "Hey there!", exact: true })).toBeDisabled();
    await expect(wave).toBeEnabled();
  }
  expect(errors).toEqual([]);
});

test("animated portrait layers preserve transparency and a visible waving hand", async ({ browser, baseURL }, testInfo) => {
  test.setTimeout(90_000);
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({
      baseURL,
      viewport: { width, height: width < 600 ? 844 : 1000 },
      deviceScaleFactor: 2,
      isMobile: width < 600,
      hasTouch: width < 600,
      reducedMotion: "no-preference",
    });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    try {
      await page.goto("/");
      const portrait = page.getByTestId("living-portrait");
      await portrait.scrollIntoViewIfNeeded();
      await expect(portrait).toHaveAttribute("data-moving", "true");
      await portrait.locator("img").evaluateAll(images => Promise.all(images.map(image => (image as HTMLImageElement).decode())));
      await expect(portrait.getByRole("button", { name: "Hey there!", exact: true })).toBeDisabled();
      const wave = portrait.getByRole("button", { name: "Wave hello", exact: true });
      await expect(wave).toBeEnabled();

      // An animated child can bypass its ancestor's SVG filter on iOS Safari.
      // Every independently composited image must key its own white background.
      const boundaries = await portrait.locator("img").evaluateAll(images => images.map(image => {
        const filter = getComputedStyle(image).filter;
        const filterId = filter.match(/#([^)"]+)/)?.[1];
        return { keyed: Boolean(filterId && document.getElementById(filterId)), ancestorFilter: getComputedStyle(image.parentElement!.parentElement!).filter };
      }));
      expect(boundaries).toHaveLength(4);
      expect(boundaries.every(layer => layer.keyed && layer.ancestorFilter === "none")).toBe(true);

      // Stabilize breathing/blinking, while retaining the real running wave.
      await portrait.evaluate(element => element.getAnimations({ subtree: true }).forEach(animation => {
        if (animation instanceof CSSAnimation) { animation.pause(); animation.currentTime = 0; }
      }));
      await wave.click();
      await expect(portrait.getByRole("button", { name: "Hey there!", exact: true })).toBeDisabled();
      const hand = portrait.locator('[class*="hand"]');
      const animation = await hand.evaluateHandle(element => element.getAnimations().find(item => !(item instanceof CSSAnimation) && !(item instanceof CSSTransition))!);
      const poses: string[] = [];
      for (const at of [380, 760, 1140]) {
        const pose = await animation.evaluate((item, time) => {
          item.playbackRate = 0;
          item.currentTime = time;
          return { state: item.playState, transform: getComputedStyle((item.effect as KeyframeEffect).target!).transform };
        }, at);
        expect(pose.state).toBe("running");
        poses.push(pose.transform);
        const stage = (await portrait.boundingBox())!;
        const body = (await portrait.locator("img").first().boundingBox())!;
        const screenshot = await portrait.screenshot({ scale: "css", animations: "allow" });
        const pixels = await page.evaluate(async ({ png, crop }) => {
          const image = new Image();
          image.src = `data:image/png;base64,${png}`;
          await image.decode();
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext("2d")!;
          context.drawImage(image, 0, 0);
          const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
          let white = 0, skin = 0, handArea = 0;
          for (let y = 0; y < canvas.height; y++) for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;
            const [r, g, b] = [data[index], data[index + 1], data[index + 2]];
            if (r >= 247 && g >= 247 && b >= 247) white++;
            if (x >= crop.x && x < crop.x + crop.width && y >= crop.y && y < crop.y + crop.height) {
              handArea++;
              if (r > 115 && g > 60 && b > 35 && r > g + 12 && g > b + 6) skin++;
            }
          }
          return { whiteRatio: white / (canvas.width * canvas.height), visibleHandRatio: skin / handArea };
        }, { png: screenshot.toString("base64"), crop: { x: body.x - stage.x, y: body.y - stage.y + body.height * .07, width: body.width * .32, height: body.height * .275 } });
        await testInfo.attach(`${width}px-wave-${at}ms`, { body: screenshot, contentType: "image/png" });
        expect(pixels.whiteRatio, `${width}px at ${at}ms must not expose the white studio rectangle`).toBeLessThan(.0005);
        expect(pixels.visibleHandRatio, `${width}px at ${at}ms must retain the waving hand`).toBeGreaterThan(.15);
      }
      expect(new Set(poses).size).toBe(3);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      expect(errors).toEqual([]);
    } finally { await context.close(); }
  }
});

test("portrait motion can be paused and resumed without disabling the greeting", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const portrait = page.getByTestId("living-portrait");
  await portrait.scrollIntoViewIfNeeded();
  await expect(portrait).toHaveAttribute("data-loaded", "true");
  await expect(portrait).toHaveAttribute("data-moving", "true");
  const pause = portrait.getByRole("button", { name: "Pause portrait animation", exact: true });
  await expect(pause).toHaveAttribute("aria-pressed", "false");
  await pause.click();
  const resume = portrait.getByRole("button", { name: "Resume portrait animation", exact: true });
  await expect(resume).toHaveAttribute("aria-pressed", "true");
  await expect(portrait).toHaveAttribute("data-moving", "false");
  // Button hover transitions remain usable while the portrait itself is paused.
  const runningAnimations = () => portrait.evaluate((element) => element.getAnimations({ subtree: true }).filter((animation) => animation.playState === "running" && !(animation instanceof CSSTransition)).length);
  await expect.poll(runningAnimations).toBe(0);
  await portrait.getByRole("button", { name: "Wave hello", exact: true }).click();
  await expect(portrait.getByRole("status")).toHaveText("Hey! Glad you stopped by.");
  await expect(portrait.getByRole("button", { name: "Wave hello", exact: true })).toBeEnabled();
  expect(await runningAnimations()).toBe(0);
  await resume.focus();
  await page.keyboard.press("Enter");
  await expect(pause).toHaveAttribute("aria-pressed", "false");
  await expect(portrait).toHaveAttribute("data-moving", "true");
  await expect.poll(runningAnimations).toBeGreaterThan(0);
});

test("reduced motion keeps the portrait still while the greeting and navigation work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const hero = page.getByTestId("welcome-hero");
  const portrait = page.getByTestId("living-portrait");
  await expect(portrait).toHaveAttribute("data-loaded", "true");
  await expect(portrait).toHaveAttribute("data-moving", "false");
  await expect(hero.getByRole("heading", { level: 1 })).toHaveAccessibleName("Hey, I'm Tomer.");
  await expect(portrait.getByRole("button", { name: /(?:Pause|Resume) portrait animation/ })).toHaveCount(0);
  const runningAnimations = () => portrait.evaluate((element) => element.getAnimations({ subtree: true }).filter((animation) => animation.playState === "running").length);
  expect(await runningAnimations()).toBe(0);
  const wave = portrait.getByRole("button", { name: "Wave hello", exact: true });
  await wave.click();
  await expect(portrait.getByRole("status")).toHaveText("Hey! Glad you stopped by.");
  await expect(wave).toBeEnabled();
  expect(await runningAnimations()).toBe(0);
  await hero.getByRole("link", { name: "Explore my work", exact: true }).click();
  await expect(page).toHaveURL(/\/work$/);
});

test("an unavailable portrait preserves identity and useful navigation", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route(/tomer-welcome\.webp/, (route) => route.abort());
  await page.goto("/");
  await expectEnglishPage(page, "/");
  const hero = page.getByTestId("welcome-hero");
  const portrait = page.getByTestId("living-portrait");
  const photo = portrait.getByRole("img", { name: "Tomer Naydnov smiling and raising a hand in welcome", exact: true });
  await expect.poll(() => photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth === 0)).toBe(true);
  await expect(portrait).toHaveAttribute("data-moving", "false");
  await expect(portrait.getByRole("button")).toHaveCount(0);
  await expect(hero.getByRole("heading", { level: 1 })).toHaveAccessibleName("Hey, I'm Tomer.");
  await expect(hero.getByRole("link", { name: "Explore my work", exact: true })).toBeVisible();
  await hero.getByRole("link", { name: "A little about me", exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  expect(errors).toEqual([]);
});

test("all pages share the same mist and teal palette through navigation", async ({ page }) => {
  await page.goto("/");
  const palette = () => page.evaluate(() => ({
    background: getComputedStyle(document.body).backgroundColor,
    header: getComputedStyle(document.querySelector("header")!).color,
    footer: getComputedStyle(document.querySelector("footer")!).color,
    scheme: getComputedStyle(document.documentElement).colorScheme,
  }));
  const homePalette = await palette();
  expect(homePalette.scheme).toBe("light");
  await page.getByTestId("welcome-hero").getByRole("link", { name: "Explore my work", exact: true }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect.poll(async () => (await palette()).scheme).toBe("light");
  const workPalette = await palette();
  expect(workPalette.background).toBe(homePalette.background);
  expect(workPalette.header).toBe(homePalette.header);
  expect(workPalette.footer).toBe(homePalette.footer);
  for (const path of ["/about", "/contact", "/work/browser-coder"]) {
    await page.goto(path);
    expect(await palette()).toEqual(homePalette);
  }
  await page.locator("header").getByRole("link", { name: "Tomer Naydnov - Home", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByTestId("welcome-hero")).toBeVisible();
  await expect.poll(palette).toEqual(homePalette);
});

test("portrait depth follows a mouse and returns to rest when animation is paused", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const portrait = page.getByTestId("living-portrait");
  await expect(portrait).toHaveAttribute("data-moving", "true");
  const bounds = (await portrait.boundingBox())!;
  await page.mouse.move(bounds.x + bounds.width * .85, bounds.y + bounds.height * .35);
  const offset = () => portrait.evaluate(el => Number(el.style.getPropertyValue("--look-x")));
  await expect.poll(offset).toBeGreaterThan(.3);
  await portrait.getByRole("button", { name: "Pause portrait animation" }).click();
  await expect.poll(offset).toBe(0);
  await page.mouse.move(bounds.x + bounds.width * .15, bounds.y + bounds.height * .3);
  expect(await offset()).toBe(0);
});

test("email copying confirms the action and keeps the direct email link", async ({ context, page, browserName }) => {
  test.skip(browserName !== "chromium", "Clipboard permission grants are not supported by Playwright's WebKit engine.");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/contact");
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("tnaydnov@gmail.com");
  await expect(page.locator('main a[href="mailto:tnaydnov@gmail.com"]').first()).toBeVisible();
});

test("identity and project links work without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  try {
    await page.goto("/");
    await expect(page.locator("main h1")).toHaveAccessibleName("Hey, I'm Tomer.");
    await expect(page.locator('header a[href="/work"]')).toBeVisible();
    await page.locator('header a[href="/work"]').click();
    await page.locator('main a[href="/work/arc"]').first().click();
    await expect(page.locator("main h1")).toHaveText("Arc");
  } finally { await context.close(); }
});

test("all eleven projects are discoverable from Work", async ({ page }) => {
  await page.goto("/work");
  expect(cases).toHaveLength(11);
  for (const slug of cases) {
    await expect(page.locator(`main a[href="/work/${slug}"]`).first()).toBeVisible();
  }
});

test("product disclosures expose contribution, source decisions and evidence boundaries with a keyboard", async ({ page }) => {
  for (const slug of ["arc", "browser-coder", "applytide", "eventa"]) {
    await page.goto(`/work/${slug}`);
    const contribution = page.locator("#overview details");
    await contribution.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(contribution.locator("p")).toBeVisible();
    const decisions = page.locator("#deep-dive details");
    expect(await decisions.count()).toBeGreaterThan(1);
    for (const disclosure of await decisions.all()) {
      const summary = disclosure.locator("summary");
      await summary.focus();
      await page.keyboard.press("Enter");
      await expect(disclosure).toHaveAttribute("open", "");
      await expect(disclosure.locator("p, li").first()).toBeVisible();
      await page.keyboard.press("Enter");
      await expect(disclosure).not.toHaveAttribute("open");
    }
  }
});

test("earlier engineering studies expose their source-backed capabilities and limitations", async ({ page, request }) => {
  for (const [slug, study] of Object.entries(engineeringStudies)) {
    await page.goto(`/work/${slug}`);
    const article = page.getByTestId("engineering-study");
    await expect(article).toBeVisible();
    await expect(article.locator('#capabilities h3')).toHaveCount(study.groups.length);
    await article.getByRole("link", { name: /Explore the system/ }).click();
    await expect(page).toHaveURL(new RegExp(`/work/${slug}#capabilities$`));
    const contribution = article.locator("details").filter({ has: page.locator("summary", { hasText: "My contribution" }) });
    await contribution.locator("summary").click();
    await expect(contribution.locator("p")).toBeVisible();
    const scope = article.locator("#deep-dive details").last();
    await scope.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(scope.locator("li")).toHaveCount(study.limitations.length);
    await expect(scope.locator("li").first()).toBeVisible();
    const source = await article.getByRole("link", { name: /Full source review/ }).getAttribute("href");
    const response = await request.get(source!);
    expect(response.status(), source!).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/json");
  }
});

test("legacy prefixes and the former system page permanently redirect", async ({ request }) => {
  for (const [source, destination] of [["/en", "/"], ["/he", "/"], ["/en/work/arc", "/work/arc"], ["/he/work/eventa", "/work/eventa"], ["/en/system", "/about"], ["/he/system", "/about"], ["/system", "/about"]]) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status(), source).toBe(308);
    expect(new URL(response.headers().location, "https://tomer-naydnov.com").pathname, source).toBe(destination);
  }
});

test("CV, social image, icon, sitemap and missing routes have correct metadata", async ({ request, page }) => {
  const cv = await request.get("/Tomer%20Naydnov.pdf");
  expect(cv.status()).toBe(200);
  expect(cv.headers()["content-type"]).toContain("application/pdf");
  expect((await request.get("/icon.svg")).status()).toBe(200);
  const favicon = await request.get("/favicon.ico");
  expect(favicon.status()).toBe(200);
  const ico = await favicon.body();
  expect(ico.readUInt16LE(2)).toBe(1);
  expect(ico.readUInt16LE(4)).toBe(3);
  for (const [path, size] of [["/apple-icon.png", 180], ["/icons/icon-32.png", 32], ["/icons/icon-192.png", 192], ["/icons/icon-512.png", 512], ["/icons/icon-maskable-512.png", 512]] as const) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
    const png = await response.body();
    expect(png.readUInt32BE(16)).toBe(size);
    expect(png.readUInt32BE(20)).toBe(size);
  }
  const manifestResponse = await request.get("/manifest.webmanifest");
  expect(manifestResponse.status()).toBe(200);
  const manifest = await manifestResponse.json();
  expect(manifest.name).toBe("Tomer Naydnov");
  expect(manifest.short_name).toBe("Tomer Naydnov");
  expect(manifest.icons).toHaveLength(3);
  expect(manifest.icons.some((icon: { purpose: string }) => icon.purpose === "maskable")).toBe(true);
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap: https://tomer-naydnov.com/sitemap.xml");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const sitemapText = await sitemap.text();
  for (const path of publicPaths) expect(sitemapText).toContain(new URL(path, "https://tomer-naydnov.com").href);
  expect(sitemapText).not.toMatch(/tomer-naydnov\.com\/(?:en|he)(?:\/|<)/);
  await page.goto("/");
  await expect(page.locator('header a[href="/Tomer Naydnov.pdf"]:visible')).toBeVisible();
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute("sizes", "180x180");
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute("href", "/manifest.webmanifest");
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630");
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", /Tomer Naydnov/);
  const imageUrl = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(imageUrl).toBeTruthy();
  const localImage = new URL(imageUrl!);
  const image = await request.get(`${localImage.pathname}${localImage.search}`);
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  const png = await image.body();
  expect(png.readUInt32BE(16)).toBe(1200);
  expect(png.readUInt32BE(20)).toBe(630);
  expect(png.length).toBeLessThan(1_000_000);
  const missing = await page.goto("/work/does-not-exist");
  expect(missing?.status()).toBe(404);
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toHaveAttribute("content", /noindex/);
  expect(await page.locator("body").innerText()).not.toMatch(/[\u0590-\u05ff]/u);
});

test("sharing crawlers receive complete previews in the initial HTML head", async ({ request }) => {
  for (const userAgent of ["WhatsApp/2.26", "facebookexternalhit/1.1", "Twitterbot/1.0", "LinkedInBot/1.0", "Slackbot-LinkExpanding 1.0", "Discordbot/2.0"]) {
    for (const path of ["/", "/work/browser-coder", "/work/arc/explore/instructor/overview", "/contact"]) {
      const response = await request.get(path, { headers: { "User-Agent": userAgent } });
      expect(response.status(), `${userAgent}: ${path}`).toBe(200);
      const head = (await response.text()).split("</head>")[0];
      expect(head).toContain("<title>Tomer Naydnov</title>");
      expect(head).toContain('<meta property="og:title" content="Tomer Naydnov"');
      expect(head).toContain('<meta property="og:site_name" content="Tomer Naydnov"');
      expect(head).toContain('<meta name="twitter:title" content="Tomer Naydnov"');
      expect(head).toContain('<meta name="twitter:card" content="summary_large_image"');
      const canonical = head.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
      expect(new URL(canonical!).href).toBe(new URL(path, "https://tomer-naydnov.com").href);
      expect(head).toMatch(/<meta property="og:image" content="https:\/\/tomer-naydnov\.com\/opengraph-image[^\"]*"/);
      expect(head).toMatch(/<meta property="og:description" content="[^\"]{40,}"/);
      expect(head).toMatch(/<meta name="twitter:description" content="[^\"]{40,}"/);
    }
  }
});
