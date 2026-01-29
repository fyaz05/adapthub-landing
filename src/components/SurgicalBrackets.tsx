import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useState } from "react";

interface SurgicalFocusProps {
  children: React.ReactNode;
  className?: string;
  noScale?: boolean;
}

export default function SurgicalBrackets({
  children,
  className = "",
  noScale = false,
}: SurgicalFocusProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Visual interaction only
    <div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="presentation"
    >
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Top Left */}
            <motion.div
              initial={{ opacity: 0, x: 10, y: 10 }}
              animate={{ opacity: 1, x: -4, y: -4 }}
              exit={{ opacity: 0, x: 10, y: 10 }}
              className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-teal z-sticky pointer-events-none"
            />
            {/* Top Right */}
            <motion.div
              initial={{ opacity: 0, x: -10, y: 10 }}
              animate={{ opacity: 1, x: 4, y: -4 }}
              exit={{ opacity: 0, x: -10, y: 10 }}
              className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-teal z-sticky pointer-events-none"
            />
            {/* Bottom Left */}
            <motion.div
              initial={{ opacity: 0, x: 10, y: -10 }}
              animate={{ opacity: 1, x: -4, y: 4 }}
              exit={{ opacity: 0, x: 10, y: -10 }}
              className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-teal z-sticky pointer-events-none"
            />
            {/* Bottom Right */}
            <motion.div
              initial={{ opacity: 0, x: -10, y: -10 }}
              animate={{ opacity: 1, x: 4, y: 4 }}
              exit={{ opacity: 0, x: -10, y: -10 }}
              className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-teal z-sticky pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>
      <div
        className={`relative z-elevate transition-transform duration-300 ${!noScale ? "group-hover:scale-[1.02]" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
