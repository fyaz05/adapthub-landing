import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindv4 from "@tailwindcss/vite";
import { execSync } from "node:child_process";
import { defineConfig } from "astro/config";

// Per-page lastmod comes from the newest commit touching the page template or
// a shared content source (content.ts copy renders on every page). Google
// ignores unverifiable dates, and depth-1 CI clones return one identical HEAD
// date per file, so require real history or omit lastmod entirely.
const MIN_GIT_DEPTH = 20;
let gitHistoryDeep;

function gitDatesTrustworthy() {
  if (gitHistoryDeep === undefined) {
    try {
      gitHistoryDeep =
        Number.parseInt(
          execSync("git rev-list --count HEAD", {
            stdio: ["ignore", "pipe", "ignore"],
          })
            .toString()
            .trim(),
          10,
        ) >= MIN_GIT_DEPTH;
    } catch {
      gitHistoryDeep = false;
    }
  }
  return gitHistoryDeep;
}
function sourceFilesFor(path) {
  if (path === "/") return ["src/pages/index.astro"];
  if (path === "/blog")
    return [
      "src/pages/blog.astro",
      "src/constants/blog-data.ts",
      "src/constants/editorial.ts",
    ];
  if (path.startsWith("/blog/"))
    return [
      "src/pages/blog/[slug].astro",
      "src/constants/blog-data.ts",
      "src/constants/editorial.ts",
    ];
  if (path === "/docs")
    return ["src/pages/docs.astro", "src/constants/docs-data.ts"];
  if (path.startsWith("/docs/")) {
    const slug = path.split("/").pop();
    return [
      `src/pages/docs/${slug}.astro`,
      "src/pages/docs/[slug].astro",
      "src/constants/docs-data.ts",
    ];
  }
  return [`src/pages${path}.astro`];
}

function lastmodFor(path) {
  if (!gitDatesTrustworthy()) return undefined;
  const candidates = [...sourceFilesFor(path), "src/constants/content.ts"];
  try {
    const out = execSync(
      // ":(literal)" keeps [slug].astro from being read as a git glob.
      `git log -1 --format=%cI -- ${candidates.map((f) => `":(literal)${f}"`).join(" ")}`,
      { stdio: ["ignore", "pipe", "ignore"] },
    )
      .toString()
      .trim();
    // Omit rather than stamp an unverifiable date.
    return out || undefined;
  } catch {
    return undefined;
  }
}

export default defineConfig({
  site: "https://adapthub.in",
  output: "static",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  // Enable Astro's built-in prefetch. `viewport` strategy uses IntersectionObserver
  // to prefetch links as they enter the viewport — best balance of bandwidth and speed.
  // `prefetchAll` opts in all internal links (overrides default opt-in behavior).
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return path !== "/404" && !path.startsWith("/~partytown");
      },
      serialize: (item) => {
        const lastmod = lastmodFor(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindv4()],
    ssr: { noExternal: ["motion"] },
  },
});
