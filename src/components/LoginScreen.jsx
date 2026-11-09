import { useState, useEffect } from "react";
// import { users } from "../data";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { getUsers, findUserByEmail, createUser } from "../api";

const emptyForm = { name: "", email: "", password: "", role: "student" };

const inputClass =
  "w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400";
const labelClass = "block text-sm font-medium text-slate-700 mb-1";

export default function LoginScreen({ onLogin }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  }

  function switchMode(newMode) {
    setMode(newMode);
    setForm(emptyForm); // start each mode with empty boxes
    setError("");       // and no old error message
  }

  const [mode, setMode] = useState("signup"); // "login" or "signup"
  const isSignup = mode === "signup";

  const [accounts, setAccounts] = useState([]);
  const [serverStatus, setServerStatus] = useState("loading"); // "loading", "online" or "offline"
  
  useEffect(() => {
    getUsers()
    .then((data) => {
      setAccounts(data);
      setServerStatus("online");
    })
    .catch(() => setServerStatus("offline"));
  }, []); // [] = run once, when LoginScreen first appears


  useEffect(() => {
    document.title = isSignup ? "Sign up · School Hub" : "Log in · School Hub";
  }, [isSignup]);

  const [busy, setBusy] = useState(false);
  
  async function handleSubmit(e) {
    e.preventDefault();
    const email = form.email.trim().toLowerCase();
    
    // 1. Checks that don't need the server come first
    if (isSignup && (!form.name.trim() || !email || !form.password)) {
      setError("Please fill in every field.");
      return;
    }
    
    if (isSignup && form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    
    setBusy(true);
    try {
      // 2. Ask the server if this email has an account
      const existing = await findUserByEmail(email);
      
      if (isSignup) {
        if (existing) {
          setError("An account with this email already exists.");
          return;
        }
        
        // 3a. Sign up: send the new account to the server
        const saved = await createUser({
          fullName: form.name.trim(),
          email,
          password: form.password,
          role: form.role,
          avatar: form.role === "teacher" ? "https://res.cloudinary.com/db8mcyukl/image/upload/v1782897101/Passport_Photograph_w5ezww.jpg" : "https://res.cloudinary.com/db8mcyukl/image/upload/v1757170438/arcana/profile_pictures/ernmnr5yr42bdhsyycwo.webp",
        });
        onLogin(saved);
        return;
      }
      
      // 3b. Log in: check the password
      if (!existing || existing.password !== form.password) {
        setError("Wrong email or password.");
        return;
      }
      
      onLogin(existing);
    } catch {
      setError("Can't reach the server. Is it running?");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2"><AcademicCapIcon className="h-7 w-7" /> School Hub</h1>
        <p className="text-slate-500 text-center mb-6">
            {isSignup ? "Create your account" : "Log in to continue"}
        </p>

        <div className="grid grid-cols-2 gap-1 bg-slate-100 rounded-lg p-1 mb-6">
            {["login", "signup"].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => switchMode(m)}
                  className={`py-2 rounded-md text-sm font-semibold transition ${mode === m ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                    {m === "login" ? "Log in" : "Sign up"}
                </button>
            ))}
        </div>


        {isSignup && (
            <>
            <label className={labelClass}>Full name</label>
            <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
            </>
        )}

        <label className={labelClass}>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} />

        <label className={labelClass}>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} className={inputClass} />

        {/* {isSignup && (
            <>
            <label className={labelClass}>I am a...</label>
            <select name="role" value={form.role} onChange={handleChange} className={inputClass}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
            </select>
            </>
        )} */}

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-wait"
        >
          {busy ? "Please wait..." : isSignup ? "Create account" : "Log in"}
        </button>

        {!isSignup && (
            <div className="mt-6 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
              {serverStatus === "loading" && <p>Connecting to the server...</p>}
              {serverStatus === "offline" && (
                <p className="text-red-600">Can't reach the server. Is npm run server running?</p>
              )}
              {serverStatus === "online" && (
                <>
                <p className="font-semibold text-slate-600 mb-1">🟢 Server online · {accounts.length} accounts</p>{accounts.map((a) => (
                  <p key={a.id}>
                    {a.email} <span className="capitalize">({a.role})</span>
                  </p>
                ))}
                <p className="mt-2">Demo passwords: admin123 · teacher123 · student123</p>
                </>
              )}
            </div>
        )}
      </form>
    </div>
  );
}