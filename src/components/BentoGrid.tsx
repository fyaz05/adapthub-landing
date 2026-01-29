import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { type JSX, useEffect, useState } from "react";
import { CONTENT } from "../constants/content";
import { THEME_COLORS } from "../constants/theme";
import { useIsMobile } from "../hooks/use-mobile";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import SectionSpotlight from "./SectionSpotlight";

interface CardData {
  id: string;
  title: string;
  description: string;
  size: string;
  bg: string;
  visual: JSX.Element;
}

// ... (RadialProgress and PerformanceAreaGraph components remain unchanged)

// -----------------------------------------------------------------------------
// MICRO-COMPONENT: Radial Progress (Performance)
// -----------------------------------------------------------------------------
const RadialProgress = ({ value, label }: { value: number; label: string }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg
        className="w-40 h-40 transform -rotate-90"
        role="img"
        aria-label={`Progress chart: ${label} at ${value}%`}
      >
        {/* Track */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="8"
          fill="transparent"
        />
        {/* Indicator */}
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          stroke="url(#gradient-teal)"
          strokeWidth="8"
          fill="transparent"
          strokeLinecap="round"
          initial={{
            strokeDashoffset: circumference,
            strokeDasharray: circumference,
          }}
          whileInView={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
        <defs>
          <linearGradient id="gradient-teal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={THEME_COLORS.brand.teal} />
            <stop offset="100%" stopColor={THEME_COLORS.brand.tealLight} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-serif text-white font-bold">
          {value}%
        </span>
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">
          {label}
        </span>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// MICRO-COMPONENT: Performance Area Graph (Strategic/Financial Look)
// -----------------------------------------------------------------------------
const PerformanceAreaGraph = () => {
  const isMobile = useIsMobile();

  // Simplified path for mobile to reduce SVG complexity
  const desktopPath =
    "M0,200 L0,120 C50,120 80,140 120,90 C160,40 220,110 280,60 C320,30 360,50 400,20 L400,200 Z";
  const mobilePath =
    "M0,200 L0,120 L100,140 L200,90 L300,110 L400,20 L400,200 Z";

  const desktopLine =
    "M0,120 C50,120 80,140 120,90 C160,40 220,110 280,60 C320,30 360,50 400,20";
  const mobileLine = "M0,120 L100,140 L200,90 L300,110 L400,20";

  return (
    <div className="absolute inset-x-0 bottom-0 top-1/2 flex items-end justify-center pointer-events-none overflow-hidden rounded-b-[20px]">
      <svg
        className="w-full h-full opacity-60"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
        role="img"
        aria-label="Performance trend graph"
      >
        <defs>
          <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
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
          <linearGradient id="line-gradient-teal" x1="0" y1="0" x2="1" y2="0">
            <stop
              offset="0%"
              stopColor={THEME_COLORS.brand.teal}
              stopOpacity="0.5"
            />
            <stop
              offset="50%"
              stopColor={THEME_COLORS.brand.tealLight}
              stopOpacity="1"
            />
            <stop
              offset="100%"
              stopColor={THEME_COLORS.brand.teal}
              stopOpacity="0.5"
            />
          </linearGradient>
        </defs>

        {/* Filled Area */}
        <motion.path
          d={isMobile ? mobilePath : desktopPath}
          fill="url(#area-gradient)"
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          style={{ transformOrigin: "bottom" }}
          transition={{ duration: 1.2, ease: "circOut" }}
        />

        {/* The Trend Line */}
        <motion.path
          d={isMobile ? mobileLine : desktopLine}
          fill="none"
          stroke="url(#line-gradient-teal)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
        />
      </svg>
    </div>
  );
};

// -----------------------------------------------------------------------------
// MICRO-COMPONENT: Holographic Card Stack (Vertical Optimized & Scaled Up)
// -----------------------------------------------------------------------------
const CardStack = () => {
  const isReduced = useReducedMotion();

  return (
    <div className="relative w-48 h-64 preserve-3d group-hover:scale-105 transition-transform duration-500">
      {/* Card 3 (Bottom) */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-40 bg-zinc-800 border border-white/10 rounded-xl shadow-2xl origin-bottom"
        initial={{ scale: 0.85, y: 30 }}
        whileHover={isReduced ? {} : { y: 60, rotateX: -15, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
      {/* Card 2 (Middle) */}
      <motion.div
        className="absolute inset-x-0 bottom-6 h-40 bg-zinc-800 border border-white/10 rounded-xl shadow-2xl origin-bottom"
        initial={{ scale: 0.92, y: 15 }}
        whileHover={{ y: 30, rotateX: -8, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.05 }}
      />
      {/* Card 1 (Top - Visual) */}
      <motion.div
        className="absolute inset-x-0 bottom-12 h-40 bg-zinc-900 border border-white/20 rounded-xl shadow-2xl flex flex-col p-5 overflow-hidden"
        whileHover={{ y: 0, rotateX: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        <div className="w-12 h-12 bg-teal-900/30 rounded-full mb-4 flex items-center justify-center border border-brand-teal/20">
          <div className="w-6 h-6 bg-brand-teal rounded-full" />
        </div>
        <div className="w-full h-2 bg-white/10 rounded mb-2" />
        <div className="w-3/4 h-2 bg-white/10 rounded" />
      </motion.div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// MICRO-COMPONENT: Neural Nodes (High-Fidelity Constellation)
// -----------------------------------------------------------------------------
const NeuralNodes = () => {
  const isMobile = useIsMobile();
  const isReduced = useReducedMotion();
  const [nodes, setNodes] = useState<
    { id: number; x: number; y: number; r: number; pulse: boolean }[]
  >([]);
  const [connections, setConnections] = useState<
    { p1: { x: number; y: number }; p2: { x: number; y: number } }[]
  >([]);

  useEffect(() => {
    // PERFORMANCE: Skip complex calculation on reduced motion
    if (isReduced) return;

    const nodeCount = isMobile ? 10 : 40;
    const newNodes = Array.from({ length: nodeCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 800,
      y: Math.random() * 200,
      r: Math.random() < 0.2 ? 3 : 1.5,
      pulse: Math.random() < 0.3,
    }));

    const newConnections = newNodes.flatMap((node) => {
      const neighbors = newNodes
        .filter(
          (n) =>
            n.id !== node.id &&
            Math.abs(n.x - node.x) < 100 &&
            Math.abs(n.y - node.y) < 60,
        )
        .slice(0, 2);
      return neighbors.map((n) => ({ p1: node, p2: n }));
    });

    setNodes(newNodes);
    setConnections(newConnections);
  }, [isMobile, isReduced]);

  if (isReduced) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-zinc-900/20 flex items-center justify-center">
        {/* Static fallback for low-end devices */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="text-brand-teal font-mono text-xs opacity-50 tracking-widest">
          NEURAL_MESH_OFFLINE
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-900/20">
      {/* Background Grid for Structure */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <svg
        className="w-full h-full"
        viewBox="0 0 800 200"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Neural data mesh visualization"
      >
        {/* Connections Layer (Behind) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
        >
          {connections.map((conn) => (
            <line
              key={`link-${conn.p1.x}-${conn.p1.y}-${conn.p2.x}-${conn.p2.y}`}
              x1={conn.p1.x}
              y1={conn.p1.y}
              x2={conn.p2.x}
              y2={conn.p2.y}
              stroke="white"
              strokeWidth="0.5"
            />
          ))}
        </motion.g>

        {/* Active Data Streams (Moving along lines) */}
        {connections
          .filter((_, i) => i % 5 === 0)
          .map((conn) => (
            <motion.circle
              r="1"
              fill={THEME_COLORS.brand.teal}
              key={`stream-${conn.p1.x}-${conn.p1.y}-${conn.p2.x}-${conn.p2.y}`}
            >
              <animateMotion
                dur={`${2 + Math.random() * 4}s`}
                repeatCount="indefinite"
                path={`M${conn.p1.x},${conn.p1.y} L${conn.p2.x},${conn.p2.y}`}
              />
            </motion.circle>
          ))}

        {/* Nodes Layer */}
        {nodes.map((node) => (
          <motion.g key={node.id}>
            {/* Glow for major nodes */}
            {node.pulse && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.r * 4}
                fill={THEME_COLORS.brand.teal}
                animate={{ opacity: [0, 0.2, 0], scale: [1, 1.5, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            )}

            {/* The Node Core */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill={
                node.pulse ? THEME_COLORS.brand.teal : "rgba(255,255,255,0.5)"
              }
              animate={{
                y: [node.y - 2, node.y + 2, node.y - 2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.g>
        ))}
      </svg>

      {/* Overlay Content */}
      <div className="absolute top-4 left-6 pointer-events-none">
        <div className="font-mono text-[10px] text-brand-teal uppercase tracking-widest mb-1">
          Neural_Mesh_V4
        </div>
        <div className="text-white text-xs font-serif italic opacity-60">
          Distributed Learning Network
        </div>
      </div>
    </div>
  );
};

const BentoCard = ({ card }: { card: CardData }) => {
  const isMobile = useIsMobile();
  const isReduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Detect if this is the wide "Command Deck" card
  const isWide = card.size.includes("col-span-4");

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 400,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 400,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || isReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);

    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={isMobile ? {} : { y: -4 }} /* Reduced hover lift for weight */
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-[20px] overflow-hidden ${card.bg} ${card.size} shadow-2xl bg-zinc-900/40 backdrop-blur-md cursor-pointer will-change-transform`}
      style={{
        rotateX: isMobile || isReduced ? 0 : rotateX,
        rotateY: isMobile || isReduced ? 0 : rotateY,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Precision Brackets (Visible on Hover) */}
      <div className="absolute inset-0 z-overlay pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-brand-teal" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-brand-teal" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-brand-teal" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-brand-teal" />
      </div>

      {/* 1. Spotlight BORDER (The "Apple" Glow Border) */}
      {!isMobile && (
        <div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at var(--mx) var(--my), rgba(13, 148, 136, 0.4), transparent 40%)`,
          }}
        />
      )}

      {/* 2. Inner Content Mask (Creates the border effect) */}
      <div className="absolute inset-[1px] rounded-[19px] bg-zinc-950/90 z-0 overflow-hidden">
        {/* Noise Texture */}
        {!isMobile && (
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          ></div>
        )}

        {/* REPLACED: Data Flow Shimmer (Horizontal, Subtle, Non-Medical) */}
        {!isMobile && (
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.03)_0%,transparent_50%)] z-0 pointer-events-none"
          />
        )}
      </div>

      {/* 3. Internal Spotlight (On top of background) */}
      {!isMobile && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-elevate"
          style={{
            background: `radial-gradient(circle 300px at var(--mx, 0px) var(--my, 0px), rgba(13, 148, 136, 0.05), transparent 80%)`,
          }}
        />
      )}

      {/* Adaptive Layout: Flex Row for Wide Card, Flex Col for others */}
      <div
        className={`h-full flex relative z-sticky ${isWide ? "flex-col md:flex-row items-center" : "flex-col"}`}
      >
        {/* Visual Container */}
        {/* For wide card, visual is on the right and takes flex-1 */}
        {/* MOBILE: Ensure visual has min-height and good aspect ratio */}
        <div
          className={`${isWide ? "order-2 w-full md:w-2/3 h-64 md:h-full mobile-visual-fix" : "flex-1 min-h-[180px] mobile-min-height"} flex items-center justify-center perspective-[1000px]`}
        >
          {card.visual}
        </div>

        {/* Content Container */}
        {/* For wide card, content is on the left, darker bg */}
        <div
          className={`
            ${isWide ? "order-1 w-full md:w-1/3 h-auto md:h-full border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-center p-6 md:p-8 bg-black/20" : "p-6 md:p-8 pt-4 mt-auto border-t border-white/5 bg-gradient-to-t from-black/40 to-transparent"}
          `}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-2xl text-white font-serif italic tracking-tight">
              {card.title}
            </h3>
            <span className="font-mono text-[9px] text-zinc-500 group-hover:text-brand-teal transition-colors border border-white/5 px-2 py-1 rounded-full uppercase tracking-wider">
              {card.id}
            </span>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-sm font-sans opacity-80 group-hover:opacity-100 transition-opacity">
            {card.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const BentoGrid = () => {
  const [activeTab, setActiveTab] = useState("accuracy");

  const cards: CardData[] = [
    {
      id: CONTENT.bentoGrid.cards[0].id,
      title: CONTENT.bentoGrid.cards[0].title,
      description: CONTENT.bentoGrid.cards[0].description,
      size: "md:col-span-2 md:row-span-2",
      bg: "bg-zinc-900/50",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Abstract HUD Elements - Renamed to non-clinical */}
          <div className="absolute top-4 left-6 font-mono text-[9px] text-brand-teal/60">
            PERF_INDEX_V1
          </div>
          <div className="absolute top-4 right-6 flex gap-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-1 h-3 bg-brand-teal/30 rounded-full" />
            ))}
          </div>

          {/* REPLACED: Strategic Area Graph */}
          <PerformanceAreaGraph />

          <div className="absolute bottom-4 left-6 font-mono text-xs text-white">
            {CONTENT.bentoGrid.cards[0].visualCheck?.delta}{" "}
            <span className="text-brand-teal">
              {CONTENT.bentoGrid.cards[0].visualCheck?.deltaValue}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: CONTENT.bentoGrid.cards[1].id,
      title: CONTENT.bentoGrid.cards[1].title,
      description: CONTENT.bentoGrid.cards[1].description,
      size: "md:col-span-1 md:row-span-2",
      bg: "bg-zinc-900/50",
      visual: (
        <div className="h-full w-full flex flex-col p-6 gap-6">
          <div className="flex gap-2 p-1 bg-white/5 rounded-lg relative">
            {CONTENT.bentoGrid.cards[1].tabs?.map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`relative flex-1 px-2 py-2 text-[10px] uppercase tracking-widest font-mono rounded-md transition-colors z-10 ${
                  activeTab === tab.toLowerCase()
                    ? "text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {activeTab === tab.toLowerCase() && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-violet rounded-md -z-10 shadow-lg"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>

          {/* Animated Tab Content */}
          <div className="flex-1 relative rounded-lg border border-white/5 bg-black/20 overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <RadialProgress
                  value={
                    activeTab === "accuracy"
                      ? (CONTENT.bentoGrid.cards[1].progress?.accuracy.value ??
                        0)
                      : (CONTENT.bentoGrid.cards[1].progress?.growth.value ?? 0)
                  }
                  label={
                    activeTab === "accuracy"
                      ? (CONTENT.bentoGrid.cards[1].progress?.accuracy.label ??
                        "")
                      : (CONTENT.bentoGrid.cards[1].progress?.growth.label ??
                        "")
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ),
    },
    {
      id: CONTENT.bentoGrid.cards[2].id,
      title: CONTENT.bentoGrid.cards[2].title,
      description: CONTENT.bentoGrid.cards[2].description,
      size: "md:col-span-1 md:row-span-2",
      bg: "bg-zinc-900/50",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center pb-12">
          <CardStack />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />
        </div>
      ),
    },
    {
      id: CONTENT.bentoGrid.cards[3].id,
      title: CONTENT.bentoGrid.cards[3].title,
      description: CONTENT.bentoGrid.cards[3].description,
      size: "md:col-span-4 md:row-span-1",
      bg: "bg-zinc-900/50",
      visual: <NeuralNodes /> /* REPLACED: InteractiveBars with NeuralNodes */,
    },
  ];

  return (
    <section className="py-32 bg-void overflow-hidden relative" id="mastery">
      <SectionSpotlight color="rgba(13, 148, 136, 0.25)" />
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <span className="font-mono text-[10px] text-brand-teal uppercase tracking-widest mb-4 block">
            {CONTENT.bentoGrid.header.eyebrow}
          </span>
          <h2 className="text-4xl md:text-6xl text-white max-w-3xl mx-auto font-serif">
            {CONTENT.bentoGrid.header.title}{" "}
            <span className="italic text-brand-teal">
              {CONTENT.bentoGrid.header.highlight}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-auto md:auto-rows-[250px]">
          {cards.map((card) => (
            <BentoCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
