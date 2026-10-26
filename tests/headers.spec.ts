import { test, expect } from "@playwright/test";

test.describe("headers", () => {
  test("a tip page sends the security headers", async ({ request }) => {
    const response = await request.get("/en/tips/001/");

    expect(response.status()).toBe(200);

    const headers = response.headers();

    expect(headers["content-security-policy-report-only"]).toBe(
      "default-src 'self'; frame-ancestors 'none'; style-src 'self' 'unsafe-inline'",
    );
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"]).toBe(
      "camera=(), microphone=(), geolocation=(), document-domain=()",
    );
  });

  test("a tip page is not cached for good", async ({ request }) => {
    const response = await request.get("/en/tips/001/");

    expect(response.headers()["cache-control"] ?? "").not.toContain(
      "immutable",
    );
  });

  test("an astro asset is cached for a year", async ({ request }) => {
    const page = await request.get("/en/tips/001/");
    const html = await page.text();
    const matches = html.match(/\/_astro\/[^"')\s]+/);

    expect(matches).not.toBeNull();

    const response = await request.get(matches![0]);

    expect(response.status()).toBe(200);
    expect(response.headers()["cache-control"]).toBe(
      "public, max-age=31536000, immutable",
    );
  });
});
