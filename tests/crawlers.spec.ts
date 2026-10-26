import { test, expect } from "@playwright/test";

test.describe("crawlers", () => {
  test("robots.txt allows search and AI answers, not training", async ({
    request,
  }) => {
    const response = await request.get("/robots.txt");

    expect(response.status()).toBe(200);

    const text = await response.text();

    expect(text).toContain(
      "Content-Signal: ai-train=no, search=yes, ai-input=yes",
    );
    expect(text).toContain(
      "Sitemap: https://codealacarte.dev/sitemap-index.xml",
    );
  });

  test("sitemap lists published pages only", async ({ request }) => {
    const indexResponse = await request.get("/sitemap-index.xml");

    expect(indexResponse.status()).toBe(200);

    const indexText = await indexResponse.text();
    const matches = indexText.match(/<loc>(.*?)<\/loc>/);

    expect(matches).not.toBeNull();

    const loc = matches![1];
    const sitemapPath = new URL(loc).pathname;

    const sitemapResponse = await request.get(sitemapPath);

    expect(sitemapResponse.status()).toBe(200);

    const sitemapText = await sitemapResponse.text();

    expect(sitemapText).toContain("https://codealacarte.dev/en/tips/001/");
    expect(sitemapText).not.toContain("/404");
  });
});
