import { useEffect, useRef, useState } from "react";
import { MdSkipNext } from "react-icons/md";
import { useTasks } from "../context/TasksContext";
import { useManageUpdate } from "../hooks/useManageUpdate";
import { checkLogin } from "../utils/isLogin";

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
      }, 50);
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
        className={`absolute -top-10 h-0.5 block bg-white duration-100`}
      ></span>
      <div className="max-w-[480px] bg-[rgba(255,255,255,0.1)] mx-auto rounded-sm p-4 text-center">
        <div className="flex items-center justify-center">
          <button
            onClick={startPomodoro}
            className={`cursor-pointer py-0.5 px-3 rounded-sm ${
              "pomodoro" === tab ? "bg-[rgb(0,0,0,0.2)] font-semibold" : ""
            }`}
          >
            Pomodoro
          </button>
          <button
            onClick={startShortBreak}
            className={`cursor-pointer py-0.5 px-3 rounded-sm ${
              "short break" === tab ? "bg-[rgb(0,0,0,0.2)] font-semibold" : ""
            }`}
          >
            Short Break
          </button>
          <button
            onClick={startLongBreak}
            className={`cursor-pointer py-0.5 px-3 rounded-sm ${
              "long break" === tab ? "bg-[rgb(0,0,0,0.2)] font-semibold" : ""
            }`}
          >
            Long Break
          </button>
        </div>
        <p className="text-9xl font-semibold w-fit mx-auto mt-5">
          {String(Math.floor(timer / 60)).padStart(2, "0")}:
          {String(Math.floor(timer % 60)).padStart(2, "0")}
        </p>
        <div className="relative">
          <button
            onClick={() => setStartTimer((start) => !start)}
            className={`mb-4 mt-5 bg-white text-red-tomato h-14 w-50 px-3 text-2xl font-semibold uppercase cursor-pointer border-gray-200 rounded-md active:border-b-0 active:translate-y-2 ${
              startTimer ? "border-b-0 translate-y-2" : "border-b-8"
            }`}
          >
            {startTimer ? "Pause" : "start"}
          </button>
        </div>
      </div>
      <div className="text-center mt-4">
        <button
          className="text-gray-300 hover:text-white cursor-pointer"
          onClick={() => {
            const reset = confirm("do you want to reset your pomodoro counter");
            if (reset) setCounter(1);
          }}
        >
          #{counter}
        </button>
        <p>
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
