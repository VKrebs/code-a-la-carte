import { test, expect } from "@playwright/test";

test.describe("security.txt", () => {
  test("is served as plain text with a contact and an expiry", async ({
    request,
  }) => {
    const response = await request.get("/.well-known/security.txt");

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/^text\/plain/);

    const text = await response.text();

    expect(text).toContain("Contact:");
    expect(text).toContain("Expires:");
  });
});
