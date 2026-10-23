import { test, expect } from "@playwright/test";

test("tip 001 shows its eyebrow, title and category", async ({ page }) => {
  await page.goto("/en/tips/001");

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
});
