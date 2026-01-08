interface HeatmapTooltipProps {
  date: string;
  value: number;
  x: number;
  y: number;
}

export default function HeatmapTooltip({
  date,
  value,
  x,
  y,
}: HeatmapTooltipProps) {
  return (
    <div
      className="absolute bg-gray-800 text-white px-2 py-1 rounded text-sm border border-gray-700 pointer-events-none"
      style={{ left: x, top: y }}
    >
      <p>{date}</p>
      <p className="text-cyan-400">{value} contributions</p>
    </div>
  );
}
