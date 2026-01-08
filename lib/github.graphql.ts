// GraphQL queries for GitHub API

export const USER_DATA_QUERY = `
  query GetUserData($login: String!) {
    user(login: $login) {
      id
      login
      name
      avatarUrl
      bio
      repositories(first: 100) {
        totalCount
        nodes {
          name
          url
          stargazerCount
          primaryLanguage {
            name
          }
        }
      }
    }
  }
`;

export const CONTRIBUTION_DATA_QUERY = `
  query GetContributionCollection($from: DateTime!, $to: DateTime!) {
    viewer {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export const RECENT_ACTIVITY_QUERY = `
  query GetRecentActivity($first: Int!) {
    viewer {
      repositories(first: $first, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          name
          updatedAt
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 5) {
                  edges {
                    node {
                      message
                      committedDate
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
