import React from "react";
import noAvatar from "../../image/noAvatar.png";
import videoOrImageIcon from "../../image/imgOrVideoIcon.png";
import LiveIcon from "../../image/VideoIcon.png";
import ReactIcon from "../../image/iconPost.png";
import { Divider } from "@mui/material";
import style from "./index.module.css";
import { useSelector } from "react-redux";

const CreatePostInput = ({ setCreatePostVisible }) => {
  const user = useSelector((state) => state.user);
  return (
    <div className=" flex w-full flex-[1] flex-col xs:mt-2">
      <div className="flex w-full items-center gap-3">
        <img
          src={user.userInfo.avatar ?? noAvatar}
          alt="avatar"
          className=" h-10 w-10 rounded-full shadow-inner"
        />
        <div
          className="bg-main flex h-10  flex-[1] cursor-pointer items-center justify-start rounded-3xl border-none pl-5 text-base font-normal text-[#6d6f73] outline-none duration-200 hover:brightness-95 "
          onClick={() => setCreatePostVisible(true)}
        >
          {user.userInfo.surname} ơi , bạn nghĩ gì thế ?
        </div>
      </div>
      <Divider variant="fullWidth" sx={{ mt: "1rem" }} />
    </div>
  );
};
const CreatePostAction = () => {
  const actions = [
    { icon: LiveIcon, alt: "live right now", text: "Video trực tiếp" },
    { icon: videoOrImageIcon, alt: "image or video", text: "Ảnh/Video" },
    { icon: ReactIcon, alt: "your reaction", text: "Hoạt động" },
  ];

  return (
    <div className="flex w-full items-center">
      {actions.map((action, index) => (
        <div key={index} className={style.createPostIconActionIcon}>
          <img
            src={action.icon}
            alt={action.alt}
            className="xs:h-5 xs:w-5"
            width={24}
            height={24}
          />
          {action.text}
        </div>
      ))}
    </div>
  );
};

export const CreatePost = ({ setCreatePostVisible }) => {
  return (
    <div className="flex h-32 w-125 flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md xs:w-96 ">
      <CreatePostInput setCreatePostVisible={setCreatePostVisible} />
      <CreatePostAction />
    </div>
  );
};
