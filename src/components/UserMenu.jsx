import { useState } from "react";
import { roleStyles } from "../data";

export default function UserMenu({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:scale-105 transition"
        aria-label="Open user menu"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 p-4 z-50">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border border-slate-200"
            />

            <div>
              <p className="font-medium text-slate-700">
                {user.name}
              </p>

              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                  roleStyles[user.role]
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="block w-full text-left mt-4 pt-3 border-t border-slate-200 text-sm text-slate-500 hover:text-red-600"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}