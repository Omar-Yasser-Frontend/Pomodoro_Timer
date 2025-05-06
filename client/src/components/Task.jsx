import { BsThreeDotsVertical } from "react-icons/bs";
import { useTasks } from "../context/TasksContext";
import DropDownBtn from "./DropDownBtn";
import { useState } from "react";
import EditTask from "./EditTask";
import { checkLogin } from "../utils/isLogin";

function Task({ task, index }) {
  const { setCurTask, curTask } = useTasks();
  const [edit, setEdit] = useState(false);
  const { title, targetCount, count, description, completed } = task;
  const close = () => setEdit(false);
  return (
    <li className="bg-white/10 text-white min-h-15 flex justify-center items-center mb-4 rounded-lg overflow-hidden shadow-lg backdrop-blur-md border border-white/20">
      {edit ? (
        <EditTask index={index} close={close} task={task} />
      ) : (
        <div
          onClick={() =>
            checkLogin()
              ? setCurTask((curTask) =>
                  curTask?._id !== task._id ? task : null
                )
              : setCurTask((curTask) => (curTask?.id !== task.id ? task : null))
          }
          className={`flex justify-between items-center grow p-4 cursor-pointer border-l-8 ${
            !checkLogin()
              ? curTask?.id === task?.id
                ? "border-red-500"
                : "border-gray-400"
              : curTask?._id === task?._id
              ? "border-red-500"
              : "border-gray-400"
          } flex-wrap`}
        >
          <p className={`font-semibold ${completed ? "line-through" : ""}`}>
            {title}
          </p>
          <div className="font-semibold flex items-center gap-2">
            <p>
              <span className="text-xl">{count}</span>/{targetCount}
            </p>
            <div className="relative">
              <button
                onClick={() => setEdit(true)}
                className={`p-2 rounded-full cursor-pointer bg-white/20 hover:bg-white/30 transition`}
              >
                <BsThreeDotsVertical fontSize={16} className="text-white" />
              </button>
            </div>
          </div>
          {description && (
            <p className="w-full p-3 bg-amber-100 mt-3 text-gray-800 rounded-lg">
              {description}
            </p>
          )}
        </div>
      )}
    </li>
  );
}

export default Task;
