// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://codealacarte.dev",
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Fira Code",
      cssVariable: "--font-code",
      weights: [400],
      styles: ["normal"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Atkinson Hyperlegible Next",
      cssVariable: "--font-text",
      weights: [400, 700],
      styles: ["normal", "italic"],
    },
  ],
  markdown: { shikiConfig: { theme: "css-variables" } },
  integrations: [mdx(), sitemap()],
});
