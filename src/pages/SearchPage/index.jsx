import React, { useEffect } from "react";
import { NavBar } from "../../components/NavBar";
import { useSearchParams } from "react-router-dom";
import PostApi from "../../api/PostApi";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getAllUsers } from "../../slice/SearchSlice";
import { ListPost } from "../../components/ListPost";
import UserApi from "../../api/UserApi";

const UserFindResult = () => {
  return (
    <div className="">
      <div className=""></div>
    </div>
  );
};
export const SearchPage = () => {
  const [search] = useSearchParams();
  const { posts } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  useEffect(() => {
    const FindBySearchKeyWord = async () => {
      try {
        const posts = await PostApi.getAllPosts({ search: search.get("q") });
        const users = await UserApi.getAllUser({ search: search.get("q") });
        dispatch(getAllPosts({ posts: posts.data }));
        dispatch(getAllUsers({ users: users }));
      } catch (error) {}
    };
    FindBySearchKeyWord();
  }, [search, dispatch]);

  return (
    <div className="relative min-h-dvh  w-dvw overflow-hidden bg-newFeedmain">
      <NavBar />
      <div className=" flex min-h-dvh w-full ">
        <div className="box-border flex flex-[2] flex-col items-center gap-5 overflow-y-auto pb-5 pt-16">
          <ListPost posts={posts} />
        </div>
      </div>
    </div>
  );
};
