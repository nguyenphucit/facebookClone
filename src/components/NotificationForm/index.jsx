import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import style from "../FriendList/index.module.css";
import { Notification } from "../Notification";
import { useSelector } from "react-redux";
export const NotificationForm = () => {
  const { notifications } = useSelector((state) => state.user);
  return (
    <div className="absolute -left-80 top-12 z-[2000] flex h-112.5 w-90 flex-col items-center overflow-y-auto overflow-x-hidden rounded-lg bg-white px-2 shadow-settingForm">
      <div className="flex w-full justify-between p-2">
        <h1 className="text-2xl font-bold">Thông báo</h1>
        <div className={style.PostCreateIconBox}>
          <MoreHorizIcon
            sx={{ color: "#65676b" }}
            className={style.PostCreateIcon}
          />
        </div>
      </div>
      <div className=" flex w-full items-center justify-start gap-4 p-3 text-base font-semibold">
        <span className="cursor-pointer rounded-3xl bg-[#ebf5ff] px-3 py-1 text-primary hover:brightness-95">
          Tất cả
        </span>
        <span>Chưa đọc</span>
      </div>
      <div className="">
        {notifications?.map((item) => {
          return item.status === "UNSEEN" ? (
            <Notification notificationInfo={item} key={item.id} />
          ) : null;
        })}
      </div>
      <div className="flex w-full justify-between p-3 text-base">
        <span className="cursor-pointer text-lg font-semibold">Trước đó</span>
        <span className="cursor-pointer text-primary">xem tất cả</span>
      </div>
      <div className="">
        {notifications?.map((item) => {
          return item.status === "SEEN" ? (
            <Notification notificationInfo={item} key={item.id} />
          ) : null;
        })}
      </div>
    </div>
  );
};
