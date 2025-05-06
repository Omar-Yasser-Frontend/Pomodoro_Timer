import { cloneElement, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useOutsideClick } from "../hooks/useOutsideClick";

function DropDownBtn({ children, type }) {
  const [show, setShow] = useState(false);
  const ref = useOutsideClick(() => setShow(false));
  return (
    <div className="relative h-full">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShow((show) => !show);
        }}
        className={`p-2 rounded-sm cursor-pointer h-full ${
          type === "white"
            ? "border-gray-200  border-1"
            : "bg-[rgba(255,255,255,0.2)]"
        }`}
      >
        <BsThreeDotsVertical fontSize={16} />
      </button>
      {cloneElement(children, {
        ref: ref,
        className:
          children.props.className +
          ` absolute top-full right-0 ${show ? "" : "hidden"} z-50`,
      })}
    </div>
  );
}

export default DropDownBtn;
