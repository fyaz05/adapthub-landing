const MD_CAPSULE_MAP: Record<string, string> = {
  "/": "/md/index.md",
  "/adaptive-learning-cat": "/md/adaptive-learning-cat.md",
  "/about": "/md/about-adapthub.md",
  "/pricing": "/md/pricing-free.md",
  "/cat-mock-analysis": "/md/cat-mock-analysis.md",
  "/cat-study-plan-2026": "/md/cat-study-plan-2026.md",
  "/cat-preparation-without-coaching": "/md/prepare-without-coaching.md",
  "/how-to-score-99-percentile-cat": "/md/how-to-score-99-percentile-cat.md",
  "/cat-syllabus": "/md/cat-syllabus-2026.md",
  "/cat-2026-exam-date": "/md/cat-2026-exam-date.md",
  "/cat-varc-strategy": "/md/cat-varc-strategy.md",
  "/cat-dilr-strategy": "/md/cat-dilr-strategy.md",
  "/cat-quant-strategy": "/md/cat-quant-strategy.md",
  "/adapthub-vs-competitors": "/md/adapthub-vs-competitors.md",
};

export async function onRequest(context: {
  request: Request;
  next: () => Promise<Response>;
  env: { ASSETS: { fetch: (req: Request) => Promise<Response> } };
}): Promise<Response> {
  const { request, next } = context;
  const accept = request.headers.get("Accept") || "";

  if (accept.includes("text/markdown")) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "") || "/";

    if (MD_CAPSULE_MAP[path]) {
      const mdResponse = await context.env.ASSETS.fetch(
        new Request(new URL(MD_CAPSULE_MAP[path], url), request),
      );
      if (mdResponse.status === 200) {
        const mdText = await mdResponse.text();
        return new Response(mdText, {
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control":
              "public, max-age=3600, stale-while-revalidate=86400",
            "X-Markdown-Tokens": String(mdText.split(/\s+/).length),
          },
        });
      }
    }

    const htmlResponse = await next();
    if (htmlResponse.headers.get("Content-Type")?.includes("text/html")) {
      const html = await htmlResponse.text();
      const markdown = htmlToBasicMarkdown(html);
      return new Response(markdown, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
          "X-Markdown-Tokens": String(markdown.split(/\s+/).length),
        },
      });
    }

    // Non-HTML response (JSON, image, etc.): return it as-is instead of
    // calling next() a second time (which would re-invoke downstream handlers).
    return htmlResponse;
  }

  return next();
}

function htmlToBasicMarkdown(html: string): string {
  let md = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "")
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "");
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "# $1\n\n");
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "## $1\n\n");
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "### $1\n\n");
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "#### $1\n\n");
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n");
  md = md.replace(/<br\s*\/?>/gi, "\n");
  md = md.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**");
  md = md.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**");
  md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*");
  md = md.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*");
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n");
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, "$1\n");
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, "$1\n");
  md = md.replace(/<[^>]+>/g, "");
  md = md.replace(/\n{3,}/g, "\n\n");
  md = md.replace(/&amp;/g, "&");
  md = md.replace(/&lt;/g, "<");
  md = md.replace(/&gt;/g, ">");
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");
  md = md.trim();
  return md;
}
