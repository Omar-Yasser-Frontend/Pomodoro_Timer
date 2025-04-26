import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { manageAddingTask } from "../utils/helper";
import { useAddTasks } from "../hooks/useAddTasks";
import { useTasks } from "../context/TasksContext";

function AddTaskForm({ close }) {
  const { setTasks } = useTasks();
  const { mutate } = useAddTasks();
  const [title, setTitle] = useState("");
  const [targetCount, setTargetCount] = useState(1);
  const [description, setDescription] = useState("");
  const [emptyTitle, setEmptyTitle] = useState(false);
  const addTask = (newTask) => setTasks([...newTask]);
  return (
    <li className="bg-white text-gray-800 min-h-15 flex justify-center items-center mb-4 rounded-md overflow-hidden">
      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (title === "") return setEmptyTitle(true);

            const newTask = {
              id: Date.now(),
              userId: "",
              title,
              targetCount,
              description,
              count: 0,
              completed: false,
            };

            manageAddingTask(newTask, mutate, addTask);
            close();
          }}
        >
          <div className="p-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              // onFocus={() => setEmptyTitle(false)}
              type="text"
              placeholder="What are you working on ?"
              className="text-xl w-full outline-none mb-4 placeholder:text-gray-300 placeholder:italic"
            />
            {emptyTitle && (
              <p className="font-semibold text-red-600 text-lg">
                Title could not be empty
              </p>
            )}
            <div className="mb-4">
              <input
                type="text"
                value={targetCount}
                onChange={(e) => {
                  if (
                    typeof Number.parseInt(e.target.value) === "number" &&
                    Number(e.target.value) >= 1
                  )
                    setTargetCount(e.target.value);
                }}
                className="bg-gray-200 w-15 px-4 py-2 rounded-md"
              />
              <button
                type="button"
                onClick={() => setTargetCount((target) => ++target)}
                className="p-4 shadow-xl ml-4 cursor-pointer text-gray-700"
              >
                <FaChevronUp />
              </button>
              <button
                type="button"
                onClick={() =>
                  setTargetCount((target) => (target === 1 ? target : --target))
                }
                className="p-4 shadow-xl ml-4 cursor-pointer text-gray-700"
              >
                <FaChevronDown />
              </button>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Some notes..."
              className="w-full bg-gray-200 rounded-sm min-h-20 placeholder:text-gray-300 p-4"
            />
          </div>
          <div className="bg-gray-200 p-4 flex">
            <button
              type="button"
              className="py-2 px-4 cursor-pointer block ml-auto"
              onClick={close}
            >
              Close
            </button>
            <button className="px-4 py-2 cursor-pointer block bg-black text-white rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </li>
  );
}

export default AddTaskForm;
