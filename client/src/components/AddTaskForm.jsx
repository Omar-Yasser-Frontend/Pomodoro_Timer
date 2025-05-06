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
    <li className="bg-white/10 text-white min-h-15 flex justify-center items-center mb-4 rounded-lg overflow-hidden shadow-lg backdrop-blur-md border border-white/20">
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
              type="text"
              placeholder="What are you working on?"
              className="w-full focus:outline-none focus:border-none mb-4 bg-white/20 rounded-lg p-2 text-white placeholder:text-gray-300"
            />
            {emptyTitle && (
              <p className="font-semibold text-red-600 text-lg">
                Title could not be empty
              </p>
            )}
            <div style={{ border: "1px solid red" }}>
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
                className="p-3 w-15 outline-none bg-white/20 rounded-lg text-white"
              />
              <button
                type="button"
                onClick={() => setTargetCount((target) => ++target)}
                className="p-4 shadow-xl ml-4 cursor-pointer text-white"
              >
                <FaChevronUp />
              </button>
              <button
                type="button"
                onClick={() =>
                  setTargetCount((target) => (target === 1 ? target : --target))
                }
                className="p-4 shadow-xl ml-4 cursor-pointer text-white"
              >
                <FaChevronDown />
              </button>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Some notes..."
              className="p-3 outline-none bg-white/20 rounded-lg mt-4 w-full text-white placeholder:text-gray-300"
            />
          </div>
          <div className="bg-white/20 p-4 flex text-base">
            <button
              type="button"
              onClick={close}
              className="inline-block ml-auto py-2 px-3 cursor-pointer text-white"
            >
              Cancel
            </button>
            <button className="py-2 px-3 cursor-pointer bg-emerald-600 text-white rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </li>
  );
}

export default AddTaskForm;
