import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  Clear,
  Remove,
  AddCircle,
  LocalPhoneSharp,
  Videocam,
} from "@mui/icons-material";
import ImageOrVideoIcon from "../../image/imgOrVideoIcon.png";
import style from "./index.module.css";
import Message from "../Message";
import { useSelector } from "react-redux";
import ChatApi from "../../api/ChatApi";

const ChatNav = ({ friendInfo, setChatBoxVisible }) => {
  return (
    <div className="flex h-12 w-full items-center justify-between p-1 text-base font-medium shadow-navBar">
      <div className=" flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 hover:bg-iconHover">
        <Avatar
          sx={{ width: "32px", height: "32px" }}
          src={friendInfo?.avatar}
        />
        {friendInfo?.firstname + " " + friendInfo?.surname}
      </div>
      <div className=" flex gap-1">
        <span>
          <LocalPhoneSharp
            sx={{ color: "#bcc0c4" }}
            className="box-content cursor-pointer rounded-full p-1 hover:bg-hover"
          />
        </span>
        <span>
          <Videocam
            sx={{ color: "#bcc0c4" }}
            className="box-content cursor-pointer rounded-full p-1 hover:bg-hover"
          />
        </span>
        <span>
          <Remove
            sx={{ color: "#bcc0c4" }}
            className="box-content cursor-pointer rounded-full p-1 hover:bg-hover"
          />
        </span>
        <span onClick={() => setChatBoxVisible(false)}>
          <Clear
            sx={{ color: "#bcc0c4" }}
            className="box-content cursor-pointer rounded-full p-1 hover:bg-hover"
          />
        </span>
      </div>
    </div>
  );
};

const ChatContent = ({ messages }) => {
  return (
    <div className="flex h-4/5 flex-col gap-3 overflow-y-auto overflow-x-hidden p-3 pb-5">
      {messages?.map((item) => (
        <Message key={item.id} messageInfo={item} />
      ))}
    </div>
  );
};

const ChatInput = ({ userInfo, socket, friendId }) => {
  const [newMessage, setnewMessage] = useState();
  const generateRoomID = (senderId, friendId) => {
    // Sort the IDs to ensure consistency regardless of the order they are passed in
    const sortedIds = [senderId, friendId].sort((a, b) => a - b);

    // Concatenate the sorted IDs to form the room ID
    const roomId = sortedIds.join("_");

    return roomId;
  };
  const handleSendMessage = (e) => {
    if (e.key === "Enter") {
      const info = {
        senderId: userInfo.id,
        content: newMessage,
        roomId: generateRoomID(userInfo.id, friendId),
      };
      socket?.emit("message", info);
      setnewMessage("");
    }
  };
  return (
    <div className="absolute bottom-0 left-0 flex h-16 w-full items-center justify-center">
      <div className="flex flex-[1] items-center justify-center px-2">
        <AddCircle
          sx={{ color: "#bcc0c4", width: "28px", height: "28px" }}
          className="box-content cursor-pointer rounded-full p-1 hover:bg-hover"
        />
        <img
          src={ImageOrVideoIcon}
          alt="i or video"
          width={24}
          height={24}
          className={style.PostCreateIcon}
        />
      </div>
      <input
        type="text"
        className="mr-3 flex-[1] rounded-2xl bg-iconHover p-2 text-base focus:border-none focus:outline-none"
        placeholder="Aa"
        value={newMessage}
        onChange={(e) => setnewMessage(e.target.value)}
        onKeyDown={(e) => handleSendMessage(e)}
      />
    </div>
  );
};
export const ChatBox = ({ setChatBoxVisible, friendId }) => {
  const friends = useSelector((state) => state.user.friends);
  const { userInfo } = useSelector((state) => state.user);
  const [friendInfo, setfriendInfo] = useState();
  const { socket } = useSelector((state) => state.socket);
  const [messages, setMessages] = useState([]);
  const MessageListener = (message) => {
    setMessages(() => [...messages, message]);
  };
  useEffect(() => {
    const friend = friends.find((item) => item.id === friendId);
    setfriendInfo(friend);
    // eslint-disable-next-line
  }, [friendId]);

  useEffect(() => {
    socket?.on("message", MessageListener);

    return async () => {
      socket?.off("message", MessageListener);
    };
    // eslint-disable-next-line
  }, [MessageListener]);
  useEffect(() => {
    const getHistoryChat = async () => {
      try {
        const response = await ChatApi.getChatByRoomId(
          generateRoomID(userInfo.id, friendId),
        );
        setMessages(() => response);
      } catch (error) {
        console.log(error);
      }
    };
    getHistoryChat();
  }, [userInfo.id, friendId]);

  const generateRoomID = (senderId, friendId) => {
    // Sort the IDs to ensure consistency regardless of the order they are passed in
    const sortedIds = [senderId, friendId].sort((a, b) => a - b);

    // Concatenate the sorted IDs to form the room ID
    const roomId = sortedIds.join("_");

    return roomId;
  };

  return (
    <div className="absolute -bottom-20 right-8 h-113.75 w-84.5 pl-[10px]">
      <div className=" h-full w-full rounded-md bg-white  shadow-loginForm">
        {/* top-chat navbar */}
        <ChatNav
          setChatBoxVisible={setChatBoxVisible}
          friendInfo={friendInfo}
        />
        {/* content */}
        <ChatContent messages={messages} />
        {/* bottom-chat input */}
        <ChatInput socket={socket} userInfo={userInfo} friendId={friendId} />
      </div>
    </div>
  );
};
