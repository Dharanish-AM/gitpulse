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
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${color} bg-gray-900`}
    >
      <span className="text-sm font-semibold">Momentum</span>
      <span className="text-lg font-bold">{momentum.weeklyChangePercent}%</span>
      <span className="text-xs uppercase">{momentum.state}</span>
    </div>
  );
}
