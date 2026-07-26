// Color values that need to be accessed in JS/TS (e.g., Framer Motion variants).
// All other theme colors live as CSS variables in src/styles/global.css.

export const THEME_COLORS = {
  brand: {
    teal: "#2dd4bf", // 400 (Upgraded for AAA contrast on bg-void)
    tealLight: "#5eead4", // 300
  },
  accent: {
    pink: "#ec4899", // 500
    red: "#ef4444", // 500
    violetLight: "#7c3aed", // 600
    gold: "#fcd34d", // Reward primitive (matches app's --color-accent-gold); not a generic CTA color
  },
  motion: {
    easeCinematic: [0.16, 1, 0.3, 1] as [number, number, number, number],
    easePrecise: [0.4, 0, 0.2, 1] as [number, number, number, number],
  },
} as const;
