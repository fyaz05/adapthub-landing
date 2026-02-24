export interface BlogArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  sources?: { label: string; url: string }[];
  body: { heading?: string; paragraphs: string[] }[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "zone-of-proximal-development-cat-algebra",
    title: "The Zone of Proximal Development in CAT Algebra",
    category: "Cognitive Science",
    date: "2026-02-23",
    readTime: "08_MIN",
    excerpt:
      "Why the 70–85% accuracy band builds CAT Algebra confidence, reduces unattempted questions, and accelerates learning through calibrated challenge.",
    sources: [
      {
        label: "Encyclopaedia Britannica: Zone of Proximal Development",
        url: "https://www.britannica.com/science/zone-of-proximal-development",
      },
      {
        label: "Roediger & Karpicke (2006): Test-enhanced learning (Science)",
        url: "https://doi.org/10.1126/science.1127331",
      },
    ],
    body: [
      {
        paragraphs: [
          "Lev Vygotsky's Zone of Proximal Development was not designed for CAT preparation. It was designed to describe the cognitive space between what a learner can do independently and what they can do with expert guidance. But the principle is strikingly precise when applied to quantitative aptitude practice: the most productive learning happens not when you are succeeding comfortably, nor when you are failing completely, but in the narrow band where you are right on the edge of breaking.",
          "The empirical target for CAT preparation is a <strong>70–85% accuracy band</strong>. Below 70%, the cognitive load of repeated failure triggers defensive withdrawal — students start skipping hard questions preemptively, which is exactly the failure mode that costs percentile points on D-Day. Above 85%, you are practicing mastered material, burning time with no marginal gain.",
        ],
      },
      {
        heading: "Why Your Intuition About Hard Questions Is Wrong",
        paragraphs: [
          "Most CAT aspirants operate on a binary mental model: questions are either 'doable' or 'too hard to attempt'. This model is not just inaccurate — it is actively destructive. The questions that sit just above your current threshold are precisely the ones that produce the steepest learning curve. Avoiding them is avoiding growth.",
          "The neurological mechanism is straightforward. When you encounter a problem that requires you to extend a familiar pattern into an unfamiliar configuration, your brain is forced to build new synaptic connections rather than simply retrieve an existing one. A Level 4 Algebra question that causes you to fail on the first attempt but succeed after reviewing the solution produces more durable encoding than twenty Level 2 questions you answered correctly on autopilot.",
        ],
      },
      {
        heading: "The Diagnostic as a Calibration Instrument",
        paragraphs: [
          "AdaptHub's Adaptive Diagnostic is not a mock test. It does not produce a score. It produces a <strong>cognitive map</strong>: your exact proficiency coordinate per topic, calibrated by a convergent algorithm that adjusts difficulty after every question. The starting point is Level 3 (Intermediate) — the statistical median. Every correct answer escalates by one level; every incorrect answer drops by one. The algorithm converges in 15–20 questions, not because the test is short, but because the data becomes sufficient.",
          "The output of this process is your personal ZPD boundary — the exact difficulty ceiling above which your current models begin to break. Every subsequent Daily Module is then generated to keep you practicing inside that band. This is not motivational design. It is mathematics.",
        ],
      },
      {
        heading: "Unattempted Questions Are a Solvable Problem",
        paragraphs: [
          "One of the most consequential patterns in CAT performance data is the correlation between unattempted questions and percentile loss. A student who leaves 8 questions unattempted in QA does not lose those marks — they lose the confidence and pattern-recognition depth that would have made those questions solvable in the first place.",
          "Sustained ZPD practice destroys this pattern by gradually expanding your ceiling. When Level 5 questions are a regular part of your training environment, the Level 4 questions that constitute the actual CAT paper begin to feel like familiar territory. The fear of unattempted questions is not a personality trait. It is a calibration artifact — and it is correctable.",
        ],
      },
    ],
  },
  {
    slug: "decoding-2025-dilr-trap-sets",
    title: "Decoding the 2025 DILR Trap Sets",
    category: "Structural Analysis",
    date: "2026-02-23",
    readTime: "12_MIN",
    excerpt:
      "A post-mortem of the infamously opaque routing puzzles from last year's paper, and the precise moment where 90% of candidates lost their 99th percentile.",
    sources: [
      {
        label: "IIM CAT Official Website",
        url: "https://iimcat.ac.in",
      },
    ],
    body: [
      {
        paragraphs: [
          "The 2025 CAT DILR section produced one of the sharpest performance cliffs in recent memory. The median score in the top decile dropped by approximately 4 scaled points compared to 2024, and the distribution of correct attempts in the routing puzzle sets showed a peculiar pattern: most candidates who attempted these sets got the first two questions correct and the final two wrong. This is not randomness. It is a structural trap.",
          "The routing puzzles in Slot 2 were designed around a single, non-obvious constraint. The constraint was <strong>not hidden</strong> — it was stated in the second line of the problem description. But it was stated in a way that the vast majority of candidates, under time pressure, pattern-matched to a more familiar constraint type and proceeded on an incorrect assumption.",
        ],
      },
      {
        heading: "The Architecture of a Trap Set",
        paragraphs: [
          "CAT setters do not write hard questions by making the logic obscure. They write hard questions by exploiting the gap between what you read and what you process. A trap set has three structural components: a surface structure that resembles a familiar problem type, a hidden asymmetry in the constraint, and a final question that is trivially easy if the constraint was correctly parsed and impossible if it was not.",
          "In the 2025 routing puzzles, the surface structure was a standard sequencing problem — five couriers assigned to five routes with exclusion conditions. The hidden asymmetry was that two of the exclusion conditions were <em>bidirectional</em> (if A cannot follow B, then B cannot follow A) while one was <em>unidirectional</em>. Candidates who parsed all three as bidirectional could construct a consistent partial table for the first two questions. By the third question, the table collapsed.",
        ],
      },
      {
        heading: "The Two-Minute Entry Decision",
        paragraphs: [
          "The correct response to this set, in retrospect, was a 90-second triage at entry: scan all constraints before writing a single deduction. The candidates who identified the unidirectional constraint at the start were able to solve all four questions in under nine minutes. The candidates who began immediately started building a flawed model and spent their time defending it.",
          "This is the meta-skill that separates 99th-percentile DILR performance from 95th-percentile performance. It is not raw logical speed. It is the discipline to invest the first two minutes of a set into structural parsing rather than solution generation. The time cost of this discipline is approximately 90 seconds. The time benefit, on a correctly selected set, is five minutes of clean, unambiguous deduction.",
        ],
      },
      {
        heading: "What to Practice Instead",
        paragraphs: [
          "The practical implication is that DILR practice should be structured around set triage and constraint classification, not just solution speed. For every set you attempt, the productive training question is not 'Did I get it right?' but 'How quickly did I correctly identify the binding constraint, and how did I know which constraint was binding?'",
          "A high-quality DILR error analysis tags each incorrect attempt with the constraint that was misread and the deduction step where the model first broke. This is exactly the data that AdaptHub's telemetry captures — not just whether you were right or wrong, but which specific reasoning step failed. Over 30 or more tagged attempts, your personal constraint-blindness pattern becomes visible, correctable, and ultimately eliminable.",
        ],
      },
    ],
  },
  {
    slug: "varc-fact-vs-judgment",
    title: "VARC: Fact vs Judgment and the Illusion of Choice",
    category: "Verbal Decoding",
    date: "2026-02-23",
    readTime: "06_MIN",
    excerpt:
      "In modern CAT VARC, high scorers track author stance—not just passage facts. Learn the annotation method that filters deceptive options fast.",
    sources: [
      {
        label: "SQ3R Study Method Overview",
        url: "https://en.wikipedia.org/wiki/SQ3R",
      },
      {
        label: "IIM CAT Official Website",
        url: "https://iimcat.ac.in",
      },
    ],
    body: [
      {
        paragraphs: [
          "The most common failure mode in CAT VARC is not vocabulary or reading speed. It is the inability to distinguish between what a passage <em>states</em> and what its author <em>believes</em>. These are not the same thing. A passage can state multiple competing positions while the author endorses only one. The questions are almost always testing your ability to locate that endorsement, not summarize the content.",
          "Modern CAT VARC reading comprehension passages are structured with intentional ambiguity. The author presents evidence, cites counterarguments, and qualifies conclusions. Within this structure, the 'correct' inference question answer is always the one that reflects the author's specific evaluative stance — not the most comprehensive summary of the passage content.",
        ],
      },
      {
        heading: "The Signal Words You Are Ignoring",
        paragraphs: [
          "Authors encode their judgments in a precise lexical register. Words like <em>unfortunately</em>, <em>despite</em>, <em>merely</em>, <em>so-called</em>, and <em>ironically</em> are not rhetorical flourishes. They are directional signals pointing at the author's evaluative position. A sentence that reads 'Despite widespread enthusiasm for this approach, the evidence remains inconclusive' contains two signals: the enthusiasm is implicitly dismissed (despite) and the author is skeptical (remains inconclusive).",
          "CAT setters routinely construct trap options that are accurate summaries of the passage content but inaccurate reflections of the author's stance. A candidate who has read the passage for information rather than for authorial position will select the trap. A candidate who has been annotating signal words will identify the evaluative direction and eliminate the trap immediately.",
        ],
      },
      {
        heading: "The Digital SQ3R Method",
        paragraphs: [
          "AdaptHub's reading comprehension methodology is adapted from the SQ3R framework: Survey, Question, Read, Recite, Review. In a timed CAT context, this collapses into a two-phase protocol. In Phase 1 (60–90 seconds), you scan the passage for the author's thesis, the central tension, and any explicit evaluative language. You do not read for details. In Phase 2, you read the question stems before returning to the passage for targeted evidence retrieval.",
          "This approach converts reading comprehension from a memory task (can I remember what the passage said?) into a search task (where in the passage is the evidence for this specific claim?). Search tasks are faster and more accurate under time pressure because they have a definite termination condition. You stop reading when you find the evidence. Memory tasks have no termination condition — you stop when you run out of time.",
        ],
      },
      {
        heading: "Practicing the Distinction",
        paragraphs: [
          "The practical drill is simple: after each reading comprehension set, categorize every incorrect answer you selected. Was it incorrect because it stated something the passage didn't say? Or was it incorrect because it accurately described the passage content but misrepresented the author's judgment? The second category is the one that costs percentile. It is also the one that is correctable through targeted annotation practice.",
          "Once you develop the habit of annotating authorial signal words in every passage, Fact vs Judgment becomes a retrieval problem rather than an interpretive one. The author's position is always explicitly encoded in the text. Your job is not to infer it — it is to find it.",
        ],
      },
    ],
  },
  {
    slug: "metacognition-first-cat-skill",
    title: "Metacognition First: The CAT Skill Nobody Teaches",
    category: "Cognitive Science",
    date: "2026-02-23",
    readTime: "09_MIN",
    excerpt:
      "Top percentile jumps come from metacognition: tracking how you fail, calibrating confidence, and fixing recurring error patterns with intent.",
    sources: [
      {
        label: "Dunlosky et al. (2013): Effective Learning Techniques Review",
        url: "https://doi.org/10.1177/1529100612453266",
      },
      {
        label: "Metacognition Overview",
        url: "https://en.wikipedia.org/wiki/Metacognition",
      },
    ],
    body: [
      {
        paragraphs: [
          "Metacognition is thinking about your own thinking. In the context of CAT preparation, it is the ability to accurately predict which questions you will get wrong before you get them wrong — and to understand, after the fact, exactly why your reasoning broke at the specific point it did. This is not a soft skill. It is the highest-leverage skill in exam preparation, and it is almost never explicitly taught.",
          "The students who reach the 99th percentile are not universally faster or more mathematically gifted than those who reach the 95th. The consistent differentiator is that 99th-percentile students have a precise, updated model of their own failure modes. They know that they tend to misread the magnitude constraint in Arithmetic problems. They know that they pattern-match to the wrong logical form in RC inference questions. They have, in effect, a personal error fingerprint.",
        ],
      },
      {
        heading: "The Gap Between Intuition and Accuracy",
        paragraphs: [
          "Most CAT aspirants dramatically overestimate their performance on questions they find 'familiar'. Familiarity is not the same as mastery. A question type that you have encountered dozens of times will feel easy even when the specific instance contains a novel twist that breaks your standard approach. This false familiarity is responsible for a disproportionate share of incorrect answers in the 90–95th percentile band.",
          "The Confidence Rating system in AdaptHub is designed to surface this gap. After each question, you rate your confidence on a 1–5 scale. Over time, the system calculates your <strong>Calibration Score</strong> — the correlation between your confidence and your actual accuracy. A well-calibrated student who rates a question 5/5 gets it right nearly 90% of the time. A poorly calibrated student who rates a question 5/5 gets it right 60% of the time. The gap between these two numbers is the metacognitive deficit.",
        ],
      },
      {
        heading: "Building Your Error Fingerprint",
        paragraphs: [
          "The first step is classification. Every incorrect answer you give belongs to one of three categories: <strong>Conceptual Gap</strong> (you did not know the underlying principle), <strong>Execution Error</strong> (you knew the principle but made an arithmetic or logical error in applying it), or <strong>Trap: Distractor</strong> (you were deceived by a specifically designed wrong answer that exploited a predictable reasoning shortcut).",
          "These three categories require three different corrective strategies. A Conceptual Gap is solved by the Concept Library — reviewing the underlying topic. An Execution Error is solved by slow, deliberate re-working of the same question class under reduced time pressure. A Trap is solved by studying the structure of the distractor: what specific cognitive shortcut did the setter predict you would take, and how do you build a habit of checking for it?",
        ],
      },
      {
        heading: "The Weekly Metacognitive Review",
        paragraphs: [
          "Set aside 20 minutes at the end of each week to review not your accuracy numbers but your error classification distribution. If 70% of your errors are Conceptual Gaps, the intervention is more concept study. If 70% are Execution Errors, the intervention is slower, more deliberate practice with explicit self-checking steps. If 70% are Traps, you need to study your distractor patterns — and AdaptHub's AI Digest provides exactly this analysis, citing the specific question IDs where each trap type was triggered.",
          "The metacognitive review is not comfortable. It requires honest confrontation with exactly the reasoning patterns you have been avoiding. But it is the fastest path to the percentile jump you are working toward — because it converts random practice into targeted remediation of your specific, identified failure modes.",
        ],
      },
    ],
  },
  {
    slug: "distractor-error-taxonomy",
    title: "CAT Distractor Taxonomy: Stop Repeating the Same Traps",
    category: "Error Analysis",
    date: "2026-02-23",
    readTime: "11_MIN",
    excerpt:
      "CAT distractors exploit predictable shortcuts. Learn a practical system to detect Negation, Root Cause Mismatch, and Calculation Error traps.",
    sources: [
      {
        label: "IIM CAT Official Website",
        url: "https://iimcat.ac.in",
      },
      {
        label: "Multiple-Choice Item Design Principles",
        url: "https://en.wikipedia.org/wiki/Multiple_choice",
      },
    ],
    body: [
      {
        paragraphs: [
          "Every wrong answer in a CAT question is engineered. The setters do not randomly generate plausible-looking numbers or statements. They analyze the most common reasoning shortcuts that aspirants at the target difficulty level are likely to take, and they construct the wrong answers to be exactly what those shortcuts produce. Understanding this is the first step toward a systematic defense.",
          "AdaptHub's content schema classifies every distractor option with an error type tag. The three most prevalent and consequential are: <strong>Trap: Negation</strong>, <strong>Root Cause Mismatch</strong>, and <strong>Calculation Error</strong>. Each has a distinct signature, a specific cognitive mechanism that produces it, and a learnable counter-strategy.",
        ],
      },
      {
        heading: "Trap: Negation",
        paragraphs: [
          "A Negation Trap appears most frequently in VARC inference and RC questions, but also in critical reasoning. The distractor is a logically negated version of the correct answer: where the correct conclusion is 'the author argues X is insufficient', the trap option states 'the author argues X is sufficient'. The content is familiar — the negation is subtle.",
          "The mechanism is attentional tunnel vision under time pressure. When you are reading quickly, your visual system latches onto content words (nouns, verbs) and skips function words (not, only, unless, except). Negation traps exploit this by encoding the incorrect direction in exactly those skipped function words. The counter-strategy is a mandatory final check: before marking any VARC answer, re-read the option looking specifically for negation words, regardless of how correct the answer feels.",
        ],
      },
      {
        heading: "Root Cause Mismatch",
        paragraphs: [
          "Root Cause Mismatch errors are most common in DILR and QA reasoning questions. The distractor option is a <em>consequence</em> of the correct answer rather than the correct answer itself. In a causal chain problem, the setter places both the root cause and a downstream effect as answer options. Students who follow the chain only one step select the effect. Students who trace back to the origin select the root cause.",
          "The signature of this error is that the distractor 'feels' correct — it is technically related to the right answer and is consistent with the passage or problem. The discrimination question is always: is this the cause of the described phenomenon, or is this what the cause produces? If you cannot answer this question cleanly, the question requires closer reading, not faster intuition.",
        ],
      },
      {
        heading: "Calculation Errors",
        paragraphs: [
          "Calculation Errors in CAT QA are more structured than they appear. The three most common subtypes are: sign errors in algebraic manipulation, boundary condition failures (not testing x=0 or the limit values), and unit conversion errors in Time-Speed-Distance or Percentage problems. In each case, the wrong answer is the result you would get if you made exactly that error — which means the setter anticipated your mistake precisely.",
          "The defense against calculation errors is not 'be more careful'. Vague injunctions to care produce no behavioral change under pressure. The defense is a specific, habituated verification ritual for each QA problem type. For Algebra: verify the sign on the final substitution. For TSP: verify that both rate and time are in consistent units before multiplying. For Percentages: verify whether the base changed between steps. These are concrete, checkable steps — not general principles.",
        ],
      },
      {
        heading: "Building the System",
        paragraphs: [
          "The practical implementation is a personal distractor log. Every time you select a wrong answer, record its type, the question ID, and the specific reasoning step where you diverged from the correct path. After 20 entries, your personal trap profile becomes visible. Most students find that 60–70% of their errors concentrate in one or two distractor types — which means eliminating those two types eliminates the majority of your CAT error budget.",
          "AdaptHub automates this process. The AI Coach tags every incorrect attempt with its distractor error type and surfaces your accumulated pattern in the weekly digest. The weekly digest does not describe your errors in aggregate — it cites the specific question IDs, the specific step failures, and the targeted remediation recommended for each. This is the data layer that converts practice sessions into deliberate improvement.",
        ],
      },
    ],
  },
  {
    slug: "quality-streaks-vs-raw-study-hours",
    title: "Quality Streaks vs Study Hours: What Predicts CAT Percentile",
    category: "Performance Science",
    date: "2026-02-23",
    readTime: "07_MIN",
    excerpt:
      "Study hours alone are a weak signal. Quality streaks built on focused, >70% accuracy sessions predict stronger CAT percentile outcomes.",
    sources: [
      {
        label: "Roediger & Karpicke (2006): Test-enhanced learning (Science)",
        url: "https://doi.org/10.1111/j.1467-9280.2006.01693.x",
      },
      {
        label: "Dunlosky et al. (2013): Effective Learning Techniques Review",
        url: "https://doi.org/10.1177/1529100612453266",
      },
    ],
    body: [
      {
        paragraphs: [
          "The dominant mental model in CAT preparation is hours-as-effort. Students track study hours, compare them with peers, and use them as a proxy for progress. This model is not just inefficient — it actively corrupts preparation by incentivizing the wrong behavior. Time spent is an input metric. What you need is an output metric. And the output metric that most reliably predicts exam performance is <strong>quality-adjusted learning events per week</strong>.",
          "A quality learning event is a session in which you demonstrate sustained accuracy above 70% on unfamiliar material for a minimum of 15 continuous minutes. This is not an arbitrary threshold. It is the minimum session duration and performance level at which retrieval practice produces measurable long-term retention improvement, based on established cognitive science research on the testing effect.",
        ],
      },
      {
        heading: "Why Eight-Hour Sessions Are Often Counterproductive",
        paragraphs: [
          "A typical 8-hour study session follows a predictable degradation curve. The first 90 minutes are genuinely productive. The next 90 minutes are acceptable but declining. By the fourth hour, most students have shifted from active problem-solving to passive content consumption — re-reading notes, reviewing solved examples, watching explanatory videos. These activities feel like studying. They produce minimal long-term encoding.",
          "The neurological mechanism is attentional fatigue. The prefrontal cortex, which is responsible for the effortful reasoning required for genuine problem-solving, has limited glycemic resources. After two to three hours of intensive use, it shifts to lower-energy cognitive modes. These modes support passive processing but not the kind of active retrieval that builds durable knowledge structures.",
        ],
      },
      {
        heading: "The Quality Streak Mechanics",
        paragraphs: [
          "AdaptHub's Quality Streak system is designed around this physiological reality. A streak increments under exactly two conditions: completing a full structured Daily Module, or maintaining accuracy above 70% for a session of 15 minutes or more. Logging in without substantive practice does not extend a streak. This single design decision eliminates the most common form of productive procrastination in exam preparation: the feeling of having studied without the actual cognitive output.",
          "The streak counter is not a gamification gimmick. It is a behavioral signal that accurately reflects whether your preparation is on a trajectory toward the 99th percentile. A student with a 30-day quality streak has logged a minimum of 30 sessions meeting the accuracy and duration thresholds. That is a directly measurable input to D-Day performance.",
        ],
      },
      {
        heading: "Redesigning Your Daily Practice",
        paragraphs: [
          "The practical implication is a restructuring of how you allocate preparation time. Instead of blocking 6–8 hours and filling them with mixed activity, block three 45–60 minute sessions with explicit performance targets: complete the Daily Module, maintain accuracy above 70%, use the Reflection phase to review what broke. Between sessions, close the platform entirely. Passive consumption in the interim is fine — podcasts, articles, light review. But the active learning events must be high-quality and bounded.",
          "Over a 60-day preparation period, this structure produces approximately 180 quality learning events. Each one is logged, analyzed, and fed into the next session's calibration. The compound effect of 180 high-quality, precisely calibrated retrieval sessions is not additive — it is exponential. This is the mechanism through which AdaptHub's preparation architecture is designed to produce percentile outcomes that raw study hours cannot reliably deliver.",
        ],
      },
    ],
  },
];
