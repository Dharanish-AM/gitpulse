// GitHub OAuth callback route
// Handle GitHub OAuth authentication

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return NextResponse.json(
      { error: 'Missing authorization code' },
      { status: 400 }
    );
  }

  // TODO: Exchange code for token
  // TODO: Store user session
  // TODO: Redirect to dashboard

  return NextResponse.redirect('/');
}
