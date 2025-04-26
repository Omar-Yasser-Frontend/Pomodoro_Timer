export async function register(userData) {
  const res = await fetch(
    "https://3afde1ea-9062-4673-bedf-0d7f10f7f39c-00-2ziyswb0pl2vu.spock.replit.dev:8000/api/register",
    {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userData),
    }
  );

  if (!res.ok) throw new Error("Failed to create user");

  const data = await res.text();
  return data;
}

export async function login({ gmail, password }) {
  const res = await fetch(
    `https://3afde1ea-9062-4673-bedf-0d7f10f7f39c-00-2ziyswb0pl2vu.spock.replit.dev:8000/api/login`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: gmail, password }),
    }
  );
  if (!res.ok) throw new Error("User not found");

  const data = await res.json();
  return data;
}

export async function logout() {
  try {
    const res = await fetch(
      "https://3afde1ea-9062-4673-bedf-0d7f10f7f39c-00-2ziyswb0pl2vu.spock.replit.dev:8000/api/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (!res.ok) throw new Error("Failed to logout");

    return null;
  } catch (e) {
    console.log(e.message);
  }
}
export async function confirmation(code) {
  const res = await fetch(
    "https://3afde1ea-9062-4673-bedf-0d7f10f7f39c-00-2ziyswb0pl2vu.spock.replit.dev:8000/api/confirmation",
    {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code: Number(code) }),
    }
  );
  if (!res.ok) throw new Error("Failed to confirm email");

  return res.text();
}
