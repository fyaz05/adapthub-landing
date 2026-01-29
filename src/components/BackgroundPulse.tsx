import { motion } from "motion/react";
import { useIsMobile } from "../hooks/use-mobile";
import { useReducedMotion } from "../hooks/use-reduced-motion";

const BackgroundPulse = () => {
  const isMobile = useIsMobile();
  const isReduced = useReducedMotion();

  // Performance: Completely disable these background orbs on mobile or low-end devices
  if (isMobile || isReduced) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{
          opacity: [0.03, 0.08, 0.03],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10, // Slower is better for performance
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-brand-teal rounded-full blur-[60px] opacity-[0.05] mix-blend-screen will-change-transform"
      />

      <motion.div
        animate={{
          opacity: [0.02, 0.05, 0.02],
          scale: [1.05, 1, 1.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-brand-violet rounded-full blur-[80px] opacity-[0.05] mix-blend-screen will-change-transform"
      />
    </div>
  );
};

export default BackgroundPulse;
