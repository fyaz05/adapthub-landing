import { parseCubicBezier } from "../src/utils/design-contract";

export { parseCubicBezier };

export type ColorContract = Record<string, string>;

export interface CollectedVars {
  vars: Map<string, string>;
  valuesSeen: Map<string, Set<string>>;
}

export const EXPECTED_FIELDS = {
  "--color-brand-teal": "brandTeal",
  "--brand-teal-rgb": "brandTealRgb",
  "--color-accent-pink": "accentPink",
  "--color-reward-300": "reward300",
  "--ease-cinematic": "easeCinematic",
  "--ease-precise": "easePrecise",
  "--duration-fast": "durationFast",
  "--duration-normal": "durationNormal",
  "--duration-slow": "durationSlow",
  "--color-action-accent": "brandTeal",
  "--color-cta-accent": "brandTeal",
  "--color-saved-accent": "accentPink",
} as const;

export function collectVars(source: string): CollectedVars {
  const vars = new Map<string, string>();
  const valuesSeen = new Map<string, Set<string>>();
  let index = 0;
  let blockDepth = 0;
  let declarationAllowed = false;

  while (index < source.length) {
    if (source.startsWith("/*", index)) {
      const end = source.indexOf("*/", index + 2);
      index = end === -1 ? source.length : end + 2;
      continue;
    }

    const current = source[index];
    if (/\s/.test(current)) {
      index += 1;
      continue;
    }
    if (current === "{") {
      blockDepth += 1;
      declarationAllowed = true;
      index += 1;
      continue;
    }
    if (current === ";") {
      declarationAllowed = blockDepth > 0;
      index += 1;
      continue;
    }
    if (current === "}") {
      blockDepth = Math.max(0, blockDepth - 1);
      declarationAllowed = blockDepth > 0;
      index += 1;
      continue;
    }

    if (!declarationAllowed || !source.startsWith("--", index)) {
      declarationAllowed = false;
      index += 1;
      continue;
    }

    const nameMatch = source.slice(index).match(/^--[\w-]+/);
    if (!nameMatch) {
      index += 2;
      continue;
    }

    const name = nameMatch[0];
    let cursor = index + name.length;
    while (/\s/.test(source[cursor] ?? "")) cursor += 1;
    if (source[cursor] !== ":") {
      index = cursor;
      continue;
    }

    cursor += 1;
    const valueStart = cursor;
    let quote: '"' | "'" | undefined;
    let escaped = false;
    let parentheses = 0;
    let brackets = 0;

    while (cursor < source.length) {
      const char = source[cursor];
      if (quote) {
        if (escaped) escaped = false;
        else if (char === "\\") escaped = true;
        else if (char === quote) quote = undefined;
        cursor += 1;
        continue;
      }

      if (source.startsWith("/*", cursor)) {
        const end = source.indexOf("*/", cursor + 2);
        cursor = end === -1 ? source.length : end + 2;
        continue;
      }

      if (char === '"' || char === "'") quote = char;
      else if (char === "(") parentheses += 1;
      else if (char === ")" && parentheses > 0) parentheses -= 1;
      else if (char === "[") brackets += 1;
      else if (char === "]" && brackets > 0) brackets -= 1;
      else if (
        parentheses === 0 &&
        brackets === 0 &&
        (char === ";" || char === "}")
      ) {
        break;
      }
      cursor += 1;
    }

    const value = source
      .slice(valueStart, cursor)
      .replace(/\/\*[\s\S]*?(?:\*\/|$)/g, "")
      .replace(/\s+/g, " ")
      .trim();
    vars.set(name, value);
    const seen = valuesSeen.get(name) ?? new Set<string>();
    seen.add(value);
    valuesSeen.set(name, seen);
    index = cursor;
  }

  return { vars, valuesSeen };
}

interface VarCall {
  end: number;
  fallback?: string;
  reference: string;
  start: number;
}

function findVarCalls(value: string): VarCall[] {
  const calls: VarCall[] = [];
  let index = 0;

  while (index < value.length) {
    const match = value.slice(index).match(/var\(\s*(--[\w-]+)/);
    if (!match || match.index === undefined) break;

    const start = index + match.index;
    let cursor = start + match[0].length;
    let depth = 1;
    let comma = -1;
    let quote: '"' | "'" | undefined;
    let escaped = false;

    while (cursor < value.length && depth > 0) {
      const char = value[cursor];
      if (quote) {
        if (escaped) escaped = false;
        else if (char === "\\") escaped = true;
        else if (char === quote) quote = undefined;
      } else if (char === '"' || char === "'") quote = char;
      else if (char === "(") depth += 1;
      else if (char === ")") depth -= 1;
      else if (char === "," && depth === 1 && comma === -1) comma = cursor;
      cursor += 1;
    }

    if (depth !== 0) break;
    calls.push({
      start,
      end: cursor,
      reference: match[1],
      fallback:
        comma === -1 ? undefined : value.slice(comma + 1, cursor - 1).trim(),
    });
    index = cursor;
  }

  return calls;
}

function varReferences(value: string): string[] {
  const references: string[] = [];
  for (const call of findVarCalls(value)) {
    references.push(call.reference);
    if (call.fallback) references.push(...varReferences(call.fallback));
  }
  return references;
}

export function findCycles(vars: Map<string, string>): string[][] {
  const state = new Map<string, "visiting" | "visited">();
  const stack: string[] = [];
  const cycles: string[][] = [];
  const signatures = new Set<string>();

  function visit(name: string) {
    const current = state.get(name);
    if (current === "visited") return;
    if (current === "visiting") {
      const start = stack.indexOf(name);
      const cycle = [...stack.slice(start), name];
      const nodes = cycle.slice(0, -1);
      const rotations = nodes.map((_, index) =>
        [...nodes.slice(index), ...nodes.slice(0, index)].join(" -> "),
      );
      const signature = rotations.sort()[0];
      if (!signatures.has(signature)) {
        signatures.add(signature);
        cycles.push(cycle);
      }
      return;
    }

    state.set(name, "visiting");
    stack.push(name);
    const value = vars.get(name);
    if (value !== undefined) {
      for (const reference of varReferences(value)) {
        if (vars.has(reference)) visit(reference);
      }
    }
    stack.pop();
    state.set(name, "visited");
  }

  for (const name of vars.keys()) visit(name);
  return cycles;
}

function resolveValue(
  value: string,
  vars: Map<string, string>,
  seen: Set<string>,
): string {
  let resolved = value;

  while (true) {
    const calls = findVarCalls(resolved);
    if (calls.length === 0) return resolved;

    for (const call of [...calls].reverse()) {
      let replacement: string;
      if (vars.has(call.reference)) {
        replacement = resolveToken(call.reference, vars, seen);
      } else if (call.fallback !== undefined) {
        replacement = resolveValue(call.fallback, vars, seen);
      } else {
        throw new Error(`references missing custom property ${call.reference}`);
      }
      resolved = `${resolved.slice(0, call.start)}${replacement}${resolved.slice(call.end)}`;
    }
  }
}

export function resolveToken(
  name: string,
  vars: Map<string, string>,
  seen = new Set<string>(),
): string {
  if (seen.has(name)) {
    throw new Error(`custom property cycle: ${[...seen, name].join(" -> ")}`);
  }
  const raw = vars.get(name);
  if (raw === undefined) throw new Error("not declared");

  return resolveValue(raw, vars, new Set(seen).add(name));
}

export function validateColorContract(
  css: string,
  contract: ColorContract,
): string[] {
  const { vars, valuesSeen } = collectVars(css);
  const failures: string[] = [];
  const coveredFields = new Set<string>(Object.values(EXPECTED_FIELDS));

  for (const field of Object.keys(contract)) {
    if (!coveredFields.has(field)) {
      failures.push(
        `contract field "${field}" has no assertion in this checker`,
      );
    }
  }

  for (const field of coveredFields) {
    if (contract[field] === undefined) {
      failures.push(`contract field "${field}" is missing`);
    }
  }

  for (const [token, field] of Object.entries(EXPECTED_FIELDS)) {
    const expected = contract[field];
    if (expected === undefined) continue;

    const distinct = valuesSeen.get(token);
    if (distinct && distinct.size > 1) {
      failures.push(
        `${token}: declared ${distinct.size} times with differing values (${[...distinct].join(" | ")})`,
      );
      continue;
    }

    try {
      const actual = resolveToken(token, vars);
      if (actual !== expected) {
        failures.push(
          `${token}: expected "${expected}", resolved to "${actual}"`,
        );
      }
    } catch (error) {
      failures.push(`${token}: ${(error as Error).message}`);
    }
  }

  for (const cycle of findCycles(vars)) {
    failures.push(`custom property cycle: ${cycle.join(" -> ")}`);
  }

  return [...new Set(failures)];
}
