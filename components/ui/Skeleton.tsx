interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`bg-gray-800 animate-pulse rounded ${className}`} />
  );
}
