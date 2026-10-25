import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("permalink", () => {
  test("leads to the tip", async ({ page }) => {
    await page.goto("/t/001");
    const tip = page.getByRole("article");

    await expect(page).toHaveURL("/en/tips/001/");

    await expect(
      tip.getByRole("heading", {
        level: 1,
        name: "Drop the AAA comments, keep the AAA structure.",
      }),
    ).toBeVisible();
  });

  test("redirects temporarily (302)", async ({ request }) => {
    const response = await request.get("/t/001", { maxRedirects: 0 });

    expect(response.status()).toBe(302);
    expect(response.headers()["location"]).toBe("/en/tips/001");
  });

  test("with trailing slash redirects temporarily (302)", async ({
    request,
  }) => {
    const response = await request.get("/t/001/", { maxRedirects: 0 });

    expect(response.status()).toBe(302);
    expect(response.headers()["location"]).toBe("/en/tips/001");
  });

  test("shows 404 page when unknown", async ({ page }) => {
    const response = await page.goto("/t/000");

    expect(response?.status()).toBe(404);

    const link = page.getByRole("link", { name: "Back to the home page" });
    await expect(link).toHaveAttribute("href", "/");
  });

  test("has no accessibility violations on page 404", async ({ page }) => {
    await page.goto("/t/000");

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
