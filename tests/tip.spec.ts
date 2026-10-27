import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("tip 0001", () => {
  test.beforeEach(async ({ page }) => {
    const response = await page.goto("/en/tips/0001");
    expect(response?.status()).toBe(200);
  });

  test("shows its eyebrow, title, category and footer", async ({ page }) => {
    const tip = page.getByRole("article");

    await expect(page).toHaveTitle(
      "Drop the AAA comments, keep the AAA structure. · Code à la Carte",
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

  test("offers its Card as a 1080×1080 PNG download", async ({
    page,
    request,
  }) => {
    const link = page.getByRole("link", { name: "Download as an image (PNG)" });
    await expect(link).toHaveAttribute("href", "/en/tips/0001/card.png");
    await expect(link).toHaveAttribute(
      "download",
      "code-a-la-carte-tip-0001.png",
    );

    const response = await request.get("/en/tips/0001/card.png");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("image/png");

    // A PNG stores its width and height as the first two fields of its
    // header chunk, at bytes 16 and 20.
    const png = await response.body();
    expect({
      width: png.readUInt32BE(16),
      height: png.readUInt32BE(20),
    }).toEqual({ width: 1080, height: 1080 });
  });

  test("has no accessibility violations", async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
