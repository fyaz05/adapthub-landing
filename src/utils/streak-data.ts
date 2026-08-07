interface StreakDay {
  practiced: boolean;
  future?: boolean;
  intensityClass?: string;
  tooltip?: string;
  streakAmt?: number;
  /** Practice-day accuracy (60–94). Present only when practiced. */
  accuracy?: number;
  /** Minutes practiced in the ZPD band (15–59). Present only when practiced. */
  minutes?: number;
  /** Quality bucket 0–3 driving the heat intensity. Present only when practiced. */
  quality?: number;
}

/**
 * Generates deterministic streak data using a seeded pseudorandom function
 * (Math.sin-based) so the matrix looks consistent across SSR and client renders.
 */
export function getStreakStats(weeks = 52, daysPerWeek = 7): StreakDay[] {
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
  };

  const TOTAL_DAYS = weeks * daysPerWeek;
  const data: StreakDay[] = [];
  let currentStreak = 0;

  for (let i = 0; i < Math.floor(TOTAL_DAYS * 0.75); i++) {
    const isPracticed = pseudoRandom(i) > 0.4;

    if (isPracticed) {
      currentStreak++;
      const qualityRand = pseudoRandom(i + 1000);
      let intensityClass = "bg-brand-teal/20 border-brand-teal/10";
      let quality = 0;
      if (qualityRand > 0.8) {
        intensityClass =
          "bg-brand-teal shadow-[0_0_10px_rgb(var(--brand-teal-rgb)/0.5)] border-brand-teal";
        quality = 3;
      } else if (qualityRand > 0.5) {
        intensityClass = "bg-brand-teal/60 border-brand-teal/50";
        quality = 2;
      } else if (qualityRand > 0.2) {
        intensityClass = "bg-brand-teal/40 border-brand-teal/30";
        quality = 1;
      }

      const accuracy = 60 + Math.floor(pseudoRandom(i + 2000) * 35);
      const minutes = 15 + Math.floor(pseudoRandom(i + 3000) * 45);

      data.push({
        practiced: true,
        intensityClass,
        tooltip: `Day ${i + 1}: ${accuracy}% Acc \n ${minutes}m in ZPD`,
        streakAmt: currentStreak,
        accuracy,
        minutes,
        quality,
      });
    } else {
      currentStreak = 0;
      data.push({ practiced: false, tooltip: "No Practice Recorded" });
    }
  }

  for (let i = data.length; i < TOTAL_DAYS; i++) {
    data.push({ practiced: false, future: true });
  }

  return data;
}

export interface StreakWindowStats {
  /** Practiced (non-future) days inside the window. */
  sessions: number;
  /** Total minutes practiced in the ZPD band inside the window. */
  minutes: number;
  /** Mean accuracy across practiced days. 0 when the window has no sessions. */
  avgAccuracy: number;
  /** Longest run of consecutive practiced days inside the window. */
  bestStreak: number;
}

/**
 * Aggregates a contiguous week range (0-based, inclusive) of the matrix for
 * the interactive window scrubber. Deterministic for the deterministic
 * getStreakStats output, so SSR and hydration agree.
 */
export function getWindowStats(
  data: StreakDay[],
  daysPerWeek: number,
  startWeek: number,
  endWeek: number,
): StreakWindowStats {
  let sessions = 0;
  let minutes = 0;
  let accuracySum = 0;
  let bestStreak = 0;
  let run = 0;

  const start = Math.max(0, startWeek * daysPerWeek);
  const end = Math.min(data.length, (endWeek + 1) * daysPerWeek);

  for (let i = start; i < end; i++) {
    const day = data[i];
    if (day?.practiced && !day.future) {
      sessions += 1;
      minutes += day.minutes ?? 0;
      accuracySum += day.accuracy ?? 0;
      run += 1;
      if (run > bestStreak) bestStreak = run;
    } else {
      run = 0;
    }
  }

  return {
    sessions,
    minutes,
    avgAccuracy: sessions > 0 ? Math.round(accuracySum / sessions) : 0,
    bestStreak,
  };
}

/** 0-based week index of the most recent practiced day (defaults to week 0). */
export function getLastPracticedWeek(
  data: StreakDay[],
  daysPerWeek: number,
): number {
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i]?.practiced) return Math.floor(i / daysPerWeek);
  }
  return 0;
}
