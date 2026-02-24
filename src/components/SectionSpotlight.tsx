"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import { useReducedMotion } from "../hooks/use-reduced-motion";

interface SectionSpotlightProps {
  color?: string;
  size?: number;
  opacity?: number;
  blendMode?:
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "soft-light"
    | "color-dodge";
  className?: string;
}

export default function SectionSpotlight({
  color = "rgba(13, 148, 136, 0.12)", // Brand Teal (calibrated opacity)
  size = 500, // Slightly larger base size for smoother falloff
  opacity = 1,
  blendMode = "screen", // Screen creates a more realistic additive light effect
  className = "",
}: SectionSpotlightProps) {
  const isMobile = useIsMobile();
  const isReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-size); // Initialize off-screen
  const mouseY = useMotionValue(-size);

  // Apply physics-based weight to the tracking (The "Optical Lens" effect)
  const springConfig = { damping: 40, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Generate the optical gradient. Uses two stops of the color to create a "hot core" LED effect.
  const background = useMotionTemplate`radial-gradient(circle ${size}px at ${smoothX}px ${smoothY}px, ${color} 0%, transparent 70%)`;

  useEffect(() => {
    // Only track when the section is actually in the viewport to save CPU
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "100px" },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || isMobile || isReduced) return;

    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (frameId) return;

      frameId = requestAnimationFrame(() => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          mouseX.set(e.clientX - rect.left);
          mouseY.set(e.clientY - rect.top);
        }
        frameId = 0;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [inView, mouseX, mouseY, isMobile, isReduced]);

  // Fail-safe: Hardware guardrails return null to keep the DOM clean on mobile/reduced-motion
  if (isMobile || isReduced) return null;

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          background,
          opacity: inView ? opacity : 0,
          mixBlendMode: blendMode,
        }}
      />
    </div>
  );
}
