export default function ContactListSkeleton() {
  return (
    <div className="w-80 bg-gray-50 rounded-2xl p-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-24 mb-4" />

      <div className="h-10 bg-gray-200 rounded-xl mb-4" />

      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3 mb-3"
        >
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-3/4 mb-1" />
            <div className="h-2 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
