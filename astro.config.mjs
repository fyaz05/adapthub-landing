import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindv4 from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

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
      // Exclude noindex / non-content routes from the sitemap.
      filter: (page) =>
        !page.includes("/404") &&
        !page.includes("/~partytown"),
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      // Boost homepage + high-intent SEO pages in sitemap priority hints.
      serialize(item) {
        const url = item.url;
        if (url === "https://adapthub.in/" || url === "https://adapthub.in") {
          item.priority = 1.0;
          item.changefreq = "weekly";
        } else if (
          url.includes("/cat-syllabus") ||
          url.includes("/cat-2026-exam-date") ||
          url.includes("/adaptive-learning-cat") ||
          url.includes("/cat-preparation-without-coaching") ||
          url.includes("/adapthub-vs-competitors") ||
          url.includes("/cat-mock-analysis") ||
          url.includes("/cat-study-plan-2026") ||
          url.includes("/cat-varc-strategy") ||
          url.includes("/cat-dilr-strategy") ||
          url.includes("/cat-quant-strategy") ||
          url.includes("/how-to-score-99-percentile-cat") ||
          url.includes("/pricing")
        ) {
          item.priority = 0.9;
          item.changefreq = "weekly";
        } else if (url.includes("/blog")) {
          item.priority = 0.8;
          item.changefreq = "monthly";
        } else if (url.includes("/about") || url.includes("/docs")) {
          item.priority = 0.7;
          item.changefreq = "monthly";
        } else if (url.includes("/privacy") || url.includes("/terms")) {
          item.priority = 0.3;
          item.changefreq = "yearly";
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindv4()],
    ssr: { noExternal: ["motion"] },
  },
});
