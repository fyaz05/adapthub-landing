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
 * The initial state is computed synchronously on the client's first render via a
 * lazy initializer, so reduced-motion / low-end users never see a motion flash.
 * The returned value is SSR-safe: on the server (no `window`) it is `false`.
 */
export function useReducedMotion(): boolean {
  const [isReduced, setIsReduced] = useState<boolean>(() => checkPerformance());

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!mql) {
      mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    }

    const update = () => setIsReduced(checkPerformance());
    update();

    mql.addEventListener("change", update);
    return () => {
      mql?.removeEventListener("change", update);
    };
  }, []);

  return isReduced;
}
