import { DashboardData } from "@/types/dashboard";

interface UserIdentityProps {
  user: DashboardData["user"];
}

export default function UserIdentity({ user }: UserIdentityProps) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-xl border border-[#12314a] bg-[#0b1424]">
      <img
        src={user.avatarUrl}
        alt={user.login}
        className="w-10 h-10 rounded-full border border-cyan-500 shadow-md"
      />
      <div className="text-right">
        <p className="text-sm text-gray-400">{user.name || user.login}</p>
        <p className="text-cyan-300 text-xs">@{user.login}</p>
      </div>
    </div>
  );
}
