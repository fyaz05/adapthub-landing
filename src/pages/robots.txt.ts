import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) =>
  `# AdaptHub robots.txt — https://adapthub.in
# Crawl-friendly for classic search + AI answer engines.
# Visibility goal: allow major AI crawlers (AEO). Block only non-content paths.

User-agent: *
Allow: /

# Major search crawlers
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

# Google AI / training-related
User-agent: Google-Extended
Allow: /

# OpenAI (ChatGPT training + browsing/search agents)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

# Anthropic (Claude)
User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

# Meta / others often used in AI ecosystems
User-agent: FacebookBot
Allow: /

User-agent: meta-externalagent
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bytespider
Allow: /

# Apple Intelligence / Siri
User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

# You.com / other assistants
User-agent: YouBot
Allow: /

# Discovery
Sitemap: ${sitemapURL.href}
# Agent content map (not a standard robots directive; listed for operators)
# llms.txt: https://adapthub.in/llms.txt
`.trim();

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL("https://adapthub.in");
  const sitemapURL = new URL("sitemap-index.xml", base);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
};
