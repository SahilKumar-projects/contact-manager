import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import authService from "../../services/authService";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* PREFILL USER DATA */
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        country: user.country || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      await authService.updateProfile(form, token);
      setMessage("Profile updated successfully");
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 rounded-2xl p-6 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Profile
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl p-6 max-w-2xl space-y-5"
      >
        {/* NAME */}
        <Input
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        {/* EMAIL (READ ONLY) */}
        <Input
          label="Email"
          name="email"
          value={form.email}
          disabled
        />

        {/* GRID FIELDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <Input
            label="Country"
            name="country"
            value={form.country}
            onChange={handleChange}
          />

          <Input
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
          />

          <Input
            label="State"
            name="state"
            value={form.state}
            onChange={handleChange}
          />
        </div>

        {/* ADDRESS */}
        <Input
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />

        {/* STATUS */}
        {message && (
          <div className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
            {message}
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* ACTION */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* -------- INPUT COMPONENT -------- */

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-500">
        {label}
      </label>
      <input
        {...props}
        className="px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 disabled:bg-gray-100"
      />
    </div>
  );
}
