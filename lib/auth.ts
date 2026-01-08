export function getGitHubAuthorizeURL() {
  const clientId =
    process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!clientId) {
    throw new Error("Missing GitHub client id env (NEXT_PUBLIC_GITHUB_CLIENT_ID or GITHUB_CLIENT_ID)");
  }
  if (!appUrl) {
    throw new Error("Missing NEXT_PUBLIC_APP_URL env for OAuth redirect");
  }

  const redirectUri = `${appUrl.replace(/\/$/, "")}/api/auth/github`;
  const scope = encodeURIComponent("read:user repo");
  const state = Math.random().toString(36).slice(2);
  const base = "https://github.com/login/oauth/authorize";
  const url = `${base}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scope}&state=${state}`;
  return url;
}
