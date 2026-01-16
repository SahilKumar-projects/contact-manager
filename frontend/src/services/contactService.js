const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/contacts`;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export default {
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
};
