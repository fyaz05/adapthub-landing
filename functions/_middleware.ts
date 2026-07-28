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

interface MiddlewareContext {
  request: Request;
  next: () => Promise<Response>;
  env: { ASSETS: { fetch: (req: Request) => Promise<Response> } };
}

export async function onRequest(context: MiddlewareContext): Promise<Response> {
  const { request, next } = context;
  if (!request.headers.get("Accept")?.includes("text/markdown")) return next();

  const canonicalResponse = await next();
  if (request.method === "HEAD") return withVary(canonicalResponse);
  if (
    !canonicalResponse.ok ||
    !canonicalResponse.headers.get("Content-Type")?.includes("text/html")
  ) {
    return withVary(canonicalResponse);
  }

  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, "") || "/";
  let markdown: string | undefined;

  const capsulePath = MD_CAPSULE_MAP[path];
  if (capsulePath) {
    const capsuleRequest = new Request(new URL(capsulePath, url), {
      method: "GET",
      headers: request.headers,
    });
    const capsuleResponse = await context.env.ASSETS.fetch(capsuleRequest);
    if (capsuleResponse.ok) markdown = await capsuleResponse.text();
  }

  if (!markdown) markdown = htmlToBasicMarkdown(await canonicalResponse.text());

  const headers = new Headers(canonicalResponse.headers);
  headers.set("Content-Type", "text/markdown; charset=utf-8");
  headers.set(
    "Cache-Control",
    "public, max-age=3600, stale-while-revalidate=86400",
  );
  headers.set(
    "X-Markdown-Tokens",
    String(markdown.split(/\s+/).filter(Boolean).length),
  );
  headers.delete("Content-Length");
  headers.delete("Content-Encoding");
  // The backing /md asset is a distinct noindex URL. Its directive must never
  // leak onto this negotiated representation of the canonical HTML URL.
  headers.delete("X-Robots-Tag");
  mergeVary(headers, "Accept");

  return new Response(markdown, {
    status: canonicalResponse.status,
    statusText: canonicalResponse.statusText,
    headers,
  });
}

function withVary(response: Response) {
  const headers = new Headers(response.headers);
  mergeVary(headers, "Accept");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function mergeVary(headers: Headers, value: string) {
  const existing =
    headers
      .get("Vary")
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? [];
  if (!existing.some((item) => item.toLowerCase() === value.toLowerCase()))
    existing.push(value);
  headers.set("Vary", existing.join(", "));
}

function htmlToBasicMarkdown(html: string): string {
  let md = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "");
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "# $1\n\n");
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "## $1\n\n");
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "### $1\n\n");
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n");
  md = md.replace(/<br\s*\/?>/gi, "\n");
  md = md.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, "**$2**");
  md = md.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, "*$2*");
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n");
  md = md.replace(/<[^>]+>/g, "");
  return md
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
