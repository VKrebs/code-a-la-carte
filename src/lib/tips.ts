import { getCollection } from "astro:content";

export async function getPublishedTips() {
  return getCollection("tips", (tip) => tip.id.startsWith("en/"));
}
