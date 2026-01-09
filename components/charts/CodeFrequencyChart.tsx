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
import { GitGraph, Plus, Minus } from "lucide-react";

interface CodeFrequencyChartProps {
  codeFrequency: DashboardData["codeFrequency"];
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-[#0f172a] border border-cyan-500/30 rounded-lg p-3 text-sm">
      <div className="font-semibold text-white mb-2">{label}</div>
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-emerald-200">
          <Plus size={12} className="text-emerald-400" />
          <span>Additions</span>
          <span className="font-mono text-emerald-300 ml-auto font-bold">
            {payload[0]?.value.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-pink-200">
          <Minus size={12} className="text-pink-400" />
          <span>Deletions</span>
          <span className="font-mono text-pink-300 ml-auto font-bold">
            {payload[1]?.value.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CodeFrequencyChart({
  codeFrequency,
}: CodeFrequencyChartProps) {
  // Use last 12 weeks normally, or all if preferred. Dashboard usually shows trend.
  // API returns potentially full history. Let's slice to last 6 months (approx 26 weeks) or similar to avoid overcrowding.
  const data = codeFrequency.slice(-20).map((item) => ({
    ...item,
    label: new Date(item.week * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  const totals = codeFrequency.reduce(
    (acc, cur) => ({
      additions: acc.additions + cur.additions,
      deletions: acc.deletions + cur.deletions,
    }),
    { additions: 0, deletions: 0 }
  );

  return (
    <Card className="bg-[#0c1322] border-[#12314a] text-white h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GitGraph className="text-emerald-400" size={20} />
          <h3 className="text-lg font-semibold">Code Frequency</h3>
        </div>
        <div className="text-xs text-gray-400">Last 20 weeks</div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 rounded-xl border border-[#1a2c45] bg-[#0f1b2f] px-4 py-3">
          <div className="flex items-center gap-2 text-emerald-400 text-xs mb-1">
            <Plus size={14} /> Additions
          </div>
          <div className="text-xl font-bold text-emerald-300">
            {totals.additions.toLocaleString()}
          </div>
        </div>
        <div className="flex-1 rounded-xl border border-[#1a2c45] bg-[#0f1b2f] px-4 py-3">
          <div className="flex items-center gap-2 text-pink-400 text-xs mb-1">
            <Minus size={14} /> Deletions
          </div>
          <div className="text-xl font-bold text-pink-300">
            {totals.deletions.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="cf_add" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="cf_del" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#7b8aa5", fontSize: 10 }}
              interval="preserveStartEnd"
              minTickGap={30}
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
              stackId="1"
              animationDuration={1000}
            />
            <Area
              type="monotone"
              dataKey="deletions"
              stroke="#ec4899"
              strokeWidth={2}
              fill="url(#cf_del)"
              stackId="2" // Separate stacks so they overlay or stack depending on preference. Usually separating them allows seeing both volumes clearly.
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
