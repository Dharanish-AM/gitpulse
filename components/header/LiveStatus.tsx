import { DashboardData } from "@/types/dashboard";

interface LiveStatusProps {
  rateLimit: DashboardData["rateLimit"];
  momentum: DashboardData["momentum"];
}

export default function LiveStatus({ rateLimit, momentum }: LiveStatusProps) {
  const usage = `${rateLimit.remaining}/${rateLimit.limit}`;
  const stateColor =
    momentum.state === "rising"
      ? "text-green-400"
      : momentum.state === "stable"
      ? "text-gray-300"
      : "text-amber-400";

  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-gray-300">Live</span>
      </div>
      <div className="text-gray-400">Rate limit: {usage}</div>
      <div className={stateColor}>Momentum: {momentum.state}</div>
    </div>
  );
}
