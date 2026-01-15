export default function Tabs({ active, setActive }) {
  const tabs = ["Voicemails", "Tasks", "Notes"];

  return (
    <div className="flex gap-6 text-sm border-b mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`pb-2 relative ${
            active === tab ? "text-rose-500" : "text-gray-500"
          }`}
        >
          {tab}
          {active === tab && (
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-rose-500 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
