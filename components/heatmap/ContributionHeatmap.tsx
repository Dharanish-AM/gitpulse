import { DashboardData } from "@/types/dashboard";
import HeatmapCell from "./HeatmapCell";
import Card from "@/components/ui/Card";

interface ContributionHeatmapProps {
  heatmap: DashboardData["heatmap"];
}

// Arrange days into weeks to mimic GitHub calendar (columns = weeks, rows = days).
function toCalendar(heatmap: ContributionHeatmapProps["heatmap"]) {
  const byDate = new Map<string, number>();
  heatmap.forEach((d) => byDate.set(d.date, d.count));
  const dates = heatmap.map((d) => new Date(d.date));
  const min = new Date(Math.min(...dates.map((d) => d.getTime())));
  const max = new Date(Math.max(...dates.map((d) => d.getTime())));
  const start = new Date(min);
  start.setDate(start.getDate() - start.getDay()); // back to Sunday
  const weeks: { date: string; count: number }[][] = [];
  let cursor = start;
  while (cursor <= max) {
    const week: { date: string; count: number }[] = [];
    for (let i = 0; i < 7; i++) {
      const iso = cursor.toISOString().slice(0, 10);
      week.push({ date: iso, count: byDate.get(iso) || 0 });
      cursor = new Date(cursor.getTime() + 24 * 60 * 60 * 1000);
    }
    weeks.push(week);
  }
  return weeks;
}

export default function ContributionHeatmap({ heatmap }: ContributionHeatmapProps) {
  const weeks = toCalendar(heatmap);
  const max = heatmap.reduce((m, d) => Math.max(m, d.count), 0) || 1;
  const total = heatmap.reduce((s, d) => s + d.count, 0);

  return (
    <Card className="bg-[#0c1322] border-[#12314a] text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Contribution Activity</h2>
          <p className="text-sm text-gray-400">
            {total.toLocaleString()} contributions in the last year
          </p>
        </div>
        <Legend />
      </div>

      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, idx) => (
          <div key={idx} className="grid grid-rows-7 gap-1">
            {week.map((day) => (
              <HeatmapCell key={day.date} value={day.count} max={max} date={day.date} />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
        <div className="grid grid-cols-12 w-full">
          {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
            <span key={m} className="text-center">{m}</span>
          ))}
        </div>
      </div>
    </Card>
  );
}

function Legend() {
  const stops = [0, 1, 2, 3, 4];
  return (
    <div className="flex items-center gap-2 text-xs text-gray-400">
      <span>Less</span>
      {stops.map((i) => (
        <span
          key={i}
          className={`w-4 h-4 rounded-sm bg-heat-${i}`}
        />
      ))}
      <span>More</span>
    </div>
  );
}
