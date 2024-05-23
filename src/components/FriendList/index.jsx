import React, { useState } from "react";
import style from "./index.module.css";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { ChatBox } from "../ChatBox";

const Friend = ({ item, handleOpenChat }) => {
  return (
    <div>
      {" "}
      <li
        className={`relative ${style.FriendListItem}`}
        key={item.id}
        onClick={() => handleOpenChat(item.id)}
      >
        <Avatar
          src={item.avatar}
          sx={{
            width: "32px",
            height: "32px",
            border: "1px #b6b8bd solid",
          }}
        />
        {item?.status === "active" ? (
          <span className="absolute left-7 top-8 h-3 w-3 rounded-full border-2 border-black bg-onlineStatus "></span>
        ) : null}
        <span className="text-sm font-semibold">
          {" "}
          {item.firstname + " " + item.surname}{" "}
        </span>
      </li>
    </div>
  );
};

const FriendSearch = () => {
  return (
    <div className="flex w-full justify-between pr-10 pt-8 text-base font-semibold">
      Người liên hệ
      <div className=" flex items-center justify-center">
        <div className={style.PostCreateIconBox}>
          <SearchIcon
            sx={{ color: "#65676b" }}
            className={style.PostCreateIcon}
          />
        </div>
        <div className={style.PostCreateIconBox}>
          <MoreHorizIcon
            sx={{ color: "#65676b" }}
            className={style.PostCreateIcon}
          />
        </div>
      </div>
    </div>
  );
};
export const FriendList = () => {
  const friends = useSelector((state) => state.user.friends);
  const [ChatBoxVisible, setChatBoxVisible] = useState(false);
  const [currentChat, setcurrentChat] = useState();
  const handleOpenChat = (id) => {
    setChatBoxVisible(true);
    setcurrentChat(id);
  };
  return (
    <div className="box-border h-dvh  flex-[1] pt-16">
      <div className="fixed  h-4/5 w-1/4">
        {ChatBoxVisible ? (
          <ChatBox
            setChatBoxVisible={setChatBoxVisible}
            friendId={currentChat}
          />
        ) : null}
        <FriendSearch />
        <ul className="flex h-full w-full flex-col gap-3 overflow-y-auto pb-20 pl-6 scrollbar scrollbar-track-[#E6E7EB] scrollbar-thumb-[#BCC0C4] scrollbar-thumb-rounded-full scrollbar-w-3">
          {friends?.map((item) => (
            <Friend item={item} handleOpenChat={handleOpenChat} key={item.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};
