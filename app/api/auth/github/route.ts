import { NextResponse } from "next/server";
import axios from "axios";
import { log } from "@/lib/logger";

interface TokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code) {
    log("warn", "OAuth callback missing code");
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  try {
    log("info", "Exchanging GitHub OAuth code", { state: state || "none" });
    const { data } = await axios.post<TokenResponse>(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code,
        state,
      },
      { headers: { Accept: "application/json" } }
    );

    const res = NextResponse.redirect(
      process.env.NEXT_PUBLIC_APP_URL || "/"
    );
    // Set secure, httpOnly cookie with the token
    res.cookies.set("gh_token", data.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    log("info", "OAuth exchange success; redirecting to app");
    return res;
  } catch (error) {
    log("error", "OAuth token exchange failed", { error: error instanceof Error ? error.message : "unknown" });
    return NextResponse.json(
      { error: "OAuth token exchange failed" },
      { status: 500 }
    );
  }
}
