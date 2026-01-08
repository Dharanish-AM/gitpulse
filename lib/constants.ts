// Application constants

export const GITHUB_API_URL = 'https://api.github.com';

export const ACTIVITY_TYPES = {
  PUSH: 'push',
  PULL_REQUEST: 'pull_request',
  ISSUE: 'issue',
  REVIEW: 'review',
  COMMENT: 'comment',
} as const;

export const TIME_RANGES = {
  WEEK: 7,
  MONTH: 30,
  QUARTER: 90,
  YEAR: 365,
} as const;

export const COLORS = {
  CYAN: '#00f0ff',
  PINK: '#ff006e',
  PURPLE: '#8338ec',
  LIME: '#3a86ff',
  BACKGROUND: '#000000',
  SURFACE: '#1a1a1a',
  BORDER: '#333333',
} as const;
