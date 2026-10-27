import { defineConfig, devices } from "@playwright/test";
import { baseUrl, webServer } from "./playwright.config";

export default defineConfig({
  testDir: "export",
  reporter: [["list"]],
  use: {
    baseURL: baseUrl,
    trace: "retain-on-failure",
  },
  webServer: webServer,
  forbidOnly: !!process.env.CI,
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1080, height: 1080 },
        deviceScaleFactor: 1,
      },
    },
  ],
});
