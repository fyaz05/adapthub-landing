import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/use-reduced-motion";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isReduced = useReducedMotion();

  useEffect(() => {
    // Simulate initial load or wait for resources
    const timer = setTimeout(
      () => {
        setIsLoading(false);
      },
      isReduced ? 1000 : 2000,
    ); // Faster exit on reduced motion/low end

    return () => clearTimeout(timer);
  }, [isReduced]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 text-zinc-100 overflow-hidden"
          // The gradual "Lens Dissolve" Exit
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(30px)",
            transition: {
              duration: 1.5,
              ease: [0.22, 1, 0.36, 1], // Expo-out curve
            },
          }}
        >
          {/* Noise Texture Fallback for low-end devices */}
          <div className="absolute inset-0 opacity-[0.1] pointer-events-none z-0">
            {!isReduced ? (
              <svg className="w-full h-full" aria-hidden="true">
                <title>Background noise texture</title>
                <filter id="noiseFilter">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.8"
                    numOctaves="3"
                    stitchTiles="stitch"
                  />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
              </svg>
            ) : (
              <div className="w-full h-full bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:20px_20px]" />
            )}
          </div>

          {/* Central Typography Stagger */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="overflow-hidden mb-4">
              <motion.h1
                className="text-5xl md:text-7xl font-serif tracking-tight font-bold"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{
                  duration: 0.8,
                  ease: [0.33, 1, 0.68, 1],
                  delay: 0.1,
                }}
              >
                AdaptHub
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.div
                className="flex items-center gap-2"
                initial={{ y: "150%" }}
                animate={{ y: 0 }}
                exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                transition={{
                  duration: 0.6,
                  ease: [0.33, 1, 0.68, 1],
                  delay: 0,
                }}
              >
                <span className="h-px w-8 bg-zinc-600" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                  System Initializing
                </span>
                <span className="h-px w-8 bg-zinc-600" />
              </motion.div>
            </div>
          </div>

          {/* Bottom Diagnostics */}
          <motion.div
            className="absolute bottom-12 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="font-mono text-[10px] text-zinc-600 flex gap-8">
              <span>MEM: OK</span>
              <span>NET: SECURE</span>
              <span className="animate-pulse text-emerald-500/50">LIVE</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
