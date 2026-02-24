// Source of truth for colors that need to be accessed in JS/TS (e.g., Framer Motion variants)
// These should stay synced with global.css variables

export const THEME_COLORS = {
  brand: {
    violet: "#5b21b6", // 800
    teal: "#2dd4bf", // 400 (Upgraded for AAA contrast on bg-void)
    tealLight: "#5eead4", // 300
  },
  accent: {
    pink: "#ec4899", // 500
    yellow: "#FCD34D", // 300
    red: "#ef4444", // 500
    violetLight: "#7c3aed", // 600
  },
  base: {
    void: "#050505",
    charcoal: "#122121",
    paper: "#faf3e9",
    surfaceDark: "#27272a", // zinc-800
  },
  ui: {
    border: "rgba(255,255,255,0.1)",
    borderHover: "rgba(255,255,255,0.2)",
  },
} as const;
