interface HeatmapCellProps {
  value: number;
  max: number;
  date: string;
}

export default function HeatmapCell({ value, max, date }: HeatmapCellProps) {
  const intensity = (value / max) * 100;

  return (
    <div
      className="w-4 h-4 rounded border border-gray-700"
      style={{
        backgroundColor: `rgba(0, 240, 255, ${intensity / 100})`,
      }}
      title={date}
    />
  );
}
