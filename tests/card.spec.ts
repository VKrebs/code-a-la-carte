import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("tip 0001 card", () => {
  test.use({ viewport: { width: 1080, height: 1080 } });

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

  test("fits its content inside the margins", async ({ page }) => {
    await page.evaluate(() => document.fonts.ready);

    const legalLine = await page.getByRole("contentinfo").boundingBox();
    const bodyWidth = await page
      .locator("body")
      .evaluate((el) => el.scrollWidth);

    expect(legalLine!.y + legalLine!.height).toBeLessThanOrEqual(1080 - 64);
    expect(bodyWidth).toBe(1080);
  });

  test("shows every code line without scrolling", async ({ page }) => {
    await page.evaluate(() => document.fonts.ready);

    const scrollingPanels = await page.locator("pre").evaluateAll((panels) =>
      panels
        .filter(
          (panel) =>
            panel.scrollWidth > panel.clientWidth ||
            panel.scrollHeight > panel.clientHeight,
        )
        .map((panel) => ({
          panel: panel.closest("figure")?.querySelector("figcaption")
            ?.textContent,
          needed: { width: panel.scrollWidth, height: panel.scrollHeight },
          has: { width: panel.clientWidth, height: panel.clientHeight },
        })),
    );

    expect(scrollingPanels).toEqual([]);
  });

  test("has no accessibility violations", async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
