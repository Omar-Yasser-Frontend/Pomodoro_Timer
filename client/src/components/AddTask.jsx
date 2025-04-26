import { useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import AddTaskForm from "./AddTaskForm";

function AddTask() {
  const [show, setShow] = useState(false);
  const close = () => setShow(false);
  return (
    <>
      {show ? (
        <AddTaskForm close={close} />
      ) : (
        <li
          onClick={() => setShow(true)}
          className="h-15 bg-[rgb(0,0,0,0.1)] rounded-sm cursor-pointer border-2 border-dashed border-gray-200 flex justify-center items-center font-semibold text-lg text-gray-200 gap-1 hover:text-white hover:border-white"
        >
          <IoAddCircleSharp fontSize={22} /> Add Item
        </li>
      )}
    </>
  );
}

export default AddTask;
