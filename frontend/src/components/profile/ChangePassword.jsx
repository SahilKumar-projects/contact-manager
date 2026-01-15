import { useState } from "react";
import authService from "../../services/authService";

export default function ChangePassword() {
  const token = localStorage.getItem("token");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await authService.changePassword(
        { currentPassword, newPassword },
        token
      );

      setSuccess(res.message);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">Change Password</h2>

      <div className="max-w-md bg-white rounded-xl p-6 border">
        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-3 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-rose-400"
          />

          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-rose-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-rose-500 text-white rounded-lg text-sm hover:bg-rose-600 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
