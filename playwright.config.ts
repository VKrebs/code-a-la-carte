import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:4322",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run build && npm run preview -- --port 4322",
    url: "http://localhost:4322",
    reuseExistingServer: false,
  },
  forbidOnly: !!process.env.CI,
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
