import { useEffect, useState } from "react";

let mql: MediaQueryList | null = null;

function checkPerformance(): boolean {
  if (typeof window === "undefined") return false;

  if (!mql) {
    mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  }

  const prefersReduced = mql.matches;

  // deviceMemory and hardwareConcurrency checks
  const nav = navigator as Navigator & { deviceMemory?: number };
  const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
  const lowCPU =
    nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency < 4;

  return prefersReduced || lowMemory || lowCPU;
}

/**
 * Hook to detect if the user prefers reduced motion or is on a low-end device.
 *
 * This hook is **hydration-safe**: the initial render (both server-side and the
 * client's first/hydration render) always returns `false`, which guarantees the
 * server-rendered DOM matches the client on first paint. The real value is
 * computed and applied in `useEffect` immediately after hydration, so reduced-
 * motion / low-end users are opted out of heavy motion on the very first
 * interaction frame.
 */
export function useReducedMotion(): boolean {
  const [isReduced, setIsReduced] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!mql) {
      mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    }

    const update = () => setIsReduced(checkPerformance());
    update();

    mql.addEventListener?.("change", update);
    return () => {
      mql?.removeEventListener?.("change", update);
    };
  }, []);

  return isReduced;
}
