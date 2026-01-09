interface HeatmapCellProps {
  value: number;
  max: number;
  date: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function HeatmapCell({
  value,
  max,
  date,
  onMouseEnter,
  onMouseLeave,
}: HeatmapCellProps) {
  const ratio = max === 0 ? 0 : value / max;
  const level = value === 0 ? 0 : Math.min(4, Math.ceil(ratio * 4));

  return (
    <div
      className={`w-3 h-3 md:w-4 md:h-4 rounded-sm border border-gray-800/50 bg-heat-${level} transition-transform hover:scale-125 hover:z-10 cursor-pointer`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}
