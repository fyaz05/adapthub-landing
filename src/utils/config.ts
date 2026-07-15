import { CONTENT as BASE_CONTENT } from "../constants/content";

/**
 * Safely resolves content from the constants to ensure no deeply nested properties
 * throw errors or require excessive optional chaining in the UI components/pages.
 * Provides sensible fallback defaults if data is missing.
 */
export const resolvedContent = {
  ...BASE_CONTENT,
  metadata: {
    indexPage: {
      title:
        BASE_CONTENT?.metadata?.indexPage?.title ||
        "Free CAT 2026 Prep with AI Adaptive Learning | AdaptHub",
      description:
        BASE_CONTENT?.metadata?.indexPage?.description ||
        "Free CAT 2026 prep with adaptive study plans, AI coaching, and analytics for QA, DILR & VARC.",
      keywords: BASE_CONTENT?.metadata?.indexPage?.keywords || [
        "cat exam preparation",
        "cat 2026 preparation",
        "free cat coaching",
        "adaptive learning cat",
      ],
    },
    pricing: {
      title:
        BASE_CONTENT?.metadata?.pricing?.title ||
        "Free CAT Preparation Online — Lifetime Free | AdaptHub",
      description:
        BASE_CONTENT?.metadata?.pricing?.description ||
        "Lifetime free adaptive learning for CAT — no credit card required.",
      keywords: BASE_CONTENT?.metadata?.pricing?.keywords || [
        "free cat preparation",
        "free cat coaching",
        "free cat preparation online",
      ],
    },
    about: {
      title:
        BASE_CONTENT?.metadata?.about?.title ||
        "How AdaptHub's ZPD Adaptive Algorithm Works | About",
      description:
        BASE_CONTENT?.metadata?.about?.description ||
        "How AdaptHub uses ZPD adaptive learning for CAT 99th percentile prep.",
      keywords: BASE_CONTENT?.metadata?.about?.keywords || [
        "zpd algorithm cat",
        "adaptive learning platform",
        "about adapthub",
      ],
    },
    catSyllabus: {
      title:
        BASE_CONTENT?.metadata?.catSyllabus?.title ||
        "CAT Syllabus 2026: VARC, DILR & QA Topics | AdaptHub",
      description:
        BASE_CONTENT?.metadata?.catSyllabus?.description ||
        "Data-driven CAT syllabus mapping for VARC, DILR, and QA.",
      keywords: BASE_CONTENT?.metadata?.catSyllabus?.keywords || [
        "cat syllabus 2026",
        "cat exam pattern",
        "cat qa syllabus",
      ],
    },
    docs: {
      title:
        BASE_CONTENT?.metadata?.docs?.title ||
        "AdaptHub Docs | Adaptive CAT Prep Platform Guide",
      description:
        BASE_CONTENT?.metadata?.docs?.description ||
        "Guides for adaptive difficulty, AI coaching, and analytics.",
      keywords: BASE_CONTENT?.metadata?.docs?.keywords || [
        "adapthub documentation",
        "how to use adapthub",
        "adapthub guide",
      ],
    },
    contact: {
      title:
        BASE_CONTENT?.metadata?.contact?.title ||
        "Contact AdaptHub | Free CAT Prep Support",
      description:
        BASE_CONTENT?.metadata?.contact?.description ||
        "Reach AdaptHub for platform support and feedback.",
      keywords: BASE_CONTENT?.metadata?.contact?.keywords || [
        "adapthub contact",
        "adapthub support",
        "contact adapthub",
      ],
    },
    blog: {
      title:
        BASE_CONTENT?.metadata?.blog?.title ||
        "CAT Prep Blog 2026 | Strategy & Section Insights",
      description:
        BASE_CONTENT?.metadata?.blog?.description ||
        "CAT 2026 strategy breakdowns and cognitive techniques.",
      keywords: BASE_CONTENT?.metadata?.blog?.keywords || [
        "cat preparation blog",
        "cat strategy 2026",
        "how to crack cat",
      ],
    },
    defaultTitle:
      BASE_CONTENT?.metadata?.defaultTitle ||
      "Free CAT 2026 Prep with AI Adaptive Learning | AdaptHub",
    defaultDescription:
      BASE_CONTENT?.metadata?.defaultDescription ||
      "Free adaptive learning for CAT 2026 with AI coaching and analytics.",
    defaultKeywords: Array.isArray(BASE_CONTENT?.metadata?.defaultKeywords)
      ? BASE_CONTENT?.metadata?.defaultKeywords
      : [
          "cat exam preparation",
          "cat 2026 preparation",
          "free cat coaching",
          "adaptive learning for cat",
        ],
    privacyPolicy: {
      title:
        BASE_CONTENT?.metadata?.privacyPolicy?.title ||
        "Privacy Policy | AdaptHub CAT Prep Platform",
      description:
        BASE_CONTENT?.metadata?.privacyPolicy?.description ||
        "Privacy Policy for AdaptHub",
      keywords: BASE_CONTENT?.metadata?.privacyPolicy?.keywords || [
        "privacy",
        "policy",
      ],
    },
    termsOfService: {
      title:
        BASE_CONTENT?.metadata?.termsOfService?.title ||
        "Terms of Service | AdaptHub CAT Prep Platform",
      description:
        BASE_CONTENT?.metadata?.termsOfService?.description ||
        "Terms of Service for AdaptHub",
      keywords: BASE_CONTENT?.metadata?.termsOfService?.keywords || [
        "terms",
        "service",
      ],
    },
    ogImageFallback: BASE_CONTENT?.metadata?.ogImageFallback || "/og-image.png",
  },
  bentoGrid: BASE_CONTENT?.bentoGrid || {
    header: {
      eyebrow: "System Protocol",
      title: "Mastery",
      highlight: "Engineered.",
    },
    cards: [
      {
        title: "SYS.01",
        description: "Loading...",
        visualCheck: { deltaValue: "0" },
      },
      {
        title: "SYS.02",
        description: "Loading...",
        tabs: ["Accuracy", "Growth"],
        progress: {
          accuracy: { value: 0, label: "" },
          growth: { value: 0, label: "" },
        },
      },
      { title: "SYS.03", description: "Loading..." },
      { title: "SYS.04", description: "Loading..." },
    ],
  },
};
