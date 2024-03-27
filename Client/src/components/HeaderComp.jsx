import { useEffect, useState } from "react";

function HeaderComp() {
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes();
  const [CurrTime, SetCurrTime] = useState(0);

  useEffect(() => {
    return SetCurrTime(time);
  }, [time]);

  return (
    <>
      <header className="bg-slate-400 w-dvw h-36 flex items-center p-10">
        <div className="bg-green-400 w-10 h-10 ">{}</div>
        <div className="flex-grow"></div>
        <div className="bg-purple-500 w-10 h-10"></div>
      </header>
    </>
  );
}

export default HeaderComp;
