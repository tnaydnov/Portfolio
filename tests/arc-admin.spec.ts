import { expect, test } from "@playwright/test";

test("A school filter updates the fictional cohort and classroom drilldown", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const mutations: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD", "OPTIONS"].includes(request.method()))
      mutations.push(request.url());
  });
  await page.goto("/work/arc/explore/admin/classrooms");
  const school = page.getByRole("combobox", { name: "School", exact: true });
  await school.selectOption("Cedar School");
  const table = page.getByRole("table", {
    name: "Classroom submission example for one activity",
  });
  await expect(table.locator("tbody tr")).toHaveCount(1);
  await expect(table).toContainText("Idea Lab");
  await expect(table).not.toContainText("Python Lab");
  await expect(
    page
      .getByText("Learners in view", { exact: true })
      .locator("..")
      .locator("dd"),
  ).toHaveText("20");
  await school.selectOption("Northstar School");
  await expect(table.locator("tbody tr")).toHaveCount(2);
  await expect(
    page
      .getByText("Learners in view", { exact: true })
      .locator("..")
      .locator("dd"),
  ).toHaveText("46");
  const search = page.getByRole("searchbox", {
    name: "Find a classroom",
    exact: true,
  });
  await search.fill("Maya");
  await expect(table.locator("tbody tr")).toHaveCount(1);
  await expect(
    page
      .getByText("Learners in view", { exact: true })
      .locator("..")
      .locator("dd"),
  ).toHaveText("24");
  await table.getByRole("link", { name: /Python Lab/ }).click();
  await expect(page).toHaveURL(/classrooms\/python-lab$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Inside a classroom.",
  );
  const content = page.locator(
    '[data-testid="arc-explorer"] [class*="demoContent"]',
  );
  await expect(content).toContainText("Python Lab");
  await expect(content).toContainText("Maya Reed");
  await expect(
    content.getByRole("table", { name: "Example learner records" }),
  ).not.toContainText("Alex Kim");
  expect(mutations).toEqual([]);
});

test("Scoped grading recomputes coverage and friction lenses expose their different meanings", async ({
  page,
}) => {
  await page.goto("/work/arc/explore/admin/reports/grading");
  const scope = page.getByRole("combobox", {
    name: "Classroom scope",
    exact: true,
  });
  await scope.selectOption("Python Lab");
  await expect(
    page
      .getByText("Learners submitted", { exact: true })
      .locator("..")
      .locator("dd"),
  ).toHaveText("18");
  await expect(
    page
      .getByText("Learners reviewed", { exact: true })
      .locator("..")
      .locator("dd"),
  ).toHaveText("14");
  await expect(
    page
      .getByText("Awaiting review", { exact: true })
      .locator("..")
      .locator("dd"),
  ).toHaveText("4");
  await expect(
    page
      .getByText("Review coverage", { exact: true })
      .locator("..")
      .locator("dd"),
  ).toHaveText("78%");
  const priority = page
    .locator("section")
    .filter({
      has: page.getByRole("heading", {
        name: "Review priority examples",
        exact: true,
      }),
    });
  await expect(priority).toContainText("Jordan Lee");
  await expect(priority).not.toContainText("Riley Brooks");
  await scope.selectOption("Web Studio");
  await expect(
    page
      .getByText("Review coverage", { exact: true })
      .locator("..")
      .locator("dd"),
  ).toHaveText("75%");
  await expect(priority).toContainText("Riley Brooks");
  await expect(priority).not.toContainText("Jordan Lee");
  await page.goto("/work/arc/explore/admin/analytics/learning-friction");
  const lenses = page.getByRole("navigation", {
    name: "Learning friction lens",
  });
  await expect(lenses.getByRole("button")).toHaveCount(9);
  await lenses.getByRole("button", { name: /No-show runs/ }).click();
  await expect(
    page.getByRole("heading", { name: "No-show runs", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Check whether the lesson actually took place.", {
      exact: true,
    }),
  ).toBeVisible();
  await lenses.getByRole("button", { name: /Repeated retries/ }).click();
  await expect(
    page.getByRole("heading", { name: "Repeated retries", exact: true }),
  ).toBeVisible();
  await expect(lenses.getByRole("button", { pressed: true })).toHaveCount(1);
  await expect(
    lenses.getByRole("button", { name: /Repeated retries/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByText(
      "Review the attempt history before interpreting the signal.",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(
    page.getByText("The bars are an illustrative visual", { exact: false }),
  ).toBeVisible();
});
