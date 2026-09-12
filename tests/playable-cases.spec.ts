import { expect, test } from "@playwright/test";

test("Arc preserves the reusable source and released version when feedback creates a draft", async ({ page }) => {
  await page.goto("/en/work/arc");
  const demo = page.getByRole("region", { name: "Arc interactive example" });
  await expect(demo).toContainText("Co-developed · Portal online");
  await expect(demo.getByTestId("arc-release")).toHaveCount(0);
  await expect(demo.getByTestId("arc-source")).toContainText("Source version 1");
  const release = demo.getByRole("button", { name: "Release sample lesson" });
  await release.focus();
  await page.keyboard.press("Enter");
  await expect(demo.getByTestId("arc-release")).toContainText("Released from source version 1");
  await expect(demo.getByTestId("arc-source")).toContainText("Source version 1");
  await demo.getByRole("button", { name: "Add sample feedback" }).click();
  await expect(demo.getByTestId("arc-revision")).toContainText("Version 2 · Draft");
  await expect(demo.getByTestId("arc-revision")).toContainText("Add a worked example before independent practice.");
  await expect(demo.getByTestId("arc-release")).toContainText("Released from source version 1");
  await expect(demo.getByTestId("arc-source")).toContainText("Source version 1");
  await expect(demo.getByRole("status")).toContainText("This class still has its version 1 release.");
  await demo.getByRole("button", { name: "Reset example" }).click();
  await expect(demo.getByTestId("arc-release")).toHaveCount(0);
  await expect(demo.getByTestId("arc-revision")).toHaveCount(0);
  await expect(release).toBeFocused();
});

test("Applytide captures one coherent record and clears its history on reset", async ({ page }) => {
  await page.goto("/en/work/applytide");
  const demo = page.getByRole("region", { name: "Applytide interactive example" });
  await expect(demo).toContainText("Source archived");
  await expect(demo.getByTestId("applytide-record")).toHaveCount(0);
  await demo.getByRole("button", { name: "Capture sample opportunity" }).click();
  const record = demo.getByTestId("applytide-record");
  await expect(record).toHaveCount(1);
  await expect(record).toContainText("Software Engineer");
  await expect(record).toContainText("Sample Studio");
  await expect(record).toContainText("Saved");
  await expect(demo.getByTestId("applytide-posting")).toContainText("Software Engineer");
  await expect(demo.getByTestId("applytide-history")).toContainText("Posting captured into Saved");
  await expect(demo.getByRole("button", { name: "Opportunity captured", exact: true })).toBeDisabled();
  await expect(demo.getByRole("status")).toContainText("Nothing was sent to an employer.");
  await demo.getByRole("button", { name: "Reset example" }).click();
  await expect(record).toHaveCount(0);
  await expect(demo.getByTestId("applytide-history")).toHaveCount(0);
  await expect(demo.getByRole("button", { name: "Capture sample opportunity" })).toBeFocused();
});

test("Eventa keeps the profile and introduction inside the selected fictional event", async ({ page }) => {
  await page.goto("/en/work/eventa");
  const demo = page.getByRole("region", { name: "Eventa interactive example" });
  await expect(demo).toContainText("Discontinued");
  await expect(demo.getByTestId("eventa-profile")).toHaveCount(0);
  await demo.getByRole("button", { name: "Open sample event" }).click();
  await expect(demo.getByRole("list", { name: "Sample guests" }).getByRole("button")).toHaveCount(3);
  await demo.getByRole("button", { name: "View Daniel's profile" }).click();
  await expect(demo.getByTestId("eventa-profile")).toContainText("Daniel");
  await expect(demo.getByTestId("eventa-profile")).toContainText("Sample celebration");
  await demo.getByRole("button", { name: "Preview an introduction" }).click();
  await expect(demo.getByTestId("eventa-introduction")).toContainText("Hi Daniel");
  await expect(demo.getByRole("status")).toContainText("No message or connection request was sent.");
  await demo.getByRole("button", { name: "View Maya's profile" }).click();
  await expect(demo.getByTestId("eventa-profile")).toContainText("Maya");
  await expect(demo.getByTestId("eventa-introduction")).toHaveCount(0);
  await expect(demo.getByRole("button", { name: "Preview an introduction" })).toBeEnabled();
  await demo.getByRole("button", { name: "Reset example" }).click();
  await expect(demo.getByTestId("eventa-profile")).toHaveCount(0);
  await expect(demo.getByRole("button", { name: "Open sample event" })).toBeFocused();
});

test("Hebrew mobile demos retain their complete behavior with reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/he/work/arc");
  let demo = page.getByTestId("playable-case");
  await expect(demo).toHaveAttribute("dir", "rtl");
  await demo.getByRole("button", { name: "שחרור שיעור לדוגמה" }).click();
  await demo.getByRole("button", { name: "הוספת משוב לדוגמה" }).click();
  await expect(demo.getByTestId("arc-revision")).toContainText("גרסה 2 · טיוטה");
  await expect(demo.getByTestId("arc-release")).toContainText("שוחרר מגרסת מקור 1");
  expect(await demo.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBeTruthy();
  await page.goto("/he/work/applytide");
  demo = page.getByTestId("playable-case");
  await demo.getByRole("button", { name: "שמירת הזדמנות לדוגמה" }).click();
  await expect(demo.getByTestId("applytide-record")).toContainText("מהנדס/ת תוכנה");
  expect(await demo.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBeTruthy();
  await page.goto("/he/work/eventa");
  demo = page.getByTestId("playable-case");
  await demo.getByRole("button", { name: "כניסה לאירוע לדוגמה" }).click();
  await demo.getByRole("button", { name: "הפרופיל של מאיה" }).click();
  await demo.getByRole("button", { name: "תצוגה מקדימה להיכרות", exact: true }).click();
  await expect(demo.getByTestId("eventa-introduction")).toContainText("היי מאיה");
  expect(await demo.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBeTruthy();
});

test("leaving a demo discards its fictional state", async ({ page }) => {
  await page.goto("/en/work/applytide");
  const demo = page.getByRole("region", { name: "Applytide interactive example" });
  await demo.getByRole("button", { name: "Capture sample opportunity" }).click();
  await expect(demo.getByTestId("applytide-record")).toHaveCount(1);
  await page.reload();
  await expect(demo.getByTestId("applytide-record")).toHaveCount(0);
  await expect(demo.getByRole("button", { name: "Capture sample opportunity" })).toBeEnabled();
});
