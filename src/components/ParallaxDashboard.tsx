import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CONTENT } from "../constants/content";
import { useIsMobile } from "../hooks/use-mobile";
import { useReducedMotion } from "../hooks/use-reduced-motion";

const ParallaxDashboard = ({ heroImage }: { heroImage?: string }) => {
  const isMobile = useIsMobile();
  const isReduced = useReducedMotion();
  const ref = useRef(null);
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

  // Satellite floating card moves MORE (Parallax depth)
  const satelliteX = useTransform(springX, [0, 1], [-20, 20]);
  const satelliteY = useTransform(springY, [0, 1], [-10, 10]);
  const satelliteRotateX = useTransform(springY, [0, 1], [5, -5]);
  const satelliteRotateY = useTransform(springX, [0, 1], [-5, 5]);

  // Handle Mouse Move
  useEffect(() => {
    if (isMobile || isReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth);
      mouseY.set(e.clientY / innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isMobile, isReduced]);

  // 2. Data Sequencing (Count Up)
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      // Delay start by 500ms to match card pop-in
      const timeout = setTimeout(() => {
        const controls = animate(0, CONTENT.parallaxDashboard.growth.value, {
          duration: isReduced ? 0.5 : 1.5,
          ease: "circOut",
          onUpdate: (value) => setCount(Math.round(value)),
        });
        return () => controls.stop();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isInView, isReduced]);

  return (
    <div
      ref={ref}
      className="relative h-[280px] sm:h-[400px] lg:h-[700px] w-full flex items-center justify-center perspective-[2000px]"
    >
      {/* LAYER 1: The Main Dashboard (Heavy, Grounded) */}
      <motion.div
        style={{
          rotateX: isMobile || isReduced ? 0 : dashboardRotateX,
          rotateY: isMobile || isReduced ? 0 : dashboardRotateY,
        }}
        initial={{ opacity: 0, y: 40, rotateX: 10 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-full origin-center-right z-elevate will-change-transform"
      >
        <div className="relative rounded-xl bg-zinc-900 shadow-2xl overflow-hidden ring-1 ring-white/10">
          {/* Photon Edge (Enhanced) */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-80 shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20"></div>

          {/* Window Chrome */}
          <div className="h-8 sm:h-10 border-b border-white/5 flex items-center px-4 sm:px-5 justify-between bg-zinc-900/50 relative z-10">
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
            className="w-full h-auto opacity-90"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
          {/* Gloss */}
          {!isReduced && (
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
          )}
        </div>
      </motion.div>

      {/* LAYER 2: The Satellite Card (Floating, Active) */}
      <motion.div
        style={{
          x: isMobile || isReduced ? 0 : satelliteX,
          y: isMobile || isReduced ? 0 : satelliteY,
          rotateX: isMobile || isReduced ? 0 : satelliteRotateX,
          rotateY: isMobile || isReduced ? 0 : satelliteRotateY,
        }}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={
          isInView ? { opacity: 1, scale: isMobile ? 0.8 : 1, y: 0 } : {}
        }
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          delay: 0.3,
        }}
        className="absolute left-2 sm:left-4 lg:left-0 top-[60%] sm:top-[60%] z-sticky max-w-[160px] sm:max-w-xs will-change-transform"
      >
        <div
          className={`relative bg-zinc-900/80 rounded-lg p-3 sm:p-4 lg:p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] w-full border border-white/10 ${!isMobile && "backdrop-blur-xl"} overflow-hidden`}
        >
          {/* Shimmer Effect */}
          {!isReduced && (
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "linear",
                delay: 2,
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
            />
          )}

          <div className="flex items-center justify-between mb-1 sm:mb-2 lg:mb-4">
            <span className="text-[8px] sm:text-[10px] lg:text-xs font-bold text-zinc-400 uppercase tracking-widest">
              {CONTENT.parallaxDashboard.growth.label}
            </span>
            <motion.span
              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 rounded-full bg-brand-teal shadow-[0_0_10px_rgba(13,148,136,0.5)]"
            />
          </div>

          <div className="flex items-end gap-1.5 sm:gap-2 mb-1 sm:mb-2">
            <span className="text-xl sm:text-2xl lg:text-4xl font-mono font-bold text-white">
              +{count}
              {CONTENT.parallaxDashboard.growth.suffix}
            </span>
            <span className="text-[8px] sm:text-[10px] lg:text-xs text-zinc-400 mb-0.5 sm:mb-1">
              {CONTENT.parallaxDashboard.growth.comparison}
            </span>
          </div>

          {/* Micro Chart Bars */}
          <div className="flex items-end gap-0.5 sm:gap-1 h-5 sm:h-6 lg:h-8 mt-1 sm:mt-2">
            {[30, 45, 35, 60, 50, 75, 65].map((h, i) => (
              <motion.div
                // biome-ignore lint/suspicious/noArrayIndexKey: Static chart bars
                key={i}
                initial={{ height: 0 }}
                animate={isInView ? { height: `${h}%` } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + i * 0.05,
                  ease: "backOut",
                }}
                className={`flex-1 rounded-sm transition-colors ${i === 6 ? "bg-brand-teal" : "bg-white/10 hover:bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ParallaxDashboard;
