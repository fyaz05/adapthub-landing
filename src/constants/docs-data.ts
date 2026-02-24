export interface DocSection {
  slug: string;
  sysRef: string;
  title: string;
  description: string;
  body: { heading?: string; paragraphs: string[] }[];
  faqs?: { question: string; answer: string }[];
}

export const DOC_SECTIONS: DocSection[] = [
  {
    slug: "calibration-sequence",
    sysRef: "01.00",
    title: "Calibration Sequence",
    description:
      "How the Adaptive Diagnostic works, how the ZPD algorithm maps your cognitive baseline, and what the output means for your learning path.",
    body: [
      {
        paragraphs: [
          "The first time you authorize access to the AdaptHub engine, you bypass traditional static testing. The system initiates an <strong>Adaptive Diagnostic</strong> spanning QA, DILR, and VARC — beginning at Difficulty Level 3 (Intermediate).",
          "The engine is not measuring your absolute score. It deploys the <strong>Zone of Proximal Development (ZPD) algorithm</strong> to locate your cognitive ceiling. Every correct answer escalates difficulty by one level; every incorrect answer drops it by one. The diagnostic converges in approximately 15–20 questions, producing a baseline proficiency matrix per topic — not a raw score, but a calibrated starting coordinate for your learning engine.",
        ],
      },
      {
        heading: "What the Diagnostic Produces",
        paragraphs: [
          "The output is a <strong>per-topic proficiency map</strong>: your current operating level in each QA sub-domain (Arithmetic, Algebra, Geometry, etc.), each DILR category (Sequencing, Arrangement, Games & Tournaments, etc.), and each VARC type (RC Inference, RC Title, Parajumble, Summary). This map is the seed from which every subsequent Daily Module is generated.",
          "The diagnostic does not produce a percentile estimate. Percentile is a comparison metric; your diagnostic output is an absolute position on a content difficulty scale. The engine uses this position to determine your entry point into the learning curriculum — not to rank you against other students.",
        ],
      },
      {
        heading: "If the Baseline Feels Wrong",
        paragraphs: [
          "The initial matrix cannot be manually flushed. The engine self-corrects continuously via Bayesian updating — each new question answer updates the probability distribution over your true proficiency level. If you believe your diagnostic result was skewed (due to fatigue, distraction, or a bad day), simply complete three Daily Modules at your current level. The system detects statistical anomalies and automatically recalibrates your proficiency estimate by Day 4.",
          "Do not attempt to game the diagnostic by intentionally answering incorrectly. The algorithm is designed to detect implausible response patterns. If your responses are inconsistent with any coherent skill level, the system will flag the calibration and initiate a re-test on your next login.",
        ],
      },
    ],
  },
  {
    slug: "daily-learning-module",
    sysRef: "02.00",
    title: "Daily Learning Module",
    description:
      "The four-phase session structure — Warm-up, Core Focus, Integration, Reflection — and why each phase exists.",
    body: [
      {
        paragraphs: [
          "Each session is a structured four-phase module: <strong>Warm-up → Core Focus → Integration → Reflection</strong>. This is not arbitrary sequencing — it mirrors the neurological rhythm of optimal retrieval practice as established by cognitive science research on the testing effect and spaced repetition.",
        ],
      },
      {
        heading: "Phase 1: Warm-up",
        paragraphs: [
          "<strong>Warm-up</strong> surfaces questions from the Spaced Repetition Queue (SRS) — concepts you previously answered incorrectly or rated low confidence on. The number of warm-up questions varies by your SRS backlog, typically 3–8 questions. This phase primes active retrieval and re-engages memory traces before new material is introduced.",
          "Warm-up questions are drawn from across your full topic history, not just the current session's focus area. This cross-topic priming is intentional: it reduces the compartmentalization that leads to poor integration performance in the actual CAT paper.",
        ],
      },
      {
        heading: "Phase 2: Core Focus",
        paragraphs: [
          "<strong>Core Focus</strong> presents new questions at your current mastery level for the day's designated topic or topic cluster. This is the primary skill-building phase. Questions are drawn from the topic cluster with the highest leverage for your current proficiency level — determined by your accuracy history and the proximity of each topic to an unlock threshold.",
          "The engine applies the ZPD band here: questions are targeted at the difficulty level just above your current operating ceiling, keeping accuracy in the 70–85% range. If you hit above 90% in Core Focus, the engine will escalate difficulty mid-session.",
        ],
      },
      {
        heading: "Phase 3: Integration",
        paragraphs: [
          "<strong>Integration</strong> introduces mixed-topic questions that require synthesizing concepts across domains. For example, a question that requires both Ratio reasoning and Work-Time logic, or a RC passage followed by a Parajumble that shares thematic content. This phase tests transfer — your ability to apply learned patterns in unfamiliar combinations.",
        ],
      },
      {
        heading: "Phase 4: Reflection",
        paragraphs: [
          "<strong>Reflection</strong> generates a session summary: questions attempted, accuracy by phase, hints used, time distribution, and performance trend delta versus your 7-day baseline. Every recommendation surfaced in Reflection includes its data source — if the engine recommends revisiting a topic, it will state the exact accuracy and attempt count that triggered the recommendation.",
        ],
      },
    ],
  },
  {
    slug: "mastery-progression",
    sysRef: "03.00",
    title: "Mastery-Based Progression",
    description:
      "The five-level difficulty ladder, unlock conditions, proficiency statuses, and the Hint Penalty mechanic.",
    body: [
      {
        paragraphs: [
          "Access to harder content is locked behind verified mastery. The engine uses five difficulty levels mapped to distinct proficiency thresholds. Progress through these levels is non-negotiable: the algorithm will not advance you until your performance data justifies it.",
        ],
      },
      {
        heading: "The Five Levels",
        paragraphs: [
          "<strong>Level 1 — Beginner:</strong> Foundational concepts. Single-step problems. Direct formula application. <br/><strong>Level 2 — Easy:</strong> Two to three step reasoning. Standard question formats. Minimal trap options. <br/><strong>Level 3 — Intermediate:</strong> The diagnostic baseline. Multi-step problems with one non-obvious constraint. <br/><strong>Level 4 — Advanced:</strong> Complex constraint sets. Significant trap density. Requires deliberate strategy selection. <br/><strong>Level 5 — Expert:</strong> CAT-equivalent difficulty. Requires synthesis across concepts and robust distractor immunity.",
        ],
      },
      {
        heading: "Unlock Conditions",
        paragraphs: [
          "Level N unlocks only when your accuracy at Level N−1 exceeds <strong>75%</strong>, calculated over a statistically significant sample (minimum 8 attempts). A single high-performance session is not sufficient — the system requires sustained performance across multiple sessions to confirm genuine mastery rather than a lucky run.",
          "If your accuracy drops below <strong>60%</strong> after five or more attempts at a given level, the engine will surface a targeted recommendation to revisit weak topics in the Concept Library before continuing. The engine will not forcibly lock you out of a level, but the recommendation is data-backed and should be treated as an operational signal.",
        ],
      },
      {
        heading: "Proficiency Statuses",
        paragraphs: [
          "Your overall proficiency maps to four stages: <strong>Novice → Developing → Proficient → Mastery</strong>. These statuses are composite scores across all topics and levels, not per-topic labels. They are displayed on your dashboard as a high-level indicator of your current position in the learning arc.",
        ],
      },
      {
        heading: "Hint Penalty",
        paragraphs: [
          "When you use a hint on any question, that attempt is recorded as <strong>incorrect</strong> in your Mastery calculation — regardless of whether you subsequently identify the correct answer. This is architectural, not punitive. The mastery system measures your ability to solve problems independently under exam conditions. Hints are not available on CAT D-Day; therefore, hint-assisted correct answers do not count toward mastery thresholds.",
        ],
      },
    ],
  },
  {
    slug: "ai-coach-hint-system",
    sysRef: "04.00",
    title: "AI Coach & Hint System",
    description:
      "How the Socratic two-tier hint system works, error classification, and how the AI Digest builds your personal error fingerprint over time.",
    body: [
      {
        paragraphs: [
          "Passive reading is penalized at the architectural level. When you log an incorrect answer, the AI Coach activates. Rather than immediately revealing the solution, it presents a structured two-tier intervention designed to force active reasoning.",
        ],
      },
      {
        heading: "Tier 1: Socratic Prompt",
        paragraphs: [
          "<strong>Tier 1</strong> provides directional guidance without revealing the answer. The prompt is dynamically generated based on the question's topic tag and the specific error type detected in your response. Examples: <em>'Consider what happens at boundary values when x approaches zero.'</em> Or: <em>'Check whether the exclusion condition in row 3 is bidirectional or unidirectional.'</em>",
          "Tier 1 hints are designed to activate the reasoning chain you should have used, not to summarize the solution. If you can bridge the gap after a Tier 1 hint, your reasoning is retrievable — it was a momentary block, not a conceptual gap.",
        ],
      },
      {
        heading: "Tier 2: Answer Reveal",
        paragraphs: [
          "<strong>Tier 2</strong> shows the complete solution with step-by-step reasoning, including the specific point where the correct approach diverges from your submitted answer. Both tiers are logged to your Telemetry profile. Hint usage counts appear in your session summary and weekly AI Digest.",
        ],
      },
      {
        heading: "Error Classification",
        paragraphs: [
          "After every incorrect attempt (with or without hints), the AI Coach tags the error with a <strong>Distractor Error Type</strong>: <strong>Conceptual Gap</strong> (the underlying principle was unknown), <strong>Execution Error</strong> (the principle was known but a calculation or logical step failed), or <strong>Trap: Distractor</strong> (a specifically engineered wrong answer exploited a predictable reasoning shortcut).",
          "Sub-types include: <em>Trap: Negation</em> (a logically negated version of the correct answer), <em>Root Cause Mismatch</em> (a downstream effect selected instead of the cause), and <em>Calculation Error</em> (sign errors, boundary failures, unit mismatches). These tags are not cosmetic — they are the input to the weekly AI Digest and the SRS trigger logic.",
        ],
      },
      {
        heading: "The Weekly AI Digest",
        paragraphs: [
          "Once per week, the AI Coach generates a personalized digest analyzing your error pattern distribution. The digest surfaces your top two or three error types by frequency, cites the specific question IDs where each pattern appeared, and recommends targeted remediation: Concept Library resources for Conceptual Gaps, slow-repetition practice sets for Execution Errors, and specific trap-awareness drills for Distractor patterns.",
          "Every AI-generated piece of content visible to you — including digest analysis and Socratic prompts — is labeled with an <strong>AI-Generated</strong> badge. This is a transparency requirement, not optional. You should always know when you are receiving machine-authored feedback.",
        ],
      },
    ],
  },
  {
    slug: "telemetry-performance-metrics",
    sysRef: "05.00",
    title: "Telemetry & Performance Metrics",
    description:
      "The five tracked event types, the three meta-metrics (Learning Velocity, Weighted Accuracy, Speed Score), and how Trend Detection works.",
    body: [
      {
        paragraphs: [
          "The dashboard rejects vanity metrics. Raw accuracy is visible but not the primary performance signal. Every interaction you have with the platform is instrumented at the event level, and these events feed a set of composite metrics designed to reflect actual learning progress rather than comfortable repetition.",
        ],
      },
      {
        heading: "The Five Tracked Events",
        paragraphs: [
          "Every question interaction generates up to five event types: <strong>option_selected</strong> (which option you chose and when), <strong>hint_used</strong> (which tier and at what elapsed time), <strong>confidence_rating</strong> (your 1–5 star self-assessment, if provided), <strong>report_error</strong> (if you flagged the question for review), and <strong>time_spent</strong> (total and per-step where available). These events are immutable once logged.",
        ],
      },
      {
        heading: "Learning Velocity",
        paragraphs: [
          "<strong>Learning Velocity</strong> is the primary metric: a composite score measuring how efficiently you absorb and retain new concepts over a 7-day rolling window. It is calculated from the slope of your accuracy curve on questions encountered for the first time at each difficulty level. A student whose accuracy on Level 4 questions improves from 45% to 72% over 7 days has high velocity. A student whose accuracy on Level 2 questions holds steady at 88% over 7 days has near-zero velocity.",
          "High raw accuracy paired with low learning velocity triggers a system alert. This is the 'comfort zone' warning: you are successfully practicing mastered material but generating no new learning. The engine will force-route you toward higher-difficulty or lower-familiarity topics to restore productive friction.",
        ],
      },
      {
        heading: "Weighted Accuracy & Speed Score",
        paragraphs: [
          "<strong>Weighted Accuracy</strong> applies a recency weight to your accuracy history — recent sessions count more than older ones. This prevents a strong early performance from masking a recent decline. The weight decay function has a half-life of approximately 14 days.",
          "<strong>Speed Score</strong> measures time efficiency relative to question difficulty. A Level 3 question solved in 45 seconds scores higher than the same question solved in 3 minutes. Speed Score is not rewarded at the expense of accuracy — it is only a positive signal when accuracy is above the 70% threshold.",
        ],
      },
      {
        heading: "Trend Detection",
        paragraphs: [
          "<strong>Trend Detection</strong> is a classifier that evaluates your Learning Velocity trajectory and labels it as <strong>Improving</strong>, <strong>Stable</strong>, or <strong>Declining</strong>. A Declining trend triggers a session alert and prompts the engine to restructure the next Daily Module around your weakest recent topics. An Improving trend is acknowledged in the Reflection phase. A Stable trend — particularly at high accuracy — triggers the comfort-zone alert described above.",
        ],
      },
    ],
  },
  {
    slug: "spaced-repetition-system",
    sysRef: "06.00",
    title: "Spaced Repetition System",
    description:
      "How the SRS queue is built, what triggers it, and how the Confidence Rating feeds into the next session's Warm-up.",
    body: [
      {
        paragraphs: [
          "The Spaced Repetition Queue (SRS) is the engine's primary defense against memory decay. Forgetting is not random — it follows a predictable exponential curve. The SRS interrupts this curve by re-presenting flagged material at intervals calibrated to maximize long-term retention with minimum repetition overhead.",
        ],
      },
      {
        heading: "Trigger Conditions",
        paragraphs: [
          "A question enters the SRS queue under two conditions: you answered it <strong>incorrectly</strong>, or you answered it correctly but rated your confidence at <strong>1–2 stars</strong> on the post-question rating. The second condition is the more important one. A correct answer with low confidence is a false positive — you happened to select the right option without a reliable underlying model. If the same question recurred under slightly different phrasing, you would likely fail.",
          "The Confidence Rating (1–5 stars) is optional but strongly recommended. It is the mechanism through which you communicate genuine uncertainty to the engine. Use it accurately — gaming it upward harms only your own preparation.",
        ],
      },
      {
        heading: "How SRS Questions Are Delivered",
        paragraphs: [
          "The SRS does not create a separate revision module. It injects flagged questions directly into the <strong>Warm-up phase</strong> of future Daily Modules at algorithmically determined intervals. The interval for each question starts short (1–2 days) and expands as you demonstrate consistent correct recall. A question exits the SRS queue when you answer it correctly with a confidence rating of 4–5 stars across three consecutive encounters.",
          "If you consistently skip the Warm-up phase or rate all questions at maximum confidence regardless of performance, the SRS queue will grow without clearing, and your Daily Modules will increasingly be dominated by review material. The SRS is most effective when you engage the Warm-up phase deliberately and rate confidence honestly.",
        ],
      },
      {
        heading: "The Concept Library Integration",
        paragraphs: [
          "When a question enters the SRS queue due to an incorrect answer tagged as a <strong>Conceptual Gap</strong>, the engine simultaneously surfaces a link to the relevant Concept Library article in the feedback view. The Concept Library contains topic articles and worked examples mapped to the same topic taxonomy as the question content. Reviewing the concept before the question re-appears in the Warm-up queue significantly improves re-encounter accuracy.",
        ],
      },
    ],
  },
  {
    slug: "quality-streaks",
    sysRef: "07.00",
    title: "Quality Streaks",
    description:
      "The anti-gaming streak mechanics, what counts as a qualifying session, and how streaks reflect your D-Day readiness trajectory.",
    body: [
      {
        paragraphs: [
          "Streak mechanics are calibrated against meaningful learning, not login frequency. The Quality Streak counter reflects genuine, high-performance engagement with the platform — and is designed to be ungameable.",
        ],
      },
      {
        heading: "What Increments a Streak",
        paragraphs: [
          "A streak increments under exactly two conditions: (1) completing a full four-phase <strong>Daily Module</strong> (Warm-up through Reflection), or (2) maintaining accuracy above <strong>70%</strong> in a session lasting a minimum of <strong>15 continuous minutes</strong> on unfamiliar or Level 3+ material.",
          "Both conditions require substantive cognitive output. Completing the Warm-up phase alone, logging in to check your dashboard, or reviewing Concept Library articles does not increment the streak.",
        ],
      },
      {
        heading: "What Does Not Increment a Streak",
        paragraphs: [
          "Logging in without substantive practice does <strong>not</strong> extend a streak. Completing a session with accuracy below 70% does not extend a streak. Completing a session composed entirely of Level 1–2 questions (previously mastered material) does not extend a streak. These exclusions are architectural — they prevent the streak counter from rewarding comfortable, non-productive activity.",
        ],
      },
      {
        heading: "Streaks as a Performance Predictor",
        paragraphs: [
          "Your streak count is surfaced in your Analytics Dashboard as a leading indicator of D-Day performance. Research on deliberate practice consistently shows that session <em>consistency</em> is a stronger predictor of exam outcome than total hours logged. A student with a 45-day quality streak has demonstrated 45 sessions meeting the accuracy and duration thresholds — a directly measurable input to exam readiness.",
          "A broken streak resets to zero but does not delete historical data. Your Analytics Dashboard preserves the full history of your streak performance, including longest streak and streak frequency distribution. Streak history is used by the AI Digest to identify engagement patterns and flag potential burnout risk when session frequency drops sharply after a long streak.",
        ],
      },
    ],
  },
];

export const DOC_FAQS: { question: string; answer: string }[] = [
  {
    question: "How do I reset my calibration baseline?",
    answer:
      "The initial diagnostic matrix cannot be manually flushed. The engine self-corrects continuously via Bayesian updating. If you believe your diagnostic result was skewed — for example, due to fatigue or distraction — simply complete three Daily Modules at your current level. The system detects statistical anomalies and automatically recalibrates your proficiency estimate by Day 4.",
  },
  {
    question: "Why does using a hint count as an incorrect attempt?",
    answer:
      "Hint usage triggers the Mastery Penalty because the goal is genuine competency, not correct answer accumulation. If you require external scaffolding to identify an answer, you have not independently mastered the concept. The penalty ensures your Mastery level reflects real, transferable understanding — the kind that holds under exam conditions without hints available.",
  },
  {
    question: "How is Learning Velocity different from accuracy?",
    answer:
      "Accuracy tells you how many answers you got right. Learning Velocity tells you how quickly your accuracy on new concepts improves over a 7-day rolling window. A student with 90% accuracy on familiar material but 40% accuracy on new Level 4 questions has high accuracy but low velocity. Velocity is the metric that predicts your trajectory — not where you are today, but how fast you are moving.",
  },
  {
    question: "Why is mobile use discouraged for serious sessions?",
    answer:
      "The platform does not block mobile access, but the data density required for DILR scenario mapping and the QA analytics dashboard is architecturally optimized for desktop and tablet viewports. Attempting DILR sets on a small screen introduces unnecessary cognitive load from scrolling and navigation, which contaminates your time_spent telemetry and artificially depresses your Speed Score. For accurate performance tracking, use a horizontal screen.",
  },
  {
    question: "How does the Concept Library connect to my practice sessions?",
    answer:
      "The Concept Library is mapped to the same topic taxonomy used by the practice engine. When you answer a question incorrectly, the feedback view surfaces a 'Review Topic' link that routes directly to the relevant concept article or video. The library is also accessible from the Dashboard and header navigation. When the SRS detects persistent weakness in a topic, it will proactively recommend the linked library resource alongside the practice queue.",
  },
];
