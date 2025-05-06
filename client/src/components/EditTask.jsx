import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { useManageDeleteTask } from "../hooks/useManageDeleteTask";
import { useManageUpdate } from "../hooks/useManageUpdate";

function EditTask({ task, close }) {
  const [isPending, handleDelete] = useManageDeleteTask();
  const [_, handleUpdate] = useManageUpdate();
  const { title, description, _id, targetCount, count, id: taskId } = task;
  const [inputTitle, setInputTitle] = useState(title);
  const [inputDescription, setInputDescription] = useState(description);
  const [inputTarget, setInputTarget] = useState(targetCount);
  const [inputCount, setInputCount] = useState(count);
  return (
    <div className="w-full text-xl overflow-hidden relative">
      {isPending && (
        <div className="absolute inset-0 bg-[rgb(0,0,0,0.1)] flex items-center justify-center text-white">
          Deleteing Task...
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const completed = Number(inputCount) >= Number(inputTarget);
          const newEditedTask = {
            task: {
              title: inputTitle,
              description: inputDescription,
              targetCount: inputTarget,
              count: Number(inputCount),
              completed,
            },
          };
          const isLogin = localStorage.getItem("login")
            ? JSON.parse(localStorage.getItem("login"))
            : null;
          const id = isLogin ? _id : taskId;

          handleUpdate(id, newEditedTask);
          close();
        }}
      >
        <div className="p-4">
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            className="w-full focus:outline-none focus:border-none mb-4 bg-white/20 rounded-lg p-2 text-white placeholder:text-gray-300"
            placeholder="What are you working on?"
          />
          <div>
            <input
              type="number"
              className="p-3 w-15 outline-none bg-white/20 rounded-lg mr-4 text-white"
              value={inputCount}
              onChange={(e) =>
                Number(e.target.value) < 0
                  ? null
                  : setInputCount(e.target.value)
              }
            />
            <input
              type="text"
              className="p-3 w-15 outline-none bg-white/20 rounded-lg text-white"
              value={inputTarget}
              onChange={(e) => {
                Number(e.target.value) < 1
                  ? null
                  : setInputTarget(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={() => setInputTarget((target) => ++target)}
              className="p-4 shadow-xl ml-4 cursor-pointer text-white"
            >
              <FaChevronUp />
            </button>
            <button
              type="button"
              onClick={() =>
                inputTarget <= 1 ? null : setInputTarget((target) => --target)
              }
              className="p-4 shadow-xl ml-4 cursor-pointer text-white"
            >
              <FaChevronDown />
            </button>
          </div>
          <textarea
            className="p-3 outline-none bg-white/20 rounded-lg mt-4 w-full text-white placeholder:text-gray-300"
            value={inputDescription}
            onChange={(e) => setInputDescription(e.target.value)}
            placeholder="Some notes..."
          />
        </div>
        <div className="bg-white/20 p-4 flex text-base">
          <button
            type="button"
            onClick={() => {
              const isLogin = localStorage.getItem("login")
                ? JSON.parse(localStorage.getItem("login"))
                : false;
              if (isLogin) {
                handleDelete(_id, close);
              } else {
                handleDelete(taskId, close);
              }
            }}
            className="py-2 px-3 cursor-pointer text-white"
          >
            Delete
          </button>
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
  );
}

export default EditTask;
