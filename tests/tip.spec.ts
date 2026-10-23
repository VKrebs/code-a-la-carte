import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("tip 001", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/tips/001");
  });

  test("shows its eyebrow, title, category and footer", async ({ page }) => {
    const tip = page.getByRole("article");

    await expect(
      tip.getByRole("heading", {
        level: 1,
        name: "Drop the AAA comments, keep the AAA structure.",
      }),
    ).toBeVisible();

    await expect(
      tip.getByText("Arrange, Act, Assert", { exact: true }),
    ).toBeVisible();

    await expect(tip.getByText("Testing", { exact: true })).toBeVisible();

    await expect(page.getByRole("contentinfo")).toContainText(
      "codealacarte.dev/t/001",
    );
  });

  test("has no accessibility violations", async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
