import { AnimatePresence, motion, useInView } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
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
const ZPDVisual = () => {
  const isReduced = useReducedMotion();
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* Graph Background */}
      <div className="absolute inset-x-8 bottom-8 top-8 border-l border-b border-white/10">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-white/10"
            style={{ bottom: `${i * 20}%` }}
          />
        ))}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute h-full w-px bg-white/10"
            style={{ left: `${i * 20}%` }}
          />
        ))}
      </div>

      <svg
        className="w-full h-48 overflow-visible z-10"
        viewBox="0 0 300 150"
        role="img"
        aria-label="Graph showing flow state between boredom and anxiety"
      >
        <defs>
          <linearGradient id="curve-fill" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={THEME_COLORS.brand.teal}
              stopOpacity="0.4"
            />
            <stop
              offset="100%"
              stopColor={THEME_COLORS.brand.teal}
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* Boredom Line */}
        <motion.path
          d="M0,140 C50,140 50,120 100,120"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Anxiety Line */}
        <motion.path
          d="M200,120 C250,120 250,140 300,140"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* The Flow Curve */}
        <motion.path
          d="M0,140 C80,140 100,20 150,20 C200,20 220,140 300,140"
          fill="url(#curve-fill)"
          stroke={THEME_COLORS.brand.tealLight}
          strokeWidth="2"
          initial={{
            d: "M0,140 C80,140 100,100 150,100 C200,100 220,140 300,140",
          }}
          // PERFORMANCE: Disable complex path interpolation on reduced motion
          animate={
            isReduced
              ? {}
              : {
                  d: [
                    "M0,140 C80,140 100,120 150,120 C200,120 220,140 300,140", // Low
                    "M0,140 C80,140 100,20 150,20 C200,20 220,140 300,140", // Peak
                    "M0,140 C80,140 100,20 150,20 C200,20 220,140 300,140", // Peak Wait
                  ],
                }
          }
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Optimal Zone Indicator */}
        <motion.rect
          x="125"
          y="0"
          width="50"
          height="150"
          fill="none"
          stroke="rgba(13, 148, 136, 0.3)"
          strokeWidth="1"
          strokeDasharray="2 2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />
        <text
          x="150"
          y="15"
          textAnchor="middle"
          className="text-[8px] fill-brand-teal font-mono tracking-widest uppercase"
        >
          {CONTENT.theLens.visuals.zpd.target}
        </text>
      </svg>

      {/* UI Labels */}
      <div className="absolute bottom-4 left-8 text-[9px] text-zinc-500 font-mono">
        {CONTENT.theLens.visuals.zpd.boredom}
      </div>
      <div className="absolute bottom-4 right-8 text-[9px] text-zinc-500 font-mono">
        {CONTENT.theLens.visuals.zpd.anxiety}
      </div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[9px] text-white font-mono bg-zinc-900 border border-brand-teal/30 px-2 py-1 rounded-full">
        {CONTENT.theLens.visuals.zpd.flow}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// VISUAL 2: ADAPTIVE ROADMAP (PATHFINDING)
// -----------------------------------------------------------------------------
const RoadmapVisual = () => {
  const isReduced = useReducedMotion();
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
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
        />
        <motion.path
          d={`M${blockedNode[0] * gap + 16},${blockedNode[1] * gap + 16} L${blockedNode[0] * gap + 24},${blockedNode[1] * gap + 24} M${blockedNode[0] * gap + 24},${blockedNode[1] * gap + 16} L${blockedNode[0] * gap + 16},${blockedNode[1] * gap + 24}`}
          stroke={THEME_COLORS.accent.red}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4 }}
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
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
        />

        {/* 5. Active Data Packet (Moving Head) */}
        {!isReduced && (
          <motion.circle
            r="3"
            fill="#fff"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{
              delay: 0.6,
              duration: 1.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            style={{
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
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5 }}
        />
      </svg>

      {/* High-Tech Status Labels */}
      <div className="absolute top-6 w-full flex justify-between px-8">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"
          />
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[9px] font-mono text-red-500 tracking-widest"
          >
            {CONTENT.theLens.visuals.roadmap.gapDetected}
          </motion.span>
        </div>

        <div className="flex items-center gap-2">
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="text-[9px] font-mono text-brand-teal tracking-widest"
          >
            {CONTENT.theLens.visuals.roadmap.optimizing}
          </motion.span>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
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
const DiagnosticsVisual = () => {
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
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Data Points */}
        <motion.circle
          cx="100"
          cy="25"
          r="3"
          fill="#fff"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        />
        <motion.circle
          cx="150"
          cy="60"
          r="3"
          fill="#fff"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        />
        <motion.circle
          cx="160"
          cy="140"
          r="3"
          fill="#fff"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        />
        <motion.circle
          cx="40"
          cy="120"
          r="3"
          fill="#fff"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        />
      </svg>

      {/* Labels */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] text-zinc-500 font-mono">
        {CONTENT.theLens.visuals.diagnostics.memory}
      </div>
      <div className="absolute right-4 top-1/2 text-[9px] text-zinc-500 font-mono">
        {CONTENT.theLens.visuals.diagnostics.logic}
      </div>
      <div className="absolute left-4 top-1/2 text-[9px] text-zinc-500 font-mono">
        {CONTENT.theLens.visuals.diagnostics.speed}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-zinc-500 font-mono">
        {CONTENT.theLens.visuals.diagnostics.focus}
      </div>

      <div className="absolute top-8 right-8 bg-zinc-900 border border-white/10 p-2 rounded text-[10px] space-y-1">
        <div className="flex justify-between gap-4">
          <span className="text-zinc-500">
            {CONTENT.theLens.visuals.diagnostics.score.label}
          </span>
          <span className="text-white font-mono">
            {CONTENT.theLens.visuals.diagnostics.score.value}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-zinc-500">
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

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------

const TheLens = () => {
  const isMobile = useIsMobile();
  const isReduced = useReducedMotion();

  // Trigger refs for each section
  const trigger0 = useRef<HTMLDivElement>(null);
  const trigger1 = useRef<HTMLDivElement>(null);
  const trigger2 = useRef<HTMLDivElement>(null);

  // useInView checks if element is in viewport center
  // "Deep Scroll" Configuration:
  // We use a margin that focuses on the center of the viewport.
  const inView0 = useInView(trigger0, {
    amount: "some",
    margin: "-45% 0px -45% 0px",
  });
  const inView1 = useInView(trigger1, {
    amount: "some",
    margin: "-45% 0px -45% 0px",
  });
  const inView2 = useInView(trigger2, {
    amount: "some",
    margin: "-45% 0px -45% 0px",
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // Priority logic for active state
  useEffect(() => {
    if (inView2) setActiveIndex(2);
    else if (inView1) setActiveIndex(1);
    else if (inView0) setActiveIndex(0);
  }, [inView0, inView1, inView2]);

  return (
    <section className="bg-zinc-950 relative" id="methodology">
      <SectionSpotlight color="rgba(13, 148, 136, 0.15)" />

      {/* Visuals - Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden z-10 pointer-events-none">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center h-full pt-16 sm:pt-20 lg:pt-0 pointer-events-auto">
          {/* LEFT COLUMN: NARRATIVE - Order 2 on mobile */}
          <div className="relative h-auto sm:h-64 md:h-96 flex flex-col justify-center lg:order-1 order-2 pb-12 sm:pb-0">
            <AnimatePresence mode="wait">
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
                className="space-y-4 sm:space-y-6"
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
          <div className="relative aspect-square md:aspect-[4/3] w-full max-w-sm sm:max-w-xl mx-auto lg:order-2 order-1 h-[35vh] sm:h-[40vh] lg:h-auto mt-8 sm:mt-0">
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
                <AnimatePresence mode="wait">
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
                    className="w-full h-full scale-90 sm:scale-100"
                  >
                    {activeIndex === 0 && <ZPDVisual />}
                    {activeIndex === 1 && <RoadmapVisual />}
                    {activeIndex === 2 && <DiagnosticsVisual />}
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

      {/* DEEP SCROLL TRIGGERS */}
      {/* Scroll Triggers: Reduced friction for smoother Feel (Desktop: ~550vh total, Mobile: ~420vh total) */}
      <div className="relative">
        <div
          ref={trigger0}
          className={`${isMobile ? "h-[120vh]" : "h-[150vh]"}`}
          aria-hidden="true"
        />
        <div
          ref={trigger1}
          className={`${isMobile ? "h-[180vh]" : "h-[250vh]"}`}
          aria-hidden="true"
        />
        <div
          ref={trigger2}
          className={`${isMobile ? "h-[120vh]" : "h-[150vh]"}`}
          aria-hidden="true"
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>
    </section>
  );
};

export default TheLens;
