import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const categories = [
  "Craft",
  "Tooling",
  "Testing",
  "Design",
  "Collaboration",
  "Platform",
  "Architecture",
] as const;

export type Category = (typeof categories)[number];

const tips = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/tips" }),
  schema: z.object({
    number: z.number().int().positive(),
    topic: z.string(),
    category: z.enum(categories),
    takeaway: z.string(),
    altText: z.string(),
  }),
});

export const collections = { tips };
