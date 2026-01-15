import Avatar from "../common/Avatar";

export default function ContactList({
  contacts,
  selected,
  onSelect,
  onAddClick,
  search,
  onSearchChange,
  onToggleFavorite,
}) {
  return (
    <div className="w-80 bg-gray-50 rounded-2xl p-4 flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Contacts</h3>
        <button
          onClick={onAddClick}
          className="text-xs px-3 py-1 rounded-full bg-rose-500 text-white hover:bg-rose-600"
        >
          + New
        </button>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search contacts"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full mb-4 px-3 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
      />

      {/* LIST */}
      <div className="space-y-1 overflow-y-auto">
        {contacts.length === 0 && (
          <div className="text-sm text-gray-400 text-center py-4">
            No contacts found
          </div>
        )}

        {contacts.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelect(c)}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer
            ${
              selected?.id === c.id
                ? "bg-emerald-100"
                : "hover:bg-white"
            }`}
          >
            <Avatar name={c.name} />

            <div className="flex-1">
              <p className="text-sm font-medium">{c.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {c.email}
              </p>
            </div>

            {/* FAVORITE */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(c.id);
              }}
              className="text-lg"
            >
              {c.favorite ? "⭐" : "☆"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
