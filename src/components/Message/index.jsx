import React from "react";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { ContainsWhiteSpace } from "../../helper/ContainSpace";
const Message = ({ messageInfo }) => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div
      className={`max-w-[75%] ${userInfo.id === messageInfo.senderId ? "self-end" : null}`}
    >
      <div className="flex w-full items-center gap-2 text-base">
        {userInfo.id === messageInfo.senderId ? null : (
          <Avatar
            src={messageInfo.sender.avatar}
            sx={{ width: 25, height: 25 }}
          />
        )}
        <div className="flex max-w-full items-start justify-start rounded-3xl bg-iconHover px-3 py-1">
          <p
            className={`text-chatContent break-${ContainsWhiteSpace(messageInfo.content) > 30 ? "all" : "words"} text-start`}
          >
            {messageInfo.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Message);
