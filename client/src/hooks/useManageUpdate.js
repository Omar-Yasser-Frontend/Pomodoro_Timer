import { useTasks } from "../context/TasksContext";
import { checkLogin } from "../utils/isLogin";
import { useUpdateTask } from "./useUpdateTask";

export function useManageUpdate() {
  const { setTasks } = useTasks();
  const { isPending, mutate } = useUpdateTask();

  function onUpdate(id, task) {
    const login = checkLogin();
    if (!login) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks = tasks.map((curTask) => {
        return curTask.id === id ? { ...curTask, ...task.task } : curTask;
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setTasks(tasks);
    } else {
      mutate({ _id: id, task });
    }
  }

  return [isPending, onUpdate];
}
