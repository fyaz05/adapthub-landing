import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Verifies landing's stylesheet against the cross-repo color contract.
 *
 * This resolves `var()` chains and compares *resolved values* rather than
 * substring-matching the source text. That matters because the app writes some
 * tokens indirectly (`--color-reward-300: var(--color-gold-300)`) while landing
 * writes them literally (`#fcd34d`). Both are correct; only a resolving check
 * can validate both repos against one set of expectations.
 */

const root = resolve(import.meta.dirname, "..");
const css = readFileSync(resolve(root, "src/styles/global.css"), "utf8");
const contract = JSON.parse(
  readFileSync(resolve(root, "design-system/color-contract.json"), "utf8"),
) as Record<string, string>;

/**
 * Collect every `--name: value` declaration; later declarations win.
 * Also records every distinct raw value per name — a token declared twice
 * with different values is a cascade ambiguity this source-level checker
 * cannot adjudicate (an unlayered override beats a layered @theme block
 * regardless of source order), so the caller must fail it loudly.
 */
function collectVars(source: string): {
  vars: Map<string, string>;
  valuesSeen: Map<string, Set<string>>;
} {
  // `(?:\*\/|$)` — an unterminated /* comment runs to EOF per CSS parsing
  // rules; without the $ alternative its contents would be scanned as live.
  const withoutComments = source.replace(/\/\*[\s\S]*?(?:\*\/|$)/g, "");
  const vars = new Map<string, string>();
  const valuesSeen = new Map<string, Set<string>>();
  // `[^;{}]+` (not `[^;]+;`) so the final declaration in a block is captured
  // even without a trailing semicolon.
  for (const m of withoutComments.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+)/g)) {
    const value = m[2].replace(/\s+/g, " ").trim();
    vars.set(m[1], value);
    let set = valuesSeen.get(m[1]);
    if (!set) {
      set = new Set<string>();
      valuesSeen.set(m[1], set);
    }
    set.add(value);
  }
  return { vars, valuesSeen };
}

/** Substitute var() references until a literal remains. Throws on cycle/missing. */
function resolveToken(
  name: string,
  vars: Map<string, string>,
  seen = new Set<string>(),
): string {
  if (seen.has(name))
    throw new Error(
      `self-referential custom property (chain: ${[...seen].join(" -> ")}). ` +
        "A var() cycle computes to the guaranteed-invalid value and silently kills the token.",
    );
  seen.add(name);
  const raw = vars.get(name);
  if (raw === undefined) throw new Error("not declared");
  return raw.replace(
    /var\(\s*(--[\w-]+)\s*(?:,[^)]*)?\)/g,
    (_all, ref: string) => resolveToken(ref, vars, new Set(seen)),
  );
}

const { vars, valuesSeen } = collectVars(css);

/**
 * token -> [contract field, expected value]. Every field of
 * color-contract.json MUST appear here at least once — enforced below, so a
 * new contract field cannot silently ship unasserted.
 */
const EXPECTED: Record<string, [field: string, value: string | undefined]> = {
  "--color-brand-teal": ["brandTeal", contract.brandTeal],
  "--brand-teal-rgb": ["brandTealRgb", contract.brandTealRgb],
  "--color-accent-pink": ["accentPink", contract.accentPink],
  "--color-reward-300": ["reward300", contract.reward300],
  "--ease-cinematic": ["easeCinematic", contract.easeCinematic],
  "--ease-precise": ["easePrecise", contract.easePrecise],
  "--duration-fast": ["durationFast", contract.durationFast],
  "--duration-normal": ["durationNormal", contract.durationNormal],
  "--duration-slow": ["durationSlow", contract.durationSlow],
  // Semantic aliases must land on the right primitive.
  "--color-action-accent": ["brandTeal", contract.brandTeal],
  "--color-cta-accent": ["brandTeal", contract.brandTeal],
  "--color-saved-accent": ["accentPink", contract.accentPink],
};

const failures: string[] = [];

// Every contract field must be asserted by at least one EXPECTED entry.
const coveredFields = new Set(Object.values(EXPECTED).map(([field]) => field));
for (const field of Object.keys(contract)) {
  if (!coveredFields.has(field))
    failures.push(
      `contract field "${field}" has no assertion in this checker — add an EXPECTED entry for it`,
    );
}

for (const [token, [field, expected]] of Object.entries(EXPECTED)) {
  if (expected === undefined) {
    failures.push(
      `${token}: contract field "${field}" is missing from color-contract.json`,
    );
    continue;
  }
  // A token declared more than once with differing values is a cascade
  // ambiguity: this checker reads source order, but an unlayered override
  // beats a layered @theme block regardless of order, so "later wins" here
  // could be a false PASS. Refuse to adjudicate — demand one declaration.
  const distinct = valuesSeen.get(token);
  if (distinct && distinct.size > 1) {
    failures.push(
      `${token}: declared ${distinct.size} times with differing values (${[...distinct].join(" | ")}) — consolidate to one declaration`,
    );
    continue;
  }
  try {
    const actual = resolveToken(token, vars);
    if (actual !== expected)
      failures.push(
        `${token}: expected "${expected}", resolved to "${actual}"`,
      );
  } catch (error) {
    failures.push(`${token}: ${(error as Error).message}`);
  }
}

// Guard the exact failure mode that broke the app: `--x: var(--x)`.
for (const [name, value] of vars) {
  if (new RegExp(`var\\(\\s*${name}\\s*[,)]`).test(value))
    failures.push(
      `${name} references itself — this resolves to nothing at runtime`,
    );
}

if (failures.length > 0) {
  console.error("Landing color contract FAILED:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(
  `Landing color contract passed (${Object.keys(EXPECTED).length} tokens resolved, ` +
    `${coveredFields.size}/${Object.keys(contract).length} contract fields asserted).`,
);
