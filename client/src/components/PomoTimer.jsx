import { useEffect, useRef, useState } from "react";
import { MdSkipNext } from "react-icons/md";
import { useTasks } from "../context/TasksContext";
import { useManageUpdate } from "../hooks/useManageUpdate";
import { checkLogin } from "../utils/isLogin";
import { FaClock } from "react-icons/fa";
import { GiTomato } from "react-icons/gi";
import { MdOutlineCoffee } from "react-icons/md";
import { MdOutlineTimer } from "react-icons/md";

function PomoTimer() {
  const [_, handleUpdate] = useManageUpdate();
  const { curTask } = useTasks();
  const [tab, setTab] = useState("pomodoro");
  const [counter, setCounter] = useState(1);
  const progressBar = useRef();
  const totalTimer = useRef();
  const [timer, setTimer] = useState(60 * 25);
  const [startTimer, setStartTimer] = useState(false);
  const timerHandler = useRef();

  const startPomodoro = () => {
    totalTimer.current = 60 * 25;
    setTab("pomodoro");
    setTimer(totalTimer.current);
    setStartTimer(false);
    document.documentElement.className = "";
  };

  const startShortBreak = () => {
    totalTimer.current = 60 * 5;
    setTab("short break");
    setTimer(totalTimer.current);
    setStartTimer(false);
    document.documentElement.className = "short";
  };

  const startLongBreak = () => {
    totalTimer.current = 60 * 15;
    setTab("long break");
    setTimer(totalTimer.current);
    setStartTimer(false);
    document.documentElement.className = "long";
  };

  useEffect(() => {
    if (startTimer && timer !== 0) {
      timerHandler.current = setInterval(() => {
        setTimer((curTimer) => {
          return curTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerHandler.current);
  }, [startTimer, timer]);

  useEffect(
    function () {
      const bell = new Audio("/cellphone-ringing-40837.mp3");
      bell.preload = "auto";
      bell.load();
      bell.currentTime = 0;

      if (timer === 0 && tab === "pomodoro" && startTimer) {
        if (curTask) {
          const login = checkLogin();
          const completed = curTask.count + 1 >= curTask.targetCount;
          console.log(completed);
          if (login) {
            handleUpdate(curTask._id, {
              task: { count: Number(curTask.count) + 1, completed },
            });
          } else {
            handleUpdate(curTask.id, {
              task: { count: Number(curTask.count) + 1, completed },
            });
          }
        }
        setCounter((counter) => counter + 1);

        setStartTimer(false);
        bell.play();
        setTimeout(() => {
          if (counter % 4 === 0) startLongBreak();
          else startShortBreak();
        }, 2000);
      } else if (timer === 0 && tab !== "pomodoro" && startTimer) {
        setStartTimer(false);
        bell.play();
        setTimeout(() => {
          startPomodoro();
        }, 2000);
      }
    },
    [counter, startTimer, tab, timer, curTask, handleUpdate]
  );

  useEffect(
    function () {
      progressBar.current.style.width =
        100 - (timer / totalTimer.current) * 100 + "%";
    },
    [timer, totalTimer]
  );

  return (
    <>
      <span
        ref={progressBar}
        className="absolute -top-10 h-0.5 block bg-white duration-100"
      ></span>
      <div className="max-w-[480px] bg-white/10 mx-auto rounded-lg p-6 text-center shadow-lg backdrop-blur-md border border-white/20">
        <div className="flex flex-row flex-nowrap items-center justify-center gap-2 mb-6">
          <button
            onClick={startPomodoro}
            className={`cursor-pointer py-1.5 px-3 rounded-full transition text-sm flex items-center ${
              "pomodoro" === tab
                ? "bg-emerald-600 text-white font-semibold"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <GiTomato className="text-sm mr-1" />{" "}
            <span className="text-sm">Pomodoro</span>
          </button>
          <button
            onClick={startShortBreak}
            className={`cursor-pointer py-1.5 px-3 rounded-full transition text-sm flex items-center ${
              "short break" === tab
                ? "bg-blue-600 text-white font-semibold"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <MdOutlineCoffee className="text-sm mr-1" />{" "}
            <span className="text-sm">Short Break</span>
          </button>
          <button
            onClick={startLongBreak}
            className={`cursor-pointer py-1.5 px-3 rounded-full transition text-sm flex items-center ${
              "long break" === tab
                ? "bg-blue-800 text-white font-semibold"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <MdOutlineTimer className="text-sm mr-1" />{" "}
            <span className="text-sm">Long Break</span>
          </button>
        </div>
        <p className="text-9xl font-bold w-fit mx-auto mt-5 text-white drop-shadow-lg">
          {String(Math.floor(timer / 60)).padStart(2, "0")}:
          {String(Math.floor(timer % 60)).padStart(2, "0")}
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => setStartTimer((start) => !start)}
            className="mb-4 mt-5 bg-emerald-600 text-white h-14 w-50 px-6 text-2xl font-semibold uppercase cursor-pointer rounded-full shadow-lg hover:scale-105 transition flex items-center justify-center"
          >
            <FaClock className="mr-2" /> {startTimer ? "Pause" : "Start"}
          </button>
        </div>
      </div>
      <div className="text-center mt-4">
        <button
          className="text-gray-300 hover:text-white cursor-pointer"
          onClick={() => {
            const reset = confirm(
              "Do you want to reset your pomodoro counter?"
            );
            if (reset) setCounter(1);
          }}
        >
          #{counter}
        </button>
        <p className="text-white font-semibold mt-2">
          {curTask
            ? curTask.title
            : tab === "pomodoro"
            ? "Time to focus!"
            : "Time for a break!"}
        </p>
      </div>
    </>
  );
}

export default PomoTimer;
