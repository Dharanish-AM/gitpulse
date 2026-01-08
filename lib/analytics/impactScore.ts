// Impact score calculation

interface ImpactMetrics {
  stars: number;
  pullRequests: number;
  issues: number;
  commits: number;
  reviews: number;
}

export function calculateImpactScore(metrics: ImpactMetrics): number {
  const weights = {
    stars: 0.3,
    pullRequests: 0.2,
    issues: 0.15,
    commits: 0.2,
    reviews: 0.15,
  };

  // Normalize metrics (assuming max values)
  const normalized = {
    stars: Math.min(metrics.stars / 100, 1),
    pullRequests: Math.min(metrics.pullRequests / 50, 1),
    issues: Math.min(metrics.issues / 30, 1),
    commits: Math.min(metrics.commits / 100, 1),
    reviews: Math.min(metrics.reviews / 50, 1),
  };

  const score =
    Object.entries(weights).reduce((sum, [key, weight]) => {
      return sum + normalized[key as keyof typeof normalized] * weight * 100;
    }, 0);

  return Math.round(score);
}
