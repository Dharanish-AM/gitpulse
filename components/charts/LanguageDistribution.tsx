import { DashboardData } from "@/types/dashboard";
import Card from "@/components/ui/Card";

interface LanguageDistributionProps {
  languages: DashboardData["languages"];
}

export default function LanguageDistribution({ languages }: LanguageDistributionProps) {
  const total = languages.reduce((s, l) => s + l.percent, 0) || 1;
  let cumulative = 0;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const palette = ["#23e5ff", "#9b5cff", "#ff4f79", "#3de282", "#7c7f87"];

  return (
    <Card className="bg-[#0d1624] border-[#12314a] text-white">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-cyan-400">&lt;/&gt;</span>
        <h3 className="text-lg font-semibold">Language Distribution</h3>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 120 120" className="transform -rotate-90">
            {languages.map((lang, idx) => {
              const portion = (lang.percent / total) * circumference;
              const dashArray = `${portion} ${circumference}`;
              const dashOffset = circumference - cumulative;
              cumulative += portion;
              return (
                <circle
                  key={lang.name}
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="transparent"
                  stroke={palette[idx % palette.length]}
                  strokeWidth="14"
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
            {total}%
          </div>
        </div>
        <div className="space-y-2 text-sm">
          {languages.map((lang, idx) => (
            <div key={lang.name} className="flex items-center gap-2 text-gray-200">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: palette[idx % palette.length] }}
              />
              <span className="w-20">{lang.name}</span>
              <span className="text-gray-400">{lang.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
