export function absoluteURL(path: string, siteUrl?: string): string {
  return new URL(path, siteUrl ?? "https://adapthub.in").href;
}

export function buildPublisherLogo(siteUrl?: string) {
  return {
    "@type": "ImageObject",
    url: absoluteURL("/apple-touch-icon.png", siteUrl),
    width: 180,
    height: 180,
  };
}

/** Reference the canonical Organization emitted by Layout rather than duplicating it. */
export function buildPublisher(siteUrl?: string) {
  const base = siteUrl ?? "https://adapthub.in/";
  return { "@id": `${base.replace(/\/$/, "")}/#organization` };
}

/** Minimal, truthful offer for current free digital access. */
export function buildOffer(opts: { url: string }) {
  return {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url: opts.url,
  };
}
