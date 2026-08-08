import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CONTENT } from "../constants/content";
import { THEME_COLORS } from "../constants/theme";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import SectionSpotlight from "./SectionSpotlight";

/* Design-system cinematic easing, shared with the rest of the surface. */
const EASE_EXPO = THEME_COLORS.motion.easeCinematic;
const BUBBLE_SPRING = { type: "spring" as const, stiffness: 260, damping: 26 };

export default function CoachDemo() {
  const [hintLevel, setHintLevel] = useState(0);
  const data = CONTENT.coachDemo;
  const prefersReducedMotion = useReducedMotion();
  const chatRef = useRef<HTMLDivElement>(null);

  const handleReveal = () => {
    if (hintLevel < 2) {
      setHintLevel(hintLevel + 1);
    }
  };

  const handleReplay = () => {
    setHintLevel(0);
  };

  /* Keep the newest coach message in view as tiers unlock. */
  useEffect(() => {
    const el = chatRef.current;
    if (!el || hintLevel === 0) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [hintLevel, prefersReducedMotion]);

  return (
    <MotionConfig
      reducedMotion={prefersReducedMotion ? "always" : "user"}
      transition={prefersReducedMotion ? { duration: 0 } : undefined}
    >
      <section className="relative py-24 sm:py-32 overflow-hidden bg-bg border-t border-border-subtle">
        {/* Background Atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-teal/5 rounded-full blur-[150px] pointer-events-none" />
        <SectionSpotlight color="rgb(var(--brand-teal-rgb) / 0.12)" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 relative z-10 max-w-[1800px]">
          {/* GEO Semantic Content & Header */}
          <div className="text-center lg:text-left mb-16 lg:mb-24 flex flex-col lg:flex-row justify-between items-end gap-8">
            <div className="max-w-3xl">
              <p data-speakable className="sr-only">
                AdaptHub gives you two chances to solve on your own. When you
                get a question wrong, the AI Coach provides a strategic hint
                first. If you need more help, a full explanation follows. Using
                either hint means that attempt does not count toward leveling
                up.
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-fg leading-tight tracking-tight mb-6">
                {data.header.titleLine1}{" "}
                <span className="text-brand-teal italic pr-2">
                  {data.header.titleHighlight}
                </span>{" "}
                {data.header.titleLine2}
              </h2>
              <p className="text-fg-muted text-lg md:text-xl font-sans leading-relaxed mb-6">
                {data.header.description}
              </p>
              <a
                href="/cat-syllabus"
                className="group inline-flex items-center gap-2 text-xs md:text-sm font-mono uppercase tracking-widest text-brand-teal hover:text-fg transition-colors"
              >
                <span>{data.header.linkText}</span>
                <span className="transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </div>
            <div className="flex flex-col items-center lg:items-end w-full lg:w-auto gap-3">
              <div className="font-mono text-xs text-fg-muted uppercase tracking-widest border border-border rounded-full px-4 py-1.5 inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse"></span>
                {data.header.pillText}
              </div>
              {/* Tier progress indicator */}
              <div
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-fg-subtle"
                aria-hidden="true"
              >
                {[0, 1, 2].map((step) => (
                  <span
                    key={step}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      step <= hintLevel
                        ? "w-8 bg-brand-teal"
                        : "w-4 bg-zinc-700"
                    }`}
                  />
                ))}
                <span className="ml-2 tabular-nums">{hintLevel}/2 tiers</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
            {/* LEFT: Question Card (Cognitive Friction) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 bg-surface/40 border border-border rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Top Bar */}
              <div className="flex justify-between items-center border-b border-border pb-5 mb-6">
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 bg-surface/80 rounded bg-clip-padding text-[11px] font-mono text-fg uppercase tracking-widest">
                    {data.question.category}
                  </span>
                  <span className="px-2.5 py-1 bg-red-950/40 text-red-400 border border-red-900/30 rounded bg-clip-padding text-[11px] font-mono uppercase tracking-widest">
                    {data.question.level}
                  </span>
                </div>
                <div className="text-fg-subtle font-mono text-xs tracking-wider">
                  {data.question.id}
                </div>
              </div>

              <div className="prose prose-invert max-w-none font-serif text-lg md:text-xl text-fg mb-10 leading-relaxed font-medium">
                <p>{data.question.text}</p>
              </div>

              <div className="space-y-3 font-mono text-sm mt-auto">
                {data.question.options.map((opt, i) => (
                  <motion.div
                    key={opt}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.35 + i * 0.12,
                      duration: 0.5,
                      ease: EASE_EXPO,
                    }}
                    className={`w-full flex items-center p-4 rounded-xl border transition-all duration-300 cursor-not-allowed ${i === data.question.selectedIncorrectIndex ? "bg-red-950/20 border-red-900/50 text-red-200" : "bg-bg/50 border-border/80 text-fg-muted"}`}
                  >
                    <span className="opacity-40 mr-4 font-bold">
                      [{String.fromCharCode(65 + i)}]
                    </span>{" "}
                    {opt}
                    {i === data.question.selectedIncorrectIndex && (
                      <span className="ml-auto text-red-500/80 text-xs tracking-widest uppercase">
                        Incorrect
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: AI Coach Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-7 bg-black border border-border/80 rounded-3xl flex flex-col min-h-[500px] shadow-2xl relative overflow-hidden"
            >
              {/* Terminal Header */}
              <div className="px-6 py-4 border-b border-border/80 bg-bg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                  <span className="font-mono text-xs text-brand-teal uppercase tracking-widest">
                    AI Coach
                  </span>
                </div>
                <span className="font-mono text-[11px] text-fg-muted uppercase tracking-widest">
                  Analysing your approach
                </span>
              </div>

              {/* Chat History Area */}
              <div
                ref={chatRef}
                className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-end space-y-6 bg-gradient-to-b from-transparent to-bg/50"
                aria-live="polite"
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    layout
                    key="diagnostic"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={BUBBLE_SPRING}
                    className="bg-surface/80 border border-border rounded-3xl rounded-tr-sm p-6 max-w-[90%] md:max-w-[85%] self-end relative"
                  >
                    <p className="text-fg text-sm md:text-base font-sans leading-relaxed">
                      You selected{" "}
                      <span className="font-mono text-red-400 bg-red-950/30 border border-red-900/30 px-1.5 py-0.5 rounded shadow-sm">
                        {data.diagnostic.userSelection}
                      </span>
                      .
                      <br />
                      <br />
                      <span className="text-fg-muted font-mono text-[11px] md:text-xs block mb-2 uppercase tracking-widest font-semibold">
                        Feedback
                      </span>
                      {data.diagnostic.analysisP1}
                      <span className="font-mono text-fg">
                        {data.diagnostic.analysisHighlight1}
                      </span>
                      {data.diagnostic.analysisP2}
                      <span className="font-mono text-fg">
                        {data.diagnostic.analysisHighlight2}
                      </span>
                      {data.diagnostic.analysisP3}
                      <span className="font-mono text-fg">
                        {data.diagnostic.analysisHighlight3}
                      </span>
                      {data.diagnostic.analysisP4}
                      <br />
                      <br />
                      <span className="text-orange-400 font-mono text-[11px] md:text-xs uppercase tracking-widest border border-orange-400/20 bg-orange-400/10 px-2.5 py-1.5 rounded-sm inline-block shadow-sm">
                        {data.diagnostic.errorFlag}
                      </span>
                    </p>
                  </motion.div>

                  {/* Guided Hint — Tier 1 */}
                  {hintLevel > 0 && (
                    <motion.div
                      layout
                      key="hint-tier-1"
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ ...BUBBLE_SPRING, delay: 0.15 }}
                      className="bg-[rgb(var(--brand-teal-rgb)/0.04)] border border-brand-teal/30 shadow-[0_0_40px_rgb(var(--brand-teal-rgb)/0.08)] rounded-3xl rounded-tl-sm p-6 max-w-[90%] md:max-w-[85%] self-start relative mt-2"
                    >
                      <div className="text-brand-teal font-mono text-[11px] md:text-xs font-semibold mb-4 uppercase tracking-widest flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="square"
                            strokeLinejoin="miter"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        {data.hint.tier}
                      </div>
                      <p className="text-fg text-sm md:text-base font-sans leading-relaxed">
                        {data.hint.textP1}
                        <span className="font-mono text-brand-teal font-semibold">
                          {data.hint.textHighlight1}
                        </span>
                        {data.hint.textP2}
                        <br />
                        <br />
                        {data.hint.textP3}
                        <span className="font-mono text-brand-teal font-semibold">
                          {data.hint.textHighlight2}
                        </span>
                        {data.hint.textP4}
                        <span className="font-mono text-brand-teal font-semibold">
                          {data.hint.textHighlight3}
                        </span>
                        {data.hint.textP5}
                      </p>
                    </motion.div>
                  )}

                  {/* Error Forensics Panel — Tier 2: full explanation */}
                  {hintLevel >= 2 && (
                    <motion.div
                      layout
                      key="explanation-tier-2"
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ ...BUBBLE_SPRING, delay: 0.15 }}
                      className="bg-surface/80 border border-border rounded-3xl rounded-tl-sm p-6 max-w-[90%] md:max-w-[85%] self-start relative mt-2"
                    >
                      <div className="text-red-400 font-mono text-xs uppercase tracking-widest mb-3 font-semibold">
                        {data.errorAnalysis.title}
                      </div>
                      <p className="text-fg text-sm md:text-base font-sans leading-relaxed">
                        {data.errorAnalysis.distractorExplanation}
                      </p>
                      <div className="mt-5">
                        <div className="text-fg-muted font-mono text-[11px] md:text-xs mb-3 uppercase tracking-widest font-semibold">
                          {data.errorAnalysis.whyWrongQuestion}
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-orange-400 font-mono text-[11px] md:text-xs uppercase tracking-widest border border-orange-400/20 bg-orange-400/10 px-2.5 py-1.5 rounded-sm inline-block shadow-sm">
                              {data.errorAnalysis.studentReport}
                            </span>
                            <span className="text-fg-subtle font-mono text-[11px] uppercase tracking-widest">
                              Your answer
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-400 font-mono text-[11px] md:text-xs uppercase tracking-widest border border-green-400/20 bg-green-400/10 px-2.5 py-1.5 rounded-sm inline-block shadow-sm">
                              {data.errorAnalysis.systemAnalysis}
                            </span>
                            <span className="text-fg-subtle font-mono text-[11px] uppercase tracking-widest">
                              System analysis
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Bar */}
              <div className="p-4 md:p-6 bg-bg border-t border-border/80">
                {hintLevel === 0 ? (
                  <button
                    type="button"
                    onClick={handleReveal}
                    className="group w-full min-h-12 py-4 bg-surface/50 hover:bg-zinc-800 text-fg font-mono text-xs md:text-sm uppercase tracking-widest rounded-xl border border-border hover:border-zinc-700 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden relative touch-manipulation"
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"></div>
                    <span>Tier 1: Ask for a hint</span>
                  </button>
                ) : hintLevel === 1 ? (
                  <button
                    type="button"
                    onClick={handleReveal}
                    className="group w-full min-h-12 py-4 bg-brand-teal/10 hover:bg-brand-teal/20 text-brand-teal font-mono text-xs md:text-sm uppercase tracking-widest rounded-xl border border-brand-teal/30 hover:border-brand-teal/50 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden relative touch-manipulation"
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-brand-teal/10 to-transparent skew-x-12"></div>
                    <span>Tier 2: Reveal full explanation</span>
                  </button>
                ) : (
                  <div className="w-full min-h-12 py-4 bg-bg/50 text-brand-teal/70 font-mono text-xs md:text-sm uppercase tracking-widest text-center border border-dashed border-brand-teal/20 rounded-xl flex items-center justify-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal"></span>
                    Full explanation revealed
                    <button
                      type="button"
                      onClick={handleReplay}
                      className="ml-2 px-3 py-1.5 text-fg-muted hover:text-fg border border-border hover:border-brand-teal/40 rounded-full transition-colors duration-300 flex items-center gap-1.5 touch-manipulation"
                      aria-label="Replay the AI coach demo"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0 1 14.9-3M20 15a8 8 0 0 1-14.9 3"
                        />
                      </svg>
                      Replay
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
