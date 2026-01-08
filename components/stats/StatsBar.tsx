import StatCard from "./StatCard";
import MomentumBadge from "./MomentumBadge";
import { DashboardData } from "@/types/dashboard";

interface StatsBarProps {
  totals: DashboardData["totals"];
  momentum: DashboardData["momentum"];
}

export default function StatsBar({ totals, momentum }: StatsBarProps) {
  const stats = [
    { label: "Commits", value: totals.commits },
    { label: "PRs", value: totals.prs },
    { label: "Issues", value: totals.issues },
    { label: "Reviews", value: totals.reviews },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {stats.map((s) => (
        <StatCard key={s.label} label={s.label} value={s.value} />
      ))}
      <div className="flex items-stretch">
        <MomentumBadge momentum={momentum} />
      </div>
    </div>
  );
}
