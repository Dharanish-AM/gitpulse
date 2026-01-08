import { DashboardData } from "@/types/dashboard";
import Card from "@/components/ui/Card";

interface StreakMomentumProps {
  streaks: DashboardData["streaks"];
  momentum: DashboardData["momentum"];
  totals: DashboardData["totals"];
}

export default function StreakMomentum({ streaks, momentum, totals }: StreakMomentumProps) {
  return (
    <Card className="bg-[#0d1624] border-[#12314a] text-white">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-pink-400">🔥</span>
        <h3 className="text-lg font-semibold">Streak &amp; Momentum</h3>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <MetricTile label="Current Streak" value={streaks.current} color="text-pink-300" />
        <MetricTile label="Longest Streak" value={streaks.longest} color="text-purple-300" />
        <MetricTile label="This Week" value={Math.max(totals.commits ?? 0, momentum.weeklyChangePercent)} color="text-cyan-300" />
      </div>
      <div className="flex items-center gap-2 mt-3 text-sm text-green-400">
        <span>↗</span>
        <span>{momentum.weeklyChangePercent}% vs last week</span>
      </div>
    </Card>
  );
}

function MetricTile({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-[#111b2c] border border-[#1a2c45] rounded-xl p-4 text-center">
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-gray-400 text-sm mt-1">{label}</div>
    </div>
  );
}