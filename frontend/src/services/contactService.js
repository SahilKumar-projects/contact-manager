const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/contacts`;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export default {
  /* ---------------- CONTACTS ---------------- */
  async getAll() {
    const res = await fetch(BASE_URL, {
      headers: authHeader(),
    });
    return res.json();
  },

  async create(data) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async update(contact) {
    const res = await fetch(`${BASE_URL}/${contact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify(contact),
    });
    return res.json();
  },

  async remove(id) {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: authHeader(),
    });
  },

  async toggleFavorite(id) {
    const res = await fetch(`${BASE_URL}/${id}/favorite`, {
      method: "PATCH",
      headers: authHeader(),
    });
    return res.json();
  },

  /* ---------------- NOTES ---------------- */
  async addNote(contactId, data) {
    const res = await fetch(
      `${BASE_URL}/${contactId}/notes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify(data),
      }
    );
    return res.json();
  },

  async deleteNote(contactId, noteId) {
    const res = await fetch(
      `${BASE_URL}/${contactId}/notes/${noteId}`,
      {
        method: "DELETE",
        headers: authHeader(),
      }
    );
    return res.json();
  },

  /* ---------------- TASKS ---------------- */
  async addTask(contactId, data) {
    const res = await fetch(
      `${BASE_URL}/${contactId}/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify(data),
      }
    );
    return res.json();
  },

  async toggleTask(contactId, taskId) {
    const res = await fetch(
      `${BASE_URL}/${contactId}/tasks/${taskId}`,
      {
        method: "PATCH",
        headers: authHeader(),
      }
    );
    return res.json();
  },

  /* ---------------- VOICEMAILS ---------------- */
  async uploadVoicemail(contactId, file, duration) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("duration", duration);

    const res = await fetch(
      `${BASE_URL}/${contactId}/voicemails`,
      {
        method: "POST",
        headers: authHeader(),
        body: formData,
      }
    );
    return res.json();
  },

  async deleteVoicemail(contactId, voicemailId) {
    const res = await fetch(
      `${BASE_URL}/${contactId}/voicemails/${voicemailId}`,
      {
        method: "DELETE",
        headers: authHeader(),
      }
    );
    return res.json();
  },
};
