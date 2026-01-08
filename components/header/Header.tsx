import UserIdentity from "./UserIdentity";
import LiveStatus from "./LiveStatus";
import { DashboardData } from "@/types/dashboard";

interface HeaderProps {
  user: DashboardData["user"];
  rateLimit: DashboardData["rateLimit"];
  momentum: DashboardData["momentum"];
}

export default function Header({ user, rateLimit, momentum }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 px-6 py-4 backdrop-blur border-b border-[#12314a] bg-[#050b16]/80">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 neon-border-active">
            <span className="text-primary text-xl">⚡</span>
          </div>
          <div>
            <p className="text-lg font-semibold text-white leading-tight">GitPulse</p>
            <p className="text-xs text-gray-400">Activity Visualizer</p>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <LiveStatus rateLimit={rateLimit} momentum={momentum} />
        </div>

        <div className="flex items-center">
          <UserIdentity user={user} />
        </div>
      </div>
    </header>
  );
}
