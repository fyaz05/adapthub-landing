const base = process.env.SEO_RUNTIME_URL;
if (!base) {
  console.log(
    "SEO runtime check skipped: set SEO_RUNTIME_URL to a Cloudflare Pages preview URL.",
  );
  process.exit(0);
}

const failures: string[] = [];

async function check(path: string, init?: RequestInit) {
  return fetch(new URL(path, base), { redirect: "manual", ...init });
}

for (const path of [
  "/md/index.md",
  "/llms.txt",
  "/auth.md",
  "/.well-known/agent-skills/index.json",
]) {
  const response = await check(path);
  if (response.status !== 200)
    failures.push(`${path}: expected 200, got ${response.status}`);
  if (!response.headers.get("x-robots-tag")?.includes("noindex"))
    failures.push(`${path}: missing noindex header`);
}

for (const path of [
  "/",
  "/adaptive-learning-cat",
  "/docs/calibration-sequence",
]) {
  const response = await check(path, { headers: { Accept: "text/markdown" } });
  if (!response.ok)
    failures.push(`${path}: negotiated response ${response.status}`);
  if (!response.headers.get("content-type")?.includes("text/markdown"))
    failures.push(`${path}: wrong negotiated MIME`);
  if (!response.headers.get("vary")?.toLowerCase().includes("accept"))
    failures.push(`${path}: missing Vary: Accept`);
  if (response.headers.has("x-robots-tag"))
    failures.push(`${path}: canonical negotiated URL has X-Robots-Tag`);
}

const security = await check("/.well-known/security.txt");
if (security.headers.has("x-robots-tag"))
  failures.push("security.txt must not inherit noindex");

if (failures.length) {
  console.error("SEO runtime check failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log("SEO runtime check passed.");
