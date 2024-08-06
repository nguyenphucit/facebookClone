import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { calculateTimeDifference, formatTimeDiff } from "../../helper/TimeDiff";
import FriendApi from "../../api/FriendsApi";
import { useSelector } from "react-redux";
import NotificationApi from "../../api/NotificationApi";

export const Notification = ({ notificationInfo }) => {
  const [timeDiff, setTimeDiff] = useState({});
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    setTimeDiff(calculateTimeDifference(notificationInfo.createdAt));
  }, [notificationInfo.createdAt]);

  const handleAcceptFriendRequest = async () => {
    try {
      await FriendApi.AddFriend(notificationInfo.sender.id, userInfo.id);
      await NotificationApi.deleteNotificationById(notificationInfo.id);
      alert("Đã chấp nhận lời mời kết bạn");
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeclineFriendRequest = async () => {
    try {
      await NotificationApi.deleteNotificationById(notificationInfo.id);
      alert("đã từ chối lời mời kết bạn");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative mb-4 h-23.5 w-86 cursor-pointer bg-white px-1">
      <div className="flex h-full w-full rounded-xl py-2 pr-3 hover:bg-iconHover">
        <div className="flex h-full w-20 justify-center">
          <Avatar
            src={notificationInfo.sender.avatar}
            sx={{
              width: "56px",
              height: "56px",
              border: "1px #b6b8bd solid",
            }}
          />
        </div>
        <div className="relative flex-1 text-start text-commentContent">
          <strong>
            {`${notificationInfo.sender.firstname} ${notificationInfo.sender.surname} `}
          </strong>
          {notificationInfo.content}
          <div className="absolute -bottom-1 left-1 text-commentAuthor">
            <a href="text-registerLabel">{formatTimeDiff(timeDiff)}</a>
          </div>
        </div>
      </div>
      {notificationInfo.type === "FRIENDREQUEST_NOTIFY" && (
        <div className="absolute bottom-1 right-4 flex gap-3">
          <button
            className="flex items-center justify-center rounded-md bg-iconHover p-2 px-4 text-sm font-semibold text-black hover:brightness-95"
            onClick={() => handleDeclineFriendRequest()}
          >
            Từ chối
          </button>
          <button
            className="flex items-center justify-center rounded-md bg-primary p-2 text-sm font-semibold text-white hover:brightness-95"
            onClick={handleAcceptFriendRequest}
          >
            Chấp nhận
          </button>
        </div>
      )}
    </div>
  );
};
