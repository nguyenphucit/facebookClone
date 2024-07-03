import React, { useState } from "react";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PostApi from "../../api/PostApi";
import { addPost } from "../../slice/NewFeedSlice";
import { chosingImage, convertToFormData } from "../../helper/FormDataHelper";
import CloseBtn from "../../image/closeButton.png";
import noAvatar from "../../image/noAvatar.png";
import ImageOrVideoIcon from "../../image/imgOrVideoIcon.png";
import CheckInIcon from "../../image/CheckInIcon.png";
import GiftIcon from "../../image/GifIcon.png";
import ReactIcon from "../../image/iconPost.png";
import TagIcon from "../../image/TagIcon.png";
import style from "./index.module.css";

const CreatePostFormHeader = ({ setCreatePost }) => (
  <div className="relative h-12 text-center text-xl font-bold">
    Tạo bài viết
    <span
      className="bg-main absolute right-2 top-1 cursor-pointer rounded-full p-2 duration-150 hover:bg-hover"
      onClick={() => setCreatePost(false)}
    >
      <img
        src={CloseBtn}
        alt="close-button"
        className="h-6 w-6 hover:cursor-pointer"
      />
    </span>
  </div>
);

const CreatePostRange = ({ user }) => (
  <div className="flex w-full items-center gap-3 p-2">
    <img
      src={noAvatar}
      alt="avatar"
      className="h-10 w-10 rounded-full shadow-inner"
    />
    <div className="flex flex-1 flex-col text-start text-base font-semibold">
      {user.userInfo.firstname + " " + user.userInfo.surname}
      <select className="w-fit rounded-md bg-hover p-1 text-[12px] font-medium">
        <option value="">Bạn bè</option>
        <option value="">Riêng tư</option>
      </select>
    </div>
  </div>
);

const CreatePostInput = ({ user, TextValue, setTextValue }) => (
  <div className="h-2/5 w-full p-2">
    <textarea
      className="h-full w-full resize-none text-2xl scrollbar scrollbar-track-[#E6E7EB] scrollbar-thumb-[#BCC0C4] scrollbar-thumb-rounded-[9999px] scrollbar-w-3 scrollbar-h-2 focus:border-none focus:outline-none"
      placeholder={`${user.userInfo.surname} ơi bạn nghĩ gì thế`}
      autoFocus
      value={TextValue}
      onChange={(e) => setTextValue(e.target.value)}
    />
  </div>
);

const CreatePostMedia = ({
  register,
  handleSubmit,
  handleCreatePost,
  setImageFile,
}) => {
  const postAction = [
    { alt: "TagIcon", icon: TagIcon },
    { alt: "react", icon: ReactIcon },
    { alt: "checkin", icon: CheckInIcon },
    { alt: "gift", icon: GiftIcon },
  ];
  return (
    <form
      className="flex w-full items-center justify-center p-2"
      onSubmit={handleSubmit(handleCreatePost)}
    >
      <div className="border-main flex w-full cursor-pointer items-center justify-between rounded-md border-[1px] p-2 shadow-md">
        <div className="hidden h-14 flex-1 items-center justify-center text-base font-semibold xs:flex">
          Thêm vào bài viết của bạn
        </div>
        <div className="flex flex-1 justify-center gap-2">
          <label htmlFor="fileInput" className={style.PostCreateIconBox}>
            <img
              src={ImageOrVideoIcon}
              alt="post file media"
              width={24}
              height={24}
              className={style.PostCreateIcon}
            />
            <input
              type="file"
              id="fileInput"
              className="hidden"
              {...register("file")}
              onChange={(e) => chosingImage(e, setImageFile)}
            />
          </label>
          {postAction.map((item) => (
            <div className={style.PostCreateIconBox}>
              <img
                src={item.icon}
                alt={item.alt}
                width={24}
                height={24}
                className={style.PostCreateIcon}
              />
            </div>
          ))}
          <div className={style.PostCreateIconBox}>
            <MoreHorizIcon
              sx={{ color: "#65676b" }}
              className={style.PostCreateIcon}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

const CreatePostButton = ({ handleCreatePost, TextValue }) => (
  <div className="px-3">
    <button
      onClick={handleCreatePost}
      className={`h-9 w-full rounded-md text-base font-semibold ${
        TextValue.length !== 0
          ? "cursor-pointer bg-primary text-white"
          : "cursor-not-allowed bg-hover text-[#bcc0c4]"
      }`}
    >
      Đăng
    </button>
  </div>
);

export const CreatePostForm = ({ setCreatePost, setLoading }) => {
  const user = useSelector((state) => state.user);
  const [ImageFile, setImageFile] = useState();
  const [TextValue, setTextValue] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const handleCreatePost = async () => {
    setLoading(true);
    if (TextValue !== "") {
      try {
        const postData = {
          content: TextValue,
          authorId: user.userInfo.id,
        };
        const formData = convertToFormData(postData, ImageFile);
        const response = await PostApi.createPost(formData);
        if (typeof response === "object") {
          setLoading(false);
          alert("Successfully created post");
          dispatch(addPost({ post: response }));
          setCreatePost(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="fixed left-0 top-0 z-[100] h-dvh w-dvw bg-[#fcfcfd] bg-opacity-50">
      <div className="absolute inset-0 z-50 m-auto h-107 w-125 rounded-lg bg-white p-4 shadow-lg xs:w-96">
        <CreatePostFormHeader setCreatePost={setCreatePost} />
        <Divider variant="fullWidth" />
        <CreatePostRange user={user} />
        <CreatePostInput
          user={user}
          TextValue={TextValue}
          setTextValue={setTextValue}
        />
        <CreatePostMedia
          handleCreatePost={handleCreatePost}
          handleSubmit={handleSubmit}
          setImageFile={setImageFile}
          register={register}
        />
        <CreatePostButton
          handleCreatePost={handleCreatePost}
          TextValue={TextValue}
        />
      </div>
    </div>
  );
};
