import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <div className="bg-white/40 border-b border-white/60 backdrop-blur-xl">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold">
            W
          </div>
          <div>
            <p className="font-bold leading-tight text-gray-900">Warranty Tracker</p>
            <p className="text-xs text-gray-500">Track expiry. Save money.</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50 font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
