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
    <div className="flex items-center gap-4 px-4 py-2 rounded-full border border-[#12314a] bg-[#0b1424] text-sm shadow-lg">
      <div className="flex items-center gap-2 text-cyan-300">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
        </span>
        <span>Live</span>
      </div>
      <div className="text-gray-300">Rate limit: {usage}</div>
      <div className={stateColor}>Momentum: {momentum.state}</div>
    </div>
  );
}
