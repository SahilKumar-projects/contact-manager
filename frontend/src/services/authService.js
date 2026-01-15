const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const authService = {
  async login(data) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Login failed");

    return result;
  },

  async register(data) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Register failed");

    return result;
  },

  async me() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");

    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Unauthorized");

    return result;
  },
};

export default authService;
