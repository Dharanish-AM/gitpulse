interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export default function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="bg-[#0d1624] border border-[#12314a] rounded-2xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300 text-sm">{label}</p>
          <p className="text-3xl font-bold text-cyan-300 text-glow-primary">{value}</p>
        </div>
        {icon && <div className="text-2xl text-cyan-400">{icon}</div>}
      </div>
    </div>
  );
}
