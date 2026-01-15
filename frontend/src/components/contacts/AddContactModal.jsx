import { useState } from "react";

export default function AddContactModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    favorite: false,
  });

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    onSave({
      id: Date.now().toString(),
      ...form,
      voicemails: [],
      tasks: [],
      notes: [],
    });

    onClose();
    setForm({ name: "", email: "", phone: "", favorite: false });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">Add New Contact</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Full name"
            className="w-full px-4 py-2 border rounded-xl text-sm"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-xl text-sm"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            placeholder="Phone"
            className="w-full px-4 py-2 border rounded-xl text-sm"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.favorite}
              onChange={(e) =>
                setForm({ ...form, favorite: e.target.checked })
              }
            />
            Mark as favorite
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-xl hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-xl bg-rose-500 text-white hover:bg-rose-600"
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
