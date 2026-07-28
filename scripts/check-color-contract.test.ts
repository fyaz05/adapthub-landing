import { describe, expect, test } from "bun:test";
import contract from "../design-system/color-contract.json";
import {
  collectVars,
  parseCubicBezier,
  resolveToken,
  validateColorContract,
} from "./color-contract";

const validCss = `
:root {
  --color-brand-teal: #2dd4bf;
  --brand-teal-rgb: 45 212 191;
  --color-accent-pink: #ec4899;
  --color-reward-300: #fcd34d;
  --ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-precise: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 0.3s;
  --duration-normal: 0.6s;
  --duration-slow: 0.8s;
  --color-action-accent: var(--color-brand-teal);
  --color-cta-accent: var(--color-action-accent);
  --color-saved-accent: var(--color-accent-pink);
}
`;

describe("validateColorContract", () => {
  test("accepts the valid contract", () => {
    expect(validateColorContract(validCss, contract)).toEqual([]);
  });

  test("rejects a wrong resolved value", () => {
    const css = validCss.replace("#2dd4bf", "#000000");
    expect(validateColorContract(css, contract).join("\n")).toContain(
      'expected "#2dd4bf"',
    );
  });

  test("rejects a missing contract field", () => {
    const { brandTeal: _removed, ...missing } = contract;
    expect(validateColorContract(validCss, missing).join("\n")).toContain(
      'contract field "brandTeal" is missing',
    );
  });

  test("rejects an uncovered contract field", () => {
    expect(
      validateColorContract(validCss, { ...contract, newField: "value" }).join(
        "\n",
      ),
    ).toContain('contract field "newField" has no assertion');
  });

  test("rejects conflicting duplicate declarations", () => {
    const css = `${validCss}\n:root { --color-brand-teal: #000000; }`;
    expect(validateColorContract(css, contract).join("\n")).toContain(
      "declared 2 times with differing values",
    );
  });

  test("rejects direct self-reference", () => {
    const css = `${validCss}\n:root { --unrelated: var(--unrelated); }`;
    expect(validateColorContract(css, contract).join("\n")).toContain(
      "--unrelated -> --unrelated",
    );
  });

  test("rejects an indirect cycle outside contract tokens", () => {
    const css = `${validCss}\n:root { --cycle-a: var(--cycle-b); --cycle-b: var(--cycle-a); }`;
    expect(validateColorContract(css, contract).join("\n")).toContain(
      "--cycle-a -> --cycle-b -> --cycle-a",
    );
  });

  test("rejects a missing referenced variable without fallback", () => {
    const css = validCss.replace(
      "var(--color-brand-teal)",
      "var(--missing-brand)",
    );
    expect(validateColorContract(css, contract).join("\n")).toContain(
      "references missing custom property --missing-brand",
    );
  });

  test("accepts a missing referenced variable with fallback", () => {
    const css = `${validCss}\n:root { --unrelated: var(--missing, #fff); }`;
    expect(validateColorContract(css, contract)).toEqual([]);
  });

  test("resolves nested aliases", () => {
    const css = validCss.replace(
      "--color-cta-accent: var(--color-action-accent);",
      "--cta-base: var(--color-action-accent);\n--color-cta-accent: var(--cta-base);",
    );
    expect(validateColorContract(css, contract)).toEqual([]);
  });

  test("resolves nested var fallbacks", () => {
    const css = validCss.replace(
      "--color-action-accent: var(--color-brand-teal);",
      "--color-action-accent: var(--missing, var(--color-brand-teal));",
    );
    expect(validateColorContract(css, contract)).toEqual([]);
  });

  test("rejects fallback-only cycles even when the primary value exists", () => {
    const css = `${validCss}\n:root { --primary: #fff; --fallback-owner: var(--primary, var(--fallback-owner)); }`;
    expect(validateColorContract(css, contract).join("\n")).toContain(
      "--fallback-owner -> --fallback-owner",
    );
  });

  test("preserves nested functions in fallbacks", () => {
    const css = ":root { --token: var(--missing, rgb(45, 212, 191)); }";
    const { vars } = collectVars(css);
    expect(resolveToken("--token", vars)).toBe("rgb(45, 212, 191)");
  });

  test("collects values containing quoted semicolons", () => {
    const css =
      ':root { --data: url("data:image/svg+xml;utf8,<svg></svg>"); --quoted: "literal;value"; }';
    const { vars } = collectVars(css);
    expect(vars.get("--data")).toBe(
      'url("data:image/svg+xml;utf8,<svg></svg>")',
    );
    expect(vars.get("--quoted")).toBe('"literal;value"');
  });

  test("does not collect custom-property-like text from selectors", () => {
    const css = '.x[data-value="--ghost: red;"] { --real: #fff; }';
    const { vars } = collectVars(css);
    expect(vars.has("--ghost")).toBe(false);
    expect(vars.get("--real")).toBe("#fff");
  });

  test("collects declarations after nested blocks", () => {
    const css =
      "@media (min-width: 1px) { :root { --nested: #fff } --outer: #000; }";
    const { vars } = collectVars(css);
    expect(vars.get("--nested")).toBe("#fff");
    expect(vars.get("--outer")).toBe("#000");
  });
});

describe("parseCubicBezier", () => {
  test("returns a Motion-compatible tuple", () => {
    expect(parseCubicBezier(contract.easeCinematic)).toEqual([0.16, 1, 0.3, 1]);
  });

  test("rejects malformed easing", () => {
    expect(() => parseCubicBezier("ease-out")).toThrow("Invalid cubic-bezier");
    expect(() => parseCubicBezier("cubic-bezier(0, 1, 2)")).toThrow(
      "Invalid cubic-bezier",
    );
    expect(() => parseCubicBezier("cubic-bezier(2, 0, -1, 1)")).toThrow(
      "Invalid cubic-bezier",
    );
  });
});
