const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/contacts`;

const contactService = {
  async getAll() {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch contacts");
    return res.json();
  },

  async create(contact) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    if (!res.ok) throw new Error("Failed to create contact");
    return res.json();
  },

  async update(contact) {
    const res = await fetch(`${BASE_URL}/${contact.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    if (!res.ok) throw new Error("Failed to update contact");
    return res.json();
  },

  async remove(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete contact");
    return true;
  },

  async toggleFavorite(id) {
    const res = await fetch(`${BASE_URL}/${id}/favorite`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Failed to toggle favorite");
    return res.json();
  },

  /* ---------- NOTES ---------- */
  async addNote(id, note) {
    const res = await fetch(`${BASE_URL}/${id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    if (!res.ok) throw new Error("Failed to add note");
    return res.json();
  },

  async deleteNote(id, index) {
    const res = await fetch(`${BASE_URL}/${id}/notes/${index}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete note");
    return res.json();
  },

  /* ---------- TASKS ---------- */
  async addTask(id, task) {
    const res = await fetch(`${BASE_URL}/${id}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Failed to add task");
    return res.json();
  },

  async toggleTask(id, index) {
    const res = await fetch(`${BASE_URL}/${id}/tasks/${index}`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Failed to toggle task");
    return res.json();
  },

  async deleteTask(id, index) {
    const res = await fetch(`${BASE_URL}/${id}/tasks/${index}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete task");
    return res.json();
  },

  /* ---------- VOICEMAIL ---------- */
  async uploadVoicemail(id, blob, duration) {
    const fd = new FormData();
    fd.append("audio", blob);
    fd.append("duration", duration);

    const res = await fetch(`${BASE_URL}/${id}/voicemails`, {
      method: "POST",
      body: fd,
    });

    if (!res.ok) throw new Error("Failed to upload voicemail");
    return res.json();
  },

  async deleteVoicemail(id, voicemailId) {
    const res = await fetch(
      `${BASE_URL}/${id}/voicemails/${voicemailId}`,
      { method: "DELETE" }
    );

    if (!res.ok) throw new Error("Failed to delete voicemail");
    return res.json();
  },
};

export default contactService;
