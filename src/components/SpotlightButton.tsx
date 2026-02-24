"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type React from "react";
import { useRef } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import { useReducedMotion } from "../hooks/use-reduced-motion";

interface SpotlightButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
}

export default function SpotlightButton({
  href,
  children,
  className = "",
  target,
  rel,
  onClick,
}: SpotlightButtonProps) {
  const isMobile = useIsMobile();
  const isReduced = useReducedMotion();

  // Ref handles both anchor and button dynamically
  // biome-ignore lint/suspicious/noExplicitAny: Dynamic component ref requires any for Framer Motion union types
  const buttonRef = useRef<any>(null);

  // Raw pixel coordinates for the optical spotlight
  const lightX = useMotionValue(-100);
  const lightY = useMotionValue(-100);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || isMobile || isReduced) return;
    const rect = buttonRef.current.getBoundingClientRect();
    lightX.set(e.clientX - rect.left);
    lightY.set(e.clientY - rect.top);
  };

  // The dynamic optical reflection (flashlight effect)
  const spotlightBackground = useMotionTemplate`radial-gradient(120px circle at ${lightX}px ${lightY}px, rgba(255,255,255,0.6), transparent 100%)`;

  // Dynamically choose tag to ensure semantic HTML routing/actions
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={buttonRef}
      {...(href ? { href, target, rel } : { type: "button" })}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      // Explicit object syntax guarantees Framer Motion fires the animation
      whileHover={!isMobile && !isReduced ? { scale: 1.01 } : undefined}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 700, damping: 25, mass: 0.5 }}
      className={`relative inline-flex items-center justify-center overflow-hidden group outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-void focus-visible:ring-brand-teal touch-manipulation transform-gpu ${className}`}
    >
      {/* ── 1. Physical Bevel & Press Occlusion ── */}
      {/* 
        Default: Light catches the top rim.
        Active (Pressed): Top highlight dies, inner shadow simulates physical depth.
      */}
      <div
        className="absolute inset-0 rounded-[inherit] border border-white/50 group-active:border-white/10 pointer-events-none mix-blend-overlay z-20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] group-active:shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)] transition-all duration-75 ease-out"
        aria-hidden="true"
      />

      {/* ── 2. The Core Content ── */}
      <div className="relative z-30 w-full h-full flex items-center justify-center group-active:brightness-90 transition-all duration-75">
        {children}
      </div>

      {/* ── 3. Latent Blueprint Texture (Revealed by Spotlight) ── */}
      {!isMobile && !isReduced && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay"
          style={{ background: spotlightBackground }}
          aria-hidden="true"
        >
          {/* Microscopic architectural grid etched into the surface */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:4px_4px]" />
        </motion.div>
      )}

      {/* ── 4. Base Ambient Sheen ── */}
      {/* Ensures the button doesn't look flat even when not directly hovered */}
      <div
        className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/10 to-transparent opacity-50 group-active:opacity-10 pointer-events-none z-[5] transition-opacity duration-75"
        aria-hidden="true"
      />
    </Component>
  );
}
