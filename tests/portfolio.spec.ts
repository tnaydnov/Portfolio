import { expect, test, type Page } from "@playwright/test";

const cases = ["arc", "applytide", "eventa", "license-plate-recognition", "trading-system"];
const publicPaths = ["/", "/work", "/about", "/contact", ...cases.map((slug) => `/work/${slug}`)];
const labels = { engineering: "Engineering: Pull it apart", product: "Product: Run the loop", teaching: "Teaching: Open an idea" };

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
      if (path === "/") await expect(page.locator("main h1")).toHaveText(/^\s*Tomer\s*Naydnov\.?\s*$/);
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

test("playground actions stay independent and reset their object states", async ({ page }) => {
  await page.goto("/");
  const playground = page.getByTestId("playground");
  await expect(page.locator('section[data-ready="true"]')).toBeVisible();
  const engineering = page.getByRole("button", { name: labels.engineering, exact: true });
  const teaching = page.getByRole("button", { name: labels.teaching, exact: true });
  await engineering.focus();
  await page.keyboard.press("Enter");
  await expect(engineering).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { name: "Get underneath the surface.", exact: true })).toBeVisible();
  await teaching.click();
  await expect(teaching).toHaveAttribute("aria-pressed", "true");
  await expect(engineering).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { name: "Make the complicated click.", exact: true })).toBeVisible();
  await engineering.click();
  await expect(engineering).toHaveAttribute("aria-pressed", "false");
  await expect(teaching).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: labels.product, exact: true }).click();
  await expect(playground).toHaveAttribute("data-loop", "1");
  await expect(page.getByRole("heading", { name: "Build. Learn. Make it better.", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Close object note", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Build. Learn. Make it better.", exact: true })).toHaveCount(0);
  await expect(teaching).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Reset playground", exact: true }).click();
  await expect(engineering).toHaveAttribute("aria-pressed", "false");
  await expect(teaching).toHaveAttribute("aria-pressed", "false");
  await expect(playground).toHaveAttribute("data-loop", "0");
  await expect(playground).toHaveAttribute("data-turn", /^0(?:\.0+)?$/);
});

test("the playground rotates by keyboard and pointer without trapping navigation", async ({ page }) => {
  await page.goto("/");
  const playground = page.getByTestId("playground");
  await expect(page.locator('section[data-ready="true"]')).toBeVisible();
  await playground.focus();
  const initial = Number(await playground.getAttribute("data-turn"));
  await page.keyboard.press("ArrowRight");
  await expect.poll(async () => Number(await playground.getAttribute("data-turn"))).not.toBe(initial);
  await page.keyboard.press("ArrowLeft");
  await expect.poll(async () => Number(await playground.getAttribute("data-turn"))).toBeCloseTo(initial, 4);
  const bounds = await playground.boundingBox();
  expect(bounds).toBeTruthy();
  const x = bounds!.x + bounds!.width * .5, y = bounds!.y + bounds!.height * .5;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 95, y, { steps: 8 });
  await page.mouse.up();
  await expect.poll(async () => Number(await playground.getAttribute("data-turn"))).not.toBe(initial);
  await page.getByRole("button", { name: "Reset playground", exact: true }).click();
  await expect(playground).toHaveAttribute("data-turn", /^0(?:\.0+)?$/);
  await page.locator('header a[href="/work"]').click();
  await expect(page).toHaveURL(/\/work$/);
});

test("touching the playground permits ordinary vertical page scrolling", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  try {
    await page.goto("/");
    const playground = page.getByTestId("playground");
    await expect(playground).toBeVisible();
    const bounds = await playground.boundingBox();
    expect(bounds).toBeTruthy();
    const x = Math.round(bounds!.x + bounds!.width * .5);
    const y = Math.round(Math.min(650, bounds!.y + bounds!.height * .55));
    const beforeScroll = await page.evaluate(() => scrollY);
    const beforeTurn = await playground.getAttribute("data-turn");
    const session = await context.newCDPSession(page);
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    for (let step = 1; step <= 6; step++) await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: y - step * 30 }] });
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(beforeScroll + 30);
    await expect(playground).toHaveAttribute("data-turn", beforeTurn!);
  } finally { await context.close(); }
});

test("reduced motion preserves object controls and direct work navigation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator('section[data-motion="off"]')).toBeVisible();
  const engineering = page.getByRole("button", { name: labels.engineering, exact: true });
  await engineering.click();
  await expect(engineering).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: labels.product, exact: true }).click();
  await expect(page.getByRole("heading", { name: "Build. Learn. Make it better.", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Reset playground", exact: true }).click();
  await expect(engineering).toHaveAttribute("aria-pressed", "false");
  await page.locator('header a[href="/work"]').click();
  await expect(page).toHaveURL(/\/work$/);
});

test("a lost WebGL context leaves the fallback and controls available", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const playground = page.getByTestId("playground");
  await expect(page.locator('section[data-ready="true"]')).toBeVisible();
  await playground.locator("canvas").evaluate((canvas: HTMLCanvasElement) => canvas.getContext("webgl2")?.getExtension("WEBGL_lose_context")?.loseContext());
  await expect(playground.locator('[data-hidden="false"]')).toBeVisible();
  const teaching = page.getByRole("button", { name: labels.teaching, exact: true });
  await teaching.click();
  await expect(teaching).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Reset playground", exact: true }).click();
  await page.locator('header a[href="/work"]').click();
  await expect(page).toHaveURL(/\/work$/);
  expect(errors).toEqual([]);
});

test("WebGL startup failure preserves the page and object descriptions", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
      if (type.startsWith("webgl") || type === "experimental-webgl") return null;
      return original.apply(this, [type, ...args] as Parameters<typeof original>);
    } as typeof original;
  });
  await page.goto("/");
  await expectEnglishPage(page, "/");
  await expect(page.getByTestId("playground").locator('[data-hidden="false"]')).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.getByRole("button", { name: labels.engineering, exact: true }).click();
  await expect(page.getByRole("heading", { name: "Get underneath the surface.", exact: true })).toBeVisible();
  await page.locator('header a[href="/about"]').click();
  await expect(page).toHaveURL(/\/about$/);
  expect(errors).toEqual([]);
});

test("the renderer settles after toggles, a product loop and reset", async ({ page }) => {
  await page.addInitScript(() => {
    let draws = 0;
    Object.defineProperty(window, "__portfolioDrawCount", { get: () => draws });
    for (const Context of [window.WebGLRenderingContext, window.WebGL2RenderingContext]) {
      if (!Context) continue;
      const prototype = Context.prototype as unknown as Record<string, (...args: unknown[]) => unknown>;
      for (const method of ["drawArrays", "drawElements", "drawArraysInstanced", "drawElementsInstanced"]) {
        const original = prototype[method];
        if (original) prototype[method] = function (...args: unknown[]) { draws++; return original.apply(this, args); };
      }
    }
  });
  await page.goto("/");
  await expect(page.locator('section[data-ready="true"]')).toBeVisible();
  const count = () => page.evaluate(() => Reflect.get(window, "__portfolioDrawCount") as number);
  const expectIdle = async () => {
    await expect.poll(async () => { const before = await count(); await page.waitForTimeout(350); return (await count()) - before; }, { timeout: 15_000, intervals: [350] }).toBe(0);
  };
  await expectIdle();
  const before = await count();
  await page.getByRole("button", { name: labels.engineering, exact: true }).click();
  await expect.poll(count).toBeGreaterThan(before);
  await expectIdle();
  await page.getByRole("button", { name: labels.product, exact: true }).click();
  await expect(page.getByTestId("playground")).toHaveAttribute("data-loop", "1");
  await expectIdle();
  await page.getByRole("button", { name: "Reset playground", exact: true }).click();
  await expect(page.getByTestId("playground")).toHaveAttribute("data-loop", "0");
  await expectIdle();
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
    await expect(page.locator("main h1")).toHaveText(/^\s*Tomer\s*Naydnov\.?\s*$/);
    await expect(page.locator('header a[href="/work"]')).toBeVisible();
    await page.locator('header a[href="/work"]').click();
    await page.locator('main a[href="/work/arc"]').first().click();
    await expect(page.locator("main h1")).toHaveText("Arc");
  } finally { await context.close(); }
});

test("case disclosures retain technical detail and adjustable decisions", async ({ page }) => {
  await page.goto("/work/arc");
  const chapter = page.locator("#story details").first();
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
