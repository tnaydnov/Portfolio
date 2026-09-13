import { expect, test } from "@playwright/test";
import { arcPortals } from "../src/content/arc-explorer";
import { arcExplorerHref } from "../src/content/arc-explorer/types";
import { getArcMedia } from "../src/content/arc-explorer/media";
import { studentTaskTypes } from "../src/content/arc-explorer/student";

const routes = new Set(
  arcPortals.flatMap((portal) =>
    portal.pages.map((page) => arcExplorerHref(portal.id, page.id)),
  ),
);

test("Arc's catalogue has unique, source-grounded destinations and intact evidence", async ({
  request,
}) => {
  const media = getArcMedia();
  const screens = new Set(media.screens.map((screen) => screen.id));
  const films = new Set(media.films.map((film) => film.id));
  expect(routes.size).toBe(
    arcPortals.reduce((total, portal) => total + portal.pages.length, 0),
  );
  expect(studentTaskTypes).toHaveLength(21);
  for (const portal of arcPortals) {
    expect(portal.pages.some((page) => page.id === portal.initialPage)).toBe(
      true,
    );
    for (const page of portal.pages) {
      expect(page.features.length, page.id).toBeGreaterThan(1);
      expect(page.sourcePaths.length, page.id).toBeGreaterThan(0);
      if (page.parentId)
        expect(
          portal.pages.some((parent) => parent.id === page.parentId),
          page.id,
        ).toBe(true);
      for (const id of page.screenIds)
        expect(screens.has(id), `${portal.id}/${page.id}: ${id}`).toBe(true);
      for (const id of page.filmIds)
        expect(films.has(id), `${portal.id}/${page.id}: ${id}`).toBe(true);
    }
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const route of routes) expect(sitemap).toContain(`${route}</loc>`);
  for (const route of [
    "/work/arc/explore/admin/not-a-view",
    "/work/arc/explore/unknown/overview",
  ]) {
    expect((await request.get(route)).status(), route).toBe(404);
  }
});

for (const portal of arcPortals) {
  for (const width of [320, 1440]) {
    test(`${portal.id} at ${width}px: every destination renders and every internal link resolves`, async ({
      context,
      browserName,
    }) => {
      test.setTimeout(300_000);
      // Chromium covers the entire catalogue. WebKit covers every main section and
      // representative detail pages; the remaining static data is shared.
      const pages =
        browserName === "webkit"
          ? portal.pages.filter(
              (item) => !item.parentId || item.id.includes("programming"),
            )
          : portal.pages;
      for (const destination of pages) {
        // Isolate direct-route audits. Rapid full navigations in one WebKit
        // document can report canceled prefetches from the previous document.
        const page = await context.newPage();
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        try {
          const response = await page.goto(
            arcExplorerHref(portal.id, destination.id),
          );
          expect(response?.status(), destination.id).toBe(200);
          await expect(page.getByRole("heading", { level: 1 })).toHaveText(
            destination.title,
          );
          await expect(page.getByTestId("arc-explorer")).toHaveAttribute(
            "data-portal",
            portal.id,
          );
          await expect(
            page
              .getByText("Read-only portfolio demo", { exact: false })
              .first(),
          ).toBeVisible();
          await expect
            .poll(
              () =>
                page.evaluate(
                  () => document.documentElement.scrollWidth <= innerWidth + 1,
                ),
              { message: `${destination.id} fits ${width}px` },
            )
            .toBe(true);
          for (const href of await page
            .locator('a[href^="/work/arc/explore/"]')
            .evaluateAll((links) =>
              links.map((link) => link.getAttribute("href")!.split("#")[0]),
            )) {
            expect(routes.has(href), `${destination.id} links to ${href}`).toBe(
              true,
            );
          }
          const body = page.locator(
            '[data-testid="arc-explorer"] [class*="demoContent"]',
          );
          expect(
            (await body.innerText()).trim().length,
            destination.id,
          ).toBeGreaterThan(150);
          expect(errors, destination.id).toEqual([]);
        } finally {
          await page.close();
        }
      }
    });
  }
}

test("Portal entries, phone navigation, search and history form one usable journey", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/work/arc");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Arc");
  const quickEntries = page.getByRole("navigation", {
    name: "Open an Arc portal",
  });
  await expect(quickEntries.getByRole("link")).toHaveCount(3);
  const quickBox = await quickEntries.boundingBox();
  expect(quickBox!.y + quickBox!.height).toBeLessThan(844);
  const entry = page.locator(
    '#portals a[href="/work/arc/explore/admin/overview"]',
  );
  await entry.click();
  const menu = page
    .locator("details")
    .filter({
      has: page.locator(
        'nav[aria-label="Administration portal sections on mobile"]',
      ),
    });
  await menu.locator("summary").click();
  await menu
    .getByRole("link", { name: "Learning friction", exact: false })
    .click();
  await expect(page).toHaveURL(/analytics\/learning-friction$/);
  await expect(menu).not.toHaveAttribute("open");
  const search = page.getByRole("searchbox");
  await search.fill("questionnaire");
  await expect(page.locator("#arc-search-results")).toBeVisible();
  await page
    .locator("#arc-search-results")
    .getByRole("link", { name: /Response analysis/ })
    .click();
  await expect(page).toHaveURL(/questionnaires\/results$/);
  await expect(search).toHaveValue("");
  await page.goBack();
  await expect(page).toHaveURL(/analytics\/learning-friction$/);
  await search.fill("no-such-capability-zz");
  await expect(page.getByRole("status")).toContainText("No matches");
  await search.press("Escape");
  await expect(page.locator("#arc-search-results")).toHaveCount(0);
  await search.fill("classroom");
  await page.locator("#arc-search-results a").first().focus();
  await page.keyboard.press("Escape");
  await expect(page.locator("#arc-search-results")).toHaveCount(0);
  await expect(search).toBeFocused();
  await page
    .getByRole("navigation", { name: "Choose an Arc portal" })
    .getByRole("link", { name: "Student", exact: false })
    .click();
  await expect(page).toHaveURL(/student\/overview$/);
});

test("Collapsing original-app evidence pauses its video", async ({ page }) => {
  await page.goto("/work/arc/explore/admin/builder");
  const disclosure = page
    .locator("details")
    .filter({
      has: page
        .locator("summary")
        .filter({ hasText: "Watch this workflow in Arc" }),
    });
  await disclosure.locator(":scope > summary").click();
  await disclosure.getByRole("button", { name: /^Play:/ }).click();
  const video = disclosure.locator("video");
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThan(0.1);
  await disclosure.locator(":scope > summary").click();
  await expect(video).toHaveJSProperty("paused", true);
});

test("Five student worlds persist across pages and reloads", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/work/arc/explore/student/overview");
  const shell = page.getByTestId("arc-explorer");
  for (const [name, id] of [
    ["Space", "space"],
    ["Magic Forest", "magic-forest"],
    ["Neon Hacker", "neon-hacker"],
    ["Aurora", "aurora"],
    ["Aurora Light", "aurora-light"],
  ]) {
    const button = page.getByRole("button", { name, exact: true });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(shell).toHaveAttribute("data-theme", id);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  }
  await page.goto("/work/arc/explore/student/tasks/programming");
  await expect(shell).toHaveAttribute("data-theme", "aurora-light");
  await page.reload();
  await expect(shell).toHaveAttribute("data-theme", "aurora-light");
});

test("The Arc catalogue remains navigable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/work/arc");
  await page
    .locator('#portals a[href="/work/arc/explore/instructor/overview"]')
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    arcPortals.find((portal) => portal.id === "instructor")!.pages[0].title,
  );
  const menu = page
    .locator("details")
    .filter({
      has: page.locator(
        'nav[aria-label="Instructor portal sections on mobile"]',
      ),
    });
  await menu.locator("summary").click();
  await menu.getByRole("link", { name: "Review queue", exact: false }).click();
  await expect(page).toHaveURL(/instructor\/reviews$/);
  await context.close();
});
