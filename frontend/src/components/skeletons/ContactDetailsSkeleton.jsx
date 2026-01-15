export default function ContactDetailsSkeleton() {
  return (
    <div className="flex-1 bg-gray-50 rounded-2xl p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-1" />
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-6" />

      <div className="flex gap-6 mb-6">
        <div className="h-4 bg-gray-200 rounded w-20" />
        <div className="h-4 bg-gray-200 rounded w-20" />
        <div className="h-4 bg-gray-200 rounded w-20" />
      </div>

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-4 mb-3"
        >
          <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-2 bg-gray-200 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}
