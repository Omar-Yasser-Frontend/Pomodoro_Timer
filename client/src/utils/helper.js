import { checkLogin } from "./isLogin";

export function manageAddingTask(task, mutate, updateState) {
  const login = checkLogin();
  if (login) {
    mutate(task);
  } else {
    updateState(addTaskLocalstorage(task));
  }
}

function addTaskLocalstorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return tasks;
}
