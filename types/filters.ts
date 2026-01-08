// Filter types for dashboard

export interface DateRange {
  from: string;
  to: string;
}

export interface Filters {
  dateRange: DateRange;
  repositories: string[];
  activityTypes: ActivityType[];
  languages: string[];
}

export type ActivityType = 'push' | 'pull_request' | 'issues' | 'comments';

export interface FilterOptions {
  dateRanges: Array<{ label: string; value: DateRange }>;
  repositories: Array<{ label: string; value: string }>;
  activityTypes: Array<{ label: string; value: ActivityType }>;
  languages: Array<{ label: string; value: string }>;
}
