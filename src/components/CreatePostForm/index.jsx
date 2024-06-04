import React, { useState } from "react";
import CloseBtn from "../../image/closeButton.png";
import { Divider } from "@mui/material";
import noAvatar from "../../image/noAvatar.png";
import ImageOrVideoIcon from "../../image/imgOrVideoIcon.png";
import CheckInIcon from "../../image/CheckInIcon.png";
import GiftIcon from "../../image/GifIcon.png";
import ReactIcon from "../../image/iconPost.png";
import TagIcon from "../../image/TagIcon.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import style from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import PostApi from "../../api/PostApi";
import { useForm } from "react-hook-form";
import { chosingImage, convertToFormData } from "../../helper/FormDataHelper";
import { addPost } from "../../slice/NewFeedSlice";

const CreatePostFormHeader = ({ setCreatePost }) => {
  return (
    <div className=" relative h-12 text-center text-xl font-bold ">
      Tạo bài viết
      <span className="bg-main absolute -top-1 right-2 cursor-pointer rounded-full p-2 duration-150 hover:bg-hover">
        <img
          src={CloseBtn}
          alt="close-button"
          className="box-border h-6 w-6 object-center hover:cursor-pointer"
          onClick={() => setCreatePost(false)}
        />
      </span>
    </div>
  );
};
const CreatePostRange = ({ user }) => {
  return (
    <div className="flex w-full  items-center gap-3 p-2">
      <img
        src={noAvatar}
        alt="avatar"
        className=" h-10 w-10 rounded-full shadow-inner"
      />
      <div className="flex flex-[1] flex-col text-start text-base font-semibold">
        {user.userInfo.firstname + " " + user.userInfo.surname}
        <select className="flex w-fit items-center justify-center rounded-md bg-hover p-1 text-[12px] font-medium">
          <option value="">Bạn bè</option>
          <option value="">Riêng tư</option>
        </select>
      </div>
    </div>
  );
};
const CreatePostInput = ({ user, setTextValue, TextValue }) => {
  return (
    <div className="h-2/5 w-full p-2">
      <textarea
        className="h-full w-full resize-none  text-2xl scrollbar scrollbar-track-[#E6E7EB] scrollbar-thumb-[#BCC0C4] scrollbar-thumb-rounded-[9999px]  scrollbar-w-3 scrollbar-h-2 focus:border-none  focus:outline-none"
        placeholder={user.userInfo.surname + " ơi bạn nghĩ gì thế"}
        autoFocus
        value={TextValue}
        onChange={(e) => setTextValue(e.target.value)}
      />
    </div>
  );
};

const CreatePostMedia = ({
  handleSubmit,
  chosingImage,
  handleCreatePost,
  register,
  setImageFile,
}) => {
  return (
    <div className="">
      <form
        className="flex w-full items-center justify-center p-2"
        onSubmit={handleSubmit(handleCreatePost)}
      >
        <div className=" border-main border-main flex w-full cursor-pointer items-center rounded-md border-[1px] px-2 shadow-md xs:py-2">
          <div className="flex h-14 flex-[1] items-center justify-center text-base font-semibold xs:hidden">
            Thêm vào bài viết của bạn
          </div>
          <div className="flex flex-[1] gap-2 xs:justify-center">
            <div className={style.PostCreateIconBox}>
              <label htmlFor="fileInput">
                <img
                  src={ImageOrVideoIcon}
                  alt="i or video"
                  width={24}
                  height={24}
                  className={style.PostCreateIcon}
                />
              </label>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                style={{ display: "none" }}
                {...register("file")}
                onChange={(e) => chosingImage(e, setImageFile)}
              />
            </div>
            <div className={style.PostCreateIconBox}>
              <img
                src={TagIcon}
                alt="tag"
                width={24}
                height={24}
                className={style.PostCreateIcon}
              />
            </div>
            <div className={style.PostCreateIconBox}>
              <img
                src={ReactIcon}
                alt="react"
                width={24}
                height={24}
                className={style.PostCreateIcon}
              />
            </div>
            <div className={style.PostCreateIconBox}>
              <img
                src={CheckInIcon}
                alt="checkin"
                width={24}
                height={24}
                className={style.PostCreateIcon}
              />
            </div>
            <div className={style.PostCreateIconBox}>
              <img
                src={GiftIcon}
                alt="gift"
                width={24}
                height={24}
                className={style.PostCreateIcon}
              />
            </div>
            <div className={style.PostCreateIconBox}>
              <MoreHorizIcon
                sx={{ color: "#65676b" }}
                className={style.PostCreateIcon}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export const CreatePostForm = ({ setCreatePost }) => {
  const user = useSelector((state) => state.user);
  const [ImageFile, setImageFile] = useState();
  const [TextValue, setTextValue] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const handleCreatePost = async () => {
    if (TextValue !== "") {
      try {
        const postData = {
          content: TextValue,
          authorId: user.userInfo.id,
        };
        let formData = convertToFormData(postData, ImageFile);
        const response = await PostApi.createPost(formData);
        if (typeof response === "object") {
          alert("successfully create post");
          dispatch(addPost({ post: response }));
          setCreatePost(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="fixed left-0 top-0 z-[100] h-dvh w-dvw bg-[#fcfcfd] bg-opacity-50 ">
      <div className="absolute bottom-0 left-0 right-0 top-0 z-50 mb-auto ml-auto mr-auto mt-auto h-107 w-125 rounded-lg bg-white p-4 shadow-lg xs:w-96">
        {/* header */}
        <CreatePostFormHeader setCreatePost={setCreatePost} />
        <Divider variant="fullWidth" />
        {/* name and status of post ( private or everyone,...) */}
        <CreatePostRange user={user} />
        {/* text area where to put text to post */}
        <CreatePostInput
          setTextValue={setTextValue}
          user={user}
          TextValue={TextValue}
        />
        {/* additional file or image to your post */}
        <CreatePostMedia
          handleCreatePost={handleCreatePost}
          handleSubmit={handleSubmit}
          setImageFile={setImageFile}
          register={register}
          chosingImage={chosingImage}
        />
        {/* submit button */}
        <div className="px-3">
          <button
            onClick={() => handleCreatePost()}
            className={`h-9 w-full rounded-md text-base font-semibold ${
              TextValue.length !== 0
                ? " cursor-pointer bg-primary text-white"
                : "cursor-not-allowed bg-hover text-[#bcc0c4]"
            }`}
          >
            Đăng
          </button>
        </div>
      </div>
    </div>
  );
};
