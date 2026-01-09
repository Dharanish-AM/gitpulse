import Card from "@/components/ui/Card";
import { DashboardData } from "@/types/dashboard";
import { Clock, GitCommit, GitPullRequest, CircleDot, Eye } from "lucide-react";

interface RecentActivityProps {
  activity: DashboardData["recentActivity"];
}

function timeAgo(input: string) {
  const date = new Date(input);
  const diff = Date.now() - date.getTime();
  const minutes = Math.max(Math.floor(diff / 60000), 0);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const typeConfig: Record<string, { label: string; color: string; icon: any }> =
  {
    commit: { label: "Commit", color: "text-cyan-300", icon: GitCommit },
    pr: { label: "PR", color: "text-purple-300", icon: GitPullRequest },
    issue: { label: "Issue", color: "text-pink-300", icon: CircleDot },
    review: { label: "Review", color: "text-emerald-300", icon: Eye },
  };

export default function RecentActivity({ activity }: RecentActivityProps) {
  return (
    <Card className="bg-[#0d1624] border-[#12314a] text-white h-full">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-cyan-400" size={20} />
        <h3 className="text-lg font-semibold">Recent Activity</h3>
      </div>
      {activity.length === 0 ? (
        <p className="text-sm text-gray-400">
          No recent activity captured yet.
        </p>
      ) : (
        <div className="space-y-3">
          {activity.map((item, idx) => {
            const config = typeConfig[item.type] || typeConfig.commit;
            const Icon = config.icon;
            return (
              <div
                key={`${item.repo}-${idx}-${item.timeAgo}`}
                className="flex items-start gap-3 rounded-xl bg-[#0f1829] border border-[#1a2c45] p-3 hover:border-cyan-500/50 transition-colors"
              >
                <div
                  className={`mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-[#1a2c45]/50 ${config.color}`}
                >
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <span className="font-mono text-cyan-300">{item.repo}</span>
                    <span>•</span>
                    <span>{timeAgo(item.timeAgo)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
