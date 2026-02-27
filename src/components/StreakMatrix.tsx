import { motion } from "motion/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { CONTENT } from "../constants/content";
import { getStreakStats } from "../utils/streak-data";
import SectionSpotlight from "./SectionSpotlight";

interface StreakDayData {
  practiced: boolean;
  future?: boolean;
  intensityClass?: string;
  tooltip?: string;
  streakAmt?: number;
}

const weekKeys = Array.from({ length: CONTENT.streakMatrix.weeks }).map(
  (_, i) => `week-${i}`,
);
const dayKeys = Array.from({ length: CONTENT.streakMatrix.daysPerWeek }).map(
  (_, i) => `day-${i}`,
);

const DayCell = React.memo(
  ({
    dayData,
    delay,
    onHover,
    onHoverEnd,
  }: {
    dayData: StreakDayData;
    delay: number;
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
        className={`relative block p-0 outline-none w-3 h-3 md:w-4 md:h-4 rounded-[2px] border cursor-default animate-pulse-fade-in opacity-0
          focus-visible:ring-1 focus-visible:ring-brand-teal focus-visible:ring-offset-1 focus-visible:ring-offset-black
          transition-all duration-300 active:scale-95 active:duration-75 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${
            dayData.future
              ? "bg-zinc-900/20 border-transparent"
              : dayData.practiced
                ? `${dayData.intensityClass} hover:brightness-110 hover:-translate-y-0.5 hover:scale-110 hover:shadow-[0_4px_12px_rgba(45,212,191,0.3)] hover:z-10`
                : "bg-zinc-950 border-zinc-900/40 hover:bg-zinc-900/50 hover:border-zinc-800/80 active:bg-zinc-900/80"
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

const MatrixGrid = React.memo(
  ({
    stats,
    onHover,
    onHoverEnd,
  }: {
    stats: StreakDayData[];
    onHover: (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.FocusEvent<HTMLButtonElement>,
      dayData: StreakDayData,
    ) => void;
    onHoverEnd: () => void;
  }) => {
    return (
      <div className="flex gap-[3px] md:gap-[4px] w-max mx-auto px-2 relative">
        {weekKeys.map((weekKey, weekIndex) => (
          <div key={weekKey} className="flex flex-col gap-[3px] md:gap-[4px]">
            {dayKeys.map((dayKey, dayIndex) => {
              const dayData =
                stats[weekIndex * CONTENT.streakMatrix.daysPerWeek + dayIndex];
              if (!dayData) return null;

              // Diagonal wave sweep instead of isolated columns for a more organic entrance
              const delay = weekIndex * 0.02 + dayIndex * 0.015;

              return (
                <DayCell
                  key={dayKey}
                  dayData={dayData}
                  delay={delay}
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
  const [hoveredDay, setHoveredDay] = useState<{
    visible: boolean;
    x: number;
    y: number;
    tooltip: string;
    streakAmt: number;
  }>({ visible: false, x: 0, y: 0, tooltip: "", streakAmt: 0 });

  const stats = useMemo(
    () =>
      getStreakStats(
        CONTENT.streakMatrix.weeks,
        CONTENT.streakMatrix.daysPerWeek,
      ),
    [],
  );

  const handleHover = useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.FocusEvent<HTMLButtonElement>,
      dayData: StreakDayData,
    ) => {
      if (!dayData.practiced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setHoveredDay({
        visible: true,
        x: rect.left + rect.width / 2,
        y: rect.top,
        tooltip: dayData.tooltip || "",
        streakAmt: dayData.streakAmt || 0,
      });
    },
    [],
  );

  const handleHoverEnd = useCallback(() => {
    setHoveredDay((prev) => ({ ...prev, visible: false }));
  }, []);

  useEffect(() => {
    if (!hoveredDay.visible) return;

    const handleScroll = () => {
      setHoveredDay((prev) => ({ ...prev, visible: false }));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hoveredDay.visible]);

  return (
    <section
      className="relative py-24 bg-black border-t border-zinc-900 overflow-hidden"
      id="mastery"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.03)_0%,transparent_100%)] pointer-events-none" />
      <SectionSpotlight color="rgba(45, 212, 191, 0.12)" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-brand-teal uppercase tracking-widest bg-brand-teal/10 border border-brand-teal/20 px-3 py-1.5 rounded-full mb-6 inline-block">
            Meaningful Gamification
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <span>The Quality</span>
            <span className="relative inline-block text-zinc-400 px-1">
              <span className="absolute left-[-5%] top-1/2 w-[110%] h-[3px] bg-red-900/60 -translate-y-1/2 -rotate-6 rounded-full"></span>
              Login
            </span>
            <span>Streak</span>
          </h2>
          <p
            data-speakable
            className="text-zinc-400 font-sans max-w-2xl mx-auto"
          >
            AdaptHub cannot be tricked by simply opening the app. You only light
            up the grid if you engage in active learning and hit your accuracy
            threshold.{" "}
            <strong className="text-white font-medium">
              Earned, never given.
            </strong>
          </p>
        </div>

        <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur max-w-[1000px] mx-auto">
          {/* The Matrix */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "100px" }}
            className="overflow-x-auto custom-scrollbar pb-6 mb-2"
            aria-label="Quality Streaks Matrix showing 52 weeks of practice data"
          >
            <MatrixGrid
              stats={stats}
              onHover={handleHover}
              onHoverEnd={handleHoverEnd}
            />
          </motion.div>

          {/* Legend */}
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-zinc-800/50 pt-6 gap-6 px-2">
            <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
              Grid_Scale: 52_Weeks
            </div>
            <div className="flex items-center gap-2 font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
              <span>Less</span>
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-[2px] bg-black border border-zinc-800/50" />
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-[2px] bg-brand-teal/20 border border-brand-teal/10" />
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-[2px] bg-brand-teal/40 border border-brand-teal/30" />
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-[2px] bg-brand-teal/60 border border-brand-teal/50" />
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-[2px] bg-brand-teal shadow-[0_0_10px_rgba(45,212,191,0.5)] border-brand-teal" />
              <span>More</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm">
          <a
            href="/pricing"
            className="group relative inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-brand-teal transition-colors duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Review Cognitive Locks in Pricing
              <span className="transform transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-2">
                →
              </span>
            </span>
            <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-brand-teal transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:w-full opacity-0 group-hover:opacity-100" />
          </a>
        </div>
      </div>

      {/* Viewport-level Global Tooltip Portal */}
      <div
        className={`fixed z-[100] pointer-events-none origin-bottom ${
          hoveredDay.visible
            ? "opacity-100 scale-100 transition-[opacity,transform,left,top] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
            : "opacity-0 scale-[0.9] transition-[opacity,transform] duration-200 ease-in"
        }`}
        style={{
          left: hoveredDay.x,
          top: hoveredDay.y - 8,
          transform: "translate(-50%, -100%)",
        }}
      >
        <div
          className="bg-zinc-950/95 backdrop-blur-md border border-zinc-800 text-white px-3 py-2 md:px-4 md:py-3 rounded-lg shadow-2xl whitespace-pre-line text-center leading-relaxed font-sans text-[10px] md:text-xs w-max max-w-[200px]"
          aria-hidden="true"
        >
          <span className="text-zinc-300">{hoveredDay.tooltip}</span>
          <div className="text-brand-teal mt-2 border-t border-zinc-800/80 pt-2 font-mono text-[9px] md:text-[10px] uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
            <span className="text-emerald-400">⚡</span>
            <span>{hoveredDay.streakAmt} Day Streak</span>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-zinc-800" />
        </div>
      </div>
    </section>
  );
}
