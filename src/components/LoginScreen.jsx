import { useState, useEffect } from "react";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { findUserByEmail, createUser, loginUser } from "../api";

const emptyForm = {
  name: "",
  email: "",
  password: "",
};

const inputClass =
  "w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400";

const labelClass =
  "block text-sm font-medium text-slate-700 mb-1";

export default function LoginScreen({ onLogin }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState("signup");

  const isSignup = mode === "signup";

  useEffect(() => {
    document.title = isSignup
      ? "Sign up · School Hub"
      : "Log in · School Hub";
  }, [isSignup]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  }

  function switchMode(newMode) {
    setMode(newMode);
    setForm(emptyForm);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    // Basic frontend validation.
    if (isSignup && !form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (isSignup && password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setBusy(true);
    setError("");

    try {
      if (isSignup) {
        // Check whether the email is already registered.
        const existing = await findUserByEmail(email);

        if (existing) {
          setError("An account with this email already exists.");
          return;
        }

        // Register the new user.
        const saved = await createUser({
          fullName: form.name.trim(),
          email,
          password,
        });

        // Pass the token and user data to App.jsx.
        onLogin(saved);
      } else {
        // Authenticate the existing user.
        const loggedInUser = await loginUser({
          email,
          password,
        });

        // Pass the token and user data to App.jsx.
        onLogin(loggedInUser);
      }
    } catch (error) {
      setError(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
          <AcademicCapIcon className="h-7 w-7" />
          School Hub
        </h1>

        <p className="text-slate-500 text-center mb-6">
          {isSignup
            ? "Create your account"
            : "Log in to continue"}
        </p>

        {/* Login and Signup tabs */}
        <div className="grid grid-cols-2 gap-1 bg-slate-100 rounded-lg p-1 mb-6">
          {["login", "signup"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={`py-2 rounded-md text-sm font-semibold transition ${
                mode === m
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {m === "login" ? "Log in" : "Sign up"}
            </button>
          ))}
        </div>

        {/* Full name - Signup only */}
        {isSignup && (
          <>
            <label className={labelClass}>
              Full name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter your full name"
            />
          </>
        )}

        {/* Email */}
        <label className={labelClass}>
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
          placeholder="Enter your email"
        />

        {/* Password */}
        <label className={labelClass}>
          Password
        </label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className={inputClass}
          placeholder="Enter your password"
        />

        {/* Error message */}
        {error && (
          <p className="text-red-600 text-sm mb-3">
            {error}
          </p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={busy}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-wait"
        >
          {busy
            ? "Please wait..."
            : isSignup
              ? "Create account"
              : "Log in"}
        </button>
      </form>
    </div>
  );
}
