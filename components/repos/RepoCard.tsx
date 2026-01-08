interface RepoCardProps {
  name: string;
  url: string;
  stars: number;
  language?: string;
}

export default function RepoCard({
  name,
  url,
  stars,
  language,
}: RepoCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-4 transition-colors"
    >
      <h3 className="text-white font-semibold truncate">{name}</h3>
      <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
        {language && <span>{language}</span>}
        <span>⭐ {stars}</span>
      </div>
    </a>
  );
}
