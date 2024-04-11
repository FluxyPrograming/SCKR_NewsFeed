import { useEffect, useState } from "react";
import { ClockIcon } from "./ClockIcon";

function HeaderComp() {
  const [time, setTime] = useState("00:00:00");
  const [date, setDate] = useState("7. March");
  const GetTime = () => {
    let today = new Date();
    setDate(today.toLocaleDateString("sl", { month: "long", day: "numeric" }));
    setTime(today.toLocaleTimeString("sl"));
  };
  setInterval(GetTime, 1000);
  return (
    <>
      <header className="bg-slate-400 w-dvw h-36 flex items-center p-10">
        <div className="p-2 font-mono flex flex-col">
          <div className="flex flex-row">
            <ClockIcon />
            <div className="mt-3 ml-2 font-NotoSans font-bold text-4xl">
              {time}
            </div>
          </div>
          <div className="ml-12 self-start font-NotoSans font-bold text-3xl">
            {date}
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className="bg-purple-500 p-2">Weather</div>
      </header>
    </>
  );
}

export default HeaderComp;
