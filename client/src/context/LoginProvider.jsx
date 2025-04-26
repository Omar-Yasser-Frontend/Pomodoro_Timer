import { createContext, useContext, useState } from "react";

const LoginContext = createContext();

export default function LoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(() => {
    if (localStorage.getItem("login") === null)
      localStorage.setItem("login", JSON.stringify(false));
    const login = JSON.parse(localStorage.getItem("login"));
    return login;
  });

  const setLogin = (value) => {
    localStorage.setItem("login", JSON.stringify(value));
    setIsLogin(value);
  };

  return <LoginContext value={{ isLogin, setLogin }}>{children}</LoginContext>;
}

export function useIsLogin() {
  const context = useContext(LoginContext);

  if (context === undefined)
    throw new Error("Context is used outside provider");

  return context;
}
