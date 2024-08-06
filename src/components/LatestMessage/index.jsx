import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { formatTimeDiff, calculateTimeDifference } from "../../helper/TimeDiff";
import NoAva from "../../image/noAvatar.png";
import { useDispatch } from "react-redux";
import { ManageChatBox } from "../../slice/ChatSlice";
export const LatestMessage = ({ LatestMessageInfo, setNavSetting }) => {
  const [timeDiff, setTimeDiff] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeDiff(calculateTimeDifference(LatestMessageInfo.createdAt));
  }, [LatestMessageInfo.createdAt]);
  const handleOpenChat = (id) => {
    dispatch(
      ManageChatBox({ status: true, id: LatestMessageInfo?.receiver?.id }),
    );
    setNavSetting((prev) => "");
  };
  return (
    <div
      className="relative mb-4 h-20 w-86 cursor-pointer bg-white px-1"
      onClick={() => handleOpenChat(LatestMessageInfo?.receiver?.id)}
    >
      <div className="flex h-full w-full rounded-xl py-2 pr-3 hover:bg-iconHover">
        <div className="flex h-full w-20 items-center justify-center">
          <Avatar
            src={LatestMessageInfo?.receiver?.avatar ?? NoAva}
            sx={{
              width: "56px",
              height: "56px",
              border: "1px #b6b8bd solid",
            }}
          />
        </div>
        <div className="relative flex flex-1 flex-col justify-center text-start text-commentContent">
          <strong className="text-sm">
            {`${LatestMessageInfo?.receiver?.firstname} ${LatestMessageInfo?.receiver?.surname} `}
          </strong>
          <div className="flex gap-2 text-commentAuthor text-registerLabel">
            <div className="overflow-hidden">{LatestMessageInfo?.content}</div>
            <span>{formatTimeDiff(timeDiff)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
