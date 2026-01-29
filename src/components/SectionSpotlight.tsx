"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import { useReducedMotion } from "../hooks/use-reduced-motion";

interface SectionSpotlightProps {
  color?: string;
  size?: number;
  opacity?: number;
  blendMode?: "normal" | "multiply" | "screen" | "overlay" | "soft-light";
  className?: string;
}

export default function SectionSpotlight({
  color = "rgba(13, 148, 136, 0.15)", // Default Teal
  size = 300,
  opacity = 1,
  blendMode = "screen",
  className = "",
}: SectionSpotlightProps) {
  const isMobile = useIsMobile();
  const isReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [inView, setInView] = useState(false);

  // Build the gradient template BEFORE any conditional returns
  const background = useMotionTemplate`radial-gradient(circle ${size}px at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0 },
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
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
          mouseX.set(e.clientX - rect.left);
          mouseY.set(e.clientY - rect.top);
        }
        frameId = 0;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [inView, mouseX, mouseY, isMobile, isReduced]);

  // Conditional render AFTER all hooks are called
  if (isMobile || isReduced) return null;

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background,
          opacity: inView ? opacity : 0,
          mixBlendMode: blendMode,
        }}
      />
    </div>
  );
}
