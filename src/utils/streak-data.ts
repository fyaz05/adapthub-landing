export interface StreakDay {
  practiced: boolean;
  future?: boolean;
  intensityClass?: string;
  tooltip?: string;
  streakAmt?: number;
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
      const quality = pseudoRandom(i + 1000);
      let intensityClass = "bg-brand-teal/20 border-brand-teal/10";
      if (quality > 0.8)
        intensityClass =
          "bg-brand-teal shadow-[0_0_10px_rgba(45,212,191,0.5)] border-brand-teal";
      else if (quality > 0.5)
        intensityClass = "bg-brand-teal/60 border-brand-teal/50";
      else if (quality > 0.2)
        intensityClass = "bg-brand-teal/40 border-brand-teal/30";

      const accuracy = 60 + Math.floor(pseudoRandom(i + 2000) * 35);
      const minutes = 15 + Math.floor(pseudoRandom(i + 3000) * 45);

      data.push({
        practiced: true,
        intensityClass,
        tooltip: `Day ${i + 1}: ${accuracy}% Acc \n ${minutes}m in ZPD`,
        streakAmt: currentStreak,
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
