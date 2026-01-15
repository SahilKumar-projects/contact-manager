import { useEffect, useState } from "react";

export default function ContactFormModal({
  open,
  onClose,
  onSave,
  initialData,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    favorite: false,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        favorite: initialData.favorite || false,
      });
    }
  }, [initialData]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    onSave({
      ...initialData,
      ...form,
      id: initialData?.id || Date.now().toString(),
      voicemails: initialData?.voicemails || [],
      tasks: initialData?.tasks || [],
      notes: initialData?.notes || [],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Contact" : "Add Contact"}
        </h2>

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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
