import { cookies } from "next/headers";
import Link from "next/link";
import { getGitHubAuthorizeURL } from "@/lib/auth";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  const token = (await cookies()).get("gh_token")?.value;
  const isAuthed = Boolean(token);

  if (isAuthed) {
    return <DashboardClient />;
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0A0F1C] text-white flex flex-col items-center justify-center selection:bg-cyan-500/30">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.1),transparent_70%)]" />
        <div
          className="absolute inset-0 bg-grid-pattern opacity-20 animate-grid"
          style={{
            perspective: "1000px",
            transform: "rotateX(60deg) scale(2)",
          }}
        />
      </div>

      {/* Floating Elements (Decorations) */}
      <div className="absolute top-1/4 left-10 md:left-1/4 animate-float z-10 hidden md:block">
        <div className="glass px-4 py-2 rounded-lg border border-cyan-500/30 text-cyan-400 text-xs font-mono glow-secondary">
          <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block mr-2 animate-pulse" />
          Analyzing 10k+ Commits
        </div>
      </div>

      <div className="absolute bottom-1/4 right-10 md:right-1/4 animate-float-delayed z-10 hidden md:block">
        <div className="glass px-4 py-2 rounded-lg border border-purple-500/30 text-purple-400 text-xs font-mono glow-secondary">
          <span className="w-2 h-2 rounded-full bg-purple-400 inline-block mr-2 animate-pulse" />
          500+ Developers Active
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center text-center p-6 max-w-4xl mx-auto">
        {/* Hero Title */}
        <div className="mb-2 inline-flex items-center justify-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-3 py-1 text-xs font-medium text-cyan-300 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span>v1.0 Now Live</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
          GitPulse
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl font-light">
          The <span className="text-cyan-400 font-medium">Pulse</span> of your
          Codebase.
          <br />
          Visualize, Analyze, and Optimize your development workflow.
        </p>

        {/* Central Heartbeat Visualization */}
        <div className="relative mb-16 group">
          <div className="absolute inset-0 bg-cyan-500/20 blur-[50px] rounded-full group-hover:bg-cyan-500/30 transition-all duration-700" />
          <div className="relative w-32 h-32 md:w-48 md:h-48">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-cyan-400 drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] animate-pulse-glow"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.5"
                className="opacity-90"
              />
              {/* Circuit lines overlay */}
              <path
                d="M7 8h2v2H7zM15 10h2v2h-2zM12 15h.01"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 8h3m10 0h3M12 5v3m0 10v3"
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>

        {/* Call to Action */}
        <Link
          href={getGitHubAuthorizeURL()}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-black/50 overflow-hidden rounded-xl border border-cyan-500/50 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
        >
          <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors duration-300" />

          <svg className="w-6 h-6 fill-white z-10" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>

          <span className="text-lg font-medium text-white z-10 tracking-wide font-sans">
            Sign in with GitHub
          </span>

          <div className="absolute right-0 top-0 h-full w-[20px] bg-gradient-to-r from-transparent to-white/10 skew-x-[-20deg] translate-x-[-100px] group-hover:animate-[shimmer_1s_infinite]" />
        </Link>

        {/* Disclaimer / Footer */}
        <p className="mt-8 text-sm text-slate-500 font-mono">
          Secure Access • Read-only Permissions • Open Source
        </p>
      </div>

      {/* Decorative Corner Gradients */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A0F1C] to-transparent pointer-events-none" />
    </main>
  );
}
