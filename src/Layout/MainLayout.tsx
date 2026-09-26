import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-4 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-blue-700 text-white"
      : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
  }`;

export default function MainLayout() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <header className="border-b border-slate-200 bg-white shadow-sm">
        <nav className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3">

          <NavLink to="/" end className={linkClass}>
            خانه
          </NavLink>

          <NavLink to="/about" className={linkClass}>
            درباره ما
          </NavLink>

          <NavLink to="/admin" className={linkClass}>
            پنل مدیریت
          </NavLink>

          {/* خروج */}
          <button
            type="button"
            onClick={handleLogout}
            className="
              rounded-md
              px-4
              py-2
              text-sm
              font-medium
              text-red-600
              transition-colors
              hover:bg-red-50
              hover:text-red-700
            "
          >
            خروج
          </button>

        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 text-sm text-slate-500">
          فوتر سایت
        </div>
      </footer>

    </div>
  );
}