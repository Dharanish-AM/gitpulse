interface CollaboratorCardProps {
  name: string;
  avatar: string;
  contributions: number;
  url: string;
}

export default function CollaboratorCard({
  name,
  avatar,
  contributions,
  url,
}: CollaboratorCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
    >
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{name}</p>
        <p className="text-gray-400 text-sm">{contributions} contributions</p>
      </div>
    </a>
  );
}
