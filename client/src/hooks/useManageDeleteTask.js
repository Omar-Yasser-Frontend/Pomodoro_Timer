import { useTasks } from "../context/TasksContext";
import { checkLogin } from "../utils/isLogin";
import { useDeleteTask } from "./useDeleteTask";

export function useManageDeleteTask() {
  const { setTasks } = useTasks();
  const { isPending, mutate } = useDeleteTask();
  function onDelete(_id, close) {
    const login = checkLogin();
    if (!login) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));

      tasks = tasks.filter((task) => task.id !== _id);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setTasks(tasks);
    } else {
      mutate(_id);
    }
    close();
  }
  return [isPending, onDelete];
}
