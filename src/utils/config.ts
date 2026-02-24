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
        "Adaptive Learning for CAT | AdaptHub",
      description:
        BASE_CONTENT?.metadata?.indexPage?.description ||
        "AI-powered adaptive learning for CAT preparation",
      keywords: BASE_CONTENT?.metadata?.indexPage?.keywords || [
        "cat preparation",
        "cat 2026",
        "mba",
        "adaptive learning",
      ],
    },
    pricing: {
      title: BASE_CONTENT?.metadata?.pricing?.title || "Pricing | AdaptHub",
      description:
        BASE_CONTENT?.metadata?.pricing?.description ||
        "Lifetime Free adaptive learning for CAT",
      keywords: BASE_CONTENT?.metadata?.pricing?.keywords || [
        "cat preparation",
        "cat exam",
        "free cat prep",
      ],
    },
    about: {
      title:
        BASE_CONTENT?.metadata?.about?.title || "About the System | AdaptHub",
      description:
        BASE_CONTENT?.metadata?.about?.description ||
        "The intelligence engine methodology.",
      keywords: BASE_CONTENT?.metadata?.about?.keywords || [
        "about",
        "mission",
        "features",
      ],
    },
    catSyllabus: {
      title:
        BASE_CONTENT?.metadata?.catSyllabus?.title ||
        "CAT Structure | AdaptHub",
      description:
        BASE_CONTENT?.metadata?.catSyllabus?.description ||
        "Mathematical mapping of the CAT exam.",
      keywords: BASE_CONTENT?.metadata?.catSyllabus?.keywords || [
        "syllabus",
        "cat structure",
        "exam pattern",
      ],
    },
    docs: {
      title:
        BASE_CONTENT?.metadata?.docs?.title ||
        "System Documentation | AdaptHub",
      description:
        BASE_CONTENT?.metadata?.docs?.description ||
        "Technical instructions and operational guides.",
      keywords: BASE_CONTENT?.metadata?.docs?.keywords || [
        "docs",
        "guide",
        "manual",
      ],
    },
    contact: {
      title:
        BASE_CONTENT?.metadata?.contact?.title ||
        "Contact AdaptHub | Platform Support",
      description:
        BASE_CONTENT?.metadata?.contact?.description ||
        "Reach out to AdaptHub for platform support and feedback.",
      keywords: BASE_CONTENT?.metadata?.contact?.keywords || [
        "contact",
        "support",
        "engineering",
      ],
    },
    blog: {
      title: BASE_CONTENT?.metadata?.blog?.title || "Network Logs | AdaptHub",
      description:
        BASE_CONTENT?.metadata?.blog?.description ||
        "Strategic dispatches and systemic updates.",
      keywords: BASE_CONTENT?.metadata?.blog?.keywords || [
        "blog",
        "updates",
        "strategy",
      ],
    },
    defaultTitle: BASE_CONTENT?.metadata?.defaultTitle || "AdaptHub",
    defaultDescription:
      BASE_CONTENT?.metadata?.defaultDescription || "Adaptive learning for CAT",
    defaultKeywords:
      BASE_CONTENT?.metadata?.defaultKeywords || "cat preparation",
    privacyPolicy: {
      title:
        BASE_CONTENT?.metadata?.privacyPolicy?.title ||
        "Privacy Policy | AdaptHub",
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
        "Terms of Service | AdaptHub",
      description:
        BASE_CONTENT?.metadata?.termsOfService?.description ||
        "Terms of Service for AdaptHub",
      keywords: BASE_CONTENT?.metadata?.termsOfService?.keywords || [
        "terms",
        "service",
      ],
    },
    ogImage: BASE_CONTENT?.metadata?.ogImage || "/og-default.png",
    ogImageFallback:
      BASE_CONTENT?.metadata?.ogImageFallback || "/og-default.png",
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
