export const CONTENT = {
  global: {
    brandName: "AdaptHub",
    logoAlt: "AdaptHub Adaptive Learning Platform Logo",
  },

  nav: {
    links: [
      { label: "Philosophy", href: "#philosophy" },
      { label: "Methodology", href: "#methodology" },
      { label: "Mastery", href: "#mastery" },
    ],
    cta: "Start Calibration",
  },

  hero: {
    title: {
      line1: "Adaptive",
      highlight: "Mastery",
    },
    description:
      "The AI-powered learning engine built for CAT domination. Real-time study plans, deep performance analytics, and intelligent explanations — engineered for unstoppable progress.",
    cta: {
      primary: "Start Calibration",
      secondary: "System Overview",
    },
  },

  bentoGrid: {
    header: {
      eyebrow: "Adaptive Intelligence",
      title: "Built for",
      highlight: "CAT Mastery",
    },
    cards: [
      {
        id: "01",
        title: "Dynamic Daily Plans",
        description:
          "Daily study plans recalibrated in real time based on accuracy, speed, and concept gaps.",
        visualCheck: {
          monitor: "SYS_MON_V1",
          delta: "Progress:",
          deltaValue: "+14.2%",
        },
      },
      {
        id: "02",
        title: "Performance Analytics",
        description:
          "Granular performance insights across accuracy, velocity, and topic mastery.",
        tabs: ["Accuracy", "Growth"],
        progress: {
          accuracy: { label: "Accuracy", value: 94 },
          growth: { label: "Growth", value: 42 },
        },
      },
      {
        id: "03",
        title: "Concept Library",
        description:
          "High-density concept breakdowns designed for rapid revision and long-term retention.",
      },
      {
        id: "04",
        title: "AI Coach",
        description:
          "Context-aware explanations that target your specific error patterns and unlock breakthroughs.",
      },
    ],
  },

  theLens: {
    systems: [
      {
        id: "zpd",
        title: "Adaptive Difficulty",
        subtitle: "Always Optimal",
        description:
          "Difficulty adjusts continuously to keep you in the optimal learning zone — where challenge and comprehension intersect for maximum growth.",
      },
      {
        id: "roadmap",
        title: "Dynamic Roadmap",
        subtitle: "Personalized Progress",
        description:
          "Your curriculum restructures dynamically, prioritizing the concepts required to unlock your next level of mastery.",
      },
      {
        id: "audit",
        title: "Learning Diagnostics",
        subtitle: "Deep Insight",
        description:
          "Mistakes are decomposed into actionable learning signals, revealing hidden gaps in logic, memory, and execution.",
      },
    ],
    visuals: {
      zpd: {
        boredom: "BOREDOM",
        anxiety: "ANXIETY",
        flow: "FLOW STATE",
        target: "TARGET ZONE",
      },
      diagnostics: {
        memory: "MEMORY",
        logic: "LOGIC",
        speed: "SPEED",
        focus: "FOCUS",
        score: { label: "SCORE", value: "98.2" },
        delta: { label: "DELTA", value: "+4%" },
      },
      roadmap: {
        gapDetected: "GAP_DETECTED",
        optimizing: "OPTIMIZING_ROUTE",
      },
    },
  },

  faq: {
    eyebrow: "System Queries",
    title: "Operational Overview",
    items: [
      {
        id: "faq-01",
        question: "What is AdaptHub?",
        answer:
          "AdaptHub is a precision learning platform that builds adaptive study plans for CAT and MBA entrance exams. It analyzes performance data to personalize practice, explanations, and daily learning trajectories.",
      },
      {
        id: "faq-02",
        question: "How does personalization work?",
        answer:
          "Every interaction updates your learning model. Weak concepts are prioritized, difficulty recalibrates automatically, and the AI Coach adapts explanations to your specific mistake patterns.",
      },
      {
        id: "faq-03",
        question: "Who is this built for?",
        answer:
          "AdaptHub is designed for serious CAT aspirants and MBA hopefuls who demand structured, data-driven progress instead of static courses.",
      },
      {
        id: "faq-04",
        question: "How is progress measured?",
        answer:
          "Progress is tracked through accuracy, learning velocity, and concept mastery — not just raw scores.",
      },
      {
        id: "faq-05",
        question: "Is this available on mobile?",
        answer:
          "AdaptHub is currently optimized for desktop and horizontal screens to deliver a full analytical dashboard experience.",
      },
    ],
  },

  footer: {
    brand: {
      name: "AdaptHub",
      quote: '"Learning should adapt to you."',
      description:
        "Adaptive learning for CAT and MBA entrance exams. Personalized plans, AI-powered coaching, and performance analytics — built for ambitious students.",
    },
    directory: {
      title: "Directory",
      links: [
        { label: "Philosophy", href: "#philosophy" },
        { label: "Methodology", href: "#methodology" },
        { label: "Mastery", href: "#mastery" },
      ],
    },
    connect: {
      title: "Connect",
      links: [
        { label: "Instagram", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "Support", href: "mailto:support@adapthub.in" },
      ],
    },
    system: {
      label: "System Online",
    },
    legal: {
      copyright: (year: number) => `© ${year} ADAPTHUB`,
      links: [
        {
          label: "Privacy Policy",
          href: "https://app.adapthub.in/privacy-policy",
        },
        {
          label: "Terms of Service",
          href: "https://app.adapthub.in/terms-of-service",
        },
      ],
    },
  },

  parallaxDashboard: {
    alt: "AdaptHub Dynamic Performance Analytics Dashboard showing learning velocity and growth metrics",
    growth: {
      label: "Learning Velocity",
      comparison: "vs last week",
      value: 42,
      suffix: "%",
    },
  },

  philosophy: {
    headline: {
      line1: "We believe learning",
      line2: "should be",
      line3: "personal, adaptive, and",
      highlight: "intelligence-driven",
      line4: "by default.",
    },
    pillars: [
      {
        title: "Cognitive Precision",
        description:
          "Information density and difficulty are tightly controlled to maximize deep focus and accelerate breakthroughs.",
      },
      {
        title: "Active Recall",
        description:
          "Learning is driven through active retrieval, not passive consumption.",
      },
      {
        title: "Metacognitive Feedback",
        description:
          "We surface how you think — exposing bias, hesitation, and hidden gaps for radical self-improvement.",
      },
    ],
  },

  metadata: {
    defaultTitle: "AdaptHub | AI-Powered Adaptive Learning for CAT",
    defaultDescription:
      "Adaptive study plans, performance analytics, and AI-powered coaching designed to accelerate CAT mastery.",
    indexPage: {
      title: "AdaptHub | AI-Powered CAT Preparation",
    },
    ogImage: "/og-image.avif",
  },

  links: {
    app: "https://app.adapthub.in/",
    privacy: "https://app.adapthub.in/privacy-policy",
    terms: "https://app.adapthub.in/terms-of-service",
    support: "mailto:support@adapthub.in",
  },

  assets: {
    logoLight: "/logo-light.svg",
    logoDark: "/logo-dark.svg",
    heroImage: "/hero.avif",
    noiseTexture: "/noise.svg",
  },
};
