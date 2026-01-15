import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-400 to-orange-300 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        
        {/* BRAND */}
        <h1 className="text-2xl font-bold text-center text-rose-500 mb-2">
          Pulse<span className="text-gray-900">CRM</span>
        </h1>
        <p className="text-center text-gray-500 text-sm mb-8">
          Sign in to manage your contacts
        </p>

        {/* FORM */}
        <form className="space-y-5">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 transition"
          >
            Login
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-rose-500 font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
