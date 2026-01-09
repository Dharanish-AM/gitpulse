import { DashboardData } from "@/types/dashboard";
import RepoCard from "./RepoCard";
import Card from "@/components/ui/Card";
import { FolderGit2 } from "lucide-react";

interface TopRepositoriesProps {
  repos: DashboardData["topRepos"];
}

export default function TopRepositories({ repos }: TopRepositoriesProps) {
  return (
    <Card variant="default" glow={true} className="h-full">
      <div className="flex items-center gap-2 mb-4">
        <FolderGit2 className="text-blue-400" size={20} />
        <h3 className="text-lg font-semibold">Top Repositories</h3>
      </div>
      <div className="space-y-3">
        {repos.map((repo) => (
          <RepoCard key={repo.name} repo={repo} />
        ))}
      </div>
    </Card>
  );
}
