import { DashboardData } from "@/types/dashboard";
import HeatmapCell from "./HeatmapCell";

interface ContributionHeatmapProps {
  heatmap: DashboardData["heatmap"];
}

export default function ContributionHeatmap({ heatmap }: ContributionHeatmapProps) {
  const max = heatmap.reduce((m, d) => Math.max(m, d.count), 0) || 1;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Contribution Heatmap</h2>
        <span className="text-sm text-gray-400">Last year</span>
      </div>
      <div className="grid grid-cols-14 gap-1">
        {heatmap.map((day) => (
          <HeatmapCell key={day.date} value={day.count} max={max} date={day.date} />
        ))}
      </div>
    </div>
  );
}
