import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Fragment, useRef, useState } from "react";
import { CONTENT } from "../constants/content";
import { THEME_COLORS } from "../constants/theme";
import { useIsMobile } from "../hooks/use-mobile";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import SectionSpotlight from "./SectionSpotlight";

// -----------------------------------------------------------------------------
// DATA & CONFIG
// -----------------------------------------------------------------------------
const SYSTEMS = [
  {
    ...CONTENT.theLens.systems[0],
    color: THEME_COLORS.brand.teal, // Teal
  },
  {
    ...CONTENT.theLens.systems[1],
    color: THEME_COLORS.accent.violetLight, // Deep Violet
  },
  {
    ...CONTENT.theLens.systems[2],
    color: THEME_COLORS.accent.pink, // Pink
  },
];

// -----------------------------------------------------------------------------
// VISUAL 1: BELL CURVE OPTIMIZER (ZPD)
// -----------------------------------------------------------------------------
const DataDot = ({
  p,
  i,
  progress,
}: {
  p: { x: number; y: number; correct: boolean | null };
  i: number;
  progress: MotionValue<number>;
}) => {
  const start = 0.05 + i * 0.012;
  const end = start + 0.05;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dotScale = useTransform(progress, [start, end], [0, 1]);
  return (
    <motion.circle
      cx={p.x}
      cy={p.y}
      r="3"
      fill={
        p.correct === true
          ? "#28C840"
          : p.correct === false
            ? "#FF5F57"
            : THEME_COLORS.brand.teal
      }
      stroke="#0a0a0a"
      strokeWidth="1"
      style={{ scale: dotScale }}
    />
  );
};

const ZPDVisual = ({ progress }: { progress: MotionValue<number> }) => {
  const pathLength = useTransform(progress, [0.05, 0.25], [0, 1]);
  const highlightOpacity = useTransform(progress, [0.25, 0.28], [0, 1]);
  const baselineOpacity = useTransform(progress, [0.28, 0.32], [0, 1]);
  const baselineY = useTransform(progress, [0.28, 0.32], [-5, 0]);

  // Data for the 15-dot calibration path
  // Y-axis: 0 is highest difficulty (Anxiety), 150 is lowest (Boredom)
  // Flow State band is roughly Y = 40 to 90
  const points = [
    { x: 0, y: 120, correct: true },
    { x: 20, y: 95, correct: true },
    { x: 40, y: 70, correct: true },
    { x: 60, y: 45, correct: true },
    { x: 80, y: 20, correct: false }, // Hit Anxiety Zone
    { x: 100, y: 45, correct: false },
    { x: 120, y: 70, correct: true },
    { x: 140, y: 55, correct: false },
    { x: 160, y: 70, correct: true },
    { x: 180, y: 60, correct: true },
    { x: 200, y: 50, correct: false },
    { x: 220, y: 62, correct: true },
    { x: 240, y: 55, correct: false },
    { x: 260, y: 60, correct: true }, // Converging
    { x: 280, y: 58, correct: true },
    { x: 300, y: 58, correct: null }, // Baseline defined
  ];

  // SVG Path generator
  const d = `M${points.map((p) => `${p.x},${p.y}`).join(" L")}`;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 md:p-8 bg-black">
      {/* Terminal Header */}
      <div className="absolute top-4 left-6 right-6 flex justify-between items-center pb-2 border-b border-white/10 z-20">
        <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400">
          ZPD_Calibration.exe
        </span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-brand-teal flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-pulse"></span>
          Running
        </span>
      </div>

      {/* Main Graph Area */}
      <div className="relative w-full h-48 mt-8">
        {/* Background Grids */}
        <div className="absolute inset-x-0 bottom-0 top-0 border-l border-b border-white/5 pointer-events-none">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={`hz-${i}`}
              className="absolute w-full h-px bg-white/5"
              style={{ bottom: `${i * 20}%` }}
            />
          ))}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={`vt-${i}`}
              className="absolute h-full w-px bg-white/5"
              style={{ left: `${i * 20}%` }}
            />
          ))}
        </div>

        <svg
          className="w-full h-full overflow-visible relative z-10"
          viewBox="-10 -10 320 170"
          role="img"
          aria-label="15-question calibration graph converging at the optimal Flow State"
          preserveAspectRatio="none"
        >
          {/* Defined Zones */}
          {/* Anxiety Zone -> Y: 0 to 40 */}
          <rect
            x="0"
            y="0"
            width="300"
            height="40"
            fill="rgba(239, 68, 68, 0.03)"
          />
          {/* Flow Band -> Y: 40 to 90 */}
          <rect
            x="0"
            y="40"
            width="300"
            height="50"
            fill="rgba(45, 212, 191, 0.05)"
          />
          {/* Boredom Zone -> Y: 90 to 150 */}
          <rect
            x="0"
            y="90"
            width="300"
            height="60"
            fill="rgba(255, 255, 255, 0.02)"
          />

          {/* Zone Lines */}
          <line
            x1="0"
            y1="40"
            x2="300"
            y2="40"
            stroke="rgba(239, 68, 68, 0.2)"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="90"
            x2="300"
            y2="90"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeDasharray="4 4"
            strokeWidth="1"
          />

          {/* The Connecting Path */}
          <motion.path
            d={d}
            fill="none"
            stroke={THEME_COLORS.brand.tealLight}
            strokeWidth="1.5"
            style={{ pathLength }}
          />

          {/* Rendering the Dots */}
          {points.map((p, i) => (
            <DataDot key={`pt-${p.x}-${p.y}`} p={p} i={i} progress={progress} />
          ))}

          {/* Convergence Highlight */}
          <motion.rect
            x="240"
            y="40"
            width="60"
            height="50"
            fill="none"
            stroke="rgba(45, 212, 191, 0.4)"
            strokeDasharray="2 2"
            style={{ opacity: highlightOpacity }}
          />
        </svg>

        {/* Dynamic Y-Axis Labels */}
        <div className="absolute top-1 left-2 text-[8px] font-mono text-red-500/70 uppercase tracking-widest bg-black px-1">
          Anxiety Zone
        </div>
        <div className="absolute top-[35%] left-2 text-[8px] font-mono text-brand-teal uppercase tracking-widest bg-black px-1 font-bold">
          Flow State (75% Acc)
        </div>
        <div className="absolute bottom-2 left-2 text-[8px] font-mono text-zinc-500 uppercase tracking-widest bg-black px-1">
          Boredom Zone
        </div>

        {/* Baseline Reached Label */}
        <motion.div
          className="absolute right-4 top-2 bg-zinc-950 border border-brand-teal/50 px-2 py-1 text-[8px] font-mono text-brand-teal uppercase tracking-widest rounded shadow-xl z-30 pointer-events-none"
          style={{ opacity: baselineOpacity, y: baselineY }}
        >
          Baseline Found (Q15)
        </motion.div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// VISUAL 2: ADAPTIVE ROADMAP (PATHFINDING)
// -----------------------------------------------------------------------------
const RoadmapVisual = ({ progress }: { progress: MotionValue<number> }) => {
  const isReduced = useReducedMotion();
  const blockScale = useTransform(progress, [0.35, 0.4], [0, 1]);
  const blockPathLength = useTransform(progress, [0.38, 0.42], [0, 1]);
  const detourPathLength = useTransform(progress, [0.42, 0.55], [0, 1]);
  const headDistance = useTransform(progress, [0.42, 0.55], ["0%", "100%"]);
  const destScale = useTransform(progress, [0.55, 0.6], [0, 1]);
  const gapOpacity = useTransform(progress, [0.35, 0.38], [0, 1]);
  const gapX = useTransform(progress, [0.35, 0.38], [-10, 0]);
  const optOpacity = useTransform(progress, [0.42, 0.45], [0, 1]);
  const optX = useTransform(progress, [0.42, 0.45], [10, 0]);

  // 5x5 Grid
  const gridSize = 5;
  const gap = 40;

  // Path Data
  const blockedNode = [2, 2];
  const detourPath = [
    [2, 4],
    [2, 3],
    [1, 3],
    [1, 2],
    [1, 1],
    [2, 0],
  ]; // Corrected full path

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-zinc-900/20 perspective-[800px]">
      <svg
        className="w-64 h-64 overflow-visible"
        viewBox="0 0 200 200"
        role="img"
        aria-label="Visual representation of adaptive learning path rerouting"
      >
        <defs>
          <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="line-gradient">
            <stop
              offset="0%"
              stopColor={THEME_COLORS.accent.violetLight}
              stopOpacity="0"
            />
            <stop offset="50%" stopColor={THEME_COLORS.accent.violetLight} />
            <stop
              offset="100%"
              stopColor={THEME_COLORS.accent.violetLight}
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* 1. Underlying Neural Mesh (The Lattice) */}
        <g className="opacity-40">
          {Array.from({ length: gridSize }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Static visual grid
            <Fragment key={i}>
              <line
                x1={i * gap + 20}
                y1={20}
                x2={i * gap + 20}
                y2={180}
                stroke="white"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <line
                x1={20}
                y1={i * gap + 20}
                x2={180}
                y2={i * gap + 20}
                stroke="white"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            </Fragment>
          ))}
        </g>

        {/* 2. Grid Nodes (Pulses) */}
        {Array.from({ length: gridSize * gridSize }).map((_, i) => {
          const col = i % gridSize;
          const row = Math.floor(i / gridSize);
          return (
            <circle
              // biome-ignore lint/suspicious/noArrayIndexKey: Static visual nodes
              key={i}
              cx={col * gap + 20}
              cy={row * gap + 20}
              r="1"
              fill="rgba(255,255,255,0.3)"
            />
          );
        })}

        {/* 3. The "Block" Event (Red Lock) */}
        <motion.circle
          cx={blockedNode[0] * gap + 20}
          cy={blockedNode[1] * gap + 20}
          r="8"
          stroke="#ef4444"
          strokeWidth="1.5"
          fill="rgba(239, 68, 68, 0.1)"
          style={{ scale: blockScale }}
        />
        <motion.path
          d={`M${blockedNode[0] * gap + 16},${blockedNode[1] * gap + 16} L${blockedNode[0] * gap + 24},${blockedNode[1] * gap + 24} M${blockedNode[0] * gap + 24},${blockedNode[1] * gap + 16} L${blockedNode[0] * gap + 16},${blockedNode[1] * gap + 24}`}
          stroke={THEME_COLORS.accent.red}
          strokeWidth="1.5"
          style={{ pathLength: blockPathLength }}
        />

        {/* 4. The Adaptive Detour (Green Neural Line) */}
        <motion.path
          d={`M${detourPath[0][0] * gap + 20},${detourPath[0][1] * gap + 20} 
                        L${detourPath[1][0] * gap + 20},${detourPath[1][1] * gap + 20} 
                        L${detourPath[2][0] * gap + 20},${detourPath[2][1] * gap + 20} 
                        L${detourPath[3][0] * gap + 20},${detourPath[3][1] * gap + 20} 
                        L${detourPath[4][0] * gap + 20},${detourPath[4][1] * gap + 20} 
                        L${detourPath[5][0] * gap + 20},${detourPath[5][1] * gap + 20}`}
          fill="none"
          stroke={THEME_COLORS.brand.tealLight}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow-green)"
          style={{ pathLength: detourPathLength }}
        />

        {/* 5. Active Data Packet (Moving Head) */}
        {!isReduced && (
          <motion.circle
            r="3"
            fill="#fff"
            style={{
              offsetDistance: headDistance,
              offsetPath: `path("M${detourPath[0][0] * gap + 20},${detourPath[0][1] * gap + 20} L${detourPath[1][0] * gap + 20},${detourPath[1][1] * gap + 20} L${detourPath[2][0] * gap + 20},${detourPath[2][1] * gap + 20} L${detourPath[3][0] * gap + 20},${detourPath[3][1] * gap + 20} L${detourPath[4][0] * gap + 20},${detourPath[4][1] * gap + 20} L${detourPath[5][0] * gap + 20},${detourPath[5][1] * gap + 20}")`,
            }}
          />
        )}

        {/* 6. Destination Node (Green Target) */}
        <motion.circle
          cx={detourPath[5][0] * gap + 20}
          cy={detourPath[5][1] * gap + 20}
          r="8"
          stroke={THEME_COLORS.brand.tealLight}
          strokeWidth="1.5"
          fill="rgba(45, 212, 191, 0.1)"
          style={{ scale: destScale }}
        />
      </svg>

      {/* High-Tech Status Labels */}
      <div className="absolute top-6 w-full flex justify-between px-8">
        <div className="flex items-center gap-2">
          <motion.div
            style={{ opacity: gapOpacity }}
            className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"
          />
          <motion.span
            style={{ opacity: gapOpacity, x: gapX }}
            className="text-[9px] font-mono text-red-500 tracking-widest"
          >
            {CONTENT.theLens.visuals.roadmap.gapDetected}
          </motion.span>
        </div>

        <div className="flex items-center gap-2">
          <motion.span
            style={{ opacity: optOpacity, x: optX }}
            className="text-[9px] font-mono text-brand-teal tracking-widest"
          >
            {CONTENT.theLens.visuals.roadmap.optimizing}
          </motion.span>
          <motion.div
            style={{ opacity: optOpacity }}
            className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-pulse"
          />
        </div>
      </div>

      {/* Decorative Cornerstone Markers */}
      <div className="absolute bottom-6 left-8 w-2 h-2 border-b border-l border-white/20" />
      <div className="absolute bottom-6 right-8 w-2 h-2 border-b border-r border-white/20" />
    </div>
  );
};

// -----------------------------------------------------------------------------
// VISUAL 3: DIAGNOSTICS (RADAR)
// -----------------------------------------------------------------------------
const DiagnosticsVisual = ({ progress }: { progress: MotionValue<number> }) => {
  const polyScale = useTransform(progress, [0.7, 0.85], [0, 1]);
  const p1Scale = useTransform(progress, [0.72, 0.78], [0, 1]);
  const p2Scale = useTransform(progress, [0.74, 0.8], [0, 1]);
  const p3Scale = useTransform(progress, [0.76, 0.82], [0, 1]);
  const p4Scale = useTransform(progress, [0.78, 0.84], [0, 1]);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <svg
        className="w-64 h-64"
        viewBox="0 0 200 200"
        role="img"
        aria-label="Radar chart showing cognitive performance vectors"
      >
        {/* Radar Grid */}
        {[25, 50, 75, 100].map((r) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeDasharray="2 2"
          />
        ))}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="100"
            y1="100"
            x2="100"
            y2="0"
            stroke="rgba(255,255,255,0.1)"
            transform={`rotate(${deg} 100 100)`}
          />
        ))}

        {/* Data Polygon */}
        <motion.polygon
          points="100,25 150,60 160,140 100,165 40,120 40,50"
          fill="rgba(236, 72, 153, 0.2)"
          stroke={THEME_COLORS.accent.pink}
          strokeWidth="1.5"
          style={{ scale: polyScale }}
        />

        {/* Data Points */}
        <motion.circle
          cx="100"
          cy="25"
          r="3"
          fill="#fff"
          style={{ scale: p1Scale }}
        />
        <motion.circle
          cx="150"
          cy="60"
          r="3"
          fill="#fff"
          style={{ scale: p2Scale }}
        />
        <motion.circle
          cx="160"
          cy="140"
          r="3"
          fill="#fff"
          style={{ scale: p3Scale }}
        />
        <motion.circle
          cx="40"
          cy="120"
          r="3"
          fill="#fff"
          style={{ scale: p4Scale }}
        />
      </svg>

      {/* Labels */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] text-zinc-400 font-mono">
        {CONTENT.theLens.visuals.diagnostics.memory}
      </div>
      <div className="absolute right-4 top-1/2 text-[9px] text-zinc-400 font-mono">
        {CONTENT.theLens.visuals.diagnostics.logic}
      </div>
      <div className="absolute left-4 top-1/2 text-[9px] text-zinc-400 font-mono">
        {CONTENT.theLens.visuals.diagnostics.speed}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-zinc-400 font-mono">
        {CONTENT.theLens.visuals.diagnostics.focus}
      </div>

      <div className="absolute top-8 right-8 bg-zinc-900 border border-white/10 p-2 rounded text-[10px] space-y-1">
        <div className="flex justify-between gap-4">
          <span className="text-zinc-400">
            {CONTENT.theLens.visuals.diagnostics.score.label}
          </span>
          <span className="text-white font-mono">
            {CONTENT.theLens.visuals.diagnostics.score.value}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-zinc-400">
            {CONTENT.theLens.visuals.diagnostics.delta.label}
          </span>
          <span className="text-pink-500 font-mono">
            {CONTENT.theLens.visuals.diagnostics.delta.value}
          </span>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------

const TheLens = () => {
  const isMobile = useIsMobile();
  const isReduced = useReducedMotion();

  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 1. Direct Scroll Binding instead of asynchronous IntersectionObservers
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1.5 Intercept raw scroll data with a physics spring for guaranteed fluidity
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 2. Deterministic State derivation from pure scroll progress
  // Stages roughly divided to 30% / 40% / 30% for pacing with extra middle emphasis
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest < 0.3) {
      if (activeIndex !== 0) setActiveIndex(0);
    } else if (latest >= 0.3 && latest < 0.7) {
      if (activeIndex !== 1) setActiveIndex(1);
    } else {
      if (activeIndex !== 2) setActiveIndex(2);
    }
  });

  return (
    <section
      ref={containerRef}
      className={`bg-zinc-950 relative ${isMobile ? "h-[200vh]" : "h-[250vh]"}`}
    >
      {/* Visuals - Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden z-10 pointer-events-none">
        <SectionSpotlight color="rgba(13, 148, 136, 0.15)" />
        {/* Animated Scroll Indicator - Moved here to be visible on all screens */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.span
              key={`scroll-hint-${activeIndex}`}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.3em] text-center whitespace-nowrap"
            >
              {activeIndex === 0 && "Scroll to Calibrate"}
              {activeIndex === 1 && "Scroll to Optimize"}
              {activeIndex === 2 && "Scroll to Continue"}
            </motion.span>
          </AnimatePresence>
          <div className="w-[1px] h-10 sm:h-16 relative overflow-hidden bg-white/10">
            <motion.div
              className="absolute top-0 left-0 w-full h-1/2"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundColor: SYSTEMS[activeIndex].color,
                boxShadow: `0 0 12px ${SYSTEMS[activeIndex].color}`,
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center h-full pt-16 sm:pt-20 lg:pt-0 pointer-events-auto">
          {/* LEFT COLUMN: NARRATIVE - Order 2 on mobile */}
          <div className="grid h-auto sm:h-64 md:h-96 items-center lg:order-1 order-2 pb-12 sm:pb-0">
            {/* Immediate crossfade via grid stack */}
            <AnimatePresence>
              <motion.div
                key={activeIndex}
                initial={{
                  opacity: 0,
                  x: isMobile ? 0 : -20,
                  y: isMobile ? 10 : 0,
                }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{
                  opacity: 0,
                  x: isMobile ? 0 : 20,
                  y: isMobile ? -10 : 0,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 25 }}
                className="space-y-4 sm:space-y-6 [grid-area:1/1]"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-white/5 border border-white/5 text-zinc-400">
                    {SYSTEMS[activeIndex].subtitle}
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1]">
                  {SYSTEMS[activeIndex].title}
                </h2>
                <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-md opacity-90">
                  {SYSTEMS[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: THE INTERFACE FRAME */}
          <div
            className="relative aspect-square md:aspect-[4/3] w-full max-w-sm sm:max-w-xl mx-auto lg:order-2 order-1 h-[35vh] sm:h-[40vh] lg:h-auto mt-8 sm:mt-0"
            aria-hidden="true"
          >
            {/* The Glass Frame */}
            <div
              className={`absolute inset-0 rounded-[20px] bg-zinc-900/40 ${!isReduced && "backdrop-blur-xl"} border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/5`}
            >
              {/* Top Bar Chrome */}
              <div className="h-8 sm:h-10 border-b border-white/5 flex items-center px-4 sm:px-5 justify-between bg-zinc-900/50">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F57] shadow-inner" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FEBC2E] shadow-inner" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28C840] shadow-inner" />
                </div>
              </div>

              {/* Content Area */}
              <div className="relative h-[calc(100%-32px)] sm:h-[calc(100%-40px)] w-full">
                {/* Immediate crossfade execution */}
                <AnimatePresence>
                  <motion.div
                    key={activeIndex}
                    initial={{
                      opacity: 0,
                      scale: 0.96,
                      filter: isReduced ? "none" : "blur(4px)",
                    }}
                    animate={{ opacity: 1, scale: 1, filter: "none" }}
                    exit={{
                      opacity: 0,
                      scale: 1.04,
                      filter: isReduced ? "none" : "blur(4px)",
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 25 }}
                    className="absolute inset-0 w-full h-full scale-90 sm:scale-100"
                  >
                    {activeIndex === 0 && (
                      <ZPDVisual progress={smoothProgress} />
                    )}
                    {activeIndex === 1 && (
                      <RoadmapVisual progress={smoothProgress} />
                    )}
                    {activeIndex === 2 && (
                      <DiagnosticsVisual progress={smoothProgress} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Overlay */}
              {!isReduced && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
              )}
            </div>

            {/* Background Splashes */}
            <div
              className={`absolute -inset-10 -z-10 blur-2xl md:blur-3xl opacity-10 transition-colors duration-1000 ${isReduced ? "hidden" : ""}`}
              style={{ backgroundColor: SYSTEMS[activeIndex].color }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheLens;
