export const CONTENT = {
  global: {
    brandName: "AdaptHub",
    logoAlt: "AdaptHub Adaptive Learning Platform Logo",
  },

  nav: {
    links: [
      { label: "Philosophy", href: "/#philosophy" },
      { label: "Methodology", href: "/#methodology" },
      { label: "Mastery", href: "/#mastery" },
      { label: "Blog", href: "/blog" },
      { label: "Docs", href: "/docs" },
      { label: "Pricing", href: "/pricing" },
      { label: "CAT Syllabus", href: "/cat-syllabus" },
    ],
    cta: "Start Calibration",
  },

  hero: {
    title: {
      line1: "The Cognitive",
      highlight: "Engine",
    },
    description:
      "Built for the CAT 99th percentile. AdaptHub maps how you think, finds where you break, and builds your path to IIM admission.",
    cta: {
      primary: "Start Calibration",
      secondary: "See How It Works",
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
          "AdaptHub targets the 99th percentile by keeping you in the Zone of Proximal Development (ZPD). Our algorithm continuously adjusts question difficulty across QA, DILR, and VARC. This keeps you in the 70–85% target accuracy band — the proven zone for maximum learning velocity.",
      },
      {
        id: "faq-02",
        question: "Why does the AI Coach penalize hints?",
        answer:
          "AdaptHub penalizes passive reading. When you hit a wall, the engine refuses to hand you the answer. Instead, it deploys progressive hints — like 'Check the boundary values at x=0' — forcing active recall and rewiring how you respond to trap questions.",
      },
      {
        id: "faq-03",
        question: "Who is AdaptHub built for?",
        answer:
          "AdaptHub is built strictly for elite CAT aspirants targeting the top IIMs. Of the 2.58 lakh candidates who appeared in CAT 2025, fewer than 30 scored 99.99 percentile. AdaptHub is built for that top 1%.",
      },
      {
        id: "faq-04",
        question: "How does AdaptHub calculate performance?",
        answer:
          "AdaptHub measures your Learning Velocity — a composite score of your conceptual absorption speed over a 7-day rolling window. The system rejects raw accuracy as a vanity metric, and instead monitors Distractor Errors to predict and prevent exact failure patterns on exam day.",
      },
      {
        id: "faq-05",
        question: "What does AdaptHub cost?",
        answer:
          "AdaptHub is ₹0 forever, with no credit card required. Elite metric analysis, Spaced Repetition Queues, and adaptive routing should be open to every serious aspirant — not locked behind a paywall.",
      },
    ],
  },

  socraticCoach: {
    header: {
      titleLine1: "The",
      titleHighlight: "Socratic",
      titleLine2: "Engine",
      description:
        "AdaptHub never hands you the answer. It breaks down how you think and forces you to close the logical gap. Passive reading earns a penalty.",
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
        "Adaptive learning for CAT and MBA entrance exams. AdaptHub builds personalized study plans, AI coaching, and performance analytics for ambitious students.",
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
      copyright: (year: number) => `© ${year} ADAPTHUB`,
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
    defaultTitle: "Free CAT Prep with AI Coaching | AdaptHub",
    defaultDescription:
      "Prepare for CAT with adaptive study plans, AI coaching, and analytics. Get personalized paths built to improve your percentile. Start for free.",
    defaultKeywords: [
      "cat exam preparation",
      "cat preparation",
      "cat mock test analytics",
      "mba entrance exam preparation",
      "ai cat coaching",
      "adaptive learning for cat",
    ],
    indexPage: {
      title: "Free CAT Prep with AI Coaching | AdaptHub",
      description:
        "Prepare for CAT 2026 with adaptive study plans, AI coaching, and performance analytics. Overcome your exact weaknesses. Start free today.",
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
    adapthubVsCompetitors: {
      title: "AdaptHub vs Traditional CAT Coaching (iQuanta, TIME, IMS, Cracku)",
      description:
        "Compare AdaptHub's free, AI-driven adaptive learning engine against traditional paid coaching models like iQuanta, TIME, IMS, Career Launcher, Elitesgrid, and Cracku.",
      keywords: [
        "adapthub vs iquanta",
        "adapthub vs time",
        "adapthub vs ims",
        "adapthub vs career launcher",
        "adapthub vs cracku",
        "adapthub vs elitesgrid",
        "adaptive learning vs traditional coaching",
      ],
    },
    adaptiveLearningCat: {
      title: "What is Adaptive Learning in CAT Prep? | AdaptHub",
      description:
        "Adaptive learning in CAT preparation is an AI method that continuously adjusts question difficulty to each student's cognitive gaps. AdaptHub uses a ZPD algorithm to maximise learning velocity — completely free.",
      keywords: [
        "adaptive learning cat",
        "what is adaptive learning",
        "zpd algorithm cat",
        "adaptive testing cat exam",
        "personalised cat coaching",
        "ai cat preparation",
      ],
    },
    cat2026ExamDate: {
      title: "CAT 2026 Exam Date, Notification & Syllabus | AdaptHub",
      description:
        "Everything you need to know about the CAT 2026 exam date, registration timeline, eligibility, and expected syllabus changes. Start preparing early.",
      keywords: [
        "cat 2026 exam date",
        "cat 2026 notification",
        "cat 2026 registration",
        "cat 2026 syllabus",
      ],
    },
    catPreparationWithoutCoaching: {
      title: "How to Prepare for CAT Without Coaching | AdaptHub",
      description:
        "A complete guide to cracking the CAT exam without paid coaching. Discover free study plans, adaptive learning tools, and self-study strategies to score 99+ percentile.",
      keywords: [
        "prepare for cat without coaching",
        "cat self study",
        "free cat coaching",
        "how to crack cat at home",
        "cat preparation guide",
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
