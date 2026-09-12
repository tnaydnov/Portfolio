import { expect, test, type Page } from "@playwright/test";

const cases = ["arc", "browser-coder", "applytide", "eventa", "license-plate-recognition", "trading-system"];
const publicPaths = ["/", "/work", "/about", "/contact", ...cases.map((slug) => `/work/${slug}`)];

async function expectEnglishPage(page: Page, path: string) {
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).not.toHaveAttribute("dir", "rtl");
  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(new URL(canonical!).href).toBe(new URL(path, "https://tomer-naydnov.com").href);
  await expect(page.locator("a[hreflang], link[hreflang]")).toHaveCount(0);
  await expect(page.locator('a[href="/en"], a[href^="/en/"], a[href="/he"], a[href^="/he/"]')).toHaveCount(0);
  expect(await page.locator("body").innerText()).not.toMatch(/[\u0590-\u05ff]/u);
  await expect(page.getByRole("group", { name: "Site language", exact: true })).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), path).toBeTruthy();
}

for (const width of [320, 390, 768, 1366, 2560]) {
  test(`${width}px: public pages are readable, English and canonical`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    for (const path of publicPaths) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expectEnglishPage(page, path);
      if (path === "/") await expect(page.locator("main h1")).toHaveAccessibleName("Hey, I'm Tomer.");
    }
    expect(errors).toEqual([]);
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
  await expect(page.locator("header").getByRole("link", { name: "Tomer Naydnov \u2014 Home", exact: true })).toBeVisible();
  await work.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/work$/);
});

test("touching the portrait hero permits ordinary vertical page scrolling", async ({ browser, baseURL }) => {
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
  await page.locator("header").getByRole("link", { name: "Tomer Naydnov \u2014 Home", exact: true }).click();
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

test("email copying confirms the action and keeps the direct email link", async ({ context, page }) => {
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

test("case disclosures retain technical detail and adjustable decisions", async ({ page }) => {
  await page.goto("/work/arc");
  const chapter = page.locator("details#story");
  await chapter.locator("summary").click();
  await expect(chapter).toHaveAttribute("open", "");
  await expect(chapter.locator("p").first()).toBeVisible();
  const architecture = page.locator("#deep-dive details").filter({ hasText: "System & architecture" }).first();
  await architecture.locator("summary").click();
  await expect(architecture).toHaveAttribute("open", "");
  await expect(architecture.getByText("Technology", { exact: true })).toBeVisible();
  await page.goto("/work/applytide");
  const constraints = page.locator("#deep-dive details").filter({ has: page.locator("summary", { hasText: "Constraint study" }) });
  await constraints.locator("summary").focus();
  await page.keyboard.press("Enter");
  const time = constraints.getByRole("slider", { name: "Time", exact: true });
  await expect(time).toHaveValue("1");
  await time.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(time).toHaveValue("0");
  await expect(constraints).toContainText("JSON-LD with an LLM fallback.");
  await constraints.getByRole("button", { name: "Back to the actual decision" }).click();
  await expect(time).toBeFocused();
  await expect(time).toHaveValue("1");
  await expect(constraints.getByRole("slider", { name: "Scope", exact: true })).toHaveValue("1");
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
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const sitemapText = await sitemap.text();
  expect(sitemapText).toContain("https://tomer-naydnov.com/work/arc");
  expect(sitemapText).not.toMatch(/tomer-naydnov\.com\/(?:en|he)(?:\/|<)/);
  await page.goto("/");
  await expect(page.locator('header a[href="/Tomer Naydnov.pdf"]:visible')).toBeVisible();
  const imageUrl = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(imageUrl).toBeTruthy();
  const localImage = new URL(imageUrl!);
  const image = await request.get(`${localImage.pathname}${localImage.search}`);
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  const missing = await page.goto("/work/does-not-exist");
  expect(missing?.status()).toBe(404);
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toHaveAttribute("content", /noindex/);
  expect(await page.locator("body").innerText()).not.toMatch(/[\u0590-\u05ff]/u);
});
