export const API_URL = "http://localhost:3000/api/v1/auth";

// GET all accounts
export async function getUsers() {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error("Could not load users");
  return res.json();
}

// GET the account with this email (or null if there isn't one)
export async function findUserByEmail(email) {
  const res = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error("Could not reach the server");
  const matches = await res.json(); // json-server always answers with a list
  return matches[0] ?? null;
}

// POST a new account; the server answers with the saved account (including its new id)
export async function createUser(newUser) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  if (!res.ok) throw new Error("Could not create the account");
  return res.json();
}