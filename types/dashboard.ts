export interface DashboardRange {
  from: string;
  to: string;
}

export interface DashboardData {
  user: {
    login: string;
    name: string;
    avatarUrl: string;
  };
  totals: {
    commits: number;
    prs: number;
    issues: number;
    reviews: number;
  };
  heatmap: {
    date: string;
    count: number;
  }[];
  streaks: {
    current: number;
    longest: number;
  };
  momentum: {
    weeklyChangePercent: number;
    total: number;
    state:
      | "rising"
      | "stable"
      | "dropping"
      | "low"
      | "on track"
      | "exceeding"
      | "declining";
  };
  codeFrequency: {
    week: number;
    additions: number;
    deletions: number;
  }[];
  languages: {
    name: string;
    percent: number;
  }[];
  productivity: {
    peakHour: number;
    peakDay: string;
    byHour: number[];
    byDay: number[];
  };
  topRepos: {
    name: string;
    stars: number;
    language: string;
    contributions: number;
  }[];
  recentActivity: {
    type: string;
    title: string;
    repo: string;
    timeAgo: string;
  }[];
  collaborators?: {
    login: string;
    avatar_url: string;
    url: string;
    contributions: number;
  }[];
  rateLimit: {
    remaining: number;
    limit: number;
    resetAt: string;
  };
}
