import React, { useEffect } from "react";
import { NavBar } from "../../components/NavBar";
import { useSearchParams } from "react-router-dom";
import PostApi from "../../api/PostApi";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getAllUsers } from "../../slice/SearchSlice";
import { ListPost } from "../../components/ListPost";
import UserApi from "../../api/UserApi";
import { Avatar, AvatarGroup } from "@mui/material";
import StoryTestImg from "../../image/storyTest.jpg";
import testAvaPost from "../../image/TestAvaPost.jpg";
const UserInfo = ({ user }) => {
  const { userInfo } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
  const handleAddFriend = async (id) => {
    const notifyInfo = {
      type: "FRIENDREQUEST_NOTIFY",
      senderId: userInfo.id,
      receiverId: user.id,
    };
    try {
      console.log(socket, notifyInfo);
      socket.emit("notification", notifyInfo);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-5 flex gap-3">
      <Avatar sx={{ height: 60, width: 60 }} src={user.avatar} />
      <div className="flex flex-1 flex-col items-start text-base">
        <div className="font-semibold">
          {user.firstname + " " + user.surname}
        </div>
        <div className="text-gray-600">Bạn bè</div>
        <AvatarGroup
          max={3}
          sx={{
            "& .MuiAvatar-root": { width: 24, height: 24, fontSize: 15 },
          }}
        >
          <Avatar src={StoryTestImg}>PHÚC</Avatar>
          <Avatar src={testAvaPost} />
          <Avatar src="1">quân</Avatar>
          <Avatar src="1">khoa</Avatar>
        </AvatarGroup>
      </div>
      <button
        className="flex h-9 items-center justify-center  self-end rounded-md bg-messageBtn px-3  text-sm font-semibold text-boldprimary hover:brightness-95"
        onClick={() => handleAddFriend(user.id)}
      >
        {user.friends.some((friend) => friend.id === userInfo.id)
          ? "Nhắn tin"
          : "Thêm bạn bè"}
      </button>
    </div>
  );
};
const UserFindResult = ({ users }) => {
  return (
    <div className="flex min-h-134 w-175 flex-col rounded-lg bg-white p-5">
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
  useEffect(() => {
    const FindBySearchKeyWord = async () => {
      try {
        const posts = await PostApi.getAllPosts({ search: search.get("q") });
        const users = await UserApi.getAllUser({ search: search.get("q") });
        dispatch(getAllPosts({ posts: posts.data }));
        dispatch(getAllUsers({ users: users.data }));
      } catch (error) {}
    };
    FindBySearchKeyWord();
  }, [search, dispatch]);

  return (
    <div className="relative min-h-dvh  w-dvw overflow-y-auto bg-newFeedmain">
      <NavBar />
      <div className=" flex min-h-dvh w-full ">
        <div className="box-border flex flex-[2] flex-col items-center gap-5 overflow-y-auto pb-5 pt-32">
          {users.length <= 0 ? null : <UserFindResult users={users} />}
          <ListPost posts={posts} search={true} />
        </div>
      </div>
    </div>
  );
};
