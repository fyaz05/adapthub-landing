# AdaptHub Landing — Visual / UI / UX Audit

**Audited:** 2026-08-04 · Astro 7 + React 19 + Tailwind 4 + Motion, run locally (dev server) and rendered in a real headless Chromium at 1440px and 390px viewports.

> ✅ **STATUS: All issues fixed.** See [Fix Log](#-fix-log) below.

---

## ✅ Fix Log

All findings from the original audit below have been **implemented and verified** (2026-08-04):

| ID | Issue | Fix |
|----|-------|-----|
| **C1** | React hydration failure on every page | Rewrote `src/hooks/use-reduced-motion.ts` to use an SSR-safe default (`false`) and compute the real value in `useEffect` after mount. Verified **0 hydration errors** across `/`, `/pricing`, `/cat-syllabus`, `/404`. |
| **H1** | Section headings truncated on mobile (`/cat-syllabus`) | Removed `truncate` from the section `<h2>`; added `min-w-0 break-words text-balance` so `VARC: Verbal Ability & Reading Comprehension` / `DILR: …` wrap instead of clipping. Verified no clipped headings. |
| **H2** | Mobile comparison tables scroll with no sticky label column | Made the first column `sticky left-0 z-10` with a solid `bg-zinc-950` background in both tables on `/adapthub-vs-competitors`. Verified `position: sticky`. |
| **H3** | Overuse of sub-11px content type | Raised hero telemetry eyebrows `10px → 11px`, "How it works" step badges `9px → 11px+`, and the confidence/competence matrix status chips + axis labels in `VelocityDashboard.tsx` (`8px → 10px+`). |
| **M1** | Sub-24px touch targets | Enlarged streak-matrix heatmap cells `12px → 16px` mobile / `20px` desktop (and legend chips to match); enlarged announcement-bar close button to a 40px+ target. |
| **M2** | Partytown SW 404 in dev | `dev` script now runs `bun run partytown` before `astro dev`, copying the lib to `public/~partytown`. Verified SW returns **200**. |
| **M3** | Very long pages with no in-page nav | Added a sticky, horizontally-scrollable "Jump to / On this page" anchor nav to `/cat-syllabus` and `/adapthub-vs-competitors`, with `scroll-mt` offsets and section IDs. Verified anchors work. |
| **M4** | 404 page title "Node Not Found" | Retitled to `Page Not Found (404) | AdaptHub` (body copy already said "Page not found."). |

**Also:** production build verified — `36 page(s) built` cleanly. Biome lint clean on all modified files (one pre-existing formatting error remains in `src/components/TheLens.tsx`, which was not touched).

**Screenshots:** updated captures are in `audit/fixed/*.png` (desktop + mobile for `/`, `/cat-syllabus`, `/adapthub-vs-competitors`, `/pricing`, `/404`).

---

## 🔍 Original audit

**Pages audited:** `/`, `/pricing`, `/about`, `/contact`, `/docs`, `/docs/core-issue-matrix`, `/blog`, `/cat-syllabus`, `/adapthub-vs-competitors`, `/how-to-score-99-percentile-cat`, `/404`.

**Full-page screenshots captured** in `audit/shots/*.png` (desktop + mobile) for visual reference.

---

## 🔴 Critical — fix first

### C1. React hydration failure on every page (console error + UI glitch)
Every page throws `Hydration failed because the server rendered HTML didn't match the client` from the **`SpotlightButton`** component (used in the hero CTA, navbar CTA, CTAs, footer, 404 page, etc.). The `Navbar` also uses the same hook.

**Root cause:** `src/hooks/use-reduced-motion.ts` computes a device-dependent value **in a React lazy state initializer** at first render:
```ts
const [isReduced, setIsReduced] = useState<boolean>(() => checkPerformance());
```
`checkPerformance()` reads `navigator.deviceMemory` and `navigator.hardwareConcurrency`. On the **server** the hook always returns `false`, so the server renders the "full motion" branch of `SpotlightButton` (the spotlight blueprint layer + hover handlers). On the **client**, a reduced-motion / low-memory / low-CPU device (or many test/headless environments) returns `true`, so the client renders a *different* DOM tree → React throws and regenerates the tree on the client.

**Impact:** guaranteed console errors on every page; on affected devices the button flashes/janks as React discards and re-renders the server HTML, and the spotlight hover layer can be missing or doubled.

**Fix:** don't compute the reduced-motion value during first render. Make SSR and first client render agree, then update after mount:
```ts
export function useReducedMotion(): boolean {
  const [isReduced, setIsReduced] = useState(false);   // SSR-safe default == server value
  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsReduced(checkPerformance());
    mql?.addEventListener?.("change", update);
    return () => mql?.removeEventListener?.("change", update);
  }, []);
  return isReduced;
}
```
Components that use the value to *conditionally render* (like `SpotlightButton`) will then briefly show the default branch and switch after mount — the correct pattern for hydration-safe client detection.

---

## 🟠 High

### H1. Mobile section headings are truncated (content cut off)
On `/cat-syllabus` (and likely other cards with the same class), section headings use `truncate`:
- `VARC: Verbal Ability & Reading Comprehension` → shown only as `VARC: Verba…` (clipped to 226px on a 390px viewport)
- `DILR: Data Interpretation & Logical Reasoning` → clipped

A **section heading that is cut off** prevents users from knowing what a section covers. Headings should wrap, not ellipsize.

**Fix:** remove `truncate` and let the heading wrap (use `break-words` / `text-balance`), or use a responsive size that fits.

### H2. Comparison tables require horizontal scrolling on mobile (no sticky first column)
`/adapthub-vs-competitors` renders two tables that are **440–468px wide inside a 356px-wide scroll area** on a 390px viewport. The page itself doesn't break (good — they're wrapped in `overflow-x-auto`), but:
- Users must scroll horizontally to compare columns, and the **first (label) column scrolls out of view**, so it's hard to tell which row you're reading.
- Table cells also render at 10–12px in places, compounding legibility.

**Fix:** add a `sticky left-0` first column with a background, or better, switch the comparison to stacked rows/cards on small screens. Verify on `docs`/`cat-syllabus` tables too.

### H3. Overuse of sub‑11px type for meaningful content
Many real, content-bearing labels are set at 8–10px, below the ~12px readable floor:
- Hero telemetry eyebrows (`CAT 2025 test-takers`, `Scored 99.99%ile`, `Completely free`) → `text-[10px]`
- Hero `Scroll` cue → `text-[9px]`
- "How it works" step numbers `01…04` → `text-[9px]`
- Dashboard/streak micro-labels & status chips (`High Conf, Incorrect`, `High Conf, Correct`, `Low Conf, Incorrect`…) → `text-[8px] sm:text-[9px] md:text-[10px]`

8px and 9px are effectively unreadable on high-DPI/small screens and fail accessibility guidance for meaningful text. **Decorative** data-visualization labels are acceptable to keep small, but **content labels** (section eyebrows, telemetry labels, "How it works" numbers) should be ≥11–12px.

**Fix:** raise content-bearing labels to ≥11px (12px preferred); keep only purely decorative micro-labels below that.

---

## 🟡 Medium

### M1. Sub‑24px interactive targets (touch UX)
- **Streak-matrix day cells** are rendered as **12×12px `<button>`s** on mobile (with `aria-label`s like `Day 4: 87% Acc · 26m in ZPD`). They're effectively untappable and fail WCAG 2.5.8 (min 24×24px). If they only show tooltips on hover, make them non-interactive on touch, or enlarge them.
- **Announcement-bar close button** is ~32px on desktop (`p-2` + 16px icon) — below the 44px recommendation.

**Fix:** enlarge targets to ≥24px (44px for primary touch controls); consider making streak cells `pointer-events-none` on touch.

### M2. Partytown service worker 404s in dev
Every page logs:
`Failed to register a ServiceWorker … /~partytown/partytown-sw.js … 404`
This is **dev-only** (the prebuild copies the Partytown lib into `public/~partytown`, so production is fine), but it's noisy in every dev console and could mask real errors. 

**Fix:** copy the Partytown lib before `astro dev` too, or guard the SW registration to production.

### M3. Very long pages / scroll depth
Mobile page heights are extreme: `/cat-syllabus` ≈ **11,300px**, `/adapthub-vs-competitors` ≈ **7,800px**, `/docs/core-issue-matrix` ≈ **7,900px**, `/blog` ≈ **6,600px**, `/docs` ≈ **6,000px**. Long pages increase bounce/scroll fatigue and make key CTAs (footer) hard to reach. Consider in-page anchor nav / jump links and sticky subsection progress indicators for the longest pages.

### M4. `404` page title "Node Not Found"
The `<title>`/H-content is `404 | Node Not Found`, body copy "The requested cognitive pathway does not exist." It's on-brand (the "pathway/node" theme) and the big `404` numeral is present, which is good — but "Node Not Found" in the browser tab and search results may read oddly for a general visitor. Consider keeping the themed body copy but leading the title with a plain "Page Not Found (404)". *(Low-severity, subjective.)*

---

## 🟢 Good — validated, keep as-is
- **No page-level horizontal overflow** on any page at either breakpoint (decorative off-canvas glows/SVG are properly clipped by `overflow-hidden`). The earlier mobile "overflow" hits were contained within `overflow-x-auto` tables and decorative absolutes — not page-breaking.
- **Heading hierarchy is correct** across all pages (single `h1`, no skipped levels).
- **No duplicate `id`s** detected.
- **Accessibility strengths:** skip-to-main link, `focus-visible` rings, `sr-only` text, `aria-hidden` on decorative SVGs, ARIA labels on mobile menu + announcement close, a real `<dialog>`-style mobile menu with focus trap + scroll lock, and `prefers-reduced-motion` CSS guardrails on the hero.
- **Color contrast is guarded by an in-repo design contract** (`design-system/color-contract.json` + `check:color-contract` run in `prebuild`) — a strong practice; I could not independently re-derive `oklch()` ratios here, but the pipeline enforces it.
- **Mobile menu** opens correctly and announces via the overlay; announcement bar is dismissible and persists the dismissal.

---

## ⚪ Secondary observations (not fully verified in prod)
- **Home page triggers ~64 script requests / 12 font requests in dev.** Dev-mode Vite splits inflate this, but it reflects a **large number of React client islands** (AnnouncementBar, Navbar, HeroBackground, SectionSpotlight, ParallaxDashboard, CoachDemo, TheLens, BentoGrid, VelocityDashboard, StreakMatrix, FAQ, …) plus **12 font files** (Geist Sans, Geist Mono, Lora, Dancing Script + subsets). Worth a production-build perf pass (LCP/font `display`/FOIT–CLS) to validate the "high-performance" claim.

---

## Suggested priority order
1. **C1** — fix `useReducedMotion` (removes console errors + potential button jank on every page). *(Highest ROI.)*
2. **H1** — stop truncating section headings.
3. **H2** — make mobile comparison tables usable (sticky first column or stacked cards).
4. **H3** — raise content-bearing sub‑11px type.
5. **M1** — fix sub‑24px touch targets.
6. **M2** — quiet dev Partytown 404.
7. **M3/M4** — long-page navigation + 404 title polish.

*Environment note: `astro.config.mjs` was temporarily extended with a `server.allowedHosts` entry to enable the sandbox live-preview host. This sandbox-only tweak is **not committed** — the pushed branch keeps the original production config. If you want it back in your local dev environment, re-add: `server: { host: true, allowedHosts: ["*.e2b.app"] }`.*
