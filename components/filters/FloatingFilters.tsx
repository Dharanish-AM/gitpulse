const filters = [
  { label: "Date: 1y", icon: "📆" },
  { label: "Org: All", icon: "🏢" },
  { label: "Repo: Any", icon: "📦" },
  { label: "Type: All", icon: "🏷️" },
];

export default function FloatingFilters() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-2 z-40">
      <div className="backdrop-blur bg-[#0b1424]/80 border border-cyan-500/40 rounded-2xl px-3 py-2 shadow-lg">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm text-white bg-[#111b2c] border border-[#1a2c45] hover:border-cyan-500 transition-colors"
              type="button"
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
