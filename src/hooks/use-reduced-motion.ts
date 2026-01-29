import { useEffect, useState } from "react";

/**
 * Hook to detect if the user prefers reduced motion or is on a low-end device.
 * Used to conditionally disable expensive animations and heavy visual effects.
 */
export function useReducedMotion(): boolean {
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    // 1. Check System Preference
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");

    // 2. Check Device Performance Indicators (where available)
    const checkPerformance = () => {
      const prefersReduced = mql.matches;

      // deviceMemory and hardwareConcurrency checks
      const nav = navigator as Navigator & { deviceMemory?: number };
      const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
      const lowCPU =
        nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency < 4;

      setIsReduced(prefersReduced || lowMemory || lowCPU);
    };

    // Initial check
    checkPerformance();

    // Listen for preference changes
    mql.addEventListener("change", checkPerformance);
    return () => mql.removeEventListener("change", checkPerformance);
  }, []);

  return isReduced;
}
