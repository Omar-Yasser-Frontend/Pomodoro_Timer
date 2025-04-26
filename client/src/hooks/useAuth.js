import { useState } from "react";

export function useAuth() {
  const [auth] = useState(() => {
    const userData = localStorage.getItem("auth");
    if (userData) return JSON.parse(userData);
    else null;
  });

  return auth;
}
