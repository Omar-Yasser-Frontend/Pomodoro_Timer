export default function isLogin() {
  const login = localStorage.getItem("login");

  if (login === null) {
    localStorage.setItem("login", JSON.stringify(false));
    if (!localStorage.getItem("tasks"))
      localStorage.setItem("tasks", JSON.stringify([]));
    return JSON.parse(localStorage.getItem("tasks"));
  }

  if (JSON.parse(login) === false) {
    if (!localStorage.getItem("tasks"))
      localStorage.setItem("tasks", JSON.stringify([]));
    return JSON.parse(localStorage.getItem("tasks"));
  }

  return false;
}

export function checkLogin() {
  const login = localStorage.getItem("login")
    ? JSON.parse(localStorage.getItem("login"))
    : null;
  return login;
}
