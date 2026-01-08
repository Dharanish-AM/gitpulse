// Core dashboard types

export interface User {
  id: string;
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface Statistic {
  label: string;
  value: number;
  change: number; // percentage change
  trend: 'up' | 'down' | 'neutral';
}

export interface DashboardData {
  user: User;
  stats: Statistic[];
  contributions: ContributionDay[];
  repositories: Repository[];
  activity: Activity[];
  collaborators: Collaborator[];
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 'none' | 'low' | 'medium' | 'high';
}

export interface Repository {
  id: string;
  name: string;
  url: string;
  stars: number;
  language: string | null;
  description: string | null;
  isPrivate: boolean;
}

export interface Activity {
  id: string;
  type: 'push' | 'pr' | 'issue' | 'review';
  title: string;
  description: string;
  url: string;
  timestamp: string;
  repository: string;
}

export interface Collaborator {
  id: string;
  login: string;
  avatar_url: string;
  url: string;
  contributions: number;
}
