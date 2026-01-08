// Productivity analysis utilities

interface ActivityPattern {
  hour: number;
  day: string;
  count: number;
}

export function analyzePeakHours(activities: ActivityPattern[]) {
  const hourCounts: Record<number, number> = {};

  for (const activity of activities) {
    hourCounts[activity.hour] = (hourCounts[activity.hour] || 0) + activity.count;
  }

  return Object.entries(hourCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([hour]) => parseInt(hour));
}

export function analyzePeakDays(activities: ActivityPattern[]) {
  const dayCounts: Record<string, number> = {};

  for (const activity of activities) {
    dayCounts[activity.day] = (dayCounts[activity.day] || 0) + activity.count;
  }

  return Object.entries(dayCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([day]) => day);
}
