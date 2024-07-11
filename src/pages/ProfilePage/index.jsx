import React, { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import { ProfileTopInfo } from "../../components/profileTopInfo";
import { ListPost } from "../../components/ListPost";
import PostApi from "../../api/PostApi";
import { useDispatch, useSelector } from "react-redux";
import { CreatePost } from "../../components/CreatePost";
import { CreatePostForm } from "../../components/CreatePostForm";
import {
  getAllImagesByUserId,
  getAllPostsByUserId,
} from "../../slice/ProfileSlice";
import { useParams } from "react-router-dom";
import { LoadingPage } from "../LoadingPage";

const ImageInProfile = ({ images }) => {
  return (
    <div className="min-h-40 w-full rounded-md bg-white p-3">
      <div className=" flex justify-between">
        <h2 className="text-xl font-bold">Ảnh</h2>
        <a href="/pictures" className="text-lg text-primary">
          xem tất cả ảnh
        </a>
      </div>
      <ul className="mt-3 flex flex-wrap gap-1 overflow-hidden rounded-lg">
        {images.map((item) => (
          <li
            key={item}
            className=" w-3/9 flex-auto cursor-pointer hover:brightness-90 "
          >
            <img
              src={item}
              alt={item}
              className=" aspect-square object-center"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
const LeftProfileInfo = ({ images }) => {
  return (
    <div className="flex w-90 flex-auto flex-col items-center gap-5  p-4">
      <div className="min-h-40 w-full rounded-md bg-white p-3">Giới thiệu</div>
      {/* all images */}
      <ImageInProfile images={images} />
    </div>
  );
};
export const ProfilePage = () => {
  const [CreateFormVisible, setCreateFormVisible] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { posts, images } = useSelector((state) => state.profile);
  const { userInfo } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await PostApi.getPostByUserId(id);
        if (response.statusCode === 200)
          dispatch(getAllPostsByUserId({ posts: response.data }));
        else if (response.statusCode === 401) {
          alert(response.message);
          sessionStorage.removeItem("access_token");
          window.location.replace("/");
        } else alert(response.message);
        dispatch(getAllImagesByUserId());
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
  return (
    <div className="relative min-h-dvh  w-dvw overflow-hidden bg-newFeedmain">
      {loading ? <LoadingPage /> : null}
      {CreateFormVisible ? (
        <CreatePostForm
          setCreatePost={setCreateFormVisible}
          setLoading={setloading}
        />
      ) : null}
      <NavBar />
      {/* top Info ( main info) */}
      <ProfileTopInfo userId={id} />
      {/*profile content ( post-image,...) */}
      <div className="mt-4 flex w-full justify-center">
        <div className="flex min-h-dvh w-3/5 xs:w-full xs:flex-col xs:items-center ">
          <LeftProfileInfo images={images} />
          <div className="mb-3 ml-3 w-125 flex-auto p-4 xs:w-full ">
            {Number.parseInt(id) === userInfo.id ? (
              <CreatePost setCreatePostVisible={setCreateFormVisible} />
            ) : null}
            <ListPost posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
};
