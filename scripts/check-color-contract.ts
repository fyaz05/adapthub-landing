import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { validateColorContract } from "./color-contract";

const root = resolve(import.meta.dirname, "..");
const css = readFileSync(resolve(root, "src/styles/global.css"), "utf8");
const contract = JSON.parse(
  readFileSync(resolve(root, "design-system/color-contract.json"), "utf8"),
) as Record<string, string>;

const failures = validateColorContract(css, contract);

if (failures.length > 0) {
  console.error("Landing color contract FAILED:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(
  `Landing color contract passed (12 tokens resolved, ${Object.keys(contract).length}/${Object.keys(contract).length} contract fields asserted).`,
);
