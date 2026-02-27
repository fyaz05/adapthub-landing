import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NavLink, NavSubLink } from "../constants/content";
import { CONTENT } from "../constants/content";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import { scrollLock } from "../utils/scroll-lock";
import SpotlightButton from "./SpotlightButton";

/* ── Motion Tokens ── */
const PILL_SPRING = { type: "spring" as const, stiffness: 400, damping: 30 };
const DROP_SPRING = { type: "spring" as const, stiffness: 450, damping: 35 };
const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Hamburger geometry ──
 *  3 lines at 1.5px height, gap-[4px] between:
 *  center-to-center distance = 0.75 + 4 + 0.75 = 5.5px
 */
const HAMBURGER_Y = 5.5;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [bannerVisible, setBannerVisible] = useState(true);

  const navRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const prefersReduced = useReducedMotion();

  // Pill tracks hover first, falls back to open dropdown
  const activeIndicator = hoveredLink ?? activeDropdown;

  /* ── Scroll & Banner ── */
  useEffect(() => {
    setScrolled(window.scrollY > 40);
    if (
      document.documentElement.getAttribute("data-announcement") === "dismissed"
    ) {
      setBannerVisible(false);
    }

    const onScroll = () => setScrolled(window.scrollY > 40);
    const onDismiss = () => setBannerVisible(false);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("announcement-dismiss", onDismiss);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("announcement-dismiss", onDismiss);
    };
  }, []);

  /* ── Scroll Lock ── */
  useEffect(() => {
    mobileMenuOpen ? scrollLock.lock() : scrollLock.unlock();
    return () => scrollLock.unlock();
  }, [mobileMenuOpen]);

  /* ── Global Key & Click-Outside ── */
  useEffect(() => {
    if (!mobileMenuOpen && !activeDropdown) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeDropdown) {
          setActiveDropdown(null);
          setHoveredLink(null);
          return;
        }
        setMobileMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    const onClickOutside = (e: MouseEvent) => {
      if (
        activeDropdown &&
        navRef.current &&
        !navRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
        setHoveredLink(null);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [mobileMenuOpen, activeDropdown]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  /* ── Dropdown Timers ──
   *  scheduleClose ONLY clears activeDropdown.
   *  hoveredLink is managed separately by mouse/focus events.
   */
  const showDropdown = useCallback((label: string) => {
    clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  return (
    <>
      {/* ━━ Floating Pill ━━ */}
      <motion.div
        className="fixed inset-x-0 z-[100] flex justify-center px-4 md:px-6 pointer-events-none"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
        initial={prefersReduced ? false : { y: -100 }}
        animate={{
          y: 0,
          top: bannerVisible && !scrolled ? "40px" : "16px",
        }}
        transition={{ type: "spring", stiffness: 240, damping: 26 }}
      >
        <motion.nav
          ref={navRef}
          data-lenis-prevent
          aria-label="Main navigation"
          className={`
            relative pointer-events-auto w-full max-w-[1100px] rounded-full
            ${
              scrolled || mobileMenuOpen
                ? "bg-zinc-950/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)]"
                : "bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] shadow-[0_4px_24px_-6px_rgba(0,0,0,0.3)]"
            }
            transition-[background-color,border-color,box-shadow] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
          `}
        >
          {/* Surface Grain */}
          <svg
            className="absolute inset-0 w-full h-full rounded-full pointer-events-none opacity-[0.035] mix-blend-overlay"
            aria-hidden="true"
          >
            <filter id="nav-grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves="4"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#nav-grain)" />
          </svg>

          {/* Ambient Teal Corona */}
          <div
            className={`absolute inset-0 rounded-full pointer-events-none transition-opacity duration-[800ms] ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "radial-gradient(ellipse at 50% -20%, rgba(13,148,136,0.08) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />

          {/* ── Inner Layout ── */}
          <div
            className={`
              relative flex items-center justify-between w-full
              ${scrolled || mobileMenuOpen ? "py-2 px-3 md:px-4" : "py-2.5 px-4 md:px-5"}
              transition-[padding] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
            `}
            aria-hidden={mobileMenuOpen || undefined}
            // @ts-expect-error inert is valid in modern browsers
            inert={mobileMenuOpen ? "" : undefined}
          >
            {/* ── Brand Lockup ── */}
            <a
              href="/"
              className="flex items-center gap-2.5 group outline-none rounded-full focus-visible:ring-2 focus-visible:ring-brand-teal z-20 shrink-0"
              aria-label="AdaptHub Home"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.08] overflow-hidden group-hover:border-brand-teal/40 group-hover:bg-brand-teal/5 transition-[border-color,background-color] duration-300">
                <img
                  src={CONTENT.assets.logoLight}
                  alt={CONTENT.global.logoAlt}
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px] opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-[opacity,transform] duration-[400ms]"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <span className="font-serif text-[19px] text-white/90 font-medium tracking-tight group-hover:text-white transition-colors duration-300 hidden sm:inline">
                {CONTENT.global.brandName}
              </span>
            </a>

            {/* ── Desktop Links with Sliding Pill ── */}
            {/* biome-ignore lint/a11y/noStaticElementInteractions: container delegates to interactive children; onMouseLeave/onBlur are delegation, not interaction */}
            <div
              className="hidden lg:flex items-center gap-0.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              onMouseLeave={() => {
                setHoveredLink(null);
                scheduleClose();
              }}
              onBlur={(e) => {
                // Only clean up when focus leaves the entire cluster
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setHoveredLink(null);
                  setActiveDropdown(null);
                }
              }}
            >
              {(CONTENT.nav.links as NavLink[]).map((item) => {
                const hasSubs = "subLinks" in item;
                const isActive = activeIndicator === item.label;
                const isOpen = activeDropdown === item.label;

                return (
                  // biome-ignore lint/a11y/noStaticElementInteractions: hover/focus delegation wrapper for nav-pill animation; true interactions are on child <a>/<button>
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      setHoveredLink(item.label);
                      hasSubs ? showDropdown(item.label) : scheduleClose();
                    }}
                    onFocus={() => {
                      setHoveredLink(item.label);
                      if (hasSubs) showDropdown(item.label);
                    }}
                  >
                    {/* Trigger */}
                    {!hasSubs && "href" in item ? (
                      <a
                        href={item.href}
                        className={`
                          relative px-4 py-2 text-[11px] font-mono uppercase tracking-[0.15em]
                          outline-none focus-visible:ring-2 focus-visible:ring-brand-teal
                          rounded-full flex items-center z-10 transition-colors duration-200
                          ${isActive ? "text-white" : "text-zinc-400"}
                        `}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full bg-white/[0.07] border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                            style={{ borderRadius: 9999 }}
                            transition={PILL_SPRING}
                          />
                        )}
                        <span className="relative">{item.label}</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        onClick={() =>
                          setActiveDropdown(isOpen ? null : item.label)
                        }
                        className={`
                          relative px-4 py-2 text-[11px] font-mono uppercase tracking-[0.15em]
                          outline-none focus-visible:ring-2 focus-visible:ring-brand-teal
                          rounded-full flex items-center gap-1.5 z-10 transition-colors duration-200
                          ${isActive ? "text-white" : "text-zinc-400"}
                        `}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full bg-white/[0.07] border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                            style={{ borderRadius: 9999 }}
                            transition={PILL_SPRING}
                          />
                        )}
                        <span className="relative">{item.label}</span>
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="9"
                          height="9"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`relative transition-opacity duration-200 ${
                            isActive ? "opacity-70" : "opacity-40"
                          }`}
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: EASE_EXPO }}
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </motion.svg>
                      </button>
                    )}

                    {/* ── Dropdown Panel ── */}
                    {hasSubs && (
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            key={`dd-${item.label}`}
                            initial={{
                              opacity: 0,
                              y: 12,
                              scale: 0.96,
                              filter: "blur(4px)",
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              scale: 1,
                              filter: "blur(0px)",
                            }}
                            exit={{
                              opacity: 0,
                              y: 8,
                              scale: 0.98,
                              filter: "blur(2px)",
                            }}
                            transition={DROP_SPRING}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 origin-top"
                            onMouseEnter={() => showDropdown(item.label)}
                            onMouseLeave={scheduleClose}
                          >
                            <div className="relative w-[360px] max-w-[92vw] bg-zinc-950/95 backdrop-blur-3xl border border-white/[0.08] rounded-2xl shadow-[0_24px_80px_-12px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden">
                              {/* Panel Grain */}
                              <svg
                                className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none opacity-[0.03]"
                                aria-hidden="true"
                              >
                                <filter id="dd-grain">
                                  <feTurbulence
                                    type="fractalNoise"
                                    baseFrequency="0.9"
                                    numOctaves="3"
                                    stitchTiles="stitch"
                                  />
                                </filter>
                                <rect
                                  width="100%"
                                  height="100%"
                                  filter="url(#dd-grain)"
                                />
                              </svg>

                              {/* Section Header */}
                              <div className="px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-[0.25em]">
                                  Index {"//"} {item.label}
                                </span>
                              </div>

                              {/* Sub-links */}
                              <div className="p-2 flex flex-col">
                                {(item.subLinks as NavSubLink[]).map(
                                  (sub, idx) => (
                                    <motion.a
                                      key={sub.label}
                                      href={sub.href}
                                      initial={{ opacity: 0, x: -8 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        delay: idx * 0.05 + 0.05,
                                        duration: 0.4,
                                        ease: EASE_EXPO,
                                      }}
                                      className="group/sub relative flex items-start gap-4 p-3 rounded-xl outline-none hover:bg-white/[0.04] focus-visible:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-inset transition-[background-color] duration-200"
                                    >
                                      <span className="font-mono text-[10px] text-zinc-600 mt-1 group-hover/sub:text-brand-teal/70 group-focus-visible/sub:text-brand-teal/70 transition-colors duration-200 shrink-0 tabular-nums">
                                        {String(idx + 1).padStart(2, "0")}
                                      </span>
                                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                                        <span className="text-[15px] font-serif tracking-tight text-zinc-300 group-hover/sub:text-white group-focus-visible/sub:text-white transition-colors duration-200 leading-snug">
                                          {sub.label}
                                        </span>
                                        <span className="text-[11px] text-zinc-500 group-hover/sub:text-zinc-400 group-focus-visible/sub:text-zinc-400 leading-relaxed transition-colors duration-200">
                                          {sub.description}
                                        </span>
                                      </div>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mt-1.5 shrink-0 text-zinc-700 opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 group-focus-visible/sub:opacity-100 group-focus-visible/sub:translate-x-0 group-hover/sub:text-brand-teal group-focus-visible/sub:text-brand-teal transition-[opacity,transform,color] duration-300 ease-out"
                                        aria-hidden="true"
                                      >
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                      </svg>
                                    </motion.a>
                                  ),
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── Right Action Cluster ── */}
            <div className="flex items-center gap-2.5 z-20 shrink-0">
              {/* Desktop CTA */}
              <div className="hidden lg:block">
                <SpotlightButton
                  href={CONTENT.links.app}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-5 bg-white text-zinc-950 text-[10px] font-bold uppercase tracking-[0.16em] rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_0_24px_rgba(255,255,255,0.3)] flex items-center justify-center transition-shadow duration-500"
                >
                  {CONTENT.nav.cta}
                </SpotlightButton>
              </div>

              {/* Mobile Toggle */}
              <button
                ref={hamburgerRef}
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="lg:hidden w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex flex-col items-center justify-center gap-[4px] outline-none touch-manipulation hover:bg-white/[0.08] active:scale-95 transition-[background-color,transform] duration-200 focus-visible:ring-2 focus-visible:ring-brand-teal"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <motion.span
                  animate={{
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? HAMBURGER_Y : 0,
                  }}
                  transition={{ duration: 0.35, ease: EASE_EXPO }}
                  className="block h-[1.5px] w-[18px] bg-white rounded-full origin-center"
                />
                <motion.span
                  animate={{
                    opacity: mobileMenuOpen ? 0 : 0.6,
                    scaleX: mobileMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.25, ease: EASE_EXPO }}
                  className="block h-[1.5px] w-[12px] bg-white rounded-full origin-center"
                />
                <motion.span
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? -HAMBURGER_Y : 0,
                    width: mobileMenuOpen ? 18 : 10,
                  }}
                  transition={{ duration: 0.35, ease: EASE_EXPO }}
                  className="block h-[1.5px] bg-white rounded-full origin-center"
                />
              </button>
            </div>
          </div>
        </motion.nav>
      </motion.div>

      {/* ━━ Mobile Overlay ━━ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={
              prefersReduced
                ? { opacity: 0 }
                : { clipPath: "inset(0 0 100% 0)" }
            }
            animate={
              prefersReduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }
            }
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { clipPath: "inset(0 0 100% 0)" }
            }
            transition={{
              duration: prefersReduced ? 0 : 0.65,
              ease: EASE_EXPO,
            }}
            className="fixed inset-0 z-[90] bg-zinc-950 flex flex-col pt-32 pb-8 px-6 md:px-10 overflow-y-auto overscroll-contain"
          >
            {/* Atmosphere */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(13,148,136,0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(13,148,136,0.05),transparent_60%)]" />
              <svg
                className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-screen"
                aria-hidden="true"
              >
                <filter id="mob-grain">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.8"
                    numOctaves="3"
                    stitchTiles="stitch"
                  />
                </filter>
                <rect width="100%" height="100%" filter="url(#mob-grain)" />
              </svg>
            </div>

            {/* Blueprint Watermark */}
            <div
              className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[32vw] font-serif text-transparent tracking-tighter select-none pointer-events-none rotate-[-12deg]"
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.04)",
              }}
              aria-hidden="true"
            >
              Adpt.
            </div>

            {/* Nav Nodes */}
            <nav
              className="relative z-10 flex flex-col gap-10 my-auto max-w-xl"
              aria-label="Mobile navigation"
            >
              {(CONTENT.nav.links as NavLink[]).map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{
                    delay: i * 0.08 + 0.15,
                    duration: 0.5,
                    ease: EASE_EXPO,
                  }}
                >
                  {/* Section Divider */}
                  <div className="flex items-center gap-4 mb-5">
                    <span className="font-mono text-[10px] text-brand-teal tracking-[0.2em] shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="h-px flex-1 bg-white/[0.08]"
                      aria-hidden="true"
                    />
                  </div>

                  {"subLinks" in item ? (
                    <div className="flex flex-col gap-4 pl-8">
                      {(item.subLinks as NavSubLink[]).map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="group outline-none touch-manipulation py-1 focus-visible:ring-2 focus-visible:ring-brand-teal rounded-sm block w-fit"
                        >
                          <span className="text-[7vw] sm:text-[5vw] md:text-3xl font-serif text-zinc-400 group-hover:text-brand-teal group-focus-visible:text-brand-teal active:text-brand-teal tracking-tight leading-tight transition-colors duration-200">
                            {sub.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <a
                      href={"href" in item ? (item.href as string) : "#"}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group outline-none touch-manipulation block pl-8 focus-visible:ring-2 focus-visible:ring-brand-teal rounded-sm w-fit"
                    >
                      <span className="text-[12vw] sm:text-[8vw] md:text-5xl font-serif text-zinc-200 group-hover:text-brand-teal group-focus-visible:text-brand-teal active:text-brand-teal tracking-tighter leading-none transition-colors duration-200">
                        {item.label}
                      </span>
                    </a>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Mobile Footer */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6, ease: EASE_EXPO }}
              className="relative z-10 w-full mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row gap-6 sm:items-center justify-between"
            >
              <SpotlightButton
                href={CONTENT.links.app}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-4 sm:py-3.5 px-8 bg-white text-zinc-950 font-bold text-xs uppercase tracking-[0.16em] rounded-full flex items-center justify-center gap-2.5 touch-manipulation hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow duration-500"
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

              <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em]">
                <span className="flex items-center gap-2 text-emerald-400/90 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  System Online
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
