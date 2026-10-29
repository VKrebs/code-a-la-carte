import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("legal page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/legal/");
  });

  test("has the legal notice, licences, credits and privacy sections", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { level: 2, name: "Legal notice" }),
    ).toHaveAttribute("id", "legal-notice");

    await expect(
      page.getByRole("heading", { level: 2, name: "Licences" }),
    ).toHaveAttribute("id", "licences");

    await expect(
      page.getByRole("heading", { level: 2, name: "Credits" }),
    ).toHaveAttribute("id", "credits");

    await expect(
      page.getByRole("heading", { level: 2, name: "Privacy" }),
    ).toHaveAttribute("id", "privacy");
  });

  test("has no accessibility violations", async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
