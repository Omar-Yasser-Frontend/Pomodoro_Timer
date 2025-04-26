import { FaUserAstronaut } from "react-icons/fa6";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router";

function Logout() {
  const { isPending, mutate } = useLogout();
  return (
    <li
      onClick={() => {
        if (!isPending) mutate();
      }}
    >
      <Link
        className={`${
          isPending
            ? "bg-[rgba(0,0,0,0.1)] cursor-not-allowed"
            : "bg-[rgba(255,255,255,0.2)] cursor-pointer"
        } flex justify-center items-center gap-1 py-2 px-3 rounded-sm text-[13px] duration-300`}
      >
        <FaUserAstronaut /> <span>logout</span>
      </Link>
    </li>
  );
}

export default Logout;
