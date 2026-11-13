import type { Site, SocialObjects } from "./types";

const netlifyValidationBranch = "codex/sveltia-publish-validation";
const env = typeof process !== "undefined" ? process.env : undefined;

const cloudflarePreviewURL =
  env?.CF_PAGES_BRANCH === "codex/Works_Web-setup"
    ? env.CF_PAGES_URL
    : undefined;
const netlifyPreviewURL =
  env?.CONTEXT === "branch-deploy" && env.BRANCH === netlifyValidationBranch
    ? env.DEPLOY_PRIME_URL
    : undefined;

export const SITE: Site = {
  website:
    cloudflarePreviewURL ||
    netlifyPreviewURL ||
    "https://astro-paper.pages.dev/",
  author: "米",
  desc: "從商業趨勢到企業營運。分享我對 AI 產業、商業模式與企業經營的觀察與判斷。",
  title: "LordMi Works",
  postPerPage: 3,
};

export const LOCALE = {
  lang: "zh-Hant",
  langTag: "zh-TW",
  timeZone: "Asia/Taipei",
} as const;

// Add the verified public profile URLs and enable the corresponding channel.
export const SOCIALS: SocialObjects = [
  { name: "Facebook", href: "", active: false, linkTitle: "米的 Facebook" },
  { name: "LinkedIn", href: "", active: false, linkTitle: "米的 LinkedIn" },
];
