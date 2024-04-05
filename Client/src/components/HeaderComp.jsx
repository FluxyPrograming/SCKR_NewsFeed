import { useEffect, useState } from "react";
const GetTime = () => {
  let today = new Date();
  console.log("called");
  return today.getHours() + ":" + today.getMinutes();
};

function HeaderComp() {
  return (
    <>
      <header className="bg-slate-400 w-dvw h-36 flex items-center p-10">
        <div className="bg-green-400 w-10 h-10 "></div>
        <div className="flex-grow"></div>
        <div className="bg-purple-500 w-10 h-10">
          <p>
            <GetTime />
          </p>
        </div>
      </header>
    </>
  );
}

setInterval(GetTime, 1000);
export default HeaderComp;
