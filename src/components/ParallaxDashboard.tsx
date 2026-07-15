import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { CONTENT } from "../constants/content";
import { useIsMobile } from "../hooks/use-mobile";
import { useReducedMotion } from "../hooks/use-reduced-motion";

const ParallaxDashboard = ({ heroImage }: { heroImage?: string }) => {
  const isMobile = useIsMobile();
  const isReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // 1. Physics-based Mouse Parallax
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Dashboard tilts slightly (Grounding layer)
  const dashboardRotateX = useTransform(springY, [0, 1], [4, -4]);
  const dashboardRotateY = useTransform(springX, [0, 1], [-8, 8]);

  // Satellite floating card moves slightly differently (Parallax depth)
  const satelliteX = useTransform(springX, [0, 1], [-12, 12]);
  const satelliteY = useTransform(springY, [0, 1], [-20, 20]);
  const satelliteRotateX = useTransform(springY, [0, 1], [6, -6]);
  const satelliteRotateY = useTransform(springX, [0, 1], [-10, 10]);

  // Handle Mouse Move
  useEffect(() => {
    if (!isInView || isMobile || isReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth);
      mouseY.set(e.clientY / innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isInView, mouseX, mouseY, isMobile, isReduced]);

  // 2. Data Sequencing (Count Up) — driven by a MotionValue to avoid
  // per-frame React re-renders and to allow clean animation cancellation.
  const countMV = useMotionValue(0);
  const countText = useTransform(
    countMV,
    (v) => `+${Math.round(v)}${CONTENT.parallaxDashboard.growth.suffix}`,
  );

  useEffect(() => {
    if (!isInView) return;
    if (isReduced) {
      countMV.set(CONTENT.parallaxDashboard.growth.value);
      return;
    }
    let controls: ReturnType<typeof animate>;
    const timeout = setTimeout(() => {
      controls = animate(countMV, CONTENT.parallaxDashboard.growth.value, {
        duration: 1.5,
        ease: "circOut",
      });
    }, 500);
    return () => {
      clearTimeout(timeout);
      controls?.stop();
    };
  }, [isInView, isReduced, countMV]);

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[1000px] mx-auto flex items-center justify-center perspective-[2000px] py-4 sm:py-6 lg:py-8"
      aria-hidden="true"
    >
      {/* LAYER 1: The Main Dashboard (Heavy, Grounded, Centered) */}
      <motion.div
        style={{
          rotateX: isMobile || isReduced ? 0 : dashboardRotateX,
          rotateY: isMobile || isReduced ? 0 : dashboardRotateY,
        }}
        initial={{ opacity: 0, y: 40, rotateX: 6 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="w-full origin-center z-elevate will-change-transform"
      >
        <div className="relative rounded-xl bg-zinc-900 shadow-[0_24px_60px_rgba(0,0,0,0.85)] overflow-hidden ring-1 ring-white/10">
          {/* Photon Edge (Enhanced) */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-80 z-20"></div>

          {/* Window Chrome */}
          <div className="h-8 sm:h-10 border-b border-white/5 flex items-center px-4 sm:px-5 justify-between bg-zinc-900/40 relative z-10">
            <div className="flex gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F57] shadow-inner" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FEBC2E] shadow-inner" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28C840] shadow-inner" />
            </div>
          </div>

          <img
            src={heroImage || CONTENT.assets.heroImage}
            alt={CONTENT.parallaxDashboard.alt}
            width={1200}
            height={800}
            className="w-full h-auto opacity-95 block"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          {/* Gloss */}
          {!isReduced && (
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
          )}
        </div>
      </motion.div>

      {/* LAYER 2: The Satellite Card (Floating, Active, Glassmorphism Overhaul) */}
      <motion.div
        style={{
          x: isMobile || isReduced ? 0 : satelliteX,
          y: isMobile || isReduced ? 0 : satelliteY,
          rotateX: isMobile || isReduced ? 0 : satelliteRotateX,
          rotateY: isMobile || isReduced ? 0 : satelliteRotateY,
        }}
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.4,
        }}
        className="absolute left-2 xs:left-0 sm:-left-10 md:-left-8 bottom-[10%] sm:bottom-[15%] z-sticky w-[170px] sm:w-[240px] md:w-[260px] will-change-transform pointer-events-auto"
      >
        {/* Inner floating animation wrapper */}
        <motion.div
          animate={
            !isReduced
              ? {
                  y: [0, -8, 0],
                }
              : {}
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative bg-zinc-950/85 backdrop-blur-xl rounded-2xl p-4 sm:p-5 lg:p-6 shadow-[0_24px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(20,184,166,0.05)] border border-white/10 overflow-hidden group hover:border-brand-teal/30 transition-colors duration-300"
        >
          {/* Shimmer overlay */}
          {!isReduced && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out pointer-events-none" />
          )}

          {/* Top Header Row */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-[9px] sm:text-[10px] lg:text-xs font-mono font-bold tracking-[0.15em] text-zinc-400 uppercase">
              {CONTENT.parallaxDashboard.growth.label}
            </span>
            {/* Breathing Active Dot Indicator */}
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
            </div>
          </div>

          {/* Main Stats Value */}
          <div className="flex items-baseline gap-2 mb-2 sm:mb-3">
            <span className="text-2xl sm:text-3xl lg:text-[2.75rem] font-sans font-extrabold text-white tracking-tight">
              <motion.span>{countText}</motion.span>
            </span>
            <span className="text-[10px] sm:text-xs text-zinc-400 font-medium">
              {CONTENT.parallaxDashboard.growth.comparison}
            </span>
          </div>

          {/* Micro-Chart with Animation & Glows */}
          <div className="flex items-end gap-1.5 sm:gap-2 h-7 sm:h-9 lg:h-11 mt-2 sm:mt-3">
            {[25, 45, 35, 60, 50, 75, 90].map((val, i) => (
              <motion.div
                // biome-ignore lint/suspicious/noArrayIndexKey: Static chart bars
                key={i}
                initial={{ height: 0 }}
                animate={isInView ? { height: `${val}%` } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.6 + i * 0.05,
                  ease: "backOut",
                }}
                className={`flex-1 rounded-sm sm:rounded ${
                  i === 6
                    ? "bg-gradient-to-t from-brand-teal to-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.6)]"
                    : "bg-white/5 hover:bg-white/15"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ParallaxDashboard;
