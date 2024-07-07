import React, { useState, useEffect } from "react";
import { NavBar } from "../../components/NavBar";
import { LeftMenu } from "../../components/LeftMenu";
import { StoryList } from "../../components/StoryList";
import { CreatePost } from "../../components/CreatePost";
import { CreatePostForm } from "../../components/CreatePostForm";
import { FriendList } from "../../components/FriendList";
import { ListPost } from "../../components/ListPost";
import { useNavigate } from "react-router-dom";
import PostApi from "../../api/PostApi";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../slice/NewFeedSlice";
import {
  getAllNotifications,
  getFriendByUserId,
  getUserInfo,
} from "../../slice/UserSlice";
import FriendApi from "../../api/FriendsApi";
import UserApi from "../../api/UserApi";
import { io } from "socket.io-client";
import { setSocket } from "../../slice/SocketSlice";
import { getNotification } from "../../slice/UserSlice";
import NotificationApi from "../../api/NotificationApi";
import { LoadingPage } from "../LoadingPage";
export const NewFeed = () => {
  const [CreateFormVisible, setCreateFormVisible] = useState(false);
  const { posts } = useSelector((state) => state.newFeed);
  const { id } = useSelector((state) => state.user.userInfo);
  const [Loading, setLoading] = useState(false);
  const { socket } = useSelector((state) => state.socket);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const checkInfoAfterReload = async () => {
      if (
        sessionStorage.getItem("access_token") === null ||
        sessionStorage.getItem("access_token") === "undefined"
      )
        navigate("/login");
      else {
        try {
          // Giải mã thông tin người dùng từ access_token (chuỗi JWT)
          const tokenParts = sessionStorage.getItem("access_token").split(".");
          if (tokenParts.length === 3) {
            // Giải mã base64
            const base64Url = tokenParts[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const decodedPayload = atob(base64);

            // Sử dụng TextDecoder để giải mã UTF-8
            const utf8Decoder = new TextDecoder("utf-8");
            const utf8Payload = utf8Decoder.decode(
              new Uint8Array([...decodedPayload].map((c) => c.charCodeAt(0))),
            );

            // Chuyển đổi thành đối tượng JavaScript
            if (id === null || id === undefined) {
              const payload = JSON.parse(utf8Payload);
              const userInfo = await UserApi.getUserById(payload.id);
              dispatch(getUserInfo({ user: userInfo }));
            }
          } else {
            console.error("Invalid access_token format");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    checkInfoAfterReload();

    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await PostApi.getAllPosts({});
        if (typeof response === "object")
          dispatch(getAllPosts({ posts: response.data }));
      } catch (error) {
        console.log(error);
      }
    };
    if (
      sessionStorage.getItem("access_token") !== null &&
      sessionStorage.getItem("access_token") !== "undefined"
    )
      getPosts();
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await FriendApi.getFriendById(id);
        if (response)
          dispatch(getFriendByUserId({ friends: response.friendList }));
      } catch (error) {
        console.log(error);
      }
    };
    if (
      sessionStorage.getItem("access_token") !== null &&
      sessionStorage.getItem("access_token") !== "undefined"
    )
      getFriends();
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await NotificationApi.getNotificationByUserId(id);
        if (response)
          dispatch(getAllNotifications({ notifications: response }));
      } catch (error) {
        console.log(error);
      }
    };
    if (
      sessionStorage.getItem("access_token") !== null &&
      sessionStorage.getItem("access_token") !== "undefined"
    )
      getNotifications();
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    if (socket !== undefined) {
      const newSocket = io(
        process.env.REACT_APP_WEBSERVER_URL ?? "http://localhost:3001",
      );
      dispatch(setSocket({ socket: newSocket }));
    }
    // eslint-disable-next-line
  }, [id]);
  const NotificationListener = (notification) => {
    console.log(notification);
    if (id === notification.receiverId) {
      dispatch(getNotification({ notification: notification }));
    }
  };
  useEffect(() => {
    if (socket)
      socket?.on("notification", (notification) =>
        NotificationListener(notification),
      );
    // eslint-disable-next-line
  }, [socket]);
  console.log(socket);
  return (
    <div className="relative min-h-dvh  w-dvw overflow-hidden bg-newFeedmain">
      {Loading ? <LoadingPage /> : null}
      {CreateFormVisible ? (
        <CreatePostForm
          setCreatePost={setCreateFormVisible}
          setLoading={setLoading}
        />
      ) : null}
      <NavBar />
      <div className=" flex min-h-dvh w-full ">
        <LeftMenu />
        <div className="box-border flex flex-[2] flex-col items-center gap-5 overflow-y-auto pb-5 pt-16">
          <StoryList />
          <CreatePost setCreatePostVisible={setCreateFormVisible} />
          <ListPost posts={posts} />
        </div>
        <FriendList />
      </div>
    </div>
  );
};
