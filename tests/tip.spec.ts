import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("tip 0001", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/tips/0001");
  });

  test("shows its eyebrow, title, category and footer", async ({ page }) => {
    const tip = page.getByRole("article");

    await expect(page).toHaveTitle(
      "Drop the AAA comments, keep the AAA structure.",
    );

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

    await expect(tip.locator("footer")).toContainText(
      "codealacarte.dev/t/0001",
    );
  });

  test("links Report an error to the erratum form for this page", async ({
    page,
  }) => {
    const link = page.getByRole("link", { name: "Report an error" });
    await expect(link).toBeVisible();
    const url = new URL((await link.getAttribute("href"))!);

    expect(url.searchParams.get("template")).toBe("erratum.yml");
    expect(url.searchParams.get("page")).toBe("codealacarte.dev/t/0001");
  });

  test("has no accessibility violations", async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
