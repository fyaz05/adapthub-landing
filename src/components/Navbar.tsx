import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CONTENT } from "../constants/content";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import { scrollLock } from "../utils/scroll-lock";
import SpotlightButton from "./SpotlightButton";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const [bannerVisible, setBannerVisible] = useState(() => {
    if (typeof document !== "undefined") {
      return (
        document.documentElement.getAttribute("data-announcement") !==
        "dismissed"
      );
    }
    return true;
  });

  const isReduced = useReducedMotion();

  // Scroll & Announcement Sync
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    const handleDismiss = () => setBannerVisible(false);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("announcement-dismiss", handleDismiss);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("announcement-dismiss", handleDismiss);
    };
  }, []);

  // Viewport Scroll Lock
  useEffect(() => {
    if (mobileMenuOpen) {
      scrollLock.lock();
    } else {
      scrollLock.unlock();
    }
    return () => {
      scrollLock.unlock();
    };
  }, [mobileMenuOpen]);

  // Escape key closes mobile menu and returns focus to toggle button
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ── High-Fidelity Floating Capsule ── */}
      <motion.div
        className="fixed inset-x-0 z-[100] flex justify-center px-4 md:px-6 pointer-events-none"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
        initial={{ y: -100 }}
        animate={{
          y: 0,
          top: bannerVisible && !scrolled ? "40px" : "20px",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        data-lenis-prevent
      >
        <motion.nav
          className={`relative pointer-events-auto flex items-center justify-between w-full max-w-[1200px] rounded-full transition-all duration-700 ease-[0.16,1,0.3,1] ${
            scrolled || mobileMenuOpen
              ? "bg-zinc-950/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] py-2.5 px-3 md:px-4"
              : "bg-white/[0.02] backdrop-blur-md border border-white/[0.05] py-3 px-4 md:px-5"
          }`}
        >
          {/* Brand Lockup */}
          <a
            href="/"
            className="flex items-center gap-3 group outline-none rounded-full focus-visible:ring-2 focus-visible:ring-brand-teal z-20"
            aria-label="AdaptHub Home"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/[0.03] border border-white/10 overflow-hidden group-hover:border-brand-teal/40 transition-colors duration-500">
              <img
                src={CONTENT.assets.logoLight}
                alt={CONTENT.global.logoAlt}
                width={24}
                height={24}
                className="w-5 h-5 md:w-6 md:h-6 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                loading="eager"
              />
            </div>
            <span className="font-serif text-lg md:text-xl text-white font-medium tracking-tight">
              {CONTENT.global.brandName}
            </span>
          </a>

          {/* Desktop Magnetic Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            aria-label="Main navigation"
          >
            {CONTENT.nav.links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => setHoveredPath(item.href)}
                onMouseLeave={() => setHoveredPath(null)}
                className="relative px-3 py-2 text-[12px] font-mono uppercase tracking-[0.12em] text-zinc-400 hover:text-white active:scale-95 transition-all duration-300 outline-none rounded-full focus-visible:ring-2 focus-visible:ring-brand-teal z-20"
              >
                {/* Magnetic Hover Pill */}
                {hoveredPath === item.href && !isReduced && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                {/* Reduced Motion Fallback */}
                {hoveredPath === item.href && isReduced && (
                  <div className="absolute inset-0 bg-white/10 rounded-full -z-10" />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3 z-20">
            {/* Desktop CTA */}
            <div className="hidden md:block">
              <SpotlightButton
                href={CONTENT.links.app}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-6 bg-zinc-100 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center justify-center transition-all duration-500"
              >
                {CONTENT.nav.cta}
              </SpotlightButton>
            </div>

            {/* Precision Mobile Toggle */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-11 h-11 rounded-full bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center gap-[5px] outline-none touch-manipulation hover:bg-white/[0.08] active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-brand-teal"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 6 : 0,
                  width: mobileMenuOpen ? "20px" : "20px",
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-[1.5px] bg-white rounded-full origin-center"
              />
              <motion.span
                animate={{
                  opacity: mobileMenuOpen ? 0 : 1,
                  x: mobileMenuOpen ? -10 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-[1.5px] w-[14px] bg-white rounded-full origin-center"
              />
              <motion.span
                animate={{
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -7 : 0,
                  width: mobileMenuOpen ? "20px" : "10px",
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-[1.5px] bg-white rounded-full origin-center"
              />
            </button>
          </div>
        </motion.nav>
      </motion.div>

      {/* ── Cinematic Mobile Overlay ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            aria-label="Navigation menu"
            initial={
              isReduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }
            }
            animate={
              isReduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }
            }
            exit={
              isReduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }
            }
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-zinc-950 flex flex-col pt-32 pb-10 px-6 md:px-12 overflow-y-auto overscroll-contain"
          >
            {/* Atmosphere */}
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(13,148,136,0.15),transparent_50%)] pointer-events-none"
              aria-hidden="true"
            />
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] mix-blend-screen"
              aria-hidden="true"
            >
              <filter id="menu-noise">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="3"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#menu-noise)" />
            </svg>

            {/* Giant Background Watermark */}
            <div
              className="absolute top-1/2 -translate-y-1/2 right-[-10%] text-[40vw] font-serif font-bold text-white/[0.02] tracking-tighter select-none pointer-events-none z-0 rotate-90 lg:rotate-0"
              aria-hidden="true"
            >
              ADPT
            </div>

            {/* Navigation Nodes */}
            <nav
              className="relative z-10 flex flex-col gap-6 sm:gap-8 mt-auto mb-auto max-w-2xl"
              aria-label="Mobile navigation"
            >
              {CONTENT.nav.links.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    delay: i * 0.1 + 0.2,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex flex-col gap-1 sm:gap-2 w-max outline-none touch-manipulation focus-visible:ring-2 focus-visible:ring-brand-teal rounded-sm active:scale-95 transition-transform duration-200"
                  >
                    <span className="font-mono text-[10px] sm:text-xs text-brand-teal uppercase tracking-[0.2em]">
                      0{i + 1} {"//"}
                    </span>
                    <span className="text-[12vw] sm:text-[8vw] md:text-6xl font-serif text-zinc-300 group-active:text-white group-hover:text-white tracking-tighter leading-none transition-colors">
                      {item.label}
                    </span>
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Footer Area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative z-10 w-full mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-6 sm:items-center justify-between"
            >
              <SpotlightButton
                href={CONTENT.links.app}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-4 sm:py-3 px-8 bg-accent-yellow text-black font-bold text-sm rounded-full shadow-[0_0_30px_rgba(252,211,77,0.2)] flex items-center justify-center gap-2 touch-manipulation"
              >
                {CONTENT.nav.cta}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </SpotlightButton>

              <div className="flex items-center gap-4 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                <span>Status</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  Online
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
