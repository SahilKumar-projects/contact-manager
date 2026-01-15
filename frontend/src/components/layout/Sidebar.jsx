import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ active, onChange }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gray-50 rounded-2xl p-4 flex flex-col">
      {/* BRAND */}
      <h1 className="text-xl font-bold text-rose-500 mb-10">
        Pulse<span className="text-gray-900">CRM</span>
      </h1>
      {/* MENU */}
      <div className="space-y-1">
        <button
          onClick={() => onChange("contacts")}
          className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition
      ${
        active === "contacts"
          ? "bg-rose-100 text-rose-600"
          : "text-gray-700 hover:bg-gray-100"
      }`}
        >
          Contacts
        </button>

        <button
          onClick={() => onChange("profile")}
          className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition
      ${
        active === "profile"
          ? "bg-rose-100 text-rose-600"
          : "text-gray-700 hover:bg-gray-100"
      }`}
        >
          Profile
        </button>

        <button
          onClick={() => onChange("password")}
          className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition
      ${
        active === "password"
          ? "bg-rose-100 text-rose-600"
          : "text-gray-700 hover:bg-gray-100"
      }`}
        >
          Change Password
        </button>
      </div>

      {/* SPACER */}
      <div className="flex-1" />

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="mt-4 px-3 py-2 rounded-xl text-sm font-medium 
             text-rose-600 border border-rose-200 
             hover:bg-rose-50 hover:border-rose-300 
             transition"
      >
        Logout
      </button>
    </div>
  );
}
