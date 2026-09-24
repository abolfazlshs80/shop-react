// src/layouts/AdminLayout.tsx
import { NavLink, Outlet } from "react-router-dom";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-slate-300 hover:bg-slate-800 hover:text-white"
  }`;

export default function AdminLayout() {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <aside className="w-64 shrink-0 bg-slate-900 p-5 text-white">
          <h1 className="mb-8 text-xl font-bold">پنل مدیریت</h1>

          <nav className="space-y-2">
            <NavLink to="/admin" end className={navLinkClass}>
              داشبورد
            </NavLink>

            <NavLink to="/admin/brands" className={navLinkClass}>
              برندها
            </NavLink>

            <NavLink to="/" className={navLinkClass}>
              بازگشت به سایت
            </NavLink>
          </nav>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
            <span className="font-semibold text-slate-800">
              مدیریت فروشگاه
            </span>

            <button
              type="button"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              خروج
            </button>
          </header>

          <main className="flex-1 p-6">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <Outlet />
            </div>
          </main>
        </section>
      </div>
    </div>
  );
}
