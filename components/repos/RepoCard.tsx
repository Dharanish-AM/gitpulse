import { DashboardData } from "@/types/dashboard";

interface RepoCardProps {
  repo: DashboardData["topRepos"][number];
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <div className="flex items-center justify-between bg-[#0f1829] border border-[#1a2c45] rounded-2xl p-4 hover:border-cyan-500 transition-colors">
      <div className="flex items-center gap-3">
        <span className="text-cyan-300">&lt;/&gt;</span>
        <div>
          <div className="text-white font-semibold">{repo.name}</div>
          <div className="text-sm text-gray-400 flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1"><span className="text-yellow-300">★</span>{repo.stars}</span>
            <span className="flex items-center gap-1"><span className="text-cyan-300">↺</span>{repo.contributions}</span>
            <span className="text-xs text-gray-500">{repo.language}</span>
          </div>
        </div>
      </div>
      <span className="w-2 h-2 rounded-full bg-cyan-300" />
    </div>
  );
}
