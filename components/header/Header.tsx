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
    <header className="border-b border-gray-800 bg-black px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-400">GitPulse · Activity Visualizer</div>
        <UserIdentity user={user} />
      </div>
      <LiveStatus rateLimit={rateLimit} momentum={momentum} />
    </header>
  );
}
