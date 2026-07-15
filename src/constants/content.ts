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
            label: "CAT 2026 Study Plan",
            href: "/cat-study-plan-2026",
            description:
              "Phase-wise free timetable with mock and adaptive blocks.",
          },
          {
            label: "Mock Analysis Framework",
            href: "/cat-mock-analysis",
            description:
              "Turn every mock into percentile growth with error taxonomy.",
          },
          {
            label: "VARC Strategy",
            href: "/cat-varc-strategy",
            description: "RC-first accuracy plan for CAT Verbal.",
          },
          {
            label: "DILR Strategy",
            href: "/cat-dilr-strategy",
            description: "Set selection and trap avoidance for LRDI.",
          },
          {
            label: "Quant Strategy",
            href: "/cat-quant-strategy",
            description: "Arithmetic-first QA plan with ZPD practice.",
          },
          {
            label: "99 Percentile Blueprint",
            href: "/how-to-score-99-percentile-cat",
            description: "Section targets, mocks, and free adaptive loop.",
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
      line1: "Adaptive CAT Prep",
      highlight: "Engine",
    },
    description:
      "Free AI-powered adaptive learning for CAT 2026. AdaptHub maps how you think across QA, DILR & VARC, closes weak areas faster, and builds your path to the 99th percentile — and IIM admission.",
    cta: {
      primary: "Start Free Calibration",
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
          "Personalized CAT study plans recalibrated in real time from accuracy, speed, and concept gaps across QA, DILR, and VARC.",
        visualCheck: {
          deltaValue: "+14.2%",
        },
      },
      {
        id: "02",
        title: "Performance Analytics",
        description:
          "Granular CAT mock-style analytics across accuracy, learning velocity, and topic mastery — not vanity scores.",
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
          "The engine locks Level 5 CAT questions until you prove mastery. You need 75%+ accuracy at Level 4 to earn access. Every unlock must be earned.",
      },
      {
        id: "04",
        title: "Socratic AI Coach",
        description:
          "Context-aware AI coaching that targets your specific CAT error patterns and forces active recall before revealing solutions.",
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
        question: "How does AdaptHub help me reach the 99th percentile in CAT?",
        answer:
          "AdaptHub keeps you in the Zone of Proximal Development (ZPD). It continuously adjusts question difficulty across QA, DILR, and VARC so you stay in the 70–85% accuracy band for sustained CAT 2026 progress — the zone where learning velocity peaks.",
      },
      {
        id: "faq-02",
        question: "Why does the AI Coach penalize hints during CAT practice?",
        answer:
          "AdaptHub penalizes passive reading. When you hit a wall, the Socratic AI coach does not reveal the full solution immediately; it gives progressive hints that force active reasoning before final explanation — the same skill CAT rewards under time pressure.",
      },
      {
        id: "faq-03",
        question: "Who is AdaptHub built for?",
        answer:
          "AdaptHub is built for serious CAT aspirants aiming for top IIMs, including self-study students who want free online CAT coaching with a rigorous adaptive study plan and deep performance feedback.",
      },
      {
        id: "faq-04",
        question: "How does AdaptHub calculate CAT performance?",
        answer:
          "AdaptHub measures Learning Velocity — a composite view of how quickly you absorb concepts. It complements raw accuracy by tracking Distractor Errors to detect repeat failure patterns early across VARC, DILR, and QA.",
      },
      {
        id: "faq-05",
        question: "Is AdaptHub free for CAT 2026 preparation?",
        answer:
          "Yes. AdaptHub's core CAT 2026 platform is free forever with no credit card required. It includes adaptive routing, performance analytics, spaced repetition queues, and Socratic AI coaching for serious aspirants.",
      },
      {
        id: "faq-06",
        question: "Can I prepare for CAT without paid coaching using AdaptHub?",
        answer:
          "Yes. Many 99+ percentilers are self-taught. AdaptHub replaces static batch coaching with personalized adaptive practice, diagnostics, and AI coaching — so you can prepare for CAT at home without expensive institute fees.",
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
        { label: "CAT 2026 Study Plan", href: "/cat-study-plan-2026" },
        { label: "Mock Analysis Framework", href: "/cat-mock-analysis" },
        { label: "VARC Strategy", href: "/cat-varc-strategy" },
        { label: "DILR Strategy", href: "/cat-dilr-strategy" },
        { label: "Quant Strategy", href: "/cat-quant-strategy" },
        {
          label: "99 Percentile Blueprint",
          href: "/how-to-score-99-percentile-cat",
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
    // Titles targeted ~50–60 chars; descriptions ~140–155 chars (SERP-safe).
    defaultTitle: "Free CAT 2026 Prep with AI Adaptive Learning | AdaptHub",
    defaultDescription:
      "Free CAT 2026 prep with adaptive study plans, AI coaching, and analytics for QA, DILR & VARC. Close weak areas faster — no credit card.",
    defaultKeywords: [
      "cat exam preparation",
      "cat preparation",
      "cat 2026 preparation",
      "free cat coaching",
      "cat preparation online",
      "adaptive learning for cat",
      "ai cat coaching",
      "mba entrance exam preparation",
      "cat mock test analytics",
      "cat self study",
    ],
    indexPage: {
      title: "Free CAT 2026 Prep with AI Adaptive Learning | AdaptHub",
      description:
        "Free CAT 2026 prep with adaptive study plans, Socratic AI coaching, and analytics for QA, DILR & VARC. Built for 99th percentile — lifetime free.",
      keywords: [
        "cat exam preparation",
        "cat 2026 preparation",
        "free cat coaching",
        "cat preparation online",
        "adaptive learning cat",
        "ai cat coaching",
        "cat prep platform",
        "mba entrance exam",
      ],
    },
    catSyllabus: {
      title: "CAT Syllabus 2026: VARC, DILR & QA Topics | AdaptHub",
      description:
        "Full CAT syllabus 2026 with topic weightage for QA, DILR, and VARC. 66 questions, 120 minutes, marking scheme, and high-yield topics.",
      keywords: [
        "cat syllabus",
        "cat syllabus 2026",
        "cat exam topics",
        "cat qa syllabus",
        "cat dilr syllabus",
        "cat varc syllabus",
        "cat exam pattern 2026",
        "cat marking scheme",
      ],
    },
    pricing: {
      title: "Free CAT Preparation Online — Lifetime Free | AdaptHub",
      description:
        "AdaptHub is lifetime free CAT preparation — no credit card. Adaptive study plans, AI coaching, and analytics at ₹0 for every aspirant.",
      keywords: [
        "free cat preparation",
        "free cat coaching",
        "free cat preparation online",
        "adapthub pricing",
        "affordable cat prep",
        "cat mocks free",
        "lifetime free cat platform",
      ],
    },
    about: {
      title: "How AdaptHub's ZPD Adaptive Algorithm Works | About",
      description:
        "How AdaptHub uses Zone of Proximal Development (ZPD) adaptive learning to help CAT aspirants hit the 99th percentile with AI coaching.",
      keywords: [
        "adapthub about",
        "zpd algorithm cat",
        "adaptive learning platform",
        "ai cat coaching methodology",
        "about adapthub",
        "zone of proximal development cat",
      ],
    },
    contact: {
      title: "Contact AdaptHub | Free CAT Prep Support",
      description:
        "Contact AdaptHub for platform help, feedback, or partnerships on free adaptive CAT prep. Every message gets a personal response.",
      keywords: [
        "adapthub contact",
        "adapthub support",
        "adapthub email",
        "contact adapthub",
      ],
    },
    blog: {
      title: "CAT Prep Blog 2026 | Strategy & Section Insights",
      description:
        "CAT 2026 strategy, VARC/DILR/QA breakdowns, and cognitive techniques to grow percentile. Free AdaptHub strategy blog.",
      keywords: [
        "cat preparation blog",
        "cat strategy 2026",
        "mba entrance tips",
        "how to crack cat",
        "cat 99 percentile strategy",
        "varc strategy cat",
        "dilr tips cat",
      ],
    },
    docs: {
      title: "AdaptHub Docs | Adaptive CAT Prep Platform Guide",
      description:
        "Guides for AdaptHub adaptive difficulty, AI coach, spaced repetition, and analytics. Start free CAT prep today.",
      keywords: [
        "adapthub documentation",
        "adapthub guide",
        "how to use adapthub",
        "adapthub tutorial",
        "adapthub help",
      ],
    },
    privacyPolicy: {
      title: "Privacy Policy | AdaptHub CAT Prep Platform",
      description:
        "How AdaptHub collects, uses, and protects data on our free adaptive CAT preparation platform.",
      keywords: [
        "adapthub privacy policy",
        "privacy policy",
        "data protection",
        "data usage",
      ],
    },
    termsOfService: {
      title: "Terms of Service | AdaptHub CAT Prep Platform",
      description:
        "Terms of Service for AdaptHub free adaptive learning platform for CAT exam preparation.",
      keywords: [
        "adapthub terms of service",
        "terms of service",
        "terms of use",
        "user agreement",
      ],
    },
    ogImageFallback: "/og-image.png",
  },

  links: {
    app: "https://app.adapthub.in",
    privacy: "/privacy-policy",
    terms: "/terms-of-service",
    support: "mailto:support@adapthub.in",
  },

  assets: {
    logoLight: "/logo-light.svg",
    heroImage: "/hero.avif",
    noiseTexture: "/noise.svg",
  },

  /**
   * Pricing page content — moved from inline arrays in src/pages/pricing.astro
   * These power both the FAQ accordion and the
   * "Everything Included at ₹0" feature grid, plus the FAQPage JSON-LD schema.
   */
  pricing: {
    faqs: [
      {
        question: "Is AdaptHub really free?",
        answer:
          "Yes. AdaptHub is Lifetime Free — no credit card needed. There are no paywalls, no hidden subscription tiers, and no trial periods. The full adaptive engine, concept library, and analytics dashboard are open to every serious CAT aspirant at ₹0.",
      },
      {
        question: "Why is it free?",
        answer:
          "Precision learning tools should be accessible, not paywalled. The market is full of static courses and expensive test series. AdaptHub was built to close cognitive gaps in CAT prep — not to build another EdTech subscription. The goal is impact at scale.",
      },
      {
        question: "Will it stay free forever?",
        answer:
          "Yes. The core engine — daily personalized study plans, AI Coach, and granular analytics — stays free. AdaptHub may add enterprise tools for coaching institutes later. Individual aspirant access stays free, always.",
      },
      {
        question: "Do I need a credit card to start?",
        answer:
          "No. You only need an email to create an account and begin your initial diagnostic calibration. No payment details required.",
      },
    ],
    features: [
      { id: "01", name: "Dynamic Daily Study Plans" },
      { id: "02", name: "Adaptive Difficulty (ZPD)" },
      { id: "03", name: "Full Concept Library (QA, DILR, VARC)" },
      { id: "04", name: "Granular Performance Analytics" },
      { id: "05", name: "Socratic AI Mistake Analysis" },
      { id: "06", name: "Mastery-Based Cognitive Locks" },
    ],
  },
};
