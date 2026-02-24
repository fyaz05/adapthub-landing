"use client";

import { AnimatePresence, animate, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import { scrollLock } from "../utils/scroll-lock";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const isReduced = useReducedMotion();

  useEffect(() => {
    // Bypass loading screen if URL contains a hash, or user prefers reduced motion
    if (window.location.hash || isReduced) {
      setIsLoading(false);
      return;
    }

    // Lock body scroll during calibration sequence
    scrollLock.lock();

    // 1. Animate the percentage counter (0 to 100)
    const progressControls = animate(0, 100, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1], // expoOut
      onUpdate: (value) => {
        setProgress(Math.floor(value));
      },
    });

    // 2. Trigger the exit plunge after the counter holds at 100 for a split second
    const timer = setTimeout(() => {
      setIsLoading(false);
      scrollLock.unlock();
    }, 2600);

    return () => {
      progressControls.stop();
      clearTimeout(timer);
      scrollLock.unlock();
    };
  }, [isReduced]);

  // Format the progress number to always be 3 digits (e.g., 007, 042, 100)
  const formattedProgress = progress.toString().padStart(3, "0");

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-void text-zinc-100 overflow-hidden px-6 py-8 md:p-12"
          // The Plunge Exit (Simulates diving into the interface)
          exit={
            isReduced
              ? { opacity: 0, transition: { duration: 0.3 } }
              : {
                  opacity: 0,
                  scale: 1.15,
                  filter: "blur(20px)",
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                }
          }
        >
          {/* ── Environment: Deep Noise ── */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-[0.035] mix-blend-screen"
            aria-hidden="true"
          >
            <svg
              width="100%"
              height="100%"
              role="img"
              aria-label="Background noise texture"
            >
              <title>Background noise texture</title>
              <filter id="loader-noise">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#loader-noise)" />
            </svg>
          </div>

          {/* ── Top HUD (Telemetry) ── */}
          <div className="relative z-10 flex items-start justify-between w-full">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-1 font-mono text-[9px] md:text-[10px] text-zinc-400 uppercase tracking-[0.2em]"
            >
              <span className="text-brand-teal">SYS.CALIBRATION</span>
              <span>Node: ADPT-01</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col items-end gap-1 font-mono text-[9px] md:text-[10px] text-zinc-400 uppercase tracking-[0.2em]"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                Uplink Secure
              </span>
              <span>
                {new Date().getFullYear()} {"//"} ACTIVE
              </span>
            </motion.div>
          </div>

          {/* ── Central Focal Point (The Focus Pull) ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center z-10">
            {/* Monumental Typography with blur-to-sharp animation */}
            <motion.div
              aria-hidden="true"
              className="font-serif text-[18vw] sm:text-[12vw] lg:text-[12rem] text-white leading-none tracking-tighter select-none"
              initial={{
                filter: "blur(24px)",
                letterSpacing: "0.1em",
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                filter: "blur(0px)",
                letterSpacing: "-0.04em",
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 2.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              AdaptHub
            </motion.div>

            {/* Micro-Telemetry Underneath */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 flex items-center gap-4 hidden sm:flex"
            >
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-brand-teal/50" />
              <span className="font-mono text-[9px] text-brand-teal uppercase tracking-[0.4em]">
                Cognitive Engine
              </span>
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-brand-teal/50" />
            </motion.div>
          </div>

          {/* ── Bottom HUD (Progress Readout) ── */}
          <div className="relative z-10 flex items-end justify-between w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-mono text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-[0.2em] max-w-[200px] hidden md:block"
            >
              Deploying dynamic routing algorithms and establishing matrix
              parameters.
            </motion.div>

            {/* Hardware Counter */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="ml-auto flex items-baseline font-mono text-brand-teal"
            >
              <span className="text-sm md:text-base mr-2 text-zinc-500">[</span>
              <span className="text-4xl md:text-6xl font-light tracking-tighter tabular-nums text-white">
                {formattedProgress}
              </span>
              <span className="text-sm md:text-base ml-2 text-zinc-500">]</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
