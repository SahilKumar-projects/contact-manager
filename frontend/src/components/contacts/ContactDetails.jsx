import { useState } from "react";
import VoicemailRecorder from "../voicemail/VoicemailRecorder";

const TABS = ["Overview", "Notes", "Tasks", "Voicemails"];

export default function ContactDetails({
  contact,
  onEdit,
  onDelete,

  onAddNote,
  onDeleteNote,

  onAddTask,
  onToggleTask,
  onDeleteTask,

  onUploadVoicemail,
  onDeleteVoicemail,
}) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [noteInput, setNoteInput] = useState("");
  const [taskInput, setTaskInput] = useState("");

  if (!contact) {
    return (
      <div className="flex-1 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
        Select a contact to view details
      </div>
    );
  }

  const initials = contact.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex-1 bg-gray-50 rounded-2xl p-6 flex flex-col overflow-hidden">
      {/* ---------- HEADER ---------- */}
      <div className="flex justify-between items-start mb-6">
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
            className="px-3 py-1 rounded-xl bg-white border"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            className="px-3 py-1 rounded-xl bg-rose-100 text-rose-600"
          >
            Delete
          </button>
        </div>
      </div>

      {/* ---------- TABS ---------- */}
      <div className="flex gap-6 border-b mb-4">
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

      {/* ---------- CONTENT ---------- */}
      <div className="flex-1 overflow-y-auto text-sm pr-1">
        {/* OVERVIEW */}
        {activeTab === "Overview" && (
          <div className="space-y-2">
            <Info label="Name" value={contact.name} />
            <Info label="Email" value={contact.email} />
            <Info label="Phone" value={contact.phone} />
          </div>
        )}

        {/* NOTES */}
        {activeTab === "Notes" && (
          <>
            <div className="flex gap-2 mb-4">
              <input
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Add a note"
                className="flex-1 px-3 py-2 border rounded-xl"
              />
              <button
                onClick={() => {
                  if (!noteInput.trim()) return;
                  onAddNote(contact.id, {text: noteInput});
                  setNoteInput("");
                }}
                className="px-3 py-2 bg-rose-500 text-white rounded-xl"
              >
                Add
              </button>
            </div>

            {contact.notes?.length ? (
              contact.notes.map((note, index) => (
                <TimelineItem
                  key={note._id || index}
                  text={note.text}
                  date={note.createdAt}
                  onDelete={() =>
                    onDeleteNote(contact.id, index)
                  }
                />
              ))
            ) : (
              <Empty text="No notes yet" />
            )}
          </>
        )}
{/* TASKS */}
{activeTab === "Tasks" && (
  <>
    <div className="flex gap-2 mb-4">
      <input
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a task"
        className="flex-1 px-3 py-2 border rounded-xl"
      />
      <button
        onClick={() => {
          if (!taskInput.trim()) return;
          onAddTask(contact.id, { text: taskInput });
          setTaskInput("");
        }}
        className="px-3 py-2 bg-rose-500 text-white rounded-xl"
      >
        Add
      </button>
    </div>

    {contact.tasks?.length ? (
      contact.tasks.map((task) => (
        <div
          key={task._id}
          className="flex items-start gap-3 bg-white rounded-xl px-4 py-2 mb-2"
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() =>
              onToggleTask(contact.id, task._id)
            }
          />

          <div className="flex-1">
            <div
              className={`text-sm ${
                task.completed
                  ? "line-through text-gray-400"
                  : ""
              }`}
            >
              {task.text}
            </div>
            <div className="text-xs text-gray-400">
              {new Date(task.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      ))
    ) : (
      <Empty text="No tasks yet" />
    )}
  </>
)}


       {/* VOICEMAILS */}
{activeTab === "Voicemails" && (
  <>
    <VoicemailRecorder
      contactId={contact.id}
      onUploadVoicemail={onUploadVoicemail}
    />

    {contact.voicemails?.length ? (
      contact.voicemails.map((vm) => (
        <div
          key={vm._id}
          className="bg-white rounded-xl p-3 mb-3 flex justify-between items-center"
        >
          <div className="flex-1">
            <audio controls src={vm.url} />
            <div className="text-xs text-gray-400 mt-1">
              {new Date(vm.createdAt).toLocaleString()}
            </div>
          </div>

          <button
            onClick={() =>
              onDeleteVoicemail(contact.id, vm._id)
            }
            className="text-rose-500 text-sm ml-4"
          >
            Delete
          </button>
        </div>
      ))
    ) : (
      <Empty text="No voicemails yet" />
    )}
  </>
)}

      </div>
    </div>
  );
}

/* ---------- HELPERS ---------- */

function Info({ label, value }) {
  return (
    <div className="flex justify-between bg-white rounded-xl px-4 py-2">
      <span className="text-gray-500">{label}</span>
      <span>{value || "-"}</span>
    </div>
  );
}

function TimelineItem({ text, date, onDelete }) {
  return (
    <div className="flex justify-between bg-white rounded-xl px-4 py-2 mb-2">
      <div>
        <div className="text-sm">{text}</div>
        {date && (
          <div className="text-xs text-gray-400">
            {new Date(date).toLocaleString()}
          </div>
        )}
      </div>
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
