import { DashboardData } from "@/types/dashboard";

interface MomentumBadgeProps {
  momentum: DashboardData["momentum"];
}

export default function MomentumBadge({ momentum }: MomentumBadgeProps) {
  const color =
    momentum.state === "rising"
      ? "border-green-500 text-green-300"
      : momentum.state === "stable"
      ? "border-gray-500 text-gray-200"
      : "border-amber-500 text-amber-300";

  return (
    <div
      className={`flex-1 flex items-center justify-between px-5 py-4 rounded-2xl border ${color} bg-[#0b1424] shadow-[0_10px_40px_rgba(0,0,0,0.35)]`}
    >
      <div>
        <span className="text-sm font-semibold block text-gray-300">Momentum</span>
        <span className="text-xs uppercase tracking-wide text-gray-400">{momentum.state}</span>
      </div>
      <span className="text-2xl font-bold">{momentum.weeklyChangePercent}%</span>
    </div>
  );
}
