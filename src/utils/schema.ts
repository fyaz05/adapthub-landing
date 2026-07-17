/**
 * Product / Offer schema helpers. AdaptHub is ₹0 lifetime-free digital —
 * no shipment, no monetary return. Rationale lives on each helper.
 *
 * TODO: confirm 1-1 DAY window matches account-creation SLA; revisit if a
 * paid tier is introduced.
 */

/** Publisher logo for Article-family schemas. PNG (Google rejects SVG); /apple-touch-icon.png is 180×180 and already in /public. */
export function buildPublisherLogo(siteUrl?: string) {
  return {
    "@type": "ImageObject",
    "url": absoluteURL("/apple-touch-icon.png", siteUrl),
    "width": 180,
    "height": 180,
  };
}

/** Inline Organization with PNG logo. Prefer `{ "@id": "${siteUrl}#organization" }` when Layout's @graph is on the page; use this only for standalone JSON-LD blocks. */
export function buildPublisher(siteUrl?: string) {
  return {
    "@type": "Organization",
    "name": "AdaptHub",
    "logo": buildPublisherLogo(siteUrl),
  };
}

export function absoluteURL(path: string, siteUrl?: string): string {
  const base = siteUrl ?? "https://adapthub.in";
  return new URL(path, base).href;
}

/**
 * MerchantReturnPolicy: MerchantReturnNotPermitted — ToS §6 + price=0 means
 * no monetary return applies. returnMethod/returnFees intentionally omitted
 * (contradictory when returns aren't permitted; Google flags the mismatch).
 */
export function buildMerchantReturnPolicy(siteUrl?: string) {
  return {
    "@type": "MerchantReturnPolicy",
    "applicableCountry": "IN",
    "returnPolicyCategory":
      "https://schema.org/MerchantReturnNotPermitted",
    "url": absoluteURL("/terms-of-service", siteUrl),
  };
}

/** OfferShippingDetails for digital delivery. 1-1 DAY (not 0-1) because Google rejects minValue=0 in Merchant Listings. */
export function buildShippingDetails() {
  return {
    "@type": "OfferShippingDetails",
    "shippingRate": {
      "@type": "MonetaryAmount",
      "value": "0",
      "currency": "INR",
    },
    "shippingDestination": {
      "@type": "DefinedRegion",
      "addressCountry": "IN",
    },
    "deliveryTime": {
      "@type": "ShippingDeliveryTime",
      "handlingTime": {
        "@type": "QuantitativeValue",
        "minValue": 1,
        "maxValue": 1,
        "unitCode": "DAY",
      },
      "transitTime": {
        "@type": "QuantitativeValue",
        "minValue": 1,
        "maxValue": 1,
        "unitCode": "DAY",
      },
    },
  };
}

/**
 * Standard ₹0 lifetime-free Offer.
 * @param opts.url             Page URL the Offer appears on.
 * @param opts.siteUrl         Site URL for resolving the return-policy URL. Defaults to https://adapthub.in.
 * @param opts.priceValidUntil ISO date. Defaults to 2030-12-31.
 */
export function buildOffer(opts: {
  url: string;
  siteUrl?: string;
  priceValidUntil?: string;
}) {
  const { url, siteUrl, priceValidUntil = "2030-12-31" } = opts;
  return {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "url": url,
    "priceValidUntil": priceValidUntil,
    "hasMerchantReturnPolicy": buildMerchantReturnPolicy(siteUrl),
    "shippingDetails": buildShippingDetails(),
  };
}
