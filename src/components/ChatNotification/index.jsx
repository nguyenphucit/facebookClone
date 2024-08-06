import React, { useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import style from "../FriendList/index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateLatestChatReceiver } from "../../slice/UserSlice";
import { LatestMessage } from "../LatestMessage";
export const ChatNotification = ({ setNavSetting }) => {
  const { latestChats } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateLatestChatReceiver());
  }, [dispatch]);
  return (
    <div className="absolute -left-80 top-12 z-[2000] flex h-112.5 w-90 flex-col items-center overflow-y-auto overflow-x-hidden rounded-lg bg-white px-2 shadow-settingForm">
      <div className="flex w-full justify-between p-2">
        <h1 className="text-2xl font-bold">Đoạn chat</h1>
        <div className={style.PostCreateIconBox}>
          <MoreHorizIcon
            sx={{ color: "#65676b" }}
            className={style.PostCreateIcon}
          />
        </div>
      </div>
      <div className=" flex w-full items-center justify-start gap-4 p-3 text-base font-semibold">
        <span className="cursor-pointer rounded-3xl bg-[#ebf5ff] px-3 py-1 text-primary hover:brightness-95">
          hộp thư
        </span>
        <span>cộng đồng</span>
      </div>
      <div className="">
        {latestChats
          ?.filter((item) => item.receiver !== undefined)
          .map((item) => (
            <LatestMessage
              LatestMessageInfo={item}
              key={item.id}
              setNavSetting={setNavSetting}
            />
          ))}
      </div>
    </div>
  );
};
