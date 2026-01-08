// Helper functions for GitHub REST API

import { Octokit } from '@octokit/rest';

export async function getRepositories(octokit: Octokit, username: string) {
  const { data } = await octokit.repos.listForUser({
    username,
    sort: 'updated',
    per_page: 100,
  });
  return data;
}

export async function getRepositoryStats(
  octokit: Octokit,
  owner: string,
  repo: string
) {
  const [{ data: repoData }, { data: commits }] = await Promise.all([
    octokit.repos.get({ owner, repo }),
    octokit.repos.listCommits({
      owner,
      repo,
      per_page: 1,
    }),
  ]);

  return {
    ...repoData,
    commitCount: commits.length,
  };
}

export async function getCollaborators(
  octokit: Octokit,
  owner: string,
  repo: string
) {
  const { data } = await octokit.repos.listCollaborators({
    owner,
    repo,
  });
  return data;
}
