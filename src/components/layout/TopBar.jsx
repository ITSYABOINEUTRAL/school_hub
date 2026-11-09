import UserMenu from "../UserMenu";

export default function Topbar({ user, onLogout }) {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-slate-800">Dashboard</h2>
      <UserMenu user={user} onLogout={onLogout} />
    </header>
  );
}