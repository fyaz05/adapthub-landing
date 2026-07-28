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
  motion: {
    easeCinematic: parseCubicBezier(contract.easeCinematic),
    easePrecise: parseCubicBezier(contract.easePrecise),
  },
} as const;
