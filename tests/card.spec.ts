import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("tip 0001 card", () => {
  test.beforeEach(async ({ page }) => {
    const response = await page.goto("/en/tips/0001/card/");
    expect(response?.status()).toBe(200);
  });

  test("asks search engines not to index it", async ({ page }) => {
    const meta = page.locator('meta[name="robots"]');
    await expect(meta).toHaveAttribute("content", "noindex");
  });

  test("names the tip page as its canonical URL", async ({ page }) => {
    const link = page.locator('link[rel="canonical"]');
    await expect(link).toHaveAttribute(
      "href",
      "https://codealacarte.dev/en/tips/0001/",
    );
  });

  test("has no accessibility violations", async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
