import AddTask from "./AddTask";
import Task from "./Task";
import { useGetTasks } from "../hooks/useGetTasks";
import Container from "./Container";

function PomoTasks() {
  const { tasks } = useGetTasks();

  return (
    <Container>
      <div className="container mx-auto px-4 mb-6 mt-6">
        <div className="max-w-[480px] mx-auto rounded-lg p-6 shadow-lg backdrop-blur-md border border-white/20">
          <div className="flex justify-between pb-3 border-b-2 border-white/20">
            <p className="font-semibold text-lg text-white">Tasks</p>
          </div>
          <ul className="max-w-[480px] mx-auto mt-6">
            {tasks &&
              tasks.map((task, i) => <Task key={i} task={task} index={i} />)}
            <AddTask />
          </ul>
        </div>
      </div>
    </Container>
  );
}

export default PomoTasks;
