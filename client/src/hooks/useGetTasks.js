import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../utils/tasksApi";
import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import { useIsLogin } from "../context/LoginProvider";

export function useGetTasks() {
  const { setLogin } = useIsLogin();
  const { setTasks, tasks } = useTasks();
  const { data, isPending } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  useEffect(
    function () {
      if (data === null) {
        setLogin(false);
        if (!localStorage.getItem("tasks")) {
          localStorage.setItem("tasks", JSON.stringify([]));
          setTasks([]);
        } else {
          const tasks = JSON.parse(localStorage.getItem("tasks"));
          setTasks(tasks);
        }
      } else {
        setLogin(true);
        setTasks(data);
      }
    },
    [data, setTasks, setLogin]
  );

  return {
    tasks,
    setTasks,
    isPending,
  };
}
