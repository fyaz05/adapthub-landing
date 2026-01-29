import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindv4 from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import path from "node:path";

export default defineConfig({
  site: "https://adapthub.in",
  output: "static",
  integrations: [react(), sitemap()],
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
