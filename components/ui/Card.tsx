interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`surface-card p-4 ${className}`}>
      {children}
    </div>
  );
}
