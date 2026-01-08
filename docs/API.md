# GitPulse - API Documentation

## Authentication Endpoints

### `POST /api/auth/github`
GitHub OAuth callback handler
- Exchanges authorization code for access token
- Creates user session

## Dashboard Endpoints

### `GET /api/dashboard`
Main dashboard data aggregator
- **Authentication**: Required
- **Response**: Aggregated dashboard data
  ```json
  {
    "user": { /* User object */ },
    "stats": [ /* Statistics array */ ],
    "contributions": [ /* Contribution data */ ],
    "repositories": [ /* Repository array */ ],
    "activity": [ /* Activity timeline */ ],
    "collaborators": [ /* Collaborator array */ ]
  }
  ```

## Query Parameters

### `/api/dashboard`
- `from` - Start date (ISO 8601)
- `to` - End date (ISO 8601)
- `repos` - Comma-separated repository names
- `types` - Comma-separated activity types

## Rate Limiting
- GitHub API rate limit: 5,000 requests/hour (authenticated)
- Dashboard caches requests to minimize API calls
- Rate limit status returned in response headers

## Error Handling
- 401 Unauthorized - Invalid or missing token
- 403 Forbidden - Rate limit exceeded
- 404 Not Found - User or data not found
- 500 Internal Server Error - Server error

## Data Shapes

### User
```typescript
{
  id: string
  login: string
  name: string
  avatar_url: string
  bio: string
  public_repos: number
  followers: number
  following: number
}
```

### Statistic
```typescript
{
  label: string
  value: number
  change: number
  trend: 'up' | 'down' | 'neutral'
}
```

### Activity
```typescript
{
  id: string
  type: 'push' | 'pr' | 'issue' | 'review'
  title: string
  description: string
  url: string
  timestamp: string
  repository: string
}
```
