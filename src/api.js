export const API_URL = "http://localhost:3000/api/v1";

// Check whether an email already exists
export async function findUserByEmail(email) {
  const res = await fetch(`${API_URL}/auth/check-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error("Could not check email");
  }

  return res.json();
}

// Create a new account
export async function createUser(newUser) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Could not create account");
  }

  return data;
}

// Log in an existing user
export async function loginUser(credentials) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Could not log in");
  }

  return data;
}