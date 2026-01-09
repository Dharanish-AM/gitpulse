import Card from "@/components/ui/Card";
import { DashboardData } from "@/types/dashboard";
import { Layers } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

interface ActivityBreakdownProps {
  heatmap: DashboardData["heatmap"];
  totals: DashboardData["totals"];
}

type ActivityPoint = {
  week: string;
  commits: number;
  prs: number;
  issues: number;
  reviews: number;
};

function formatWeekLabel(key: string) {
  const d = new Date(key);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function weekKey(date: Date) {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  return start.toISOString().slice(0, 10);
}

function toWeeklySeries(
  heatmap: DashboardData["heatmap"],
  totals: DashboardData["totals"]
): ActivityPoint[] {
  const weekBuckets = new Map<string, number>();
  heatmap.forEach((entry) => {
    const key = weekKey(new Date(entry.date));
    weekBuckets.set(key, (weekBuckets.get(key) || 0) + entry.count);
  });

  const totalSum = Math.max(
    totals.commits + totals.prs + totals.issues + totals.reviews,
    1
  );

  const shares = {
    commits: totals.commits / totalSum,
    prs: totals.prs / totalSum,
    issues: totals.issues / totalSum,
    reviews: totals.reviews / totalSum,
  };

  const sortedKeys = Array.from(weekBuckets.keys()).sort();
  return sortedKeys.map((key, idx) => {
    const total = weekBuckets.get(key) || 0;
    const commits = Math.round(total * shares.commits);
    const prs = Math.round(total * shares.prs);
    const issues = Math.round(total * shares.issues);
    const used = commits + prs + issues;
    const reviews = Math.max(total - used, 0);

    return {
      week: `${formatWeekLabel(key)}`,
      commits,
      prs,
      issues,
      reviews,
    } satisfies ActivityPoint;
  });
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-[#0f172a] border border-cyan-500/30 rounded-lg p-3 text-sm">
      <div className="font-semibold text-white mb-1">{label}</div>
      {payload.map((item: any) => (
        <div
          key={item.dataKey}
          className="flex items-center gap-2 text-xs text-gray-200"
        >
          <span
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: item.color }}
          />
          <span className="capitalize">{item.name}</span>
          <span className="font-mono text-cyan-300">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function CustomLegend({ payload }: any) {
  if (!payload) return null;
  return (
    <div className="flex flex-wrap gap-3 text-xs text-gray-300 mt-4">
      {payload.map((entry: any) => (
        <span key={entry.value} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.value}</span>
        </span>
      ))}
    </div>
  );
}

export default function ActivityBreakdown({
  heatmap,
  totals,
}: ActivityBreakdownProps) {
  const data = toWeeklySeries(heatmap, totals);

  return (
    <Card className="bg-[#0c1322] border-[#12314a] text-white h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Layers className="text-cyan-400" size={20} />
          <h3 className="text-lg font-semibold">Activity Breakdown</h3>
        </div>
        <span className="text-xs text-gray-400">Last {data.length} weeks</span>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="ab_commits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ab_prs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ab_issues" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ab_reviews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#7b8aa5", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#7b8aa5", fontSize: 11 }}
              allowDecimals={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#1f2937", strokeWidth: 1 }}
            />
            <Legend verticalAlign="bottom" content={<CustomLegend />} />
            <Area
              type="monotone"
              dataKey="commits"
              name="Commits"
              stroke="#22d3ee"
              strokeWidth={2}
              fill="url(#ab_commits)"
              dot={false}
              animationDuration={700}
            />
            <Area
              type="monotone"
              dataKey="prs"
              name="PRs"
              stroke="#a855f7"
              strokeWidth={2}
              fill="url(#ab_prs)"
              dot={false}
              animationDuration={700}
            />
            <Area
              type="monotone"
              dataKey="issues"
              name="Issues"
              stroke="#ec4899"
              strokeWidth={2}
              fill="url(#ab_issues)"
              dot={false}
              animationDuration={700}
            />
            <Area
              type="monotone"
              dataKey="reviews"
              name="Reviews"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#ab_reviews)"
              dot={false}
              animationDuration={700}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
