import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

function TasksProvider({ children }) {
  const [curTask, setCurTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  return (
    <TaskContext.Provider value={{ curTask, tasks, setCurTask, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  return context;
}

export default TasksProvider;
