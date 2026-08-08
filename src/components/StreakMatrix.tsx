import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { CONTENT } from "../constants/content";
import {
  getLastPracticedWeek,
  getStreakStats,
  getWindowStats,
} from "../utils/streak-data";
import SectionSpotlight from "./SectionSpotlight";

interface StreakDayData {
  practiced: boolean;
  future?: boolean;
  intensityClass?: string;
  tooltip?: string;
  streakAmt?: number;
  accuracy?: number;
  minutes?: number;
  quality?: number;
}

/** Width of the interactive window, in weeks. */
const WINDOW_WEEKS = 8;
/* Physics-aligned with the design-system surgical spring (150/25), tuned
   slightly stiffer so scrub feedback tracks pointer input. */
const SCRUB_SPRING = { stiffness: 320, damping: 34 };

const weekKeys = Array.from({ length: CONTENT.streakMatrix.weeks }).map(
  (_, i) => `week-${i}`,
);
const dayKeys = Array.from({ length: CONTENT.streakMatrix.daysPerWeek }).map(
  (_, i) => `day-${i}`,
);
/* Axis markers at the start of each quarter of the 52-week grid. */
const AXIS_MARKERS = [
  { week: 0, label: "W01" },
  { week: 12, label: "W13" },
  { week: 25, label: "W26" },
  { week: 38, label: "W39" },
  { week: 51, label: "W52" },
];

const DayCell = React.memo(
  ({
    dayData,
    delay,
    dimmed,
    onHover,
    onHoverEnd,
  }: {
    dayData: StreakDayData;
    delay: number;
    dimmed: boolean;
    onHover: (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.FocusEvent<HTMLButtonElement>,
      dayData: StreakDayData,
    ) => void;
    onHoverEnd: () => void;
  }) => {
    return (
      <button
        type="button"
        disabled={dayData.future || !dayData.practiced}
        tabIndex={dayData.future || !dayData.practiced ? -1 : 0}
        className={`relative block p-0 outline-none w-6 h-6 rounded-[3px] border cursor-default animate-pulse-fade-in opacity-0
          focus-visible:ring-1 focus-visible:ring-brand-teal focus-visible:ring-offset-1 focus-visible:ring-offset-bg
          transition-all duration-300 active:scale-95 active:duration-75 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${dimmed ? "brightness-50 saturate-50" : ""}
          ${
            dayData.future
              ? "bg-zinc-900/20 border-transparent"
              : dayData.practiced
                ? `${dayData.intensityClass} hover:brightness-110 hover:-translate-y-0.5 hover:scale-110 hover:shadow-[0_4px_12px_rgb(var(--brand-teal-rgb)/0.3)] hover:z-10`
                : "bg-bg border-border-subtle hover:bg-surface/50 hover:border-border/80 active:bg-surface/80"
          }`}
        style={{ animationDelay: `${delay}s`, animationFillMode: "forwards" }}
        onMouseEnter={(e) => onHover(e, dayData)}
        onMouseLeave={onHoverEnd}
        onFocus={(e) => onHover(e, dayData)}
        onBlur={onHoverEnd}
        aria-label={dayData.tooltip || "No data recorded"}
      />
    );
  },
);
DayCell.displayName = "DayCell";

const MatrixGrid = React.memo(
  ({
    stats,
    windowStart,
    windowEnd,
    onHover,
    onHoverEnd,
  }: {
    stats: StreakDayData[];
    windowStart: number;
    windowEnd: number;
    onHover: (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.FocusEvent<HTMLButtonElement>,
      dayData: StreakDayData,
    ) => void;
    onHoverEnd: () => void;
  }) => {
    const daysPerWeek = CONTENT.streakMatrix.daysPerWeek;
    return (
      <div className="flex gap-[3px] md:gap-[4px] w-max relative">
        {weekKeys.map((weekKey, weekIndex) => (
          <div key={weekKey} className="flex flex-col gap-[3px] md:gap-[4px]">
            {dayKeys.map((dayKey, dayIndex) => {
              const dayData = stats[weekIndex * daysPerWeek + dayIndex];
              if (!dayData) return null;

              // Diagonal wave sweep instead of isolated columns for a more organic entrance
              const delay = weekIndex * 0.02 + dayIndex * 0.015;

              return (
                <DayCell
                  key={dayKey}
                  dayData={dayData}
                  delay={delay}
                  dimmed={weekIndex < windowStart || weekIndex > windowEnd}
                  onHover={onHover}
                  onHoverEnd={onHoverEnd}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  },
);
MatrixGrid.displayName = "MatrixGrid";

export default function StreakMatrix() {
  const readout = CONTENT.streakMatrix.readout;
  const totalWeeks = CONTENT.streakMatrix.weeks;
  const daysPerWeek = CONTENT.streakMatrix.daysPerWeek;

  const stats = useMemo(
    () => getStreakStats(totalWeeks, daysPerWeek),
    [totalWeeks, daysPerWeek],
  );

  /* Focus week = the week the scrubber window is centered on (1-based for
     aria, 0-based internally). Defaults to the most recent practiced week. */
  const defaultWeek = useMemo(
    () => getLastPracticedWeek(stats, daysPerWeek),
    [stats, daysPerWeek],
  );
  const [focusWeek, setFocusWeek] = useState(defaultWeek);

  const windowStart = Math.min(
    Math.max(0, focusWeek - Math.floor(WINDOW_WEEKS / 2)),
    totalWeeks - WINDOW_WEEKS,
  );
  const windowEnd = windowStart + WINDOW_WEEKS - 1;

  const windowStats = useMemo(
    () => getWindowStats(stats, daysPerWeek, windowStart, windowEnd),
    [stats, daysPerWeek, windowStart, windowEnd],
  );

  /* Per-week session counts drive the scrubber strip's intensity ticks —
     computed once, not per render. */
  const weeklyIntensity = useMemo(
    () =>
      weekKeys.map((_, weekIndex) => {
        const weekStats = getWindowStats(
          stats,
          daysPerWeek,
          weekIndex,
          weekIndex,
        );
        return Math.min(1, weekStats.sessions / daysPerWeek);
      }),
    [stats, daysPerWeek],
  );

  /* ── Window scrubber geometry: spring-driven, transform-only bracket ── */
  const stripRef = useRef<HTMLDivElement>(null);
  const [stripWidth, setStripWidth] = useState(0);
  const windowX = useMotionValue(0);
  const springWindowX = useSpring(windowX, SCRUB_SPRING);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const measure = () => setStripWidth(el.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* First synchronisation after measurement snaps instantly (spring.jump);
     later scrubs glide through the spring. */
  const firstSync = useRef(true);
  useEffect(() => {
    if (stripWidth <= 0) return;
    const x = (windowStart / totalWeeks) * stripWidth;
    if (firstSync.current) {
      firstSync.current = false;
      const jumpable = springWindowX as typeof springWindowX & {
        jump?: (v: number) => void;
      };
      if (typeof jumpable.jump === "function") jumpable.jump(x);
      else windowX.set(x);
    } else {
      windowX.set(x);
    }
  }, [windowStart, stripWidth, windowX, springWindowX, totalWeeks]);

  const weekFromClientX = useCallback(
    (clientX: number) => {
      const rect = stripRef.current?.getBoundingClientRect();
      if (!rect || rect.width === 0) return null;
      const frac = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      return Math.min(totalWeeks - 1, Math.round(frac * (totalWeeks - 1)));
    },
    [totalWeeks],
  );

  const handleStripPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      const next = weekFromClientX(e.clientX);
      if (next !== null) setFocusWeek(next);
    },
    [weekFromClientX],
  );

  const handleStripPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
      const next = weekFromClientX(e.clientX);
      if (next !== null) setFocusWeek(next);
    },
    [weekFromClientX],
  );

  const handleStripPointerEnd = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    },
    [],
  );

  const handleStripKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      let next: number | null = null;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          next = Math.min(totalWeeks - 1, focusWeek + 1);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          next = Math.max(0, focusWeek - 1);
          break;
        case "PageUp":
          next = Math.min(totalWeeks - 1, focusWeek + WINDOW_WEEKS);
          break;
        case "PageDown":
          next = Math.max(0, focusWeek - WINDOW_WEEKS);
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = totalWeeks - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      setFocusWeek(next);
    },
    [focusWeek, totalWeeks],
  );

  /* ── Hover tooltip (transform-only via motion values) ── */
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    text: string;
    streakAmt: number;
  }>({ visible: false, text: "", streakAmt: 0 });
  const tipX = useMotionValue(0);
  const tipY = useMotionValue(0);
  const springTipX = useSpring(tipX, SCRUB_SPRING);
  const springTipY = useSpring(tipY, SCRUB_SPRING);

  const handleHover = useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.FocusEvent<HTMLButtonElement>,
      dayData: StreakDayData,
    ) => {
      if (!dayData.practiced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      tipX.set(rect.left + rect.width / 2);
      tipY.set(rect.top - 8);
      setTooltip({
        visible: true,
        text: dayData.tooltip || "",
        streakAmt: dayData.streakAmt || 0,
      });
    },
    [tipX, tipY],
  );

  const handleHoverEnd = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  useEffect(() => {
    if (!tooltip.visible) return;

    const handleScroll = () => {
      setTooltip((prev) => ({ ...prev, visible: false }));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tooltip.visible]);

  return (
    <section
      className="relative py-24 bg-bg border-t border-border-subtle overflow-hidden"
      id="mastery"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--brand-teal-rgb)/0.03)_0%,transparent_100%)] pointer-events-none" />
      <SectionSpotlight color="rgb(var(--brand-teal-rgb) / 0.12)" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-brand-teal uppercase tracking-widest bg-brand-teal/10 border border-brand-teal/20 px-3 py-1.5 rounded-full mb-6 inline-block">
            Daily practice
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-fg mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <span>The Practice</span>
            <span className="relative inline-block text-fg-muted px-1">
              <span className="absolute left-[-5%] top-1/2 w-[110%] h-[3px] bg-red-900/60 -translate-y-1/2 -rotate-6 rounded-full"></span>
              Login
            </span>
            <span>Streak</span>
          </h2>
          <p
            data-speakable
            className="text-fg-muted font-sans max-w-2xl mx-auto"
          >
            AdaptHub cannot be tricked by simply opening the app. You only light
            up the grid if you engage in active learning and hit your accuracy
            threshold.{" "}
            <strong className="text-fg font-medium">
              Earned, never given.
            </strong>
          </p>
        </div>

        <div className="bg-bg/80 border border-border/80 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur max-w-[1000px] mx-auto">
          {/* The Matrix */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "100px" }}
            className="overflow-x-auto custom-scrollbar pb-4 mb-1"
            aria-label="Practice Streaks Matrix showing 52 weeks of practice data"
          >
            <div className="w-max mx-auto px-2">
              <MatrixGrid
                stats={stats}
                windowStart={windowStart}
                windowEnd={windowEnd}
                onHover={handleHover}
                onHoverEnd={handleHoverEnd}
              />
              {/* Week axis markers */}
              <div className="relative h-4 mt-2 select-none" aria-hidden="true">
                {AXIS_MARKERS.map((marker) => (
                  <span
                    key={marker.week}
                    className="absolute top-0 -translate-x-1/2 font-mono text-[11px] uppercase tracking-widest text-fg-subtle"
                    style={{
                      left: `${((marker.week + 0.5) / totalWeeks) * 100}%`,
                    }}
                  >
                    {marker.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Window scrubber strip */}
          <div className="px-2 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle select-none">
                {readout.windowLabel}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-brand-teal select-none">
                {readout.weekLabel} {windowStart + 1}–{windowEnd + 1}
              </span>
            </div>
            <div
              ref={stripRef}
              role="slider"
              aria-label={readout.instructionLabel}
              aria-orientation="horizontal"
              aria-valuemin={1}
              aria-valuemax={totalWeeks}
              aria-valuenow={focusWeek + 1}
              aria-valuetext={`${readout.weekLabel} ${windowStart + 1} to ${windowEnd + 1}: ${windowStats.sessions} sessions, ${windowStats.avgAccuracy}% average accuracy, best streak ${windowStats.bestStreak} days`}
              tabIndex={0}
              className="relative h-10 rounded-lg bg-surface/40 border border-border/60 cursor-ew-resize touch-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
              onPointerDown={handleStripPointerDown}
              onPointerMove={handleStripPointerMove}
              onPointerUp={handleStripPointerEnd}
              onPointerCancel={handleStripPointerEnd}
              onKeyDown={handleStripKeyDown}
            >
              {/* Weekly practice intensity ticks */}
              <div
                className="absolute inset-0 flex items-stretch gap-px px-1 py-1.5 pointer-events-none"
                aria-hidden="true"
              >
                {weekKeys.map((weekKey, weekIndex) => (
                  <span
                    key={weekKey}
                    className="flex-1 rounded-[2px] bg-brand-teal/30"
                    style={{
                      opacity: 0.15 + weeklyIntensity[weekIndex] * 0.85,
                    }}
                  />
                ))}
              </div>
              {/* Spring-tracked window bracket (transform-only). SSR/no-JS gets
                  a static fallback at the same window so the two never disagree. */}
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
              >
                {stripWidth <= 0 && (
                  <div
                    className="absolute inset-y-0 border-y border-x-2 border-brand-teal/40 bg-brand-teal/5 rounded-md"
                    style={{
                      left: `${(windowStart / totalWeeks) * 100}%`,
                      width: `${(WINDOW_WEEKS / totalWeeks) * 100}%`,
                    }}
                  />
                )}
                <motion.div
                  style={{
                    x: springWindowX,
                    width: `${(WINDOW_WEEKS / totalWeeks) * 100}%`,
                  }}
                  className={`absolute inset-y-0 left-0 border-y border-x-2 border-brand-teal/70 bg-brand-teal/10 rounded-md shadow-[0_0_18px_rgb(var(--brand-teal-rgb)/0.25)] ${
                    stripWidth > 0 ? "" : "invisible"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Window readout */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
            aria-live="polite"
          >
            <div className="border border-border/60 rounded-xl px-4 py-3 bg-surface/40">
              <div className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle mb-1">
                {readout.sessionsLabel}
              </div>
              <motion.div
                key={`sessions-${windowStart}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="font-serif text-2xl text-fg tabular-nums"
              >
                {windowStats.sessions}
              </motion.div>
            </div>
            <div className="border border-border/60 rounded-xl px-4 py-3 bg-surface/40">
              <div className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle mb-1">
                {readout.minutesLabel}
              </div>
              <motion.div
                key={`minutes-${windowStart}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="font-serif text-2xl text-fg tabular-nums"
              >
                {windowStats.minutes}
              </motion.div>
            </div>
            <div className="border border-border/60 rounded-xl px-4 py-3 bg-surface/40">
              <div className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle mb-1">
                {readout.accuracyLabel}
              </div>
              <motion.div
                key={`acc-${windowStart}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="font-serif text-2xl text-brand-teal tabular-nums"
              >
                {windowStats.sessions > 0 ? `${windowStats.avgAccuracy}%` : "–"}
              </motion.div>
            </div>
            <div className="border border-border/60 rounded-xl px-4 py-3 bg-surface/40">
              <div className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle mb-1">
                {readout.streakLabel}
              </div>
              <motion.div
                key={`streak-${windowStart}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="font-serif text-2xl text-gold-300 tabular-nums"
              >
                {windowStats.bestStreak}
              </motion.div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-border/50 pt-6 gap-6 px-2">
            <div className="font-mono text-[11px] text-fg-muted uppercase tracking-widest">
              52 weeks of practice
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-fg-muted uppercase tracking-widest">
              <span>Less</span>
              <div className="w-6 h-6 rounded-[3px] bg-bg border border-border/50" />
              <div className="w-6 h-6 rounded-[3px] bg-brand-teal/20 border border-brand-teal/10" />
              <div className="w-6 h-6 rounded-[3px] bg-brand-teal/40 border border-brand-teal/30" />
              <div className="w-6 h-6 rounded-[3px] bg-brand-teal/60 border border-brand-teal/50" />
              <div className="w-6 h-6 rounded-[3px] bg-brand-teal shadow-[0_0_10px_rgb(var(--brand-teal-rgb)/0.5)] border-brand-teal" />
              <span>More</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm">
          <a
            href="/pricing"
            className="group relative inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg-muted hover:text-brand-teal transition-colors duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              One price, no asterisks: ₹0
              <span className="transform transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-2">
                →
              </span>
            </span>
            <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-brand-teal transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:w-full opacity-0 group-hover:opacity-100" />
          </a>
        </div>
      </div>

      {/* Viewport-level tooltip portal — transform-only spring tracking */}
      <AnimatePresence>
        {tooltip.visible && (
          <motion.div
            className="fixed left-0 top-0 z-[100] pointer-events-none"
            style={{ x: springTipX, y: springTipY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="bg-bg/95 backdrop-blur-md border border-border text-fg px-3 py-2 md:px-4 md:py-3 rounded-lg shadow-2xl whitespace-pre-line text-center leading-relaxed font-sans text-[11px] md:text-xs w-max max-w-[200px] -translate-x-1/2 -translate-y-full"
              aria-hidden="true"
            >
              <span className="text-fg">{tooltip.text}</span>
              <div className="text-brand-teal mt-2 border-t border-border/80 pt-2 font-mono text-[11px] md:text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
                <span className="text-emerald-400">⚡</span>
                <span>{tooltip.streakAmt} Day Streak</span>
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-border" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
