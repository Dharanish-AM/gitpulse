# GitPulse - Architecture

## Directory Structure

### `/app`
Next.js App Router configuration
- `layout.tsx` - Root layout with providers
- `page.tsx` - Main dashboard page
- `loading.tsx` - Skeleton loading states
- `/api` - Backend route handlers

### `/components`
Reusable React components organized by feature:
- `header/` - Navigation and user info
- `stats/` - Statistics cards and bars
- `heatmap/` - Contribution heatmap visualization
- `patterns/` - Productivity pattern analysis
- `charts/` - Various chart components
- `repos/` - Repository display
- `activity/` - Activity feed
- `collaborators/` - Collaborator cards
- `filters/` - Filter controls
- `ui/` - Base UI components

### `/hooks`
Custom React hooks:
- `useDashboardData` - Fetch and manage dashboard data
- `useFilters` - Filter state management
- `useRateLimit` - Track GitHub API rate limits

### `/lib`
Utility functions and services:
- `octokit.ts` - GitHub API client factory
- `github.*.ts` - GraphQL queries and REST helpers
- `analytics/` - Data analysis utilities
- `formatters.ts` - Data formatting functions
- `constants.ts` - Application constants

### `/types`
TypeScript type definitions:
- `dashboard.ts` - Core dashboard types
- `github.ts` - GitHub API shapes
- `filters.ts` - Filter types

### `/styles`
Theme and design tokens

### `/docs`
Documentation files

## Data Flow

1. User authenticates via GitHub OAuth
2. Frontend loads user data from API
3. Components fetch data via `useDashboardData` hook
4. Data is processed and displayed
5. User can apply filters to refine view
6. Analytics utilities calculate metrics

## Authentication
- GitHub OAuth 2.0
- Token stored in httpOnly cookie
- API routes validate token before processing

## Performance Considerations
- Static generation for public pages
- Incremental static regeneration (ISR)
- GraphQL for optimized data fetching
- Rate limiting awareness
