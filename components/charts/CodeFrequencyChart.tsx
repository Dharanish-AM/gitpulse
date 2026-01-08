import Card from "@/components/ui/Card";
import { DashboardData } from "@/types/dashboard";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Plus, Minus } from "lucide-react";

interface CodeFrequencyChartProps {
  heatmap: DashboardData["heatmap"];
}

type FrequencyPoint = {
  week: string;
  additions: number;
  deletions: number;
};

function weekKey(date: Date) {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  return start.toISOString().slice(0, 10);
}

function toWeeklySeries(heatmap: DashboardData["heatmap"]): FrequencyPoint[] {
  const weekBuckets = new Map<string, number>();
  heatmap.forEach((entry) => {
    const key = weekKey(new Date(entry.date));
    weekBuckets.set(key, (weekBuckets.get(key) || 0) + entry.count);
  });

  return Array.from(weekBuckets.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([key, total]) => {
      const additions = total * 20;
      const deletions = total * 10;
      const label = new Date(key).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      return { week: label, additions, deletions } satisfies FrequencyPoint;
    });
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-[#0f172a] border border-cyan-500/30 rounded-lg p-3 text-sm">
      <div className="font-semibold text-white mb-1">{label}</div>
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-gray-200">
          <span className="w-2 h-2 rounded-sm bg-emerald-400" />
          <span>Additions</span>
          <span className="font-mono text-emerald-300">
            {payload[0].value.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-200">
          <span className="w-2 h-2 rounded-sm bg-pink-400" />
          <span>Deletions</span>
          <span className="font-mono text-pink-300">
            {payload[1].value.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CodeFrequencyChart({
  heatmap,
}: CodeFrequencyChartProps) {
  const data = toWeeklySeries(heatmap);
  const totals = data.reduce(
    (acc, cur) => {
      acc.additions += cur.additions;
      acc.deletions += cur.deletions;
      return acc;
    },
    { additions: 0, deletions: 0 }
  );

  return (
    <Card className="bg-[#0c1322] border-[#12314a] text-white h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-success">
          <span className="text-lg">⚡</span>
          <h3 className="text-lg font-semibold text-white">Code Frequency</h3>
        </div>
        <div className="text-xs text-gray-400 flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {totals.additions.toLocaleString()} additions
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-pink-400" />
            {totals.deletions.toLocaleString()} deletions
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="rounded-xl border border-[#1a2c45] bg-[#0f1b2f] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-300 text-sm">
            <Plus className="w-4 h-4" />
            Additions
          </div>
          <div className="text-xl font-bold text-emerald-300">
            {totals.additions.toLocaleString()}
          </div>
        </div>
        <div className="rounded-xl border border-[#1a2c45] bg-[#1f1224] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-pink-300 text-sm">
            <Minus className="w-4 h-4" />
            Deletions
          </div>
          <div className="text-xl font-bold text-pink-300">
            {totals.deletions.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="h-28">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="cf_add" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="cf_del" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#7b8aa5", fontSize: 11 }}
            />
            <YAxis hide />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#1f2937", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="additions"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#cf_add)"
              dot={false}
              animationDuration={700}
            />
            <Area
              type="monotone"
              dataKey="deletions"
              stroke="#ec4899"
              strokeWidth={2}
              fill="url(#cf_del)"
              dot={false}
              animationDuration={700}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
