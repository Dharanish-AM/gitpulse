import StatCard from "./StatCard";
import MomentumBadge from "./MomentumBadge";
import { DashboardData } from "@/types/dashboard";
import { GitCommit, GitPullRequest, CircleDot, Eye } from "lucide-react";

interface StatsBarProps {
  totals: DashboardData["totals"];
  momentum: DashboardData["momentum"];
}

export default function StatsBar({ totals, momentum }: StatsBarProps) {
  const stats = [
    {
      label: "Commits",
      value: totals.commits,
      icon: <GitCommit className="text-cyan-400" size={24} />,
    },
    {
      label: "PRs",
      value: totals.prs,
      icon: <GitPullRequest className="text-purple-400" size={24} />,
    },
    {
      label: "Issues",
      value: totals.issues,
      icon: <CircleDot className="text-pink-400" size={24} />,
    },
    {
      label: "Reviews",
      value: totals.reviews,
      icon: <Eye className="text-emerald-400" size={24} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {stats.map((s) => (
        <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
      ))}
      <div className="flex items-stretch">
        <MomentumBadge momentum={momentum} />
      </div>
    </div>
  );
}
