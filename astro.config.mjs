import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindv4 from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import path from "node:path";

export default defineConfig({
  site: "https://adapthub.in",
  output: "static",
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
      // Exclude 404 (noindex) from sitemap so Google Search Console doesn't flag it.
      filter: (page) => !page.includes("/404"),
    }),
  ],
  vite: {
    plugins: [tailwindv4()],
    ssr: { noExternal: ["motion"] },
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "src"),
      },
    },
  },
});
