import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"], launchOptions: { args: ["--enable-unsafe-swiftshader"] } } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: {
    command: process.env.PLAYWRIGHT_SERVER_COMMAND ?? "npm run dev -- --hostname 127.0.0.1",
    url: "http://127.0.0.1:3000/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
