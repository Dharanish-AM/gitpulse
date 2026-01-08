import { DashboardData } from "@/types/dashboard";
import RepoCard from "./RepoCard";
import Card from "@/components/ui/Card";

interface TopRepositoriesProps {
  repos: DashboardData["topRepos"];
}

export default function TopRepositories({ repos }: TopRepositoriesProps) {
  return (
    <Card className="bg-[#0d1624] border-[#12314a] text-white">
      <h3 className="text-lg font-semibold mb-4">Top Repositories</h3>
      <div className="space-y-3">
        {repos.map((repo) => (
          <RepoCard key={repo.name} repo={repo} />
        ))}
      </div>
    </Card>
  );
}
