import { DashboardData } from "@/types/dashboard";
import Card from "@/components/ui/Card";

interface ProductivityPatternsProps {
  productivity: DashboardData["productivity"];
}

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ProductivityPatterns({ productivity }: ProductivityPatternsProps) {
  const { peakHour, peakDay, byHour, byDay } = productivity;
  const hourMax = Math.max(...byHour, 1);
  const dayMax = Math.max(...byDay, 1);

  return (
    <Card className="bg-[#0d1624] border-[#12314a] text-white">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-purple-300">⚡</span>
        <h3 className="text-lg font-semibold">Productivity Patterns</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <Tile label="Peak Hour" value={`${peakHour}p`} />
        <Tile label="Peak Day" value={peakDay} />
      </div>

      <Section label="Activity by Hour">
        <div className="flex items-end gap-1 h-16">
          {byHour.map((v, idx) => (
            <div
              key={idx}
              className="w-full bg-cyan-500/70 rounded-sm"
              style={{ height: `${(v / hourMax) * 100}%` }}
              title={`${idx}:00 - ${v} events`}
            />
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-1 flex justify-between">
          <span>6a</span><span>12p</span><span>6p</span><span>9p</span>
        </div>
      </Section>

      <Section label="Activity by Day">
        <div className="flex items-end gap-2 h-12">
          {byDay.map((v, idx) => (
            <div
              key={dayLabels[idx]}
              className="flex-1 bg-purple-400/80 rounded-sm"
              style={{ height: `${(v / dayMax) * 100}%` }}
              title={`${dayLabels[idx]} - ${v} events`}
            />
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-1 grid grid-cols-7">
          {dayLabels.map((d) => (
            <span key={d} className="text-center">{d}</span>
          ))}
        </div>
      </Section>
    </Card>
  );
}

function Tile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-[#111b2c] border border-[#1a2c45] rounded-lg p-3">
      <div className="text-gray-400 text-xs">{label}</div>
      <div className="text-2xl font-bold text-cyan-300">{value}</div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <div className="text-sm text-gray-300 mb-2">{label}</div>
      {children}
    </div>
  );
}
