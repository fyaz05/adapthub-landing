import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const css = readFileSync(resolve(root, "src/styles/global.css"), "utf8");
const contract = JSON.parse(
  readFileSync(resolve(root, "design-system/color-contract.json"), "utf8"),
) as Record<string, string>;

const required = [
  `--color-brand-teal: ${contract.brandTeal}`,
  `--brand-teal-rgb: ${contract.brandTealRgb}`,
  `--color-action-accent: var(--color-brand-teal)`,
  `--color-cta-accent: var(--color-action-accent)`,
  `--color-reward-300: ${contract.reward300}`,
  `--color-saved-accent: var(--color-accent-pink)`,
  `--ease-cinematic: ${contract.easeCinematic}`,
  `--ease-precise: ${contract.easePrecise}`,
];

for (const value of required) {
  if (!css.includes(value))
    throw new Error(`Color contract mismatch: missing ${value}`);
}
console.log("Landing color contract passed.");
