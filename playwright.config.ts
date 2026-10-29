import { defineConfig, devices } from "@playwright/test";

export const port = 4322;
export const baseUrl = `http://localhost:${port}`;
export const webServer = {
  command: `npm run serve -- --port ${port}`,
  url: baseUrl,
  reuseExistingServer: false,
};

export default defineConfig({
  testDir: "tests",
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: baseUrl,
    trace: "retain-on-failure",
  },
  webServer,
  forbidOnly: !!process.env.CI,
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
