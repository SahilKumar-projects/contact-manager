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
      
      {/* MENU */}
      <button
        onClick={() => onChange("contacts")}
        className={`text-left px-3 py-2 rounded ${
          active === "contacts" ? "bg-rose-100 text-rose-600" : ""
        }`}
      >
        Contacts
      </button>

      {/* SPACER */}
      <div className="flex-1" />

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="mt-4 px-3 py-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600"
      >
        Logout
      </button>
    </div>
  );
}
