import { MotionConfig, motion, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CONTENT } from "../constants/content";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import SectionSpotlight from "./SectionSpotlight";

/* Physics-aligned with the design-system surgical spring (150/25), tuned
   slightly stiffer for a scrubber that must track pointer input. */
const SCRUB_SPRING = { stiffness: 320, damping: 34 };

type DayBand = "zpd" | "comfort" | "overreach";

/** ZPD calibration: the 70–85% accuracy band is where learning velocity peaks. */
function bandFor(accuracy: number): DayBand {
  if (accuracy >= 70 && accuracy <= 85) return "zpd";
  if (accuracy > 85) return "comfort";
  return "overreach";
}

const BAND_STYLES: Record<DayBand, string> = {
  zpd: "text-brand-teal border-brand-teal/30 bg-brand-teal/10",
  comfort: "text-gold-300 border-gold-500/30 bg-gold-500/10",
  overreach: "text-orange-400 border-orange-400/30 bg-orange-400/10",
};

export default function VelocityDashboard() {
  const { days, accuracy, velocity, scrubber } = CONTENT.velocityDashboard;
  const dayCount = days.length;

  // wrap the entire dashboard subtree in MotionConfig
  // so that when prefers-reduced-motion (or low-end device per the
  // use-reduced-motion.ts heuristic) is active, all motion children render at
  // their target state immediately (transforms disabled via reducedMotion=
  // "always", remaining opacity/color/pathLength animations collapsed via
  // transition={ duration: 0 }). The SVG path drawing, bar
  // growth, and dot scaling were previously ungated.
  const prefersReducedMotion = useReducedMotion();

  const lastIndex = dayCount - 1;
  const [selectedIndex, setSelectedIndex] = useState(lastIndex);
  const [boxWidth, setBoxWidth] = useState(0);
  const anchorRef = useRef<HTMLDivElement>(null);

  /* Hardware-accelerated scrub position: pointer/keyboard writes the motion
     value, the spring smooths it, transform-only rendering keeps it on the
     compositor (no layout work per frame). */
  const scrubX = useMotionValue(0);
  const springX = useSpring(scrubX, SCRUB_SPRING);

  // Calculate SVG points for the velocity line (X is percentage, Y is percentage from top)
  const linePoints = useMemo(() => {
    return velocity
      .map((v, i) => {
        const x = (i / lastIndex) * 100;
        const y = 100 - v.value;
        return `${x},${y}`;
      })
      .join(" L");
  }, [velocity, lastIndex]);

  /* Track the locked anchor box width so index → pixel mapping stays exact
     through fluid breakpoints and zoom. */
  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;
    const measure = () => setBoxWidth(el.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* First synchronisation after measurement snaps instantly (spring.jump);
     later changes glide through the spring. */
  const firstSync = useRef(true);
  useEffect(() => {
    if (boxWidth <= 0) return;
    const x = (selectedIndex / lastIndex) * boxWidth;
    if (firstSync.current) {
      firstSync.current = false;
      const jumpable = springX as typeof springX & {
        jump?: (v: number) => void;
      };
      if (typeof jumpable.jump === "function") jumpable.jump(x);
      else scrubX.set(x);
    } else {
      scrubX.set(x);
    }
  }, [selectedIndex, boxWidth, scrubX, springX, lastIndex]);

  const indexFromClientX = useCallback(
    (clientX: number) => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect || rect.width === 0) return null;
      const frac = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      return Math.round(frac * lastIndex);
    },
    [lastIndex],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      const next = indexFromClientX(e.clientX);
      if (next !== null) setSelectedIndex(next);
    },
    [indexFromClientX],
  );

  /* Drag-gated via pointer capture (same contract as the streak window
     scrubber): an active press scrubs; a passive hover does not hijack the
     selected day, so the readout stays stable while reading the chart. */
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
      const next = indexFromClientX(e.clientX);
      if (next !== null) setSelectedIndex(next);
    },
    [indexFromClientX],
  );

  const handlePointerEnd = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    },
    [],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      let next: number | null = null;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          next = Math.min(lastIndex, selectedIndex + 1);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          next = Math.max(0, selectedIndex - 1);
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = lastIndex;
          break;
        case "PageUp":
          next = Math.min(lastIndex, selectedIndex + 2);
          break;
        case "PageDown":
          next = Math.max(0, selectedIndex - 2);
          break;
        default:
          return;
      }
      e.preventDefault();
      setSelectedIndex(next);
    },
    [selectedIndex, lastIndex],
  );

  const selectedBand = bandFor(accuracy[selectedIndex].value);
  const velocityDelta =
    selectedIndex > 0
      ? velocity[selectedIndex].value - velocity[selectedIndex - 1].value
      : 0;

  return (
    <MotionConfig
      reducedMotion={prefersReducedMotion ? "always" : "user"}
      transition={prefersReducedMotion ? { duration: 0 } : undefined}
    >
      <section className="relative py-24 sm:py-32 overflow-hidden bg-bg border-t border-border-subtle">
        {/* Background Atmosphere */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-violet/5 rounded-full blur-[150px] pointer-events-none" />
        <SectionSpotlight color="rgb(var(--brand-teal-rgb) / 0.12)" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 relative z-10 max-w-[1800px]">
          {/* GEO Semantic Content & Header */}
          <div className="mb-16 lg:mb-20">
            <p data-speakable className="sr-only">
              Raw mock scores are vanity metrics. AdaptHub tracks Learning
              Velocity, a 7-day measure of how efficiently you absorb new
              concepts. High accuracy with low velocity means you are practicing
              in your comfort zone. The ZPD growth band is 70 to 85 percent
              accuracy.
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-fg leading-tight tracking-tight mb-6 text-center">
              See what's really happening{" "}
              <span className="text-fg-muted line-through">
                mock scores alone
              </span>
            </h2>
            <p className="text-fg-muted text-lg mx-auto text-center max-w-3xl font-sans leading-relaxed">
              Raw mock scores mean nothing. AdaptHub tracks{" "}
              <strong className="text-brand-teal font-medium">
                Learning Velocity,
              </strong>{" "}
              a 7-day composite diagnostic of how efficiently you absorb new
              concepts.
            </p>
            <div className="flex justify-center mt-6">
              <a
                href="/docs"
                className="group inline-flex items-center gap-2 text-xs md:text-sm font-mono uppercase tracking-widest text-brand-teal hover:text-fg transition-colors"
              >
                <span>How progress tracking works</span>
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
              className="lg:col-span-8 bg-bg border border-border/80 rounded-3xl p-6 md:p-8 relative shadow-2xl"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/80 pb-6 mb-8">
                <div>
                  <h3 className="text-fg font-mono text-lg uppercase tracking-wider mb-1">
                    Learning Velocity Profile
                  </h3>
                  <div className="text-fg-muted font-mono text-xs uppercase tracking-widest">
                    7-Day Rolling Window Analysis
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono uppercase tracking-widest">
                  <div className="flex items-center gap-2 text-fg-muted">
                    <span className="w-3 h-3 bg-zinc-800 rounded-sm"></span>{" "}
                    {scrubber.accuracyLabel}
                  </div>
                  <div className="flex items-center gap-2 text-brand-teal">
                    <span className="w-3 h-1 bg-brand-teal"></span>{" "}
                    {scrubber.velocityLabel}
                  </div>
                </div>
              </div>

              {/* Scrub hint */}
              <p className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle mb-2 select-none">
                {scrubber.hint}
              </p>

              {/* Chart Area */}
              <div className="relative h-[250px] md:h-[300px] w-full z-10 mt-2 mb-8">
                {/* Background Grid */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 z-0">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-full h-px bg-zinc-700"></div>
                  ))}
                </div>

                {/* MATHEMATICALLY LOCKED ANCHOR BOX: Guarantees 0-100% X-Axis sync for all data layers */}
                <div
                  ref={anchorRef}
                  className="absolute inset-y-0 z-10"
                  style={{ left: "min(5%, 20px)", right: "min(5%, 20px)" }}
                >
                  {/* 1. Bars (Accuracy) — scaleY growth keeps the entrance
                      fully on the compositor (no per-frame layout work). */}
                  {accuracy.map((acc, i) => {
                    const isActive = i === selectedIndex;
                    return (
                      <div
                        key={acc.id}
                        className="absolute bottom-0 h-full w-[10vw] max-w-[40px] flex items-end justify-center -translate-x-1/2 pointer-events-none"
                        style={{
                          left: `${(i / lastIndex) * 100}%`,
                        }}
                      >
                        <motion.div
                          className={`w-full h-full border-t rounded-t-sm origin-bottom transition-colors duration-300 ${
                            isActive
                              ? "bg-zinc-600/80 border-zinc-500/70"
                              : "bg-zinc-800/80 border-zinc-600/50"
                          }`}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: acc.value / 100 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
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
                        <stop
                          offset="0%"
                          style={{
                            stopColor: "var(--color-brand-teal)",
                            stopOpacity: 0.5,
                          }}
                        />
                        <stop
                          offset="100%"
                          style={{
                            stopColor: "var(--color-brand-teal)",
                            stopOpacity: 0,
                          }}
                        />
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
                      style={{
                        stroke: "var(--color-brand-teal)",
                        strokeWidth: 0.8,
                        filter:
                          "drop-shadow(0 0 6px rgb(var(--brand-teal-rgb) / 0.6))",
                      }}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                    />
                  </svg>

                  {/* 3. Velocity data dots */}
                  {velocity.map((v, i) => {
                    const isActive = i === selectedIndex;
                    return (
                      <motion.div
                        key={v.id}
                        className={`absolute w-3 h-3 bg-bg border-2 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 ${
                          isActive
                            ? "border-brand-teal shadow-[0_0_12px_rgb(var(--brand-teal-rgb)/0.8)]"
                            : "border-brand-teal/70"
                        }`}
                        style={{
                          left: `${(i / lastIndex) * 100}%`,
                          top: `${100 - v.value}%`,
                        }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.5 + Math.max(1.5, (i / lastIndex) * 2),
                        }}
                      />
                    );
                  })}

                  {/* 4. X-Axis Labels */}
                  {days.map((d, i) => {
                    const isActive = i === selectedIndex;
                    return (
                      <div
                        key={d.id}
                        className={`absolute -bottom-8 text-[11px] uppercase tracking-widest font-mono -translate-x-1/2 text-center transition-colors duration-300 ${
                          isActive ? "text-brand-teal" : "text-fg-muted"
                        }`}
                        style={{ left: `${(i / lastIndex) * 100}%` }}
                      >
                        {d.label}
                      </div>
                    );
                  })}

                  {/* 5. Interactive scrubber surface (pointer + keyboard) */}
                  <div
                    role="slider"
                    aria-label={scrubber.instructionLabel}
                    aria-orientation="horizontal"
                    aria-valuemin={1}
                    aria-valuemax={dayCount}
                    aria-valuenow={selectedIndex + 1}
                    aria-valuetext={`${days[selectedIndex].label}: ${scrubber.accuracyLabel} ${accuracy[selectedIndex].value}%, ${scrubber.velocityLabel} ${velocity[selectedIndex].value}%`}
                    tabIndex={0}
                    className="absolute -inset-x-[min(5%,20px)] inset-y-0 z-40 cursor-ew-resize touch-none outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60 rounded-md"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerEnd}
                    onPointerCancel={handlePointerEnd}
                    onKeyDown={handleKeyDown}
                  />

                  {/* 6. Spring-scrubbed crosshair (transform-only, compositor).
                      SSR/no-JS renders a static marker at the selected day so the
                      first paint never disagrees with the readout below. */}
                  <div
                    className="absolute inset-0 z-30 pointer-events-none"
                    aria-hidden="true"
                  >
                    {boxWidth <= 0 && (
                      <div
                        className="absolute inset-y-0 -translate-x-1/2 w-px bg-brand-teal/40"
                        style={{
                          left: `${(selectedIndex / lastIndex) * 100}%`,
                        }}
                      />
                    )}
                    <motion.div
                      style={{ x: springX }}
                      className={`absolute inset-y-0 left-0 w-0 ${
                        boxWidth > 0 ? "" : "invisible"
                      }`}
                    >
                      <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-brand-teal/60" />
                      <div
                        className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-teal shadow-[0_0_10px_rgb(var(--brand-teal-rgb)/0.9)]"
                        style={{
                          top: `${100 - velocity[selectedIndex].value}%`,
                        }}
                      />
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-max max-w-[140px] text-center bg-bg/90 backdrop-blur-sm border border-brand-teal/25 rounded-md px-2 py-1 shadow-lg">
                        <span className="font-mono text-[11px] uppercase tracking-widest text-fg">
                          {days[selectedIndex].label}
                        </span>{" "}
                        <span className="font-mono text-[11px] text-brand-teal">
                          {velocity[selectedIndex].value}%
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Readout: selected day telemetry */}
              <div
                className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3"
                aria-live="polite"
              >
                <div className="border border-border/60 rounded-xl px-4 py-3 bg-surface/40">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle mb-1">
                    {scrubber.accuracyLabel}
                  </div>
                  <motion.div
                    key={`acc-${selectedIndex}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="font-serif text-2xl text-fg tabular-nums"
                  >
                    {accuracy[selectedIndex].value}%
                  </motion.div>
                </div>
                <div className="border border-border/60 rounded-xl px-4 py-3 bg-surface/40">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle mb-1">
                    {scrubber.velocityLabel}
                  </div>
                  <motion.div
                    key={`vel-${selectedIndex}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="font-serif text-2xl text-brand-teal tabular-nums"
                  >
                    {velocity[selectedIndex].value}%
                  </motion.div>
                </div>
                <div className="border border-border/60 rounded-xl px-4 py-3 bg-surface/40">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle mb-1">
                    {scrubber.deltaLabel}
                  </div>
                  <motion.div
                    key={`delta-${selectedIndex}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`font-serif text-2xl tabular-nums ${
                      velocityDelta > 0
                        ? "text-brand-teal"
                        : velocityDelta < 0
                          ? "text-orange-400"
                          : "text-fg-muted"
                    }`}
                  >
                    {selectedIndex === 0
                      ? "–"
                      : `${velocityDelta > 0 ? "+" : ""}${velocityDelta}%`}
                  </motion.div>
                </div>
                <div
                  className={`border rounded-xl px-4 py-3 flex flex-col justify-center ${BAND_STYLES[selectedBand]}`}
                >
                  <div className="font-mono text-[11px] uppercase tracking-widest opacity-80 mb-1">
                    Band
                  </div>
                  <div className="font-mono text-xs leading-snug">
                    {scrubber.bands[selectedBand]}
                  </div>
                </div>
              </div>

              {/* Tilt Alert Card (Overlays on chart) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, type: "spring" }}
                viewport={{ once: true }}
                className="absolute top-[40%] right-6 md:right-12 bg-bg border border-orange-900/50 p-4 rounded-xl shadow-[0_10px_30px_color-mix(in_srgb,var(--color-orange-600)_15%,transparent)] flex items-start gap-4 max-w-[280px] z-50 pointer-events-none"
              >
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-orange-500 text-lg font-bold">⚠</span>
                </div>
                <div>
                  <h4 className="text-orange-500 font-mono text-[11px] uppercase tracking-widest mb-1">
                    Tilt Detected
                  </h4>
                  <p className="text-fg-muted text-xs font-sans leading-relaxed">
                    3 consecutive errors in &lt; 45s. You may be guessing.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT: Confidence vs Competence Matrix */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 bg-surface/40 border border-border/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              <div className="mb-8">
                <h3 className="text-fg font-serif text-2xl italic mb-3">
                  Confidence Calibration
                </h3>
                <p className="text-fg-muted text-sm leading-relaxed">
                  AdaptHub tracks how well you judge your own answers. See
                  whether you are overconfident, underconfident, or well
                  calibrated, and close the gaps.
                </p>
              </div>

              {/* 2x2 Grid */}
              <div className="grid grid-cols-2 grid-rows-2 gap-px bg-border rounded-2xl overflow-hidden aspect-square z-10 relative">
                {/* High Conf + Incorrect -> Overconfident */}
                {/* biome-ignore lint/a11y/useSemanticElements: Quadrant acts as a large touch target, rendered as a div for strict flexbox properties */}
                <div
                  className="bg-red-950/20 p-2 sm:p-4 lg:p-6 flex flex-col justify-between group cursor-help relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard focus required for CSS tooltips
                  tabIndex={0}
                  role="region"
                  aria-label="High Confidence, Incorrect. You are overconfident in this area"
                >
                  <div className="absolute inset-0 bg-red-950/40 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity" />
                  <div className="text-[11px] sm:text-xs text-red-500/70 font-mono uppercase tracking-wider sm:tracking-widest relative z-10 leading-[1.2] flex-grow-0 block min-w-0 break-words pr-1">
                    High Conf
                    <span className="hidden sm:inline">, Incorrect</span>
                  </div>
                  <div className="text-red-400 font-bold font-sans text-sm sm:text-base md:text-lg lg:text-xl relative z-10 leading-tight">
                    Overconfident
                  </div>
                </div>

                {/* High Conf + Correct -> Mastery */}
                {/* biome-ignore lint/a11y/useSemanticElements: Quadrant acts as a large touch target, rendered as a div for strict flexbox properties */}
                <div
                  className="bg-brand-teal/5 p-2 sm:p-4 lg:p-6 flex flex-col justify-between group border-l border-border cursor-help relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                  // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard focus required for CSS tooltips
                  tabIndex={0}
                  role="region"
                  aria-label="High Confidence, Correct quadrant indicates Well Calibrated"
                >
                  <div className="absolute inset-0 bg-brand-teal/10 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity" />
                  <div className="text-[11px] sm:text-xs text-brand-teal/50 font-mono uppercase tracking-wider sm:tracking-widest relative z-10 leading-[1.2] flex-grow-0 block min-w-0 break-words pr-1">
                    High Conf<span className="hidden sm:inline">, Correct</span>
                  </div>
                  <div className="text-brand-teal font-bold font-sans text-sm sm:text-base md:text-lg lg:text-xl relative z-10 leading-tight">
                    Well
                    <br className="sm:hidden" /> Calibrated
                  </div>
                </div>

                {/* Low Conf + Incorrect -> Expected Gap */}
                {/* biome-ignore lint/a11y/useSemanticElements: Quadrant acts as a large touch target, rendered as a div for strict flexbox properties */}
                <div
                  className="bg-bg p-2 sm:p-4 lg:p-6 flex flex-col justify-between group border-t border-border cursor-help relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-zinc-600/50"
                  // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard focus required for CSS tooltips
                  tabIndex={0}
                  role="region"
                  aria-label="Low Confidence, Incorrect quadrant indicates a Known Gap"
                >
                  <div className="absolute inset-0 bg-surface/50 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity" />
                  <div className="text-[11px] sm:text-xs text-fg-muted font-mono uppercase tracking-wider sm:tracking-widest relative z-10 leading-[1.2] flex-grow-0 block min-w-0 break-words pr-1">
                    Low Conf
                    <span className="hidden sm:inline">, Incorrect</span>
                  </div>
                  <div className="text-fg-muted font-medium font-sans text-sm sm:text-base md:text-lg lg:text-xl relative z-10 leading-tight">
                    Known Gap
                  </div>
                </div>

                {/* Low Conf + Correct -> Lucky Guess */}
                {/* biome-ignore lint/a11y/useSemanticElements: Quadrant acts as a large touch target, rendered as a div for strict flexbox properties */}
                <div
                  className="bg-orange-950/10 p-2 sm:p-4 lg:p-6 flex flex-col justify-between group border-t border-l border-border cursor-help relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard focus required for CSS tooltips
                  tabIndex={0}
                  role="region"
                  aria-label="Low Confidence, Correct quadrant indicates a Lucky Guess"
                >
                  <div className="absolute inset-0 bg-orange-950/30 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity" />
                  <div className="text-[11px] sm:text-xs text-orange-500/60 font-mono uppercase tracking-wider sm:tracking-widest relative z-10 leading-[1.2] flex-grow-0 block min-w-0 break-words pr-1">
                    Low Conf<span className="hidden sm:inline">, Correct</span>
                  </div>
                  <div className="text-orange-400 font-medium font-sans text-sm sm:text-base md:text-lg lg:text-xl relative z-10 leading-tight">
                    Lucky Guess
                    <div className="text-[11px] sm:text-xs md:text-sm opacity-80 border border-orange-500/30 bg-orange-500/10 px-1 py-0.5 rounded sm:mt-1 inline-block mt-0.5 w-max">
                      SRS Flag
                    </div>
                  </div>
                </div>
              </div>

              {/* Axes Labels */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-mono text-fg-muted uppercase tracking-widest text-center">
                Competence →
              </div>
              <div className="absolute top-1/2 left-2 -translate-y-1/2 -rotate-90 text-[11px] font-mono text-fg-muted uppercase tracking-widest text-center origin-center">
                Confidence →
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
