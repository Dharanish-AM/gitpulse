interface HeatmapCellProps {
  value: number;
  max: number;
  date: string;
}

export default function HeatmapCell({ value, max, date }: HeatmapCellProps) {
  const ratio = max === 0 ? 0 : value / max;
  const level = value === 0 ? 0 : Math.min(4, Math.ceil(ratio * 4));

  return (
    <div
      className={`w-4 h-4 rounded-sm border border-gray-700 bg-heat-${level}`}
      title={date}
    />
  );
}
