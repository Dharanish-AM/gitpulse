interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-gray-900 border border-gray-800 rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
}
