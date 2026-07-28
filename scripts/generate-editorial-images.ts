import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import {
  ARTICLE_INVENTORY,
  type ArticleKind,
} from "../src/constants/editorial";

const root = resolve(import.meta.dirname, "..");
const ratios = [
  { suffix: "1x1", width: 1200, height: 1200 },
  { suffix: "4x3", width: 1200, height: 900 },
  { suffix: "16x9", width: 1200, height: 675 },
] as const;

const palettes = [
  ["#2dd4bf", "#0ea5e9"],
  ["#f472b6", "#8b5cf6"],
  ["#facc15", "#f97316"],
  ["#34d399", "#22d3ee"],
  ["#fb7185", "#f59e0b"],
] as const;

function escapeXml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[character] ?? character,
  );
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((word) =>
      word.length <= 3
        ? word.toUpperCase()
        : `${word[0].toUpperCase()}${word.slice(1)}`,
    )
    .join(" ");
}

function wrapTitle(title: string, max = 24) {
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 4);
}

function makeSvg(
  kind: ArticleKind,
  slug: string,
  width: number,
  height: number,
  index: number,
) {
  const [primary, secondary] = palettes[index % palettes.length];
  const title = titleFromSlug(slug);
  const lines = wrapTitle(title, width === height ? 22 : 30);
  const startY = height * 0.42 - (lines.length - 1) * 42;
  const motif = index % 4;
  const shapes =
    motif === 0
      ? `<circle cx="${width * 0.78}" cy="${height * 0.28}" r="${height * 0.18}" fill="none" stroke="${secondary}" stroke-width="3" opacity=".6"/><circle cx="${width * 0.78}" cy="${height * 0.28}" r="${height * 0.11}" fill="none" stroke="${primary}" stroke-width="2" opacity=".8"/>`
      : motif === 1
        ? `<path d="M${width * 0.58} ${height * 0.18} L${width * 0.88} ${height * 0.32} L${width * 0.64} ${height * 0.58} Z" fill="none" stroke="${secondary}" stroke-width="3" opacity=".7"/>`
        : motif === 2
          ? `<g opacity=".7">${[0, 1, 2, 3].map((n) => `<rect x="${width * (0.6 + n * 0.07)}" y="${height * (0.22 + n * 0.06)}" width="${width * 0.17}" height="${height * 0.12}" rx="14" fill="none" stroke="${n % 2 ? secondary : primary}" stroke-width="3"/>`).join("")}</g>`
          : `<path d="M${width * 0.58} ${height * 0.55} C${width * 0.65} ${height * 0.18}, ${width * 0.78} ${height * 0.75}, ${width * 0.9} ${height * 0.28}" fill="none" stroke="${primary}" stroke-width="5" opacity=".7"/><circle cx="${width * 0.9}" cy="${height * 0.28}" r="12" fill="${secondary}"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#09090b"/><stop offset="1" stop-color="#18181b"/></linearGradient>
    <radialGradient id="glow"><stop stop-color="${primary}" stop-opacity=".22"/><stop offset="1" stop-color="${primary}" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity=".045"/></pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <circle cx="${width * 0.78}" cy="${height * 0.32}" r="${height * 0.48}" fill="url(#glow)"/>
  ${shapes}
  <rect x="${width * 0.07}" y="${height * 0.1}" width="90" height="6" rx="3" fill="${primary}"/>
  <text x="${width * 0.07}" y="${height * 0.17}" fill="#a1a1aa" font-family="Arial, sans-serif" font-size="24" letter-spacing="7">ADAPTHUB / ${kind.toUpperCase()}</text>
  ${lines.map((line, lineIndex) => `<text x="${width * 0.07}" y="${startY + lineIndex * 72}" fill="#fafafa" font-family="Georgia, serif" font-size="58" font-weight="600">${escapeXml(line)}</text>`).join("\n")}
  <text x="${width * 0.07}" y="${height * 0.86}" fill="${primary}" font-family="Arial, sans-serif" font-size="22" letter-spacing="4">ADAPTIVE LEARNING / CAT</text>
  <text x="${width * 0.93}" y="${height * 0.91}" text-anchor="end" fill="#71717a" font-family="Arial, sans-serif" font-size="20">${String(index + 1).padStart(2, "0")}</text>
</svg>`;
}

let index = 0;
for (const kind of Object.keys(ARTICLE_INVENTORY) as ArticleKind[]) {
  const directory = resolve(root, "public", "images", "editorial", kind);
  await mkdir(directory, { recursive: true });
  for (const slug of ARTICLE_INVENTORY[kind]) {
    for (const ratio of ratios) {
      const svg = makeSvg(kind, slug, ratio.width, ratio.height, index);
      const output = await sharp(Buffer.from(svg))
        .jpeg({ quality: 84, progressive: true })
        .toBuffer();
      await writeFile(
        resolve(directory, `${slug}-${ratio.suffix}.jpg`),
        output,
      );
    }
    index += 1;
  }
}

console.log(
  `Generated ${index * ratios.length} editorial images for ${index} article topics.`,
);
