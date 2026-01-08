import Card from "@/components/ui/Card";
import { DashboardData } from "@/types/dashboard";

interface TopCollaboratorsProps {
  collaborators?: DashboardData["collaborators"];
}

export default function TopCollaborators({ collaborators }: TopCollaboratorsProps) {
  const list = collaborators ?? [];
  const total = list.length;
  return (
    <Card className="bg-[#0c1322] border-[#12314a] text-white h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Top Collaborators</h3>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="px-2 py-1 rounded-full border border-[#1a2c45] bg-[#0b1424]">All orgs</span>
          <span className="px-2 py-1 rounded-full border border-[#1a2c45] bg-[#0b1424]">All repos</span>
          <span className="px-2 py-1 rounded-full border border-[#1a2c45] bg-[#0b1424]">All types</span>
        </div>
      </div>
      {list.length === 0 ? (
        <p className="text-sm text-gray-400">No collaborator data available.</p>
      ) : (
        <>
          <div className="space-y-3">
            {list.map((c, idx) => (
              <a
                key={c.login}
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${idx === 1 ? "border-cyan-500/70 bg-[#0f1829] shadow-[0_0_0_1px_rgba(34,211,238,0.4)]" : "border-[#1a2c45] bg-[#0f1829] hover:border-cyan-500/60"}`}
              >
                <img
                  src={c.avatar_url}
                  alt={c.login}
                  className="w-9 h-9 rounded-full border border-cyan-500"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">@{c.login}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {c.contributions} PRs · {c.contributions} reviews
                  </p>
                </div>
                <span className="text-cyan-300 text-xs">↗</span>
              </a>
            ))}
          </div>
          <div className="mt-4 text-center text-xs text-gray-400">
            Collaborated with <span className="text-cyan-300 font-mono">{Math.max(total, list.length || 0) || 0}</span> developers this year
          </div>
        </>
      )}
    </Card>
  );
}
