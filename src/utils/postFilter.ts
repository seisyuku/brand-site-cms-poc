import type { CollectionEntry } from "astro:content";

// Use one cutoff for all routes in a static build.
const buildTime = Date.now();

const postFilter = ({ data }: CollectionEntry<"blog">) =>
  !data.draft && data.pubDatetime.getTime() <= buildTime;

export default postFilter;
