import { expect, test } from "@playwright/test";

const cases = ["arc", "applytide", "eventa", "license-plate-recognition", "trading-system"];

for (const locale of ["en", "he"]) {
  test(`${locale}: every public page is readable and localized`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 844 });
      for (const path of ["", "/work", "/about", "/contact", ...cases.map((slug) => `/work/${slug}`)]) {
        const response = await page.goto(`/${locale}${path}`);
        expect(response?.status(), path).toBe(200);
        await expect(page.locator("main h1")).toBeVisible();
        await expect(page.locator("main h1")).toHaveCount(1);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.locator("html")).toHaveAttribute("dir", locale === "he" ? "rtl" : "ltr");
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://tomer-naydnov.com/${locale}${path}`);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), path).toBeTruthy();
      }
    }
    expect(errors).toEqual([]);
  });

  test(`${locale}: mobile menu supports keyboard, navigation and scroll recovery`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${locale}`);
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
    await dialog.locator(`a[href="/${locale}/work"]`).click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/work$`));
    await expect(page.getByRole("dialog")).toHaveCount(0);
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
  });
}

test("folding responds to keyboard and exposes its complete explanation", async ({ page }) => {
  await page.goto("/en");
  const unfold = page.getByRole("button", { name: "Unfold the thinking" });
  await expect(page.locator("canvas")).toBeVisible();
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await unfold.focus();
  await page.keyboard.press("Enter");
  const fold = page.getByRole("button", { name: "Fold it back" });
  await expect(fold).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("status")).toContainText("unfolded");
  for (const label of ["Reusable lessons", "Classroom work", "Feedback & revision"]) {
    await expect(page.getByText(label, { exact: true })).toBeVisible();
  }
  await fold.click();
  await expect(page.getByRole("button", { name: "Unfold the thinking" })).toHaveAttribute("aria-pressed", "false");
});

test("reduced-motion readers can use the complete page and fold control", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await page.getByRole("button", { name: "Unfold the thinking" }).click();
  await expect(page.getByRole("button", { name: "Fold it back" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("link", { name: "Explore my work", exact: true }).click();
  await expect(page.locator("#selected-title")).toBeInViewport();
});

test("a lost WebGL context leaves the artwork and controls usable", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.locator("canvas").evaluate((canvas: HTMLCanvasElement) => {
    canvas.getContext("webgl2")?.getExtension("WEBGL_lose_context")?.loseContext();
  });
  await expect(page.locator('[data-hidden="false"]')).toBeVisible();
  await page.getByRole("button", { name: "Unfold the thinking" }).click();
  await expect(page.getByRole("button", { name: "Fold it back" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("link", { name: "Explore my work", exact: true })).toBeVisible();
});

test("email copying provides confirmation and preserves the direct email link", async ({ context, page }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/en/contact");
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("tnaydnov@gmail.com");
  await expect(page.locator('main a[href="mailto:tnaydnov@gmail.com"]').first()).toBeVisible();
});

test("essential content and project links work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/en");
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator('a[href="/en/work/arc"]').first()).toBeVisible();
  await page.locator('a[href="/en/work/arc"]').first().click();
  await expect(page.locator("main h1")).toHaveText("Arc");
  await context.close();
});

test("language switching preserves the project, query and fragment", async ({ page }) => {
  await page.goto("/en/work/arc?from=portfolio#snapshot");
  const hebrew = page.locator('header a[hreflang="he"]:visible').first();
  await expect(hebrew).toHaveAttribute("href", "/he/work/arc?from=portfolio#snapshot");
  await hebrew.click();
  await expect(page).toHaveURL(/\/he\/work\/arc\?from=portfolio#snapshot$/);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
});

test("case disclosures expose the original technical detail", async ({ page }) => {
  await page.goto("/en/work/arc");
  const chapter = page.locator("#story details").first();
  await chapter.locator("summary").click();
  await expect(chapter).toHaveAttribute("open", "");
  await expect(chapter.locator("p").first()).toBeVisible();
  const architecture = page.locator("#deep-dive details").filter({ hasText: "System & architecture" }).first();
  await architecture.locator("summary").click();
  await expect(architecture).toHaveAttribute("open", "");
  await expect(architecture.getByText("Technology", { exact: true })).toBeVisible();

  await page.goto("/en/work/applytide");
  const constraints = page.locator("#deep-dive details").filter({ has: page.locator("summary", { hasText: "Constraint study" }) });
  await constraints.locator("summary").focus();
  await page.keyboard.press("Enter");
  const time = constraints.getByRole("slider", { name: "Time", exact: true });
  await expect(time).toHaveValue("1");
  await time.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(time).toHaveValue("0");
  await expect(constraints).toContainText("JSON-LD with an LLM fallback.");
  const reset = constraints.getByRole("button", { name: "Back to the actual decision" });
  await reset.focus();
  await page.keyboard.press("Enter");
  await expect(time).toBeFocused();
  await expect(time).toHaveValue("1");
  await expect(constraints.getByRole("slider", { name: "Scope", exact: true })).toHaveValue("1");
  await expect(constraints.getByText("What I actually built", { exact: true })).toBeVisible();
});

test("CV, social image, icon, legacy redirect and not-found route respond", async ({ request, page }) => {
  const cv = await request.get("/Tomer%20Naydnov.pdf");
  expect(cv.status()).toBe(200);
  expect(cv.headers()["content-type"]).toContain("application/pdf");
  const icon = await request.get("/icon.svg");
  expect(icon.status()).toBe(200);
  const legacy = await request.get("/en/system", { maxRedirects: 0 });
  expect(legacy.status()).toBe(308);
  expect(legacy.headers().location).toBe("/en/about");
  await page.goto("/en");
  const imageUrl = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(imageUrl).toBeTruthy();
  const localImage = new URL(imageUrl!);
  const image = await request.get(`${localImage.pathname}${localImage.search}`);
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  const missing = await page.goto("/en/work/does-not-exist");
  expect(missing?.status()).toBe(404);
  await expect(page.locator("main h1")).toBeVisible();
});
