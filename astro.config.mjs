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
      filter: (page) => {
        const path = new URL(page).pathname;
        return path !== "/404" && !path.startsWith("/~partytown");
      },
    }),
  ],
  vite: {
    plugins: [tailwindv4()],
    ssr: { noExternal: ["motion"] },
  },
});
