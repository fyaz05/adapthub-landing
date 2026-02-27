export interface NavSubLink {
  label: string;
  href: string;
  description: string;
}

export type NavLink =
  | { label: string; href: string; subLinks?: never }
  | { label: string; href?: never; subLinks: NavSubLink[] };

export const CONTENT = {
  global: {
    brandName: "AdaptHub",
    logoAlt: "AdaptHub Adaptive Learning Platform Logo",
  },

  nav: {
    links: [
      {
        label: "Platform",
        subLinks: [
          {
            label: "How it Works",
            href: "/about",
            description:
              "The cognitive science behind our adaptive ZPD engine.",
          },
          {
            label: "Vs Competitors",
            href: "/adapthub-vs-competitors",
            description: "See how we compare to traditional coaching.",
          },
          {
            label: "Adaptive Learning",
            href: "/adaptive-learning-cat",
            description:
              "What adaptive learning is and why it outperforms fixed curriculum.",
          },
        ] satisfies NavSubLink[],
      },
      {
        label: "Resources",
        subLinks: [
          {
            label: "Syllabus Map",
            href: "/cat-syllabus",
            description:
              "Comprehensive tracking of the official CAT curriculum.",
          },
          {
            label: "Strategy Blog",
            href: "/blog",
            description:
              "Advanced theory, logic breakdowns, and prep protocols.",
          },
          {
            label: "Self-Study Guide",
            href: "/cat-preparation-without-coaching",
            description: "The complete zero-cost IIM admission blueprint.",
          },
          {
            label: "Platform Docs",
            href: "/docs",
            description: "Technical manuals and logic documentation.",
          },
        ] satisfies NavSubLink[],
      },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ] satisfies NavLink[],
    cta: "Start Calibration",
  },

  hero: {
    title: {
      line1: "The Cognitive",
      highlight: "Engine",
    },
    description:
      "Built for the CAT 2026 99th percentile. AdaptHub maps how you think, finds where you break, and builds your path to IIM admission.",
    cta: {
      primary: "Start Calibration",
      secondary: "About AdaptHub",
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
        title: "Cognitive Locks",
        description:
          "The engine locks Level 5 questions until you prove mastery. You need 75%+ accuracy at Level 4 to earn access. Every unlock must be earned.",
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
          "AdaptHub breaks down every mistake into actionable learning signals. Each error reveals a hidden gap in logic, memory, or execution.",
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
    eyebrow: "Frequently Asked",
    title: "How AdaptHub Works",
    items: [
      {
        id: "faq-01",
        question: "How does AdaptHub help me reach the 99th percentile?",
        answer:
          "AdaptHub keeps you in the Zone of Proximal Development (ZPD). It continuously adjusts question difficulty across QA, DILR, and VARC so you stay in the 70–85% accuracy band for sustained CAT 2026 progress.",
      },
      {
        id: "faq-02",
        question: "Why does the AI Coach penalize hints?",
        answer:
          "AdaptHub penalizes passive reading. When you hit a wall, the coach does not reveal the full solution immediately; it gives progressive hints that force active reasoning before final explanation.",
      },
      {
        id: "faq-03",
        question: "Who is AdaptHub built for?",
        answer:
          "AdaptHub is built for serious CAT aspirants aiming for top IIMs. It is designed for learners who want a rigorous, adaptive study plan with deep performance feedback.",
      },
      {
        id: "faq-04",
        question: "How does AdaptHub calculate performance?",
        answer:
          "AdaptHub measures Learning Velocity — a composite view of how quickly you absorb concepts. It complements raw accuracy by tracking Distractor Errors to detect repeat failure patterns early.",
      },
      {
        id: "faq-05",
        question: "What does AdaptHub cost?",
        answer:
          "AdaptHub's core CAT 2026 platform is free forever with no credit card required. It includes performance analytics, spaced repetition queues, and adaptive routing for serious aspirants.",
      },
    ],
  },

  socraticCoach: {
    header: {
      titleLine1: "The",
      titleHighlight: "Socratic",
      titleLine2: "Engine",
      description:
        "AdaptHub never hands you the answer. It breaks down how you think and forces you to close the logical gap. Hints require active reasoning — passive reading is penalized.",
      linkText: "Explore the Adaptive Syllabus",
      pillText: "Protocol: Active Recall",
    },
    question: {
      category: "Quant",
      level: "Level 5",
      id: "ID: TIME-SPEED-DISTANCE-L5-001",
      text: "A car travels a certain distance at a constant speed. If its speed is increased by 20 km/h, the time taken to cover the distance decreases by 1 hour. If its speed is decreased by 15 km/h, the time taken increases by 1.5 hours. What is the distance?",
      options: ["175 km", "120 km", "200 km", "150 km"],
      selectedIncorrectIndex: 3,
    },
    diagnostic: {
      userSelection: "[D] 150 km",
      analysisP1:
        "You correctly equated the two time difference equations to find the original speed ",
      analysisHighlight1: "V = 50 km/h",
      analysisP2: ", but you substituted it into an erroneous travel time of ",
      analysisHighlight2: "3 hours",
      analysisP3: " instead of ",
      analysisHighlight3: "3.5 hours",
      analysisP4: " to calculate the distance.",
      errorFlag: "Error Flag: Arithmetic Error in Solving",
    },
    hint: {
      tier: "Tier 1: Socratic Prompt",
      textP1:
        "Translate each speed change into a time difference equation, then solve the system of equations for the original speed ",
      textHighlight1: "V",
      textP2: " before substituting to find the distance.",
      textP3: "You found the correct velocity ",
      textHighlight2: "V = 50",
      textP4: ". Double check your calculation for the travel time ",
      textHighlight3: "T",
      textP5: ".",
    },
  },

  footer: {
    brand: {
      name: "AdaptHub",
      quote: '"Learning should adapt to you."',
      description:
        "Telemetry-driven cognitive preparation for CAT 2026. Predict failure patterns, force active recall, and secure elite percentiles without vanity metrics.",
    },
    directory: {
      title: "Directory",
      links: [
        { label: "About", href: "/about" },
        { label: "Pricing", href: "/pricing" },
        { label: "CAT Syllabus", href: "/cat-syllabus" },
        { label: "CAT 2026 Strategy", href: "/cat-2026-exam-date" },
        {
          label: "Self-Study Guide",
          href: "/cat-preparation-without-coaching",
        },
        { label: "AdaptHub vs Competitors", href: "/adapthub-vs-competitors" },
        { label: "What is Adaptive Learning?", href: "/adaptive-learning-cat" },
        { label: "Blog", href: "/blog" },
        { label: "Docs", href: "/docs" },
        { label: "Contact", href: "/contact" },
      ],
    },
    connect: {
      title: "Connect",
      links: [
        { label: "Instagram", href: "https://www.instagram.com/adapthublabs/" },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/company/adapthub-labs/",
        },
        { label: "Support", href: "mailto:support@adapthub.in" },
      ],
    },
    system: {
      label: "System Online",
    },
    legal: {
      copyright: (year: number) => `© ${year} AdaptHub`,
      links: [
        {
          label: "Privacy Policy",
          href: "/privacy-policy",
        },
        {
          label: "Terms of Service",
          href: "/terms-of-service",
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

  velocityDashboard: {
    days: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"].map(
      (d, i) => ({ id: `day-${i}`, label: d }),
    ),
    accuracy: [40, 65, 50, 69, 74, 86, 96].map((a, i) => ({
      id: `acc-${i}`,
      value: a,
    })),
    velocity: [30, 55, 42, 60, 71, 79, 89].map((v, i) => ({
      id: `vel-${i}`,
      value: v,
    })),
  },

  streakMatrix: {
    weeks: 52,
    daysPerWeek: 7,
  },

  philosophy: {
    headline: {
      line1: "AdaptHub believes learning",
      line2: "should be",
      line3: "personal, adaptive, and",
      highlight: "intelligence-driven",
      line4: "by default.",
    },
    pillars: [
      {
        title: "Cognitive Precision",
        description:
          "AdaptHub controls information density and difficulty to maximize deep focus and accelerate breakthroughs.",
      },
      {
        title: "Active Recall",
        description:
          "Active retrieval drives learning, not passive consumption.",
      },
      {
        title: "Metacognitive Feedback",
        description:
          "AdaptHub surfaces how you think — exposing bias, hesitation, and hidden gaps for radical self-improvement.",
      },
    ],
  },

  metadata: {
    defaultTitle: "Free CAT 2026 Prep Platform with AI Coaching | AdaptHub",
    defaultDescription:
      "Prepare for CAT 2026 with adaptive study plans, AI coaching, and analytics. Build stronger reasoning, close weak areas faster, and stay free forever.",
    defaultKeywords: [
      "cat exam preparation",
      "cat preparation",
      "cat mock test analytics",
      "mba entrance exam preparation",
      "ai cat coaching",
      "adaptive learning for cat",
    ],
    indexPage: {
      title: "Free CAT 2026 Prep Platform with AI Coaching | AdaptHub",
      description:
        "Prepare for CAT 2026 with adaptive study plans, AI coaching, and performance analytics. Build stronger reasoning, close weak areas faster, and stay free forever.",
      keywords: [
        "cat exam",
        "cat exam preparation",
        "cat preparation online",
        "cat coaching platform",
      ],
    },
    catSyllabus: {
      title: "CAT Syllabus 2026: Full Breakdown | AdaptHub",
      description:
        "Get the detailed CAT syllabus mapping for 2026. Data-driven topic weightage analysis for Quantitative Aptitude, DILR, and VARC sections. Learn more.",
      keywords: [
        "cat syllabus",
        "cat syllabus 2026",
        "cat exam topics",
        "cat qa syllabus",
        "cat dilr syllabus",
        "cat varc syllabus",
      ],
    },
    pricing: {
      title: "AdaptHub is Lifetime Free — No Credit Card",
      description:
        "AdaptHub is Lifetime Free — no credit card needed. Get full access to adaptive study plans, AI coaching, and CAT analytics at ₹0. Sign up now.",
      keywords: [
        "free cat preparation",
        "free cat coaching",
        "adapthub pricing",
        "affordable cat prep",
        "cat mocks free",
      ],
    },
    about: {
      title: "How AdaptHub's ZPD Algorithm Works | About",
      description:
        "Learn how AdaptHub uses the Zone of Proximal Development (ZPD) algorithm to help CAT aspirants reach the 99th percentile. See how our AI works.",
      keywords: [
        "adapthub about",
        "adapthub founder",
        "about adapthub",
        "adaptive learning platform",
      ],
    },
    contact: {
      title: "Contact AdaptHub | Platform Support",
      description:
        "Reach AdaptHub for platform help, feedback, or business queries. Every message gets a personal response.",
      keywords: [
        "adapthub contact",
        "adapthub support",
        "adapthub email",
        "contact adapthub",
      ],
    },
    blog: {
      title: "CAT Prep Blog | Strategy & Insights | AdaptHub",
      description:
        "CAT 2026 strategy breakdowns, logic analysis, and cognitive techniques to accelerate your percentile growth. Start reading for free.",
      keywords: [
        "cat preparation blog",
        "cat strategy 2026",
        "mba entrance tips",
        "how to crack cat",
        "cat 99 percentile strategy",
      ],
    },
    docs: {
      title: "AdaptHub Docs | How to Use the Platform",
      description:
        "Step-by-step guides for using AdaptHub. Learn how adaptive difficulty, AI coaching, and performance analytics work. Start free today.",
      keywords: [
        "adapthub documentation",
        "adapthub guide",
        "how to use adapthub",
        "adapthub tutorial",
        "adapthub help",
      ],
    },
    privacyPolicy: {
      title: "Privacy Policy | AdaptHub",
      description:
        "Privacy Policy for AdaptHub. Learn how we collect, use, and protect your data securely.",
      keywords: [
        "adapthub privacy policy",
        "privacy policy",
        "data protection",
        "data usage",
      ],
    },
    termsOfService: {
      title: "Terms of Service | AdaptHub",
      description:
        "Terms of Service for AdaptHub. Please read these terms carefully before using our adaptive learning platform.",
      keywords: [
        "adapthub terms of service",
        "terms of service",
        "terms of use",
        "user agreement",
      ],
    },
    ogImage: "/og-image.avif",
    ogImageFallback: "/og-image.png",
  },

  links: {
    app: "https://app.adapthub.in/",
    privacy: "/privacy-policy",
    terms: "/terms-of-service",
    support: "mailto:support@adapthub.in",
  },

  assets: {
    logoLight: "/logo-light.svg",
    logoDark: "/logo-dark.svg",
    heroImage: "/hero.avif",
    noiseTexture: "/noise.svg",
  },
};
