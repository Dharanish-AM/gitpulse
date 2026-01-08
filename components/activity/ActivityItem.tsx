interface ActivityItemProps {
  title: string;
  description: string;
  timestamp: string;
  type: 'push' | 'pr' | 'issue' | 'review';
}

export default function ActivityItem({
  title,
  description,
  timestamp,
  type,
}: ActivityItemProps) {
  return (
    <div className="border-l-2 border-cyan-500 pl-4 py-2">
      <p className="text-white font-medium">{title}</p>
      <p className="text-gray-400 text-sm">{description}</p>
      <p className="text-gray-500 text-xs mt-1">{timestamp}</p>
    </div>
  );
}
