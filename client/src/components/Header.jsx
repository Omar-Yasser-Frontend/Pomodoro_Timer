import { FaUserAstronaut } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { GoCheckCircleFill } from "react-icons/go";
import DropDownBtn from "./DropDownBtn";
import { Link } from "react-router";
import { HiMiniArrowRightEndOnRectangle } from "react-icons/hi2";
import { BsKeyboardFill } from "react-icons/bs";
import Logout from "./Logout";
import { useIsLogin } from "../context/LoginProvider";

function Header() {
  const { isLogin } = useIsLogin();

  return (
    <header className="h-15 flex justify-between items-center shadow-[0px_1px_0px_0px_hsl(0,0%,0%,10%)]">
      <h1 className="text-white font-bold text-xl cursor-pointer flex items-center gap-1">
        <GoCheckCircleFill />
        <span>Pomofocus</span>
      </h1>

      <nav>
        <ul className="flex nav-list gap-3">
          <li>
            <ImStatsDots /> <span>Report</span>
          </li>
          <li>
            <FaCog /> <span>Settings</span>
          </li>{" "}
          {isLogin !== true && (
            <li>
              <Link
                className="bg-[rgba(255,255,255,0.2)] flex justify-center items-center gap-1 py-2 px-3 rounded-sm cursor-pointer text-[13px]"
                to="signin"
              >
                <FaUserAstronaut /> <span>Sign In</span>
              </Link>
            </li>
          )}
          {isLogin === true && <Logout />}
          <li className="flex flex-col">
            <DropDownBtn>
              <ul className="w-45 flex flex-col mt-3 rounded-md overflow-hidden">
                {isLogin !== true && (
                  <li>
                    <Link
                      to="/login"
                      className="w-full hover:bg-gray-100 duration-300 py-3 px-4 bg-white text-black flex items-center gap-1"
                    >
                      <HiMiniArrowRightEndOnRectangle fontSize={20} />
                      Login
                    </Link>
                  </li>
                )}
                <li className="cursor-pointer w-full hover:bg-gray-100 duration-300 py-3 px-4 bg-white text-black flex items-center gap-1">
                  <BsKeyboardFill fontSize={20} />
                  Shortcuts
                </li>
              </ul>
            </DropDownBtn>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
