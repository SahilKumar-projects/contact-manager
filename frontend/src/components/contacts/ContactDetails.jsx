import { useState } from "react";
import NotesTab from "./NotesTab";
import TasksTab from "./TasksTab";

const TABS = ["Overview", "Voicemails", "Notes", "Tasks"];

export default function ContactDetails({
  contact,
  onEdit,
  onDelete,
  onAddNote,
  onAddTask,
  onDeleteNote,
  onDeleteTask,
}) {
  const [activeTab, setActiveTab] = useState("Overview");

  if (!contact) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a contact to view details
      </div>
    );
  }

  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden">

      {/* HEADER */}
      <div className="flex justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-rose-500 text-white rounded-full flex items-center justify-center font-semibold">
            {initials}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{contact.name}</h2>
            <p className="text-sm text-gray-500">{contact.email}</p>
            <p className="text-sm text-gray-500">{contact.phone}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="px-3 py-1.5 bg-gray-100 rounded-xl text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            className="px-3 py-1.5 bg-rose-100 text-rose-600 rounded-xl text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-6 px-6 pt-4 border-b">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-rose-500 text-rose-500"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50 text-sm">

        {activeTab === "Overview" && (
          <div className="space-y-3 max-w-xl">
            <Info label="Name" value={contact.name} />
            <Info label="Email" value={contact.email} />
            <Info label="Phone" value={contact.phone} />
          </div>
        )}

        {activeTab === "Voicemails" && (
          <Empty text="Voicemail playback will be enabled later" />
        )}

        {activeTab === "Notes" && (
          <NotesTab
            notes={contact.notes}
            contactId={contact.id}
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
          />
        )}

        {activeTab === "Tasks" && (
          <TasksTab
            tasks={contact.tasks}
            contactId={contact.id}
            onAddTask={onAddTask}
            onDeleteTask={onDeleteTask}
          />
        )}
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function Info({ label, value }) {
  return (
    <div className="flex justify-between bg-white rounded-xl px-4 py-2">
      <span className="text-gray-500">{label}</span>
      <span>{value || "-"}</span>
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="text-gray-400 text-center py-8">
      {text}
    </div>
  );
}
