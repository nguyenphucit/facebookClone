import React, { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import PostApi from "../../api/PostApi";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getAllUsers } from "../../slice/SearchSlice";
import { ListPost } from "../../components/ListPost";
import UserApi from "../../api/UserApi";
import { Avatar, AvatarGroup } from "@mui/material";
import { getUserInfo } from "../../slice/UserSlice";
import FriendApi from "../../api/FriendsApi";
const UserInfo = ({ user }) => {
  const { userInfo } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
  const [mutualFriend, setmutualFriend] = useState();
  const handleAddFriend = async () => {
    const notifyInfo = {
      type: "FRIENDREQUEST_NOTIFY",
      senderId: userInfo.id,
      receiverId: user.id,
    };
    try {
      socket.emit("notification", notifyInfo);
      alert("đã gửi lời mời kết bạn");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getMutualFriend = async () => {
      try {
        const response = await FriendApi.GetMutualFriend(userInfo.id, user.id);
        if (response.statusCode === 200) setmutualFriend(() => response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMutualFriend();
    // eslint-disable-next-line
  }, [userInfo.id]);
  return (
    <div className="mt-5 flex gap-3 xs:flex-wrap">
      <Avatar sx={{ height: 60, width: 60 }} src={user.avatar} />
      <div className="flex flex-1 flex-col items-start text-base">
        <div className="font-semibold">
          {user.firstname + " " + user.surname}
        </div>
        <div className="text-gray-600">Bạn bè</div>
        <div className="flex justify-start">
          <AvatarGroup
            max={3}
            sx={{
              "& .MuiAvatar-root": { width: 24, height: 24, fontSize: 15 },
            }}
          >
            {mutualFriend?.map((mutualFriend) => (
              <Avatar src={mutualFriend.avatar} key={mutualFriend.id} />
            ))}
          </AvatarGroup>
          <span className="text-commentAuthor text-registerLabel">
            {/* {
              friends.filter((friend) =>
                user.friends.some((item) => item.id === friend.id),
              ).length
            }{" "} */}
            {mutualFriend?.length} bạn chung
          </span>
        </div>
      </div>
      {user.id === userInfo.id ? null : (
        <button
          className="flex h-9 items-center justify-center  self-end rounded-md bg-messageBtn px-3  text-sm font-semibold text-boldprimary hover:brightness-95 xs:w-full"
          onClick={() => handleAddFriend(user.id)}
        >
          {user.friends.some((friend) => friend.id === userInfo.id)
            ? "Nhắn tin"
            : "Thêm bạn bè"}
        </button>
      )}
    </div>
  );
};
const UserFindResult = ({ users }) => {
  return (
    <div className="flex min-h-60 w-3/4 flex-col rounded-lg bg-white p-5 xs:w-full  ">
      <h3 className="self-start text-2xl font-bold">Mọi người</h3>
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <UserInfo user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
};
export const SearchPage = () => {
  const [search] = useSearchParams();
  const { posts, users } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    const FindBySearchKeyWord = async () => {
      try {
        const posts = await PostApi.getAllPosts({ search: search.get("q") });
        const users = await UserApi.getAllUser({ search: search.get("q") });
        if (posts.statusCode === 200)
          dispatch(getAllPosts({ posts: posts.data.data }));
        if (users.statusCode === 200)
          dispatch(getAllUsers({ users: users.data.data }));
        if (posts.statusCode === 401) {
          alert(posts.message);
          sessionStorage.removeItem("access_token");
          window.location.replace("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    FindBySearchKeyWord();
  }, [search, dispatch]);
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
            if (userInfo.id === null || userInfo.id === undefined) {
              const payload = JSON.parse(utf8Payload);
              const userInfo = await UserApi.getUserById(payload.id);
              dispatch(getUserInfo({ user: userInfo.data }));
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
  }, [userInfo.id]);
  return (
    <div className="relative min-h-dvh  w-dvw overflow-y-auto bg-newFeedmain">
      <NavBar />
      <div className=" flex min-h-dvh w-full ">
        <div className="box-border flex flex-[2] flex-col items-center gap-5 overflow-y-auto pb-5 pt-32 xs:pt-20">
          {users.length <= 0 ? null : <UserFindResult users={users} />}
          <ListPost posts={posts} search={true} />
        </div>
      </div>
    </div>
  );
};
