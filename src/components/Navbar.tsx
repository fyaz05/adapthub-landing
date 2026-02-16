import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { CONTENT } from "../constants/content";
import { useReducedMotion } from "../hooks/use-reduced-motion";
import SpotlightButton from "./SpotlightButton";
import SurgicalBrackets from "./SurgicalBrackets";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleDismiss = () => setBannerVisible(false);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("announcement-dismiss", handleDismiss);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("announcement-dismiss", handleDismiss);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 z-overlay flex justify-center px-6"
        initial={{ top: "4rem" }}
        animate={{
          top: bannerVisible && !scrolled ? "4rem" : "1.5rem",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }} // Slower, smoother adjust
        data-lenis-prevent
      >
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 25 }}
          className={`flex items-center gap-4 md:gap-8 px-4 md:px-6 py-1 rounded-full border transition-all duration-500 min-h-[56px] ${
            scrolled
              ? "bg-zinc-900/60 border-white/5 backdrop-blur-xl md:backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] scale-[0.98]"
              : "bg-white/[0.02] border-white/5 backdrop-blur-md md:backdrop-blur-lg"
          }`}
        >
          <SurgicalBrackets>
            <a href="/" className="flex items-center gap-2 px-1 md:px-2 group">
              <img
                src={CONTENT.assets.logoLight}
                alt={CONTENT.global.logoAlt}
                className="w-8 h-8 md:w-14 md:h-14 opacity-90 group-hover:opacity-100 transition-opacity"
                loading="eager"
              />
              <span className="font-serif text-base md:text-xl text-white font-medium tracking-tight">
                {CONTENT.global.brandName}
              </span>
            </a>
          </SurgicalBrackets>

          <div className="hidden md:flex items-center gap-6">
            {CONTENT.nav.links.map((item) => (
              <SurgicalBrackets key={item.label}>
                <a
                  href={item.href}
                  className="px-2 py-1 text-sm font-sans text-zinc-400 hover:text-white transition-colors tracking-wide relative group"
                >
                  {item.label}
                </a>
              </SurgicalBrackets>
            ))}
          </div>

          <div className="h-4 w-px bg-white/10 hidden md:block" />

          <SurgicalBrackets noScale>
            <SpotlightButton
              href={CONTENT.links.app}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 md:px-8 py-2 md:py-2.5 bg-zinc-100 text-zinc-900 text-xs md:text-sm font-medium rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_2px_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.5),0_0_20px_rgba(255,255,255,0.3)] block whitespace-nowrap"
            >
              <span className="md:hidden">Start</span>
              <span className="hidden md:inline">{CONTENT.nav.cta}</span>
            </SpotlightButton>
          </SurgicalBrackets>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 p-2 touch-manipulation"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                y: mobileMenuOpen ? 6 : 0,
              }}
              className="w-5 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
              className="w-5 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                y: mobileMenuOpen ? -6 : 0,
              }}
              className="w-5 h-0.5 bg-white rounded-full"
            />
          </button>
        </motion.nav>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-sticky ${!isReduced ? "backdrop-blur-3xl bg-void/90" : "bg-black"} flex flex-col items-center justify-center gap-8`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {CONTENT.nav.links.map((item, i) => (
              <motion.a
                key={item.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ delay: i * 0.1 }}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-serif text-white hover:text-brand-teal transition-colors min-h-[64px] w-full flex items-center justify-center px-12 active:scale-95 touch-manipulation"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
