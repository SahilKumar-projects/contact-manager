const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/contacts`;

export const contactService = {
  /* ---------------- GET ALL ---------------- */
  async getAll() {
    const res = await fetch(BASE_URL, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch contacts");
    return res.json();
  },

  /* ---------------- CREATE ---------------- */
  async create(contact) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(contact),
    });
    if (!res.ok) throw new Error("Failed to create contact");
    return res.json();
  },

  /* ---------------- UPDATE ---------------- */
  async update(contact) {
    const res = await fetch(`${BASE_URL}/${contact.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(contact),
    });
    if (!res.ok) throw new Error("Failed to update contact");
    return res.json();
  },

  /* ---------------- DELETE ---------------- */
  async remove(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to delete contact");
    return true;
  },

  /* ---------------- FAVORITE ---------------- */
  async toggleFavorite(id) {
    const res = await fetch(`${BASE_URL}/${id}/favorite`, {
      method: "PATCH",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to toggle favorite");
    return res.json();
  },

  /* ---------------- NOTES ---------------- */
  async addNote(id, note) {
    const res = await fetch(`${BASE_URL}/${id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(note),
    });
    if (!res.ok) throw new Error("Failed to add note");
    return res.json();
  },

  async deleteNote(id, index) {
    const res = await fetch(`${BASE_URL}/${id}/notes/${index}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to delete note");
    return true;
  },

  /* ---------------- TASKS ---------------- */
  async addTask(id, task) {
    const res = await fetch(`${BASE_URL}/${id}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Failed to add task");
    return res.json();
  },

  async toggleTask(id, index) {
    const res = await fetch(`${BASE_URL}/${id}/tasks/${index}`, {
      method: "PATCH",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to toggle task");
    return res.json();
  },

  async deleteTask(id, index) {
    const res = await fetch(`${BASE_URL}/${id}/tasks/${index}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to delete task");
    return true;
  },
};
