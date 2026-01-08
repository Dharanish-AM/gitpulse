import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createOctokit, createGraphQL, getRateLimit } from "@/lib/octokit";
import { DashboardData, DashboardRange } from "@/types/dashboard";
import { calculateStreak } from "@/lib/analytics/streaks";
import { calculateMomentum, getMomentumLabel } from "@/lib/analytics/momentum";
import { CONTRIBUTION_DATA_QUERY, RECENT_ACTIVITY_QUERY } from "@/lib/github.graphql";
import { log } from "@/lib/logger";

function defaultRange(): DashboardRange {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 365);
  return { from: from.toISOString(), to: to.toISOString() };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");
  const range: DashboardRange = fromParam && toParam ? { from: fromParam, to: toParam } : defaultRange();

  const cookieStore = await cookies();
  const token = cookieStore.get("gh_token")?.value;
  if (!token) {
    log("warn", "Dashboard request missing auth cookie");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const octokit = createOctokit(token);
  const gql = createGraphQL(token);

  // Fetch viewer basic info via REST for login
  const viewerRes = await octokit.request("GET /user");
  const login: string = viewerRes.data.login as string;
  log("info", "Dashboard request", { login, range });

  // GraphQL: contributions calendar and repositories
  const [contrib] = await Promise.all([
    gql(CONTRIBUTION_DATA_QUERY, {
      from: range.from,
      to: range.to,
    }) as unknown as ContributionResponse,
  ]);

  const calWeeks = contrib.viewer.contributionsCollection.contributionCalendar.weeks as Array<{ contributionDays: Array<{ contributionCount: number; date: string }> }>;
  const heatmap = calWeeks.flatMap((w) =>
    w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
  );
  log("debug", "Heatmap computed", { days: heatmap.length });

  // Streaks
  const streakInput = heatmap.map((d) => ({ date: d.date, count: d.count }));
  const { currentStreak, longestStreak } = calculateStreak(streakInput);

  // Momentum: last 7 vs previous 7 days
  const last14 = heatmap.slice(-14);
  const recent7 = last14.slice(-7).reduce((s, d) => s + d.count, 0);
  const prev7 = last14.slice(0, 7).reduce((s, d) => s + d.count, 0);
  const momentumPct = calculateMomentum(recent7, prev7);
  const momentumState = getMomentumLabel(momentumPct).toLowerCase() as DashboardData["momentum"]["state"];
  log("debug", "Momentum computed", { recent7, prev7, momentumPct, momentumState });

  // Totals via GraphQL contributionsCollection totals
  const totalsGql = await gql(
    `query Totals($from: DateTime!, $to: DateTime!) {
      viewer {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalPullRequestReviewContributions
        }
      }
    }`,
    { from: range.from, to: range.to }
  ) as unknown as TotalsResponse;

  const totalsNode = totalsGql.viewer.contributionsCollection;

  // Languages: from repositories primaryLanguage distribution
  const reposGql = await gql(
    `query Repos($login: String!) {
      user(login: $login) {
        repositories(first: 100, privacy: PUBLIC, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            name
            url
            stargazerCount
            primaryLanguage { name }
          }
        }
      }
    }`,
    { login }
  ) as unknown as ReposResponse;

  const repoNodes = reposGql.user.repositories.nodes;
  const languageCounts: Record<string, number> = {};
  for (const r of repoNodes) {
    const lang = r.primaryLanguage?.name || "Other";
    languageCounts[lang] = (languageCounts[lang] || 0) + 1;
  }
  const totalLangRepos = Object.values(languageCounts).reduce((s, v) => s + v, 0) || 1;
  const languages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, count]) => ({ name, percent: Math.round((count / totalLangRepos) * 100) }));

  // Top repositories (by stars) with naive contributions placeholder
  const topRepos = repoNodes
    .sort((a, b) => b.stargazerCount - a.stargazerCount)
    .slice(0, 5)
    .map((r) => ({
      name: r.name,
      stars: r.stargazerCount,
      language: r.primaryLanguage?.name || "Other",
      contributions: 0,
    }));
  log("debug", "Repos computed", { count: repoNodes.length });

  // Recent Activity (limited)
  const recentActivityGql = await gql(RECENT_ACTIVITY_QUERY, { first: 5 }) as unknown as RecentActivityResponse;
  const recentActivity = recentActivityGql.viewer.repositories.nodes.flatMap((n) => {
    const repoName = n.name;
    const edges = n.defaultBranchRef?.target?.history?.edges || [];
    return edges.map((e) => ({
      type: "commit",
      title: e.node.message,
      repo: repoName,
      timeAgo: new Date(e.node.committedDate).toISOString(),
    }));
  }).slice(0, 10);

  // Productivity (basic from commits timestamps)
  const byHour = new Array(24).fill(0);
  const byDay = new Array(7).fill(0); // 0=Sunday
  for (const item of recentActivity) {
    const d = new Date(item.timeAgo);
    byHour[d.getHours()]++;
    byDay[d.getDay()]++;
  }
  const peakHour = byHour.indexOf(Math.max(...byHour));
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const peakDay = days[byDay.indexOf(Math.max(...byDay))] || "Mon";

  // Collaborators from the top repo (if available)
  let collaborators: Array<{ login: string; avatar_url: string; url: string; contributions: number }> = [];
  if (repoNodes.length > 0) {
    const owner = login;
    const repo = repoNodes[0].name;
    try {
      const cols = await octokit.request("GET /repos/{owner}/{repo}/collaborators", { owner, repo });
      type CollaboratorResp = { login: string; avatar_url: string; html_url: string };
      collaborators = (cols.data as unknown as CollaboratorResp[]).map((c) => ({
        login: c.login,
        avatar_url: c.avatar_url,
        url: c.html_url,
        contributions: 0,
      }));
      log("debug", "Collaborators fetched", { repo, collaborators: collaborators.length });
    } catch {}
  }

  // Rate limits
  const rateLimitRest = await getRateLimit(octokit);
  const rateLimit = {
    remaining: rateLimitRest.remaining,
    limit: rateLimitRest.limit,
    resetAt: rateLimitRest.resetAt,
  };
  log("info", "Dashboard computed", {
    login,
    totals: totalsNode,
    heatmapDays: heatmap.length,
    topRepos: topRepos.length,
    collaborators: collaborators.length,
  });

  const data: DashboardData = {
    user: {
      login,
      name: viewerRes.data.name || login,
      avatarUrl: viewerRes.data.avatar_url,
    },
    totals: {
      commits: totalsNode.totalCommitContributions,
      prs: totalsNode.totalPullRequestContributions,
      issues: totalsNode.totalIssueContributions,
      reviews: totalsNode.totalPullRequestReviewContributions,
    },
    heatmap,
    streaks: { current: currentStreak, longest: longestStreak },
    momentum: { weeklyChangePercent: momentumPct, state: momentumState },
    languages,
    productivity: { peakHour, peakDay, byHour, byDay },
    topRepos,
    recentActivity,
    collaborators,
    rateLimit,
  };

  return NextResponse.json(data);
}

// Types for GraphQL responses
interface ContributionResponse {
  viewer: {
    contributionsCollection: {
      contributionCalendar: {
        weeks: Array<{ contributionDays: Array<{ contributionCount: number; date: string }> }>;
      };
    };
  };
}

interface TotalsResponse {
  viewer: {
    contributionsCollection: {
      totalCommitContributions: number;
      totalPullRequestContributions: number;
      totalIssueContributions: number;
      totalPullRequestReviewContributions: number;
    };
  };
}

interface ReposResponse {
  user: {
    repositories: {
      nodes: Array<{
        name: string;
        url: string;
        stargazerCount: number;
        primaryLanguage: { name: string } | null;
      }>;
    };
  };
}

interface RecentActivityResponse {
  viewer: {
    repositories: {
      nodes: Array<{
        name: string;
        defaultBranchRef?: {
          target?: {
            history?: {
              edges: Array<{
                node: {
                  message: string;
                  committedDate: string;
                };
              }>;
            };
          };
        };
      }>;
    };
  };
}