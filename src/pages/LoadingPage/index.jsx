import React from "react";
import style from "./style.module.css";
export const LoadingPage = () => {
  return (
    <div className="absolute left-0 top-0 z-[2000] flex h-full w-full items-center justify-center bg-black bg-opacity-25">
      <div className="fixed left-0 top-0 flex h-dvh w-dvw items-center justify-center">
        <div
          className={`animate-loading h-28 w-28 rounded-full border-4 border-solid p-3 ${style["custom-gradient-bg"]}`}
        ></div>
      </div>
    </div>
  );
};
