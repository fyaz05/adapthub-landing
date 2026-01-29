import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import { useReducedMotion } from "../hooks/use-reduced-motion";

const HeroBackground = () => {
  const isMobile = useIsMobile();
  const isReduced = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 50 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Invert/Scale movement for parallax feel
  const x1 = useTransform(springX, [0, 1], ["-5%", "5%"]); // Reduced range
  const y1 = useTransform(springY, [0, 1], ["-5%", "5%"]);

  const x2 = useTransform(springX, [0, 1], ["5%", "-5%"]);
  const y2 = useTransform(springY, [0, 1], ["5%", "-5%"]);

  useEffect(() => {
    if (isMobile || isReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isMobile, isReduced]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Orb 1: Violet */}
      <motion.div
        style={!isMobile && !isReduced ? { x: x1, y: y1 } : {}}
        className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-brand-violet/20 blur-[60px] md:blur-[80px] rounded-full mix-blend-screen opacity-30 will-change-transform"
      />

      {/* Orb 2: Teal */}
      <motion.div
        style={!isMobile && !isReduced ? { x: x2, y: y2 } : {}}
        className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-brand-teal/20 blur-[60px] md:blur-[80px] rounded-full mix-blend-screen opacity-30 will-change-transform"
      />
    </div>
  );
};
export default HeroBackground;
