// Momentum calculation utilities

export function calculateMomentum(
  recentActivity: number,
  previousActivity: number
): number {
  if (previousActivity === 0) {
    return recentActivity > 0 ? 100 : 0;
  }

  return Math.round(((recentActivity - previousActivity) / previousActivity) * 100);
}

export function getMomentumLabel(momentum: number): string {
  if (momentum >= 50) return 'Exceeding';
  if (momentum >= 0) return 'On Track';
  if (momentum >= -50) return 'Declining';
  return 'Low';
}
