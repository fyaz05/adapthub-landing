import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const AnnouncementBar = () => {
  // Use a lazy initializer for initial state to check the attribute set in Layout.astro
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof document !== "undefined") {
      return (
        document.documentElement.getAttribute("data-announcement") !==
        "dismissed"
      );
    }
    return true;
  });

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Update attribute for CSS selectors and persistence
    document.documentElement.setAttribute("data-announcement", "dismissed");
    window.dispatchEvent(new CustomEvent("announcement-dismiss"));
    sessionStorage.setItem("announcement-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && !isScrolled && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          role="region"
          aria-label="Announcement"
          className="fixed top-0 inset-x-0 z-[60] h-auto min-h-10 py-2 flex items-center justify-center bg-void/80 backdrop-blur-md border-b border-white/5 px-4 md:px-12"
        >
          {/* Living Atmosphere: Radial Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.08)_0%,transparent_60%)] pointer-events-none" />

          {/* Content Container */}
          <div className="relative flex items-center justify-center gap-2.5 text-xs md:text-sm text-center max-w-4xl pr-8 md:pr-0">
            {/* Pulsing Status Dot */}
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75 duration-1000" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-teal" />
            </span>

            <span className="text-zinc-300 font-sans tracking-wide text-xs md:text-sm truncate">
              AdaptHub is in{" "}
              <span className="text-brand-teal font-medium">Early Access</span>
              <span className="mx-2 opacity-50">·</span>
              <span className="text-white font-medium">Free Forever</span>
            </span>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute right-2 md:right-4 p-3 md:p-2 text-zinc-400 hover:text-white transition-all active:scale-95 touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-brand-teal rounded-full"
            aria-label="Dismiss announcement"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;
