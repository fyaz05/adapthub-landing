import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";
import React, { type MouseEvent, useState } from "react";
import { THEME_COLORS } from "../constants/theme";
import { useIsMobile } from "../hooks/use-mobile";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import { resolvedContent } from "../utils/config";
import SectionSpotlight from "./SectionSpotlight";
import DistractorAnalysisVisual from "./visuals/DistractorAnalysisVisual";

interface CardData {
  id: string;
  title: string;
  description: string;
  gridClass: string;
  visual: React.ReactNode;
  href?: string;
}

// -----------------------------------------------------------------------------
// MICRO-COMPONENT: Fluid Data Spectrum (Mobile-Fluid CSS)
// -----------------------------------------------------------------------------
const DataSpectrum = () => {
  const BAR_COUNT = 32;

  return (
    <div className="absolute inset-0 flex items-end justify-between gap-[1px] md:gap-[2px] opacity-80 px-4 md:px-6 pb-4 md:pb-6 overflow-hidden mask-spectrum pointer-events-none">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] md:bg-[size:24px_24px]" />

      {/* CSS-Animated Data Bars */}
      {[...Array(BAR_COUNT)].map((_, i) => {
        const normalized = i / (BAR_COUNT - 1);
        const baseHeight = Math.max(
          15,
          Math.sin(normalized * Math.PI) * 50 + normalized * 50,
        );

        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Static array for visual bars
            key={i}
            className="flex-1 bg-brand-teal/80 relative z-10 data-bar min-w-0"
            style={{
              height: `${baseHeight.toFixed(2)}%`,
              animationDelay: `${(i * 0.05).toFixed(2)}s`,
            }}
          />
        );
      })}
    </div>
  );
};

// -----------------------------------------------------------------------------
// MICRO-COMPONENT: Precision Targeting Reticle
// -----------------------------------------------------------------------------
const RadialProgress = ({ value, label }: { value: number; label: string }) => {
  const isMobile = useIsMobile();
  const radius = isMobile ? 44 : 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const center = isMobile ? 60 : 72;
  const size = isMobile ? 120 : 144;

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full min-h-[140px] md:min-h-[160px]">
      {/* Structural Crosshairs */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-[1px] h-full max-h-[100px] md:max-h-[140px] bg-white/10" />
        <div className="absolute w-full max-w-[100px] md:max-w-[140px] h-[1px] bg-white/10" />
        <div className="absolute w-1 h-1 bg-brand-teal shadow-[0_0_8px_rgba(13,148,136,0.8)]" />
      </div>

      <svg
        width={size}
        height={size}
        className="transform -rotate-90 relative z-10"
        role="img"
        aria-label={`Progress: ${label} at ${value}%`}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1.5"
          strokeDasharray="2 4"
          fill="transparent"
        />

        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#gradient-teal)"
          strokeWidth="3"
          fill="transparent"
          strokeLinecap="square"
          initial={{
            strokeDashoffset: circumference,
            strokeDasharray: circumference,
          }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
        <defs>
          <linearGradient id="gradient-teal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={THEME_COLORS.brand.teal} />
            <stop offset="100%" stopColor={THEME_COLORS.brand.tealLight} />
          </linearGradient>
        </defs>
      </svg>

      {/* Telemetry Readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 m-auto pointer-events-none">
        <div className="bg-void border border-white/10 w-[64px] h-[64px] md:w-[72px] md:h-[72px] flex flex-col items-center justify-center shadow-2xl">
          <span className="text-lg md:text-2xl font-serif text-white tracking-tighter leading-none mb-1">
            {value}
            <span className="text-brand-teal text-[9px] md:text-[10px] ml-0.5">
              %
            </span>
          </span>
          <span className="font-mono text-[6px] md:text-[7px] uppercase tracking-[0.2em] text-zinc-400">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// MICRO-COMPONENT: Isometric Data Planes
// -----------------------------------------------------------------------------
const CardStack = () => {
  const isReduced = useReducedMotion();

  return (
    <div className="relative w-36 h-44 md:w-48 md:h-56 perspective-[1000px] md:group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1] mx-auto">
      {/* Plane 3 (Base) */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-28 md:h-36 bg-void border border-white/5 shadow-2xl origin-bottom"
        initial={{ y: 15, rotateX: 30, scale: 0.9 }}
        whileHover={isReduced ? {} : { y: 25, rotateX: 45, scale: 0.85 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
      {/* Plane 2 (Mid) */}
      <motion.div
        className="absolute inset-x-0 bottom-4 h-28 md:h-36 bg-white/[0.02] border border-white/10 shadow-2xl origin-bottom flex items-center justify-center"
        initial={{ y: 5, rotateX: 15, scale: 0.95 }}
        whileHover={isReduced ? {} : { y: 10, rotateX: 25, scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          delay: 0.05,
        }}
      >
        <div className="w-full h-px bg-white/5 absolute top-1/2" />
        <div className="h-full w-px bg-white/5 absolute left-1/2" />
      </motion.div>
      {/* Plane 1 (Top) */}
      <motion.div
        className="absolute inset-x-0 bottom-8 h-28 md:h-36 bg-white/[0.04] border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col p-3 md:p-5 origin-bottom"
        whileHover={isReduced ? {} : { y: 0, rotateX: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-3 md:mb-4 border-b border-white/10 pb-2 md:pb-3">
          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-brand-teal animate-pulse" />
          <span className="font-mono text-[7px] md:text-[8px] text-brand-teal uppercase tracking-widest">
            Cognitive Lock
          </span>
        </div>
        <div className="w-full h-[2px] bg-white/10 mb-2" />
        <div className="w-2/3 h-[2px] bg-white/10 mb-2" />
        <div className="w-1/2 h-[2px] bg-brand-teal/50" />
      </motion.div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// COMPONENT: The Monolithic Bento Node
// -----------------------------------------------------------------------------
const BentoCard = ({ card }: { card: CardData }) => {
  const isMobile = useIsMobile();
  const isReduced = useReducedMotion();

  // Internal Flashlight Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile || isReduced) return;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const backgroundTemplate = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(13,148,136,0.06), transparent 40%)`;

  // Wide cards dictate structural layout changes
  const isWide = card.gridClass.includes("lg:col-span-4");

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: purely visual flashlight effect
    <div
      className={`group relative flex flex-col min-w-0 overflow-hidden bg-void outline-none ${card.gridClass}`}
      onMouseMove={handleMouseMove}
    >
      {/* ── Internal Radial Glow (Flashlight) ── */}
      {!isMobile && !isReduced && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: backgroundTemplate,
          }}
        />
      )}

      {/* ── Hardware Optical Brackets ── */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-0 w-2 h-2 md:w-3 md:h-3 border-t border-l border-brand-teal/50" />
        <div className="absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 border-t border-r border-brand-teal/50" />
        <div className="absolute bottom-0 left-0 w-2 h-2 md:w-3 md:h-3 border-b border-l border-brand-teal/50" />
        <div className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 border-b border-r border-brand-teal/50" />
      </div>

      {/* ── High-Fidelity Noise Texture ── */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-screen pointer-events-none z-0"
        aria-hidden="true"
      >
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect width="100%" height="100%" filter="url(#global-noise-filter)" />
        </svg>
      </div>

      {/* ── Content Architecture ── */}
      <div
        className={`relative z-10 flex flex-col h-full min-w-0 ${isWide ? "lg:flex-row" : ""}`}
      >
        {/* Typographic Block */}
        <div
          className={`
          flex flex-col justify-start p-5 sm:p-6 md:p-8 lg:p-10 min-w-0
          ${isWide ? "lg:w-[35%] xl:w-[30%] lg:border-r border-white/5" : "border-b border-white/5"}
          bg-gradient-to-br from-white/[0.02] to-transparent
        `}
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="font-mono text-[9px] md:text-[10px] text-zinc-400 uppercase tracking-[0.2em] border border-white/10 px-2 py-0.5 lg:group-hover:text-brand-teal lg:group-hover:border-brand-teal/30 transition-colors duration-300 shrink-0">
              {card.id}
            </span>
          </div>
          {/* Internal Linking: Connect features to relevant pages */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-white tracking-tight leading-snug mb-3 md:mb-4 text-balance">
            {card.href ? (
              <a
                href={card.href}
                className="hover:text-brand-teal transition-colors outline-none focus-visible:text-brand-teal whitespace-nowrap"
                aria-label={`Read more about the completely free ${card.title}`}
              >
                {card.title}
              </a>
            ) : (
              card.title
            )}
          </h3>
          <p className="text-xs sm:text-sm md:text-base font-sans text-zinc-400 leading-[1.6] md:leading-[1.7] tracking-wide text-pretty">
            {card.description}
          </p>
        </div>

        {/* Visual Block */}
        <div
          className={`
          relative flex-1 flex items-center justify-center bg-transparent overflow-hidden min-w-0
          ${isWide ? "lg:w-[65%] xl:w-[70%] min-h-[250px] sm:min-h-[300px] lg:min-h-full" : "min-h-[220px] md:min-h-[300px]"}
        `}
        >
          {card.visual}
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT: The Master Matrix
// -----------------------------------------------------------------------------
const BentoGrid = () => {
  const [activeTab, setActiveTab] = useState("accuracy");
  const isReduced = useReducedMotion();

  const gridContent = resolvedContent.bentoGrid;

  const cards: CardData[] = [
    {
      id: `SYS.${gridContent.cards[0]?.id || "01"}`,
      title: gridContent.cards[0]?.title || "",
      description: gridContent.cards[0]?.description || "",
      gridClass: "md:col-span-2 lg:col-span-2 row-span-2",
      visual: (
        <div
          className="relative w-full h-full flex flex-col justify-end p-5 md:p-0"
          aria-hidden="true"
        >
          <div className="absolute top-4 md:top-6 right-4 md:right-6 font-mono text-[8px] md:text-[9px] text-zinc-400 tracking-[0.2em] uppercase z-20">
            [ Live Telemetry ]
          </div>

          <DataSpectrum />

          <div className="relative md:absolute md:bottom-8 md:left-8 z-20 bg-void/80 backdrop-blur-md p-4 border border-white/5 shadow-2xl w-max">
            <span className="block font-mono text-[8px] md:text-[9px] text-zinc-400 uppercase tracking-widest mb-1">
              Delta Velocity
            </span>
            <span className="font-serif text-2xl md:text-3xl lg:text-4xl text-white flex items-baseline gap-1">
              +{gridContent.cards[0]?.visualCheck?.deltaValue || "0"}{" "}
              <span className="text-brand-teal text-sm md:text-lg">Pts</span>
            </span>
          </div>
        </div>
      ),
    },
    {
      id: `SYS.${gridContent.cards[1]?.id || "02"}`,
      title: gridContent.cards[1]?.title || "",
      description: gridContent.cards[1]?.description || "",
      gridClass: "md:col-span-1 lg:col-span-1 row-span-2",
      visual: (
        <div className="h-full w-full flex flex-col p-5 sm:p-6 pt-0 justify-center">
          {/* ── Hardware Toggle Matrix ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.05] pb-4 mb-6 mt-6 md:mt-0 gap-4">
            <div
              role="tablist"
              aria-label="Analysis metric"
              className="flex bg-black/40 border border-white/10 p-[1px] w-full sm:w-auto"
            >
              {(gridContent.cards[1]?.tabs || ["Accuracy", "Growth"]).map(
                (tab: string) => {
                  const isActive = activeTab === tab.toLowerCase();
                  const label =
                    tab.toLowerCase() === "accuracy" ? "ACC" : "GRW";
                  return (
                    <button
                      type="button"
                      role="tab"
                      key={tab}
                      id={`tab-${tab.toLowerCase()}`}
                      aria-selected={isActive}
                      aria-controls="tab-panel"
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={`relative flex-1 sm:flex-none px-4 py-2 sm:py-1.5 text-[9px] uppercase tracking-[0.2em] font-mono transition-all active:scale-95 outline-none select-none touch-manipulation focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-teal/50 ${
                        isActive
                          ? "text-brand-teal"
                          : "text-zinc-400 hover:text-zinc-300"
                      }`}
                    >
                      {isActive && !isReduced && (
                        <motion.div
                          layoutId="dialActiveNode"
                          className="absolute inset-0 border border-brand-teal/40 bg-brand-teal/5"
                          transition={{
                            type: "spring",
                            bounce: 0,
                            duration: 0.4,
                          }}
                        />
                      )}
                      {isActive && isReduced && (
                        <div className="absolute inset-0 border border-brand-teal/40 bg-brand-teal/5" />
                      )}
                      <span className="relative z-10">[{label}]</span>
                    </button>
                  );
                },
              )}
            </div>
            {/* Hex Memory Address Readout */}
            <span className="font-mono text-[8px] text-zinc-400 tracking-widest hidden xl:block shrink-0">
              0x{activeTab === "accuracy" ? "F4A1" : "E2B9"}
            </span>
          </div>

          {/* ── Primary Dial ── */}
          <div
            id="tab-panel"
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="flex-1 w-full relative flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={
                  isReduced
                    ? { opacity: 0 }
                    : { opacity: 0, filter: "blur(4px)", scale: 0.95 }
                }
                animate={
                  isReduced
                    ? { opacity: 1 }
                    : { opacity: 1, filter: "blur(0px)", scale: 1 }
                }
                exit={
                  isReduced
                    ? { opacity: 0 }
                    : { opacity: 0, filter: "blur(4px)", scale: 0.95 }
                }
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <RadialProgress
                  value={
                    activeTab === "accuracy"
                      ? (gridContent.cards[1]?.progress?.accuracy?.value ?? 0)
                      : (gridContent.cards[1]?.progress?.growth?.value ?? 0)
                  }
                  label={
                    activeTab === "accuracy"
                      ? (gridContent.cards[1]?.progress?.accuracy?.label ?? "")
                      : (gridContent.cards[1]?.progress?.growth?.label ?? "")
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ),
    },
    {
      id: `SYS.${gridContent.cards[2]?.id || "03"}`,
      title: gridContent.cards[2]?.title || "",
      description: gridContent.cards[2]?.description || "",
      gridClass: "md:col-span-1 lg:col-span-1 row-span-2",
      visual: (
        <div
          className="relative w-full h-full flex items-center justify-center py-8 md:py-0"
          aria-hidden="true"
        >
          <CardStack />
        </div>
      ),
    },
    {
      id: `SYS.${gridContent.cards[3]?.id || "04"}`,
      title: gridContent.cards[3]?.title || "",
      description: gridContent.cards[3]?.description || "",
      gridClass: "md:col-span-2 lg:col-span-4 row-span-1",
      visual: (
        <div
          className="w-full h-full flex flex-col md:flex-row relative group/console min-w-0"
          aria-hidden="true"
        >
          {/* ── Visual Target Area (Top on Mobile, Left on Desktop) ── */}
          <div className="flex-1 relative flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden min-h-[200px] sm:min-h-[220px] md:min-h-[250px] min-w-0">
            {/* HUD Targeting Overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-20 opacity-30 hidden sm:block"
              aria-hidden="true"
            >
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-teal/40" />
              <div className="absolute left-1/2 top-0 h-full w-[1px] bg-brand-teal/40" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 border border-brand-teal/50 rounded-full" />
            </div>

            {/* The Actual Component Container */}
            <div className="relative z-10 w-full max-w-[400px] flex items-center justify-center">
              <DistractorAnalysisVisual />
            </div>
          </div>

          {/* ── Active Threat Console (Bottom on Mobile, Right on Desktop) ── */}
          <div className="w-full md:w-[240px] xl:w-[320px] border-t md:border-t-0 md:border-l border-white/[0.05] bg-black/40 flex flex-col relative z-20 shrink-0 min-w-0 max-h-[250px] md:max-h-none overflow-y-auto">
            {/* Console Header */}
            <div className="sticky top-0 z-30 px-4 py-3 border-b border-white/[0.05] flex items-center justify-between bg-black/80 backdrop-blur-md">
              <span className="font-mono text-[8px] md:text-[9px] text-zinc-400 uppercase tracking-[0.2em]">
                Live Analysis Log
              </span>
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            </div>

            {/* Console Output Terminal */}
            <div className="p-4 flex-1 font-mono text-[8px] md:text-[9px] xl:text-[10px] uppercase tracking-wider text-zinc-400 space-y-3 relative min-h-[140px] md:min-h-[180px] break-words whitespace-pre-wrap pb-8">
              {/* Scanline overlay over text */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(13,148,136,0.05)_50%,transparent_100%)] bg-[length:100%_4px] pointer-events-none" />

              <motion.div
                initial={isReduced ? { opacity: 1 } : { opacity: 0, x: -5 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-brand-teal font-bold">&gt;</span>{" "}
                Isolating semantic trap...
              </motion.div>

              <motion.div
                initial={isReduced ? { opacity: 1 } : { opacity: 0, x: -5 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <span className="text-brand-teal font-bold">&gt;</span> Option C
                identified.
              </motion.div>

              <motion.div
                initial={isReduced ? { opacity: 1 } : { opacity: 0, x: -5 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="pl-2 md:pl-3 border-l border-amber-500/50 text-amber-500/80 my-2 py-1"
              >
                [WARNING]
                <br />
                82% cohort failed.
                <br />
                Type: False Causation.
              </motion.div>

              <motion.div
                initial={isReduced ? { opacity: 1 } : { opacity: 0, x: -5 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.4, delay: 1.2 }}
                className="text-white pt-1 md:pt-2"
              >
                <span className="text-brand-teal font-bold">&gt;</span>{" "}
                Re-calibrating lock...
              </motion.div>

              {/* Blinking Cursor */}
              {!isReduced && (
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-1.5 h-2.5 md:w-2 md:h-3 bg-brand-teal inline-block mt-1 md:mt-2 align-middle"
                />
              )}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-void relative overflow-hidden">
      {/* Background Atmosphere */}
      <SectionSpotlight color="rgba(13, 148, 136, 0.12)" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 max-w-[1800px] relative z-10">
        {/* Header Block */}
        <div className="mb-12 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span
                className="block w-6 md:w-8 h-px bg-brand-teal/60"
                aria-hidden="true"
              />
              <span className="font-mono text-[9px] md:text-[10px] lg:text-xs text-brand-teal/60 uppercase tracking-[0.25em] select-none">
                {gridContent.header?.eyebrow || "System Protocol"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-serif tracking-tight leading-[1.1] text-balance">
              {gridContent.header?.title || "Mastery"}{" "}
              <span className="italic text-brand-teal">
                {gridContent.header?.highlight || "Engineered."}
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="hidden lg:flex items-center gap-3 font-mono text-[10px] text-zinc-400 uppercase tracking-[0.2em] border border-white/10 px-4 py-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <span className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-pulse" />
            Grid Status: Active
          </motion.div>
        </div>

        {/* ── The 1px Hairline Blueprint Grid Container ── */}
        <div className="bg-white/[0.08] border border-white/[0.08] p-px shadow-2xl overflow-hidden w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] w-full">
            {cards.map((card) => (
              <BentoCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
