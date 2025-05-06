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
          className="h-15 bg-[rgba(255,255,255,0.1)] rounded-lg cursor-pointer border-2 border-dashed border-white/20 flex justify-center items-center font-semibold text-lg text-white gap-1 hover:bg-white/20 transition"
        >
          <IoAddCircleSharp fontSize={22} /> Add Item
        </li>
      )}
    </>
  );
}

export default AddTask;
