import React from "react";
import noAvatar from "../../image/noAvatar.png";
import { Avatar } from "@mui/material";
import style from "./style.module.css";
import time from "../../image/time.png";
import { useSelector } from "react-redux";
export const LeftMenu = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="box-border h-dvh  flex-[1] pt-16 xs:hidden">
      <ul className=" fixed flex h-full w-1/4 flex-col gap-3 overflow-y-auto pl-6 pt-8 scrollbar scrollbar-track-[#E6E7EB] scrollbar-thumb-[#BCC0C4] scrollbar-thumb-rounded-full scrollbar-w-3">
        <li className={style.leftMenuItem}>
          <Avatar
            src={noAvatar}
            sx={{
              width: "32px",
              height: "32px",
              border: "1px #b6b8bd solid",
            }}
          />
          <span className="text-lg font-semibold">
            {user.userInfo.firstname + " " + user.userInfo.surname}
          </span>
        </li>
        <li className={style.leftMenuItem}>
          <img src={time} alt="memory" width={42} height={42} />
          <span className="text-lg font-semibold"> Kỷ niệm </span>
        </li>
      </ul>
    </div>
  );
};
