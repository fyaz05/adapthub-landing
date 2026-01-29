"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type React from "react";
import { useRef } from "react";
import { useIsMobile } from "../hooks/use-mobile";

interface SpotlightButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export default function SpotlightButton({
  href,
  children,
  className = "",
  target,
  rel,
}: SpotlightButtonProps) {
  const isMobile = useIsMobile();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || isMobile) return;
    const rect = buttonRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(circle 100px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.4), transparent 80%)`;

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 150, damping: 25 }}
      className={`relative overflow-hidden group border border-white/10 ${className}`}
    >
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
      {!isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background }}
        />
      )}
    </motion.a>
  );
}
