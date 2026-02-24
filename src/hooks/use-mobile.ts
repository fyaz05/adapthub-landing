import { useEffect, useState, useSyncExternalStore } from "react";

const mqlQuery = "(max-width: 768px)";
let mql: MediaQueryList | null = null;
const subscribers = new Set<() => void>();
let globalListenerAdded = false;
let notifyAllRef: (() => void) | null = null;

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  subscribers.add(callback);

  if (!mql) {
    mql = window.matchMedia(mqlQuery);
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
  if (!mql) {
    mql = window.matchMedia(mqlQuery);
  }
  return mql.matches;
}

function getServerSnapshot() {
  return false;
}

export function useIsMobile() {
  const isMobile = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? isMobile : false;
}
