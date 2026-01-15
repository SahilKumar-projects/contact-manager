export default function SidebarSkeleton() {
  return (
    <aside className="w-60 bg-gray-50 rounded-2xl p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-24 mb-10" />

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-10 bg-gray-200 rounded-xl mb-3"
        />
      ))}

      <div className="h-4 bg-gray-200 rounded w-16 mt-auto" />
    </aside>
  );
}
