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
import Container from "./Container";

function Header() {
  const { isLogin } = useIsLogin();

  return (
    <header className="sticky top-0 backdrop-blur-md bg-black/30 border-b border-white/20 shadow-lg z-50 transition-all duration-300">
      <Container>
        <div className="h-20 flex justify-between items-center px-8">
          <h1 className="text-white font-extrabold text-2xl tracking-tight flex items-center gap-2 drop-shadow-lg">
            <GoCheckCircleFill className="text-emerald-500 text-3xl" />
            <span className="text-white">Study Timer</span>
          </h1>
          <nav>
            <ul className="flex nav-list gap-4 items-center">
              <li className="hover:bg-white/20 transition rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer">
                <ImStatsDots className="text-lg" /> <span>Report</span>
              </li>
              <li className="hover:bg-white/20 transition rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer">
                <FaCog className="text-lg" /> <span>Settings</span>
              </li>
              {isLogin !== true && (
                <li>
                  <Link
                    className="bg-emerald-600 text-white flex items-center gap-2 py-2 px-4 rounded-full shadow-md hover:scale-105 transition text-sm font-semibold"
                    to="signin"
                  >
                    <FaUserAstronaut className="text-lg" /> <span>Sign In</span>
                  </Link>
                </li>
              )}
              {isLogin === true && <Logout />}
              <li className="flex flex-col">
                <DropDownBtn>
                  <ul className="w-48 flex flex-col mt-3 rounded-xl overflow-hidden shadow-2xl bg-white/90 backdrop-blur-md border border-white/30">
                    {isLogin !== true && (
                      <li>
                        <Link
                          to="/login"
                          className="w-full hover:bg-blue-100 duration-300 py-3 px-4 text-black flex items-center gap-2"
                        >
                          <HiMiniArrowRightEndOnRectangle fontSize={20} />
                          Login
                        </Link>
                      </li>
                    )}
                    <li className="cursor-pointer w-full hover:bg-blue-100 duration-300 py-3 px-4 text-black flex items-center gap-2">
                      <BsKeyboardFill fontSize={20} />
                      Shortcuts
                    </li>
                  </ul>
                </DropDownBtn>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}

export default Header;
