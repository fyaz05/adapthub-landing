import { useEffect, useState, useSyncExternalStore } from "react";

let mql: MediaQueryList | null = null;
const subscribers = new Set<() => void>();
let globalListenerAdded = false;
let notifyAllRef: (() => void) | null = null;

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

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  subscribers.add(callback);

  if (!mql) {
    mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  }

  if (!globalListenerAdded) {
    notifyAllRef = () => {
      Array.from(subscribers).forEach((cb) => {
        cb();
      });
    };
    mql.addEventListener("change", notifyAllRef);
    globalListenerAdded = true;
  }

  return () => {
    subscribers.delete(callback);
    if (subscribers.size === 0 && mql && notifyAllRef) {
      mql.removeEventListener("change", notifyAllRef);
      globalListenerAdded = false;
      notifyAllRef = null;
    }
  };
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return checkPerformance();
}

function getServerSnapshot() {
  return false;
}

/**
 * Hook to detect if the user prefers reduced motion or is on a low-end device.
 * Uses useSyncExternalStore with a singleton subscriber to avoid massive listener duplication.
 */
export function useReducedMotion(): boolean {
  const isReduced = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? isReduced : false;
}
