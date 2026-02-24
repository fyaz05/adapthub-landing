import { motion } from "motion/react";
import { useMemo } from "react";

import { CONTENT } from "../constants/content";
import SectionSpotlight from "./SectionSpotlight";

export default function VelocityDashboard() {
  const { days, accuracy, velocity } = CONTENT.velocityDashboard;

  // Calculate SVG points for the velocity line (X is percentage, Y is percentage from top)
  const linePoints = useMemo(() => {
    return velocity
      .map((v, i) => {
        const x = (i / (velocity.length - 1)) * 100;
        const y = 100 - v.value;
        return `${x},${y}`;
      })
      .join(" L");
  }, [velocity]);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-void border-t border-zinc-900/50">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-violet/5 rounded-full blur-[150px] pointer-events-none" />
      <SectionSpotlight color="rgba(45, 212, 191, 0.12)" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 relative z-10 max-w-[1800px]">
        {/* GEO Semantic Content & Header */}
        <div className="mb-16 lg:mb-20">
          <p data-speakable className="sr-only">
            Raw mock scores are vanity metrics. AdaptHub tracks Learning
            Velocity — a 7-day measure of how efficiently you absorb new
            concepts. High accuracy with low velocity means you are practicing
            in your comfort zone.
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight mb-6 text-center">
            Telemetry over{" "}
            <span className="text-zinc-400 line-through">Vanity</span>
          </h2>
          <p className="text-zinc-400 text-lg mx-auto text-center max-w-3xl font-sans leading-relaxed">
            Raw mock scores mean nothing. AdaptHub tracks{" "}
            <strong className="text-brand-teal font-medium">
              Learning Velocity
            </strong>{" "}
            — a 7-day composite diagnostic of how efficiently you absorb new
            concepts.
          </p>
          <div className="flex justify-center mt-6">
            <a
              href="/docs"
              className="group inline-flex items-center gap-2 text-xs md:text-sm font-mono uppercase tracking-widest text-brand-teal hover:text-white transition-colors"
            >
              <span>Read the Telemetry Docs</span>
              <span className="transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT: The Telemetry Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-black border border-zinc-800/80 rounded-3xl p-6 md:p-8 relative shadow-2xl"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800/80 pb-6 mb-8">
              <div>
                <h3 className="text-white font-mono text-lg uppercase tracking-wider mb-1">
                  Learning Velocity Profile
                </h3>
                <div className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                  7-Day Rolling Window Analysis
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="w-3 h-3 bg-zinc-800 rounded-sm"></span>{" "}
                  Accuracy
                </div>
                <div className="flex items-center gap-2 text-brand-teal">
                  <span className="w-3 h-1 bg-brand-teal"></span> Velocity
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="relative h-[250px] md:h-[300px] w-full z-10 mt-6 mb-8">
              {/* Background Grid */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 z-0">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-full h-px bg-zinc-700"></div>
                ))}
              </div>

              {/* MATHEMATICALLY LOCKED ANCHOR BOX: Guarantees 0-100% X-Axis sync for all data layers */}
              <div
                className="absolute inset-y-0 z-10"
                style={{ left: "min(5%, 20px)", right: "min(5%, 20px)" }}
              >
                {/* 1. Bars (Accuracy) */}
                {accuracy.map((acc, i) => {
                  return (
                    <div
                      key={acc.id}
                      className="absolute bottom-0 h-full w-[10vw] max-w-[40px] flex items-end justify-center group -translate-x-1/2 pointer-events-auto"
                      style={{ left: `${(i / (accuracy.length - 1)) * 100}%` }}
                    >
                      <motion.div
                        className="w-full bg-zinc-800/80 hover:bg-zinc-700/80 border-t border-zinc-600/50 rounded-t-sm transition-colors relative"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${acc.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          {acc.value}%
                        </div>
                      </motion.div>
                    </div>
                  );
                })}

                {/* 2. SVG Line Graph (Velocity) */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none z-20"
                  preserveAspectRatio="none"
                  role="img"
                  aria-label="Learning Velocity line graph over 7 days"
                >
                  <defs>
                    <linearGradient
                      id="velocity-glow"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <motion.path
                    d={`M0,100 L${linePoints} L100,100 Z`}
                    fill="url(#velocity-glow)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                  />

                  <motion.path
                    d={`M${linePoints}`}
                    fill="none"
                    stroke="#2dd4bf"
                    strokeWidth="0.8"
                    style={{
                      filter:
                        "drop-shadow(0px 0px 6px rgba(45, 212, 191, 0.6))",
                    }}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                  />
                </svg>

                {/* 3. Data Data Dots */}
                {velocity.map((v, i) => {
                  return (
                    <motion.div
                      key={v.id}
                      className="absolute w-3 h-3 bg-black border-2 border-brand-teal rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
                      style={{
                        left: `${(i / (velocity.length - 1)) * 100}%`,
                        top: `${100 - v.value}%`,
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        delay:
                          0.5 + Math.max(1.5, (i / (velocity.length - 1)) * 2),
                      }}
                    />
                  );
                })}

                {/* 4. X-Axis Labels */}
                {days.map((d, i) => {
                  return (
                    <div
                      key={d.id}
                      className="absolute -bottom-8 text-[10px] uppercase tracking-widest font-mono text-zinc-400 -translate-x-1/2 text-center"
                      style={{ left: `${(i / (days.length - 1)) * 100}%` }}
                    >
                      {d.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tilt Alert Card (Overlays on chart) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, type: "spring" }}
              viewport={{ once: true }}
              className="absolute top-[40%] right-6 md:right-12 bg-[#0a0505] border border-orange-900/50 p-4 rounded-xl shadow-[0_10px_30px_rgba(234,88,12,0.15)] flex items-start gap-4 max-w-[280px] z-30"
            >
              <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-orange-500 text-lg font-bold">⚠</span>
              </div>
              <div>
                <h4 className="text-orange-500 font-mono text-[10px] uppercase tracking-widest mb-1">
                  Tilt Detected
                </h4>
                <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                  3 consecutive errors in &lt; 45s. You are guessing. Session
                  automatically paused for 5 minutes.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Confidence vs Competence Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden"
          >
            <div className="mb-8">
              <h3 className="text-white font-serif text-2xl italic mb-3">
                The Blindspot Matrix
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                AdaptHub correlates your confidence with your accuracy to
                identify hidden liabilities before exam day.
              </p>
            </div>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-2 grid-rows-2 gap-px bg-zinc-800 rounded-2xl overflow-hidden aspect-square z-10 relative">
              {/* High Conf + Incorrect -> Dangerous Blindspot */}
              {/* biome-ignore lint/a11y/useSemanticElements: Quadrant acts as a large touch target, rendered as a div for strict flexbox properties */}
              <div
                className="bg-red-950/20 p-2 sm:p-4 lg:p-6 flex flex-col justify-between group cursor-help relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-red-500/50"
                // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard focus required for CSS tooltips
                tabIndex={0}
                role="region"
                aria-label="High Confidence, Incorrect quadrant indicates a Dangerous Blindspot"
              >
                <div className="absolute inset-0 bg-red-950/40 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity" />
                <div className="text-[8px] sm:text-[9px] md:text-[10px] text-red-500/70 font-mono uppercase tracking-wider sm:tracking-widest relative z-10 leading-[1.2] flex-grow-0 block truncate pr-1">
                  High Conf<span className="hidden sm:inline">, Incorrect</span>
                </div>
                <div className="text-red-400 font-bold font-sans text-sm sm:text-base md:text-lg lg:text-xl relative z-10 leading-tight">
                  Dangerous
                  <br />
                  Blindspot
                </div>
              </div>

              {/* High Conf + Correct -> Mastery */}
              {/* biome-ignore lint/a11y/useSemanticElements: Quadrant acts as a large touch target, rendered as a div for strict flexbox properties */}
              <div
                className="bg-brand-teal/5 p-2 sm:p-4 lg:p-6 flex flex-col justify-between group border-l border-zinc-800 cursor-help relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard focus required for CSS tooltips
                tabIndex={0}
                role="region"
                aria-label="High Confidence, Correct quadrant indicates Verified Mastery"
              >
                <div className="absolute inset-0 bg-brand-teal/10 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity" />
                <div className="text-[8px] sm:text-[9px] md:text-[10px] text-brand-teal/50 font-mono uppercase tracking-wider sm:tracking-widest relative z-10 leading-[1.2] flex-grow-0 block truncate pr-1">
                  High Conf<span className="hidden sm:inline">, Correct</span>
                </div>
                <div className="text-brand-teal font-bold font-sans text-sm sm:text-base md:text-lg lg:text-xl relative z-10 leading-tight">
                  Verified
                  <br className="sm:hidden" /> Mastery
                </div>
              </div>

              {/* Low Conf + Incorrect -> Expected Gap */}
              {/* biome-ignore lint/a11y/useSemanticElements: Quadrant acts as a large touch target, rendered as a div for strict flexbox properties */}
              <div
                className="bg-zinc-950 p-2 sm:p-4 lg:p-6 flex flex-col justify-between group border-t border-zinc-800 cursor-help relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-zinc-600/50"
                // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard focus required for CSS tooltips
                tabIndex={0}
                role="region"
                aria-label="Low Confidence, Incorrect quadrant indicates a Known Gap"
              >
                <div className="absolute inset-0 bg-zinc-900/50 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity" />
                <div className="text-[8px] sm:text-[9px] md:text-[10px] text-zinc-400 font-mono uppercase tracking-wider sm:tracking-widest relative z-10 leading-[1.2] flex-grow-0 block truncate pr-1">
                  Low Conf<span className="hidden sm:inline">, Incorrect</span>
                </div>
                <div className="text-zinc-400 font-medium font-sans text-sm sm:text-base md:text-lg lg:text-xl relative z-10 leading-tight">
                  Known Gap
                </div>
              </div>

              {/* Low Conf + Correct -> Lucky Guess */}
              {/* biome-ignore lint/a11y/useSemanticElements: Quadrant acts as a large touch target, rendered as a div for strict flexbox properties */}
              <div
                className="bg-orange-950/10 p-2 sm:p-4 lg:p-6 flex flex-col justify-between group border-t border-l border-zinc-800 cursor-help relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard focus required for CSS tooltips
                tabIndex={0}
                role="region"
                aria-label="Low Confidence, Correct quadrant indicates a Lucky Guess"
              >
                <div className="absolute inset-0 bg-orange-950/30 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity" />
                <div className="text-[8px] sm:text-[9px] md:text-[10px] text-orange-500/60 font-mono uppercase tracking-wider sm:tracking-widest relative z-10 leading-[1.2] flex-grow-0 block truncate pr-1">
                  Low Conf<span className="hidden sm:inline">, Correct</span>
                </div>
                <div className="text-orange-400 font-medium font-sans text-sm sm:text-base md:text-lg lg:text-xl relative z-10 leading-tight">
                  Lucky Guess
                  <div className="text-[9px] sm:text-[10px] md:text-xs opacity-80 border border-orange-500/30 bg-orange-500/10 px-1 py-0.5 rounded sm:mt-1 inline-block mt-0.5 w-max">
                    SRS Flag
                  </div>
                </div>
              </div>
            </div>

            {/* Axes Labels */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-zinc-400 uppercase tracking-widest text-center">
              Competence →
            </div>
            <div className="absolute top-1/2 left-2 -translate-y-1/2 -rotate-90 text-[9px] font-mono text-zinc-400 uppercase tracking-widest text-center origin-center">
              Confidence →
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
