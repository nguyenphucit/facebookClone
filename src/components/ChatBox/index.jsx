import { Avatar } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
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
import { VideoCallWindow } from "../VideoCallWindow";
import { generateRoomID } from "../../helper/GenerateRoomId";
const ChatNav = ({ friendInfo, setChatBoxVisible, userInfo, socket }) => {
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState();
  const [sendCall, setsendCall] = useState(false);
  const [caller, setCaller] = useState();
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  useEffect(() => {
    socket.on("sendCallRequest", (data) => {
      setReceivingCall(true);
      setCallerSignal(data.signal);
      setCaller(() => data.from);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex h-12 w-full items-center justify-between p-1 text-base font-medium shadow-navBar">
      {receivingCall || sendCall ? (
        <VideoCallWindow
          sender={userInfo}
          receiver={friendInfo}
          socket={socket}
          receivingCall={receivingCall}
          sendCall={sendCall}
          caller={caller}
          callerSignal={callerSignal}
          ref={{
            myVideoRef: myVideo,
            userVideoRef: userVideo,
            connectionRef: connectionRef,
          }}
        />
      ) : null}
      <div className=" flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 hover:bg-iconHover">
        <Avatar
          sx={{ width: "32px", height: "32px" }}
          src={friendInfo?.avatar}
        />
        {friendInfo?.firstname + " " + friendInfo?.surname}
      </div>
      <div className="flex gap-1">
        <LocalPhoneSharp
          sx={{ color: "#bcc0c4" }}
          className="box-content cursor-pointer rounded-full p-1 hover:bg-hover"
        />
        <Videocam
          sx={{ color: "#bcc0c4" }}
          className="box-content cursor-pointer rounded-full p-1 hover:bg-hover"
          onClick={() => setsendCall(true)}
        />
        <Remove
          sx={{ color: "#bcc0c4" }}
          className="box-content cursor-pointer rounded-full p-1 hover:bg-hover"
        />
        <Clear
          sx={{ color: "#bcc0c4" }}
          className="box-content cursor-pointer rounded-full p-1 hover:bg-hover"
          onClick={() => setChatBoxVisible(false)}
        />
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

const ChatInput = ({ userInfo, socket, roomId }) => {
  const [newMessage, setnewMessage] = useState();

  const handleSendMessage = (e) => {
    if (e.key === "Enter") {
      const info = {
        senderId: userInfo.id,
        content: newMessage,
        roomId: roomId,
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
    const roomId = generateRoomID(userInfo.id, friendId);
    socket?.emit("joinChat", { roomId, userId: userInfo.id });
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

  return (
    <div className="absolute -bottom-20 right-8 h-113.75 w-84.5 pl-[10px]">
      <div className=" relative h-full w-full rounded-md  bg-white shadow-loginForm">
        {/* top-chat navbar */}
        <ChatNav
          setChatBoxVisible={setChatBoxVisible}
          friendInfo={friendInfo}
          userInfo={userInfo}
          socket={socket}
        />
        {/* content */}
        <ChatContent messages={messages} />
        {/* bottom-chat input */}
        <ChatInput
          socket={socket}
          userInfo={userInfo}
          roomId={generateRoomID(userInfo.id, friendId)}
        />
      </div>
    </div>
  );
};
