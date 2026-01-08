import { cookies } from "next/headers";
import Link from "next/link";
import { getGitHubAuthorizeURL } from "@/lib/auth";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  const token = (await cookies()).get("gh_token")?.value;
  const isAuthed = Boolean(token);

  return (
    <main className="min-h-screen bg-black text-white">
      {!isAuthed ? (
        <div className="p-8">
          <Link
            href={getGitHubAuthorizeURL()}
            className="inline-flex items-center px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-500 transition-colors"
          >
            Sign in with GitHub
          </Link>
        </div>
      ) : (
        <DashboardClient />
      )}
    </main>
  );
}