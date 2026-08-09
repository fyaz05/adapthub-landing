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
        "Free CAT 2026 prep with ZPD-calibrated practice, two-tier AI hints, and score telemetry for QA, DILR & VARC.",
    },
    pricing: {
      title:
        BASE_CONTENT?.metadata?.pricing?.title ||
        "Free CAT Preparation Online | AdaptHub",
      description:
        BASE_CONTENT?.metadata?.pricing?.description ||
        "Free adaptive learning for CAT. Start today.",
    },
    about: {
      title:
        BASE_CONTENT?.metadata?.about?.title ||
        "How AdaptHub's ZPD Adaptive Algorithm Works | About",
      description:
        BASE_CONTENT?.metadata?.about?.description ||
        "How AdaptHub uses ZPD adaptive learning for CAT 99th percentile prep.",
    },
    catSyllabus: {
      title:
        BASE_CONTENT?.metadata?.catSyllabus?.title ||
        "CAT Syllabus 2026: VARC, DILR & QA Topics | AdaptHub",
      description:
        BASE_CONTENT?.metadata?.catSyllabus?.description ||
        "Data-driven CAT syllabus mapping for VARC, DILR, and QA.",
    },
    docs: {
      title:
        BASE_CONTENT?.metadata?.docs?.title ||
        "AdaptHub Docs | Adaptive CAT Practice Platform Guide",
      description:
        BASE_CONTENT?.metadata?.docs?.description ||
        "Guides for adaptive difficulty, AI coaching, and analytics.",
    },
    contact: {
      title:
        BASE_CONTENT?.metadata?.contact?.title ||
        "Contact AdaptHub | Free CAT Prep Support",
      description:
        BASE_CONTENT?.metadata?.contact?.description ||
        "Reach AdaptHub for platform support and feedback.",
    },
    blog: {
      title:
        BASE_CONTENT?.metadata?.blog?.title ||
        "CAT Prep Blog 2026 | Strategy & Section Insights",
      description:
        BASE_CONTENT?.metadata?.blog?.description ||
        "CAT 2026 strategy breakdowns and cognitive techniques.",
    },
    defaultTitle:
      BASE_CONTENT?.metadata?.defaultTitle ||
      "Free CAT 2026 Prep with AI Adaptive Learning | AdaptHub",
    defaultDescription:
      BASE_CONTENT?.metadata?.defaultDescription ||
      "Free adaptive learning for CAT 2026 with AI coaching and analytics.",
    privacyPolicy: {
      title:
        BASE_CONTENT?.metadata?.privacyPolicy?.title ||
        "Privacy Policy | AdaptHub CAT Prep Platform",
      description:
        BASE_CONTENT?.metadata?.privacyPolicy?.description ||
        "Privacy Policy for AdaptHub",
    },
    termsOfService: {
      title:
        BASE_CONTENT?.metadata?.termsOfService?.title ||
        "Terms of Service | AdaptHub CAT Prep Platform",
      description:
        BASE_CONTENT?.metadata?.termsOfService?.description ||
        "Terms of Service for AdaptHub",
    },
    ogImageFallback: BASE_CONTENT?.metadata?.ogImageFallback || "/og-image.png",
  },
  bentoGrid: BASE_CONTENT?.bentoGrid || {
    header: {
      eyebrow: "Learning workspace",
      title: "Your learning workspace",
      highlight: "for practice, review, and progress.",
    },
    cards: [
      {
        title: "Practice",
        description: "Loading...",
      },
      {
        title: "Feedback and hints",
        description: "Loading...",
      },
      { title: "Spaced review", description: "Loading..." },
      { title: "Progress tracking", description: "Loading..." },
    ],
  },
  trustStrip: {
    // Spread first so any future extra keys on BASE_CONTENT.trustStrip are
    // preserved, then override the three known fields with safe fallbacks.
    ...BASE_CONTENT?.trustStrip,
    questions:
      BASE_CONTENT?.trustStrip?.questions ?? "10,000+ curated questions",
    free: BASE_CONTENT?.trustStrip?.free ?? "Free for all aspirants",
    sections: BASE_CONTENT?.trustStrip?.sections ?? "QA · DILR · VARC",
  },
};
