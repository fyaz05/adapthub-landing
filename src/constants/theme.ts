import contract from "../../design-system/color-contract.json";
import { parseCubicBezier } from "../utils/design-contract";

// JS/TS consumers derive shared values from the same contract validated against CSS.
export const THEME_COLORS = {
  brand: {
    teal: contract.brandTeal,
    tealLight: "#5eead4", // Landing-only primitive, outside the shared contract.
  },
  accent: {
    pink: contract.accentPink,
    red: "#ef4444", // Landing-only primitive.
    violetLight: "#7c3aed", // Landing-only primitive.
    gold: contract.reward300,
  },
  surface: {
    bg: "#0b0c0f",
    surface: "#101013",
    surface2: "#16161a",
    glass: "rgba(18, 19, 22, 0.72)",
  },
  text: {
    fg: "#faf3e9",
    muted: "rgba(250, 243, 233, 0.60)",
    subtle: "rgba(250, 243, 233, 0.40)",
  },
  motion: {
    easeCinematic: parseCubicBezier(contract.easeCinematic),
    easePrecise: parseCubicBezier(contract.easePrecise),
  },
} as const;
