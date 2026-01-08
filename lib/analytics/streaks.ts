// Streak calculation utilities

interface ContributionData {
  date: string;
  count: number;
}

export function calculateStreak(contributions: ContributionData[]) {
  let currentStreak = 0;
  let longestStreak = 0;

  for (const contrib of contributions) {
    if (contrib.count > 0) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return { currentStreak, longestStreak };
}
