import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

test.describe("Card PNG export", () => {
  const tipsNumbers = fs
    .globSync("*/card/index.html", { cwd: "dist/en/tips" })
    .map((file) => file.split(path.sep, 1)[0])
    .sort();

  for (const number of tipsNumbers) {
    test(`Card ${number}`, async ({ page }) => {
      const response = await page.goto(`/en/tips/${number}/card/`);
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `dist/en/tips/${number}/card.png` });
    });
  }
});
