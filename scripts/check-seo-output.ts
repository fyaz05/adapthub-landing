import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const failures: string[] = [];

function walk(directory: string): string[] {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const htmlFiles = walk(dist).filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const label = relative(dist, file);
  const count = (pattern: RegExp) => html.match(pattern)?.length ?? 0;
  if (count(/<title(?:\s|>)/gi) !== 1)
    failures.push(`${label}: expected one title`);
  if (count(/<meta name="description"/gi) !== 1)
    failures.push(`${label}: expected one description`);
  if (count(/<link rel="canonical"/gi) !== 1)
    failures.push(`${label}: expected one canonical`);
  if (count(/<meta name="robots"/gi) !== 1)
    failures.push(`${label}: expected one robots meta`);
  if (count(/<h1(?:\s|>)/gi) !== 1) failures.push(`${label}: expected one H1`);
  if (/<meta name="keywords"/i.test(html))
    failures.push(`${label}: obsolete keywords meta found`);
  if (/hreflang=/i.test(html))
    failures.push(`${label}: self-only hreflang found`);
  for (const match of html.matchAll(/href="(\/[^"#?]+)"/g)) {
    const href = match[1];
    if (href.endsWith(".html") || (href.length > 1 && href.endsWith("/"))) {
      failures.push(`${label}: noncanonical internal link ${href}`);
    }
  }
}

for (const route of ["contact.html", "editorial-policy.html"]) {
  const file = resolve(dist, route);
  if (!statSafe(file)) failures.push(`missing built route: ${route}`);
  else if (/noindex/i.test(readFileSync(file, "utf8")))
    failures.push(`${route}: unexpectedly noindex`);
}

const articleImages = walk(resolve(dist, "images", "editorial")).filter(
  (file) => file.endsWith(".jpg"),
);
if (articleImages.length !== 75)
  failures.push(`expected 75 article images, found ${articleImages.length}`);

const articleRoutes = [
  ...walk(resolve(dist, "blog")).filter((file) => file.endsWith(".html")),
  ...walk(resolve(dist, "docs")).filter((file) => file.endsWith(".html")),
  ...[
    "adaptive-learning-cat",
    "adapthub-vs-competitors",
    "cat-2026-exam-date",
    "cat-dilr-strategy",
    "cat-mock-analysis",
    "cat-preparation-without-coaching",
    "cat-quant-strategy",
    "cat-study-plan-2026",
    "cat-varc-strategy",
    "how-to-score-99-percentile-cat",
  ].map((slug) => resolve(dist, `${slug}.html`)),
];
for (const file of articleRoutes) {
  const html = readFileSync(file, "utf8");
  const label = relative(dist, file);
  if (!html.includes("AdaptHub Editorial"))
    failures.push(`${label}: missing AdaptHub Editorial author`);
  if (!html.includes("/images/editorial/"))
    failures.push(`${label}: missing page-specific editorial image`);
}

const sitemap = readFileSync(resolve(dist, "sitemap-0.xml"), "utf8");
for (const route of [
  "https://adapthub.in/contact",
  "https://adapthub.in/editorial-policy",
]) {
  if (!sitemap.includes(`<loc>${route}</loc>`))
    failures.push(`sitemap missing ${route}`);
}
if (/<priority>|<changefreq>/i.test(sitemap))
  failures.push("sitemap contains ignored priority/changefreq fields");
if (/\/md\/|\.html<\/loc>|\/404<\/loc>/i.test(sitemap))
  failures.push("sitemap includes a noncanonical or excluded URL");

const retired = [
  /lifetime free/gi,
  /free forever/gi,
  /90% of candidates/gi,
  /median score in the top decile/gi,
  /socratic/gi,
  /cognitive lock/gi,
];
for (const file of [
  resolve(root, "public", "llms.txt"),
  ...walk(resolve(root, "public", "md")),
]) {
  const text = readFileSync(file, "utf8");
  for (const pattern of retired)
    if (pattern.test(text))
      failures.push(`${relative(root, file)}: retired claim ${pattern.source}`);
}

if (failures.length) {
  console.error(`SEO output check failed (${failures.length}):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log(
  `SEO output check passed for ${htmlFiles.length} HTML files and ${articleImages.length} article images.`,
);

function statSafe(path: string) {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
}
