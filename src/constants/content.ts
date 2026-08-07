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
    cta: "Start practicing",
  },

  hero: {
    title: {
      line1: "CAT Prep That",
      highlight: "Adapts to You",
    },
    description:
      "100% free AI adaptive practice for CAT 2026. A 30–45 minute diagnostic finds your Zone of Proximal Development across QA, DILR, and VARC. Daily plans target your weak areas, two-tier AI hints teach instead of spoon-feeding, and score telemetry shows which direction your percentile is moving.",
    cta: {
      primary: "Start practicing",
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
        title: "Score Telemetry",
        description:
          "CAT 2026 score telemetry that tracks where your percentile is heading: accuracy, learning velocity, and topic mastery across QA, DILR, and VARC. Not vanity scores.",
        tabs: ["Accuracy", "Growth"],
        progress: {
          accuracy: { label: "Accuracy", value: 94 },
          growth: { label: "Growth", value: 42 },
        },
      },
      {
        id: "03",
        title: "Mastery-Based Levels",
        description:
          "5 difficulty levels per topic. Prove 75%+ accuracy at your current level to unlock the next. Every level-up is earned through demonstrated mastery, not time spent.",
      },
      {
        id: "04",
        title: "AI Hints & Explanations",
        description:
          "Two-tier hints that teach instead of spoon-feeding. A strategic nudge gets you thinking; the full explanation shows you the way. Using a hint means no level progress. Earn your mastery.",
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
          "Difficulty adjusts continuously to keep you in the optimal learning zone, where challenge and comprehension intersect for maximum growth.",
      },
      {
        id: "roadmap",
        title: "Adaptive Daily Plan",
        subtitle: "Personalized Progress",
        description:
          "Your daily practice adapts continuously, prioritizing the topics and difficulty levels required to close your gaps and unlock the next level of mastery.",
      },
      {
        id: "audit",
        title: "Learning Diagnostics",
        subtitle: "Deep Insight",
        description:
          "AdaptHub breaks down every mistake into actionable learning signals. Each error reveals a hidden gap in logic, memory, or execution.",
      },
      {
        id: "library",
        title: "Concept Library",
        subtitle: "Learn, Don't Just Practise",
        description:
          "Access curated articles tailored to your current level across QA, DILR, and VARC. When a topic exposes a gap, review the concept before retrying. Build deep understanding instead of muscle memory.",
      },
    ],
    visuals: {
      diagnostics: {
        memory: "MEMORY",
        logic: "LOGIC",
        speed: "SPEED",
        focus: "FOCUS",
        score: { label: "SCORE", value: "98.2" },
        delta: { label: "DELTA", value: "+4%" },
      },
      roadmap: {
        gapDetected: "Gap found",
        optimizing: "Rerouting",
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
          "AdaptHub keeps you in the Zone of Proximal Development (ZPD). It continuously adjusts question difficulty across QA, DILR, and VARC so you stay in the 70–85% accuracy band for sustained CAT 2026 progress, the zone where learning velocity peaks.",
      },
      {
        id: "faq-02",
        question: "How do the AI hints work?",
        answer:
          "AdaptHub uses a two-tier hint system. Tier 1 gives you a strategic nudge, a conceptual push to get you thinking. Tier 2 reveals the full explanation. Using either hint means that attempt won't count toward leveling up, so you earn your mastery honestly.",
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
          "AdaptHub measures Learning Velocity, a composite view of how quickly you absorb concepts. It complements raw accuracy by tracking Distractor Errors to detect repeat failure patterns early across VARC, DILR, and QA.",
      },
      {
        id: "faq-05",
        question: "Is AdaptHub free for CAT 2026 preparation?",
        answer:
          "Yes. AdaptHub's core CAT 2026 platform is free. It includes adaptive routing, performance analytics, spaced repetition queues, and AI hints and concept explanations for serious aspirants.",
      },
      {
        id: "faq-06",
        question: "Can I prepare for CAT without paid coaching using AdaptHub?",
        answer:
          "Yes. Many 99+ percentilers are self-taught. AdaptHub replaces static batch coaching with personalized adaptive practice, diagnostics, and AI coaching. So you can prepare for CAT at home without expensive institute fees.",
      },
      {
        id: "faq-07",
        question: "What happens after I start practicing?",
        answer:
          "You will sign in with Google, complete a quick profile, and take the adaptive diagnostic. Based on your results, AdaptHub builds your personalized daily plan. Each session ends with a reflection: AI insights, mood tracking, and error analysis so you know exactly what to work on next.",
      },
    ],
  },

  coachDemo: {
    header: {
      titleLine1: "The",
      titleHighlight: "AI",
      titleLine2: "Coach",
      description:
        "The AI coach gives you two chances to solve on your own. Tier 1 is a strategic nudge, a conceptual push. Tier 2 is the full explanation. Using a hint means no level progress for that question.",
      linkText: "Explore the Adaptive Syllabus",
      pillText: "Two-Tier Hint System",
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
      errorFlag: "Flag: Calculation slip",
    },
    hint: {
      tier: "Tier 1: Guided Hint",
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
    errorAnalysis: {
      title: "Why Your Answer Was Incorrect",
      distractorExplanation:
        "Option D (150 km) is the most common trap among aspirants. It uses the correct speed but plugs in a wrong travel time, a classic false-premise error that distractor tagging flags instantly.",
      whyWrongQuestion: "Why do you think you got this wrong?",
      studentReport: "Calculation",
      systemAnalysis:
        "Our analysis: Conceptual gap. You set up the equations correctly but used the wrong time value. Review the Time-Speed-Distance concept before retrying.",
    },
  },

  footer: {
    brand: {
      name: "AdaptHub",
      quote: '"Learning should adapt to you."',
      description:
        "Adaptive CAT prep with daily practice plans, AI hints, and progress tracking. Built for serious aspirants who want to improve, not just practice.",
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
        { label: "Editorial Policy", href: "/editorial-policy" },
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
    scrubber: {
      hint: "Drag the chart or focus it and use arrow keys to inspect each day.",
      instructionLabel: "Scrub through 7-day learning telemetry",
      accuracyLabel: "Accuracy",
      velocityLabel: "Velocity",
      deltaLabel: "Day-over-day",
      bands: {
        zpd: "ZPD growth band · 70–85%",
        comfort: "Comfort zone — too easy to grow",
        overreach: "Overreach — collapse risk",
      },
    },
  },

  streakMatrix: {
    weeks: 52,
    daysPerWeek: 7,
    readout: {
      instructionLabel: "Scrub through 52 weeks of practice",
      windowLabel: "8-week window",
      weekLabel: "Week",
      sessionsLabel: "Sessions",
      minutesLabel: "Min in ZPD",
      accuracyLabel: "Avg accuracy",
      streakLabel: "Best streak",
    },
  },

  howItWorks: {
    headline: {
      line1: "How AdaptHub",
      line2: "Works",
    },
    steps: [
      {
        step: "01",
        title: "Diagnostic Calibration",
        description:
          "Start with a multi-section adaptive diagnostic (~30–45 minutes) across QA, DILR, and VARC. The algorithm finds your baseline in each topic, your Zone of Proximal Development.",
      },
      {
        step: "02",
        title: "Daily Adaptive Practice",
        description:
          "Get a structured daily plan (Warm-Up, Core Focus, Integration) targeting your weak areas. Difficulty adjusts with every answer. 15 focused minutes a day beats 3 hours of unfocused study.",
      },
      {
        step: "03",
        title: "Track Real Progress",
        description:
          "Quality streaks, learning velocity, mastered levels, and error forensics that explain why you got it wrong. CAT 2026 score telemetry maps your practice to percentile movement, backed by 10,000+ curated questions.",
      },
      {
        step: "04",
        title: "Reflect & Improve",
        description:
          "After every session, get an AI-generated insight about your performance. Track your mood, review error patterns with specific tips for each mistake type, and see your quality streak. Improvement comes from understanding your errors, not just counting hours.",
      },
    ],
  },

  trustStrip: {
    questions: "10,000+ curated questions",
    free: "Free for all aspirants",
    sections: "QA · DILR · VARC",
  },

  ctaBand: {
    headline: "Start practicing",
    description:
      "Full adaptive engine, AI hints, and analytics. Completely free.",
    cta: "Start practicing",
  },

  metadata: {
    // Titles targeted ~50–60 chars; descriptions ~140–155 chars (SERP-safe).
    defaultTitle: "Free CAT 2026 Prep with AI Adaptive Learning | AdaptHub",
    defaultDescription:
      "Free CAT 2026 prep with ZPD-calibrated practice, two-tier AI hints, and score telemetry for QA, DILR & VARC. Close weak areas faster. Start today.",
    indexPage: {
      title: "Free CAT 2026 Prep — Adaptive Practice & AI Hints | AdaptHub",
      description:
        "Free CAT 2026 prep: ZPD-calibrated daily practice, two-tier AI hints, and score telemetry across QA, DILR & VARC. 10,000+ questions at ₹0.",
    },
    catSyllabus: {
      title: "CAT Syllabus 2026: VARC, DILR & QA Topics | AdaptHub",
      description:
        "Full CAT syllabus 2026 with topic weightage for QA, DILR, and VARC. 66 questions, 120 minutes, marking scheme, and high-yield topics.",
    },
    pricing: {
      title: "Free CAT Preparation Online | AdaptHub",
      description:
        "Free CAT preparation: adaptive study plans, AI coaching, and analytics at ₹0 for every aspirant.",
    },
    about: {
      title: "How AdaptHub's ZPD Adaptive Algorithm Works | About",
      description:
        "How AdaptHub uses Zone of Proximal Development (ZPD) adaptive learning to help CAT aspirants hit the 99th percentile with AI coaching.",
    },
    contact: {
      title: "Contact AdaptHub | Free CAT Prep Support",
      description:
        "Contact AdaptHub for platform help, feedback, or partnerships on free adaptive CAT prep. Every message gets a personal response.",
    },
    blog: {
      title: "CAT Prep Blog 2026 | Strategy & Section Insights",
      description:
        "CAT 2026 strategy, VARC/DILR/QA breakdowns, and cognitive techniques to grow percentile. Free AdaptHub strategy blog.",
    },
    docs: {
      title: "AdaptHub Docs | Adaptive CAT Practice Platform Guide",
      description:
        "Guides for AdaptHub adaptive difficulty, AI coach, spaced repetition, and analytics. Start adaptive CAT practice today.",
    },
    privacyPolicy: {
      title: "Privacy Policy | AdaptHub CAT Prep Platform",
      description:
        "How AdaptHub collects, uses, and protects data on our free adaptive CAT preparation platform.",
    },
    termsOfService: {
      title: "Terms of Service | AdaptHub CAT Prep Platform",
      description:
        "Terms of Service for AdaptHub free adaptive learning platform for CAT exam preparation.",
    },
    ogImageFallback: "/og-image.png",
  },

  links: {
    app: "https://app.adapthub.in",
    login: "https://app.adapthub.in/login",
    support: "mailto:support@adapthub.in",
  },

  assets: {
    logoLight: "/logo-light.svg",
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
          "Yes. AdaptHub is free. No paywalls, no hidden tiers. The full adaptive engine, question bank, and analytics dashboard are open to every serious CAT aspirant at ₹0.",
      },
      {
        question: "Why is it free?",
        answer:
          "Precision learning tools should be accessible, not paywalled. The market is full of static courses and expensive test series. AdaptHub was built to close cognitive gaps in CAT prep, not to build another EdTech subscription. The goal is impact at scale.",
      },
      {
        question: "Will it stay free?",
        answer:
          "Yes. The core engine, daily personalized study plans, AI Coach, and granular analytics, stays free. AdaptHub may add enterprise tools for coaching institutes later. Aspirant access stays free, always.",
      },
      {
        question: "How do I create an account?",
        answer:
          "Sign in with your Google account to get started. No payment details needed. Just sign in and begin your diagnostic calibration.",
      },
    ],
    features: [
      { id: "01", name: "Dynamic Daily Study Plans" },
      { id: "02", name: "Adaptive Difficulty (ZPD)" },
      { id: "03", name: "Full Concept Library (QA, DILR, VARC)" },
      { id: "04", name: "Granular Performance Analytics" },
      { id: "05", name: "Error Classification & AI Feedback" },
      { id: "06", name: "Mastery-Based Levels" },
      { id: "07", name: "Session Reflection & Mood Tracking" },
      { id: "08", name: "Post-Session Error Forensics" },
    ],
  },
};
