export function parseCubicBezier(
  value: string,
): [number, number, number, number] {
  const match = value.match(/^cubic-bezier\(\s*([^)]*)\s*\)$/);
  if (!match) throw new Error(`Invalid cubic-bezier value: ${value}`);

  const parts = match[1].split(",").map((part) => Number(part.trim()));
  if (
    parts.length !== 4 ||
    parts.some((part) => !Number.isFinite(part)) ||
    parts[0] < 0 ||
    parts[0] > 1 ||
    parts[2] < 0 ||
    parts[2] > 1
  ) {
    throw new Error(`Invalid cubic-bezier value: ${value}`);
  }

  return parts as [number, number, number, number];
}
