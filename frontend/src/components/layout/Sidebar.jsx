export default function Sidebar({ active, onChange }) {
  return (
    <aside className="w-60 bg-gray-50 rounded-2xl p-6 flex flex-col">
      {/* BRAND */}
      <h1 className="text-xl font-bold text-rose-500 mb-10">
        Pulse<span className="text-gray-900">CRM</span>
      </h1>

      {/* NAVIGATION */}
      <nav className="flex-1">
        <button
          onClick={() => onChange("contacts")}
          className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition
            ${
              active === "contacts"
                ? "bg-rose-100 text-rose-600"
                : "hover:bg-white"
            }`}
        >
          Contacts
        </button>
      </nav>

      {/* LOGOUT */}
      <button
        className="text-sm text-rose-500 mt-8"
        onClick={() => alert("Logout will be connected later")}
      >
        Logout
      </button>
    </aside>
  );
}
