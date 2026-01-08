interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "neon" | "glass";
  glow?: boolean;
}

export default function Card({
  children,
  className = "",
  variant = "default",
  glow = false,
}: CardProps) {
  const baseStyles = "rounded-xl transition-all duration-300";

  const variants = {
    default: "bg-[#0d1624] border border-[#1e3a5f] text-white", // Static deep blue border
    neon: "bg-[#0d1624] border border-cyan-500 text-white", // Static neon, no shadow
    glass: "glass border-white/10 text-white backdrop-blur-md",
  };

  // User requested NO hover movement/shadow.
  // "glow" prop will now just add a static subtle glow if true, not on hover.
  const glowStyles = glow ? "border-cyan-500/30" : "";

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${glowStyles} p-4 ${className}`}
    >
      {children}
    </div>
  );
}
