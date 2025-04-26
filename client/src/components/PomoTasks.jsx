import { BsThreeDotsVertical } from "react-icons/bs";
import AddTask from "./AddTask";
import Task from "./Task";
import { useGetTasks } from "../hooks/useGetTasks";

function PomoTasks() {
  const { tasks } = useGetTasks();

  return (
    <>
      <div className="max-w-[480px] mx-auto rounded-sm pb-4 text-center">
        <div className="flex justify-between pb-3 border-b-2 border-white">
          <p className="font-semibold text-lg">Tasks</p>

          <button className="bg-[rgba(255,255,255,0.1)] p-2 cursor-pointer rounded-sm">
            <BsThreeDotsVertical />
          </button>
        </div>
      </div>
      <ul className="max-w-[480px] mx-auto mb-8">
        {tasks &&
          tasks.map((task, i) => <Task key={i} task={task} index={i} />)}
        <AddTask />
      </ul>
    </>
  );
}

export default PomoTasks;
