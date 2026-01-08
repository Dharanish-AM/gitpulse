interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export default function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="bg-[#0d1624] border border-[#1e3a5f] rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
        {icon && (
          <div className="text-2xl text-cyan-400 opacity-50">{icon}</div>
        )}
      </div>
    </div>
  );
}
