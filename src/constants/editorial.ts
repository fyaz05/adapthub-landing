export type ArticleKind = "blog" | "docs" | "cat";
export type EditorialReviewState = "reviewed" | "product-verified";

export interface EditorialImage {
  url: string;
  width: number;
  height: number;
  mimeType: "image/jpeg";
  alt: string;
}

export interface EditorialImages {
  square: EditorialImage;
  fourByThree: EditorialImage;
  sixteenByNine: EditorialImage;
}

export interface ArticleEditorialMeta {
  kind: ArticleKind;
  slug: string;
  datePublished: string;
  dateModified: string;
  reviewState: EditorialReviewState;
  images: EditorialImages;
}

export const EDITORIAL_AUTHOR = {
  name: "AdaptHub Editorial",
  url: "https://adapthub.in/editorial-policy",
  id: "https://adapthub.in/editorial-policy#editorial",
  description:
    "The team responsible for AdaptHub's product documentation, CAT preparation guides, source review, and corrections.",
} as const;

const CAT_DATES: Record<string, { published: string; modified: string }> = {
  "adaptive-learning-cat": {
    published: "2025-02-23T00:00:00.000Z",
    modified: "2026-07-28T00:00:00.000Z",
  },
  "adapthub-vs-competitors": {
    published: "2025-11-01T00:00:00.000Z",
    modified: "2026-07-28T00:00:00.000Z",
  },
  "cat-2026-exam-date": {
    published: "2025-11-01T00:00:00.000Z",
    modified: "2026-08-08T00:00:00.000Z",
  },
  "cat-dilr-strategy": {
    published: "2026-07-13T00:00:00.000Z",
    modified: "2026-07-28T00:00:00.000Z",
  },
  "cat-mock-analysis": {
    published: "2026-07-13T00:00:00.000Z",
    modified: "2026-07-28T00:00:00.000Z",
  },
  "cat-preparation-without-coaching": {
    published: "2025-11-01T00:00:00.000Z",
    modified: "2026-07-28T00:00:00.000Z",
  },
  "cat-quant-strategy": {
    published: "2026-07-13T00:00:00.000Z",
    modified: "2026-07-28T00:00:00.000Z",
  },
  "cat-study-plan-2026": {
    published: "2026-07-13T00:00:00.000Z",
    modified: "2026-07-28T00:00:00.000Z",
  },
  "cat-varc-strategy": {
    published: "2026-07-13T00:00:00.000Z",
    modified: "2026-07-28T00:00:00.000Z",
  },
  "how-to-score-99-percentile-cat": {
    published: "2026-07-13T00:00:00.000Z",
    modified: "2026-07-28T00:00:00.000Z",
  },
};

export const ARTICLE_INVENTORY = {
  blog: [
    "zone-of-proximal-development-cat-algebra",
    "decoding-2025-dilr-trap-sets",
    "varc-fact-vs-judgment",
    "metacognition-first-cat-skill",
    "distractor-error-taxonomy",
    "quality-streaks-vs-raw-study-hours",
  ],
  docs: [
    "calibration-sequence",
    "daily-learning-module",
    "mastery-progression",
    "ai-coach-hint-system",
    "telemetry-performance-metrics",
    "spaced-repetition-system",
    "quality-streaks",
    "troubleshooting",
    "core-issue-matrix",
  ],
  cat: Object.keys(CAT_DATES),
} as const;

function imageSet(
  kind: ArticleKind,
  slug: string,
  title: string,
): EditorialImages {
  const base = `/images/editorial/${kind}/${slug}`;
  const alt = `Editorial illustration for ${title}`;
  return {
    square: {
      url: `${base}-1x1.jpg`,
      width: 1200,
      height: 1200,
      mimeType: "image/jpeg",
      alt,
    },
    fourByThree: {
      url: `${base}-4x3.jpg`,
      width: 1200,
      height: 900,
      mimeType: "image/jpeg",
      alt,
    },
    sixteenByNine: {
      url: `${base}-16x9.jpg`,
      width: 1200,
      height: 675,
      mimeType: "image/jpeg",
      alt,
    },
  };
}

export function getArticleEditorial(
  kind: ArticleKind,
  slug: string,
  title: string,
  published?: string,
): ArticleEditorialMeta {
  const catDates = kind === "cat" ? CAT_DATES[slug] : undefined;
  const datePublished =
    catDates?.published ??
    (published
      ? new Date(published).toISOString()
      : "2025-09-01T00:00:00.000Z");
  const dateModified = catDates?.modified ?? "2026-07-28T00:00:00.000Z";

  return {
    kind,
    slug,
    datePublished,
    dateModified,
    reviewState: kind === "docs" ? "product-verified" : "reviewed",
    images: imageSet(kind, slug, title),
  };
}

export function buildEditorialAuthor(siteUrl = "https://adapthub.in/") {
  return {
    "@type": "Organization",
    "@id": new URL("/editorial-policy#editorial", siteUrl).href,
    name: EDITORIAL_AUTHOR.name,
    url: new URL("/editorial-policy", siteUrl).href,
    description: EDITORIAL_AUTHOR.description,
  };
}

export function absoluteArticleImages(
  images: EditorialImages,
  siteUrl = "https://adapthub.in/",
) {
  return [images.square, images.fourByThree, images.sixteenByNine].map(
    (image) => new URL(image.url, siteUrl).href,
  );
}
