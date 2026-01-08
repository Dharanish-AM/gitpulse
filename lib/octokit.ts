import { Octokit } from '@octokit/rest';

let octokit: Octokit | null = null;

export function initOctokit(token: string) {
  octokit = new Octokit({
    auth: token,
  });
  return octokit;
}

export function getOctokit(): Octokit {
  if (!octokit) {
    throw new Error('Octokit not initialized');
  }
  return octokit;
}

export async function getUserData(username: string) {
  const octokit = getOctokit();
  const { data } = await octokit.users.getByUsername({ username });
  return data;
}
