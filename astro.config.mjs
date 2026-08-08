import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindv4 from "@tailwindcss/vite";
import { execSync } from "node:child_process";
import { defineConfig } from "astro/config";

// Google only trusts sitemap lastmod when it is "consistently and verifiably
// accurate" and reflects the last significant update to the page. A build
// timestamp pasted on every URL fails both tests, so we derive lastmod per
// page from git: the newest commit touching the page template or any shared
// content source that feeds it. Footer/FAQ copy lives in content.ts and
// renders on every page, so it is a legitimate shared source for all pages.
// Falls back to build time when git history is unavailable (shallow clones).
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
  const candidates = [...sourceFilesFor(path), "src/constants/content.ts"];
  try {
    const out = execSync(
      `git log -1 --format=%cI -- ${candidates.map((f) => `"${f}"`).join(" ")}`,
      { stdio: ["ignore", "pipe", "ignore"] },
    )
      .toString()
      .trim();
    return out || new Date().toISOString();
  } catch {
    return new Date().toISOString();
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
      serialize: (item) => ({
        ...item,
        lastmod: lastmodFor(new URL(item.url).pathname),
      }),
    }),
  ],
  vite: {
    plugins: [tailwindv4()],
    ssr: { noExternal: ["motion"] },
  },
});
