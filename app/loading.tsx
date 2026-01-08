export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="animate-pulse">
        <div className="h-12 bg-gray-800 rounded mb-8 w-1/4"></div>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-800 rounded"></div>
          ))}
        </div>
        <div className="h-96 bg-gray-800 rounded"></div>
      </div>
    </div>
  );
}
