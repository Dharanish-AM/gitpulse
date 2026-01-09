import { DashboardData } from "@/types/dashboard";
import { Star, GitCommit } from "lucide-react";

interface RepoCardProps {
  repo: DashboardData["topRepos"][number];
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <div className="flex items-center justify-between bg-[#0f1829] border border-[#1a2c45] rounded-2xl p-4 hover:border-cyan-500 transition-colors group">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-cyan-950/30 text-cyan-400 group-hover:text-cyan-300 transition-colors">
          <span className="text-lg font-mono">#</span>
        </div>
        <div>
          <div className="text-white font-semibold group-hover:text-cyan-100 transition-colors">
            {repo.name}
          </div>
          <div className="text-sm text-gray-400 flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400" />
              {repo.stars}
            </span>
            {repo.contributions > 0 && (
              <span className="flex items-center gap-1">
                <GitCommit size={14} className="text-cyan-400" />
                {repo.contributions}
              </span>
            )}
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-300">
              {repo.language}
            </span>
          </div>
        </div>
      </div>
      <span className="w-2 h-2 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)] transition-all" />
    </div>
  );
}
