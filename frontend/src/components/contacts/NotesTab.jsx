import { useState } from "react";

export default function NotesTab({
  notes = [],
  onAddNote,
  onDeleteNote,
  contactId,
}) {
  const [input, setInput] = useState("");

  return (
    <div className="max-w-xl">
      {/* ADD NOTE */}
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a note"
          className="flex-1 px-3 py-2 border rounded-xl"
        />
        <button
          onClick={() => {
            if (!input.trim()) return;
            onAddNote(contactId, input);
            setInput("");
          }}
          className="px-4 py-2 bg-rose-500 text-white rounded-xl"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      {notes.length ? (
        notes.map((note, i) => (
          <Item
            key={i}
            text={note}
            onDelete={() => onDeleteNote(contactId, i)}
          />
        ))
      ) : (
        <Empty text="No notes yet" />
      )}
    </div>
  );
}

/* ---------- helpers ---------- */

function Item({ text, onDelete }) {
  return (
    <div className="flex justify-between bg-white rounded-xl px-4 py-2 mb-2">
      <span>{text}</span>
      <button
        onClick={onDelete}
        className="text-rose-500 text-sm"
      >
        Delete
      </button>
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="text-gray-400 text-center py-6">
      {text}
    </div>
  );
}
