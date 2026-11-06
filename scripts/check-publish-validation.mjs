import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const dist = process.argv[2] ?? "dist";
const publishedSlug = "publish-validation-a";
const hiddenMarkers = [
  /publish-validation-[bc](?:\b|_)/i,
  /PUBLISH_VALIDATION_[BC]_(?:BODY|DESCRIPTION)/,
  /Publish Validation [BC] (?:Draft|Scheduled)/,
  /validation-(?:draft|future)/,
];

async function scan(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const path = join(folder, entry.name);
    assert(!hiddenMarkers.some(marker => marker.test(path)), `Hidden post path: ${path}`);
    if (entry.isDirectory()) {
      await scan(path);
    } else {
      const content = (await readFile(path)).toString("utf8");
      assert(!hiddenMarkers.some(marker => marker.test(content)), `Hidden post content: ${path}`);
    }
  }
}

async function includes(path, expected) {
  const content = await readFile(join(dist, path), "utf8");
  for (const value of expected) {
    assert(content.includes(value), `${path} lacks ${value}`);
  }
}

await scan(dist);
await includes("index.html", [publishedSlug]);
await includes("posts/index.html", ["/posts/2/"]);
const directories = (await readdir(join(dist, "posts"), { withFileTypes: true }))
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name);
const pages = directories.filter(name => /^\d+$/.test(name)).map(Number).sort((a, b) => a - b);
const articleSlugs = directories.filter(name => !/^\d+$/.test(name)).sort();
const listedSlugs = [];
assert(pages.length > 1, "Expected more than one posts page");

for (const [index, page] of pages.entries()) {
  assert.equal(page, index + 1, "Posts pagination has a gap");
  const html = await readFile(join(dist, "posts", String(page), "index.html"), "utf8");
  const slugs = [...html.matchAll(/href="\/posts\/([^/"]+)\/"/g)]
    .map(match => decodeURIComponent(match[1]))
    .filter(slug => !/^\d+$/.test(slug));
  assert(slugs.length > 0, `Posts page ${page} is empty`);
  if (page < pages.length) assert(html.includes(`href="/posts/${page + 1}/"`));
  listedSlugs.push(...slugs);
}

assert.deepEqual(listedSlugs.sort(), articleSlugs, "Posts pagination must list every published route once");
await includes(`posts/${publishedSlug}/index.html`, [
  "PUBLISH_VALIDATION_A_BODY",
  "Synthetic publishing test image",
  "/assets/sveltia-cms-poc.png",
]);
await includes("tags/validation-public/index.html", [publishedSlug]);
await includes("tags/validation-public/1/index.html", [publishedSlug]);
await includes("rss.xml", [`posts/${publishedSlug}/`]);
await includes("sitemap-0.xml", [`posts/${publishedSlug}/`]);
await includes("search/index.html", [publishedSlug]);
for (const slug of ["siri-ai-ios-test", "controlcode", "sveltia-cms-poc"]) {
  await includes(`posts/${slug}/index.html`, [`/posts/${slug}/`]);
}
console.log("T07: public routes, pagination, tags, RSS, sitemap, search and all dist files passed.");
