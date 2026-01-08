import { DashboardData } from "@/types/dashboard";

interface UserIdentityProps {
  user: DashboardData["user"];
}

export default function UserIdentity({ user }: UserIdentityProps) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={user.avatarUrl}
        alt={user.login}
        className="w-10 h-10 rounded-full border border-cyan-500"
      />
      <div>
        <p className="text-white font-semibold">{user.name || user.login}</p>
        <p className="text-cyan-400 text-sm">@{user.login}</p>
      </div>
    </div>
  );
}
