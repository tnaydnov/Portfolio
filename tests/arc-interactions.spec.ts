import { expect, test, type Page } from "@playwright/test";

const studentRoot = "/work/arc/explore/student/";

function watchMutatingRequests(page: Page, baseURL: string | undefined) {
  const origin = new URL(baseURL ?? "http://127.0.0.1:3000").origin;
  const mutations: string[] = [];
  page.on("request", (request) => {
    if (
      new URL(request.url()).origin === origin &&
      !["GET", "HEAD", "OPTIONS"].includes(request.method())
    ) {
      mutations.push(`${request.method()} ${new URL(request.url()).pathname}`);
    }
  });
  return mutations;
}

test("A visitor can filter the library, then find a specific activity", async ({
  page,
  baseURL,
}) => {
  const mutations = watchMutatingRequests(page, baseURL);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${studentRoot}tasks`);
  const body = page.locator("[data-student-explorer]");
  await body.getByRole("button", { name: "Code & solve", exact: true }).click();
  await expect(
    body.getByRole("link", { name: /Programming studio/ }),
  ).toBeVisible();
  await expect(
    body.getByRole("link", { name: /External activity/ }),
  ).toHaveCount(0);
  await body
    .getByRole("button", { name: "All activities", exact: true })
    .click();

  const search = body.getByRole("searchbox", { name: "Find an activity" });
  await search.fill("flowchart");
  await expect(body.getByRole("status")).toHaveText("1 activity");
  const result = body.getByRole("link", { name: /Flowchart builder/ });
  await expect(result).toBeVisible();
  await search.fill("no-such-activity-zz");
  await expect(body.getByRole("status")).toHaveText("0 activities");
  await expect(
    body.getByText("No activities match.", { exact: false }),
  ).toBeVisible();
  await search.fill("flowchart");
  await result.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/student\/tasks\/flowchart$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Flowchart builder",
  );
  await expect(
    body.getByRole("link", { name: /All 21 activities/ }),
  ).toHaveAttribute("href", `${studentRoot}tasks`);
  expect(mutations).toEqual([]);
});

test("Programming formats and lesson files remain inspectable without execution", async ({
  page,
  baseURL,
}) => {
  const mutations = watchMutatingRequests(page, baseURL);
  await page.goto(`${studentRoot}tasks/programming`);
  const body = page.locator("[data-student-explorer]");
  const source = body.locator('pre[aria-label="Example source code"]');
  await expect(source).toContainText("block = min(minutes, 25)");
  await body
    .getByRole("button", { name: "Fill the blanks", exact: true })
    .click();
  await expect(source).toContainText("# Filled example");
  await expect(source).toContainText("if minutes <= 0:");
  await body.getByRole("button", { name: "Free code", exact: true }).click();
  await expect(source).toContainText("def study_plan(minutes):");
  await expect(
    body.getByText("A prepared example, not an execution.", { exact: true }),
  ).toBeVisible();
  await expect(
    body.getByRole("button", { name: /^(Run|Submit|Save|Reset)$/i }),
  ).toHaveCount(0);

  await page.goto(`${studentRoot}sandbox`);
  await body.getByRole("button", { name: /notes\.md/ }).click();
  await expect(source).toContainText("60 minutes becomes [25, 25, 10].");
  await body
    .getByRole("button", { name: "Lesson materials", exact: true })
    .click();
  await expect(
    body.getByRole("heading", { name: "Make a plan that fits.", exact: true }),
  ).toBeVisible();
  await body.getByRole("button", { name: "Workspace", exact: true }).click();
  await body.getByRole("button", { name: /study_planner\.py/ }).click();
  await expect(source).toContainText("block = min(minutes, 25)");
  expect(mutations).toEqual([]);
});

test("The learner revision and instructor review preserve the same work and publication boundary", async ({
  page,
  baseURL,
}) => {
  const mutations = watchMutatingRequests(page, baseURL);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${studentRoot}feedback`);
  const body = page.locator("[data-student-explorer]");
  const studentCode = body.locator("pre");
  await expect(studentCode).toContainText("block = min(minutes, 25)");
  await expect(
    body.getByText("The published feedback above belongs to version 1.", {
      exact: true,
    }),
  ).toBeVisible();
  await body.getByRole("button", { name: /Version 1/ }).click();
  await expect(studentCode).toContainText("sessions.append(25)");
  await expect(studentCode).not.toContainText("block = min");
  await body.getByRole("button", { name: /Version 2/ }).click();
  const revisedCode = await studentCode.textContent();
  await expect(
    body.getByText("Its text stays private here.", { exact: false }),
  ).toBeVisible();

  await body.getByRole("link", { name: /See Maya.s review view/ }).click();
  await expect(page).toHaveURL(/instructor\/reviews\/submission$/);
  const instructorCode = page.getByRole("region", {
    name: "Jordan's fictional version 2 Python source",
    exact: true,
  });
  await expect(instructorCode).toHaveText(revisedCode!);
  await expect(
    page.getByText("Version 2 has not been reviewed in this example.", {
      exact: false,
    }),
  ).toBeVisible();
  const versions = page.getByRole("group", {
    name: "Inspect submission version",
    exact: true,
  });
  await versions
    .getByRole("button", { name: "Version 1", exact: true })
    .click();
  await expect(
    page.getByRole("region", {
      name: "Jordan's fictional version 1 Python source",
      exact: true,
    }),
  ).toContainText("sessions.append(25)");
  await versions
    .getByRole("button", { name: "Version 2 · latest", exact: true })
    .click();
  await expect(instructorCode).toHaveText(revisedCode!);
  expect(mutations).toEqual([]);
});

for (const width of [320, 390]) {
  test(`${width}px: the full flowchart and its node explanations fit the phone`, async ({
    page,
    baseURL,
  }) => {
    const mutations = watchMutatingRequests(page, baseURL);
    await page.setViewportSize({ width, height: 844 });
    await page.goto(`${studentRoot}tasks/flowchart`);
    const body = page.locator("[data-student-explorer]");
    const diagram = body.getByRole("img", {
      name: "Read a sensor, check for a missing reading, then explain the missing value or use the reading.",
      exact: true,
    });
    await expect(diagram).toBeVisible();
    // This catches the former desktop graph crop: all four nodes and their text
    // must be inside the visible SVG, not merely inside a scrollable page.
    const fit = await diagram.evaluate((element) => {
      const frame = element.getBoundingClientRect();
      const nodes = [...element.querySelectorAll("g > rect, g > path, text")];
      return (
        frame.left >= 0 &&
        frame.right <= innerWidth + 1 &&
        nodes.every((node) => {
          const rect = node.getBoundingClientRect();
          return (
            rect.left >= frame.left - 1 &&
            rect.right <= frame.right + 1 &&
            rect.top >= frame.top - 1 &&
            rect.bottom <= frame.bottom + 1
          );
        })
      );
    });
    expect(fit).toBe(true);
    const start = body.getByRole("button", {
      name: "Read sensor",
      exact: true,
    });
    await start.focus();
    await page.keyboard.press("Enter");
    await expect(start).toHaveAttribute("aria-pressed", "true");
    await expect(
      body.getByText(
        "A clear starting point gives the rest of the process context.",
        { exact: true },
      ),
    ).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      )
      .toBe(true);
    expect(mutations).toEqual([]);
  });
}
