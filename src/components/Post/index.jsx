import { Avatar, Divider } from "@mui/material";
import React, { useState } from "react";
import {
  SendOutlined,
  ModeComment,
  ModeCommentOutlined,
  ReplyRounded,
  ThumbUpOutlined,
  SentimentSatisfiedRounded,
  RecommendRounded,
} from "@mui/icons-material";
import noAvatar from "../../image/noAvatar.png";
import style from "./index.module.css";
import { PostDetail } from "../PostDetail";
const PostHeader = ({ data }) => {
  return (
    <div className="flex h-10 w-full px-3">
      <div className="flex items-center gap-2 text-base font-bold">
        <Avatar
          sx={{ width: "32px", height: "32px" }}
          src={data?.author.avatar ? data.author.avatar : noAvatar}
        />
        <span className="flex flex-col self-start">
          {data.author.firstname + " " + data.author.surname}
        </span>
      </div>
    </div>
  );
};

const PostContent = ({ data }) => {
  return (
    <div className="">
      <div className="h-auto w-full whitespace-pre-wrap px-3 text-start text-sm">
        {data.content}
      </div>
      <div className="mt-3 w-full">
        <img src={data.file[0]} className="" alt="" />
      </div>
    </div>
  );
};
const PostReaction = ({ data }) => {
  return (
    <div className="flex w-full justify-between px-4 py-1">
      <div className="flex items-center gap-1 text-sm font-semibold text-[rgba(0,0,0,0.6)] ">
        <RecommendRounded color="primary" />
        <SentimentSatisfiedRounded sx={{ color: "#ffc400" }} />
        {data.like}
      </div>
      <div className="flex  items-center gap-1 text-sm font-semibold text-[rgba(0,0,0,0.6)]">
        {data.cmt}
        <ModeComment sx={{ color: "rgba(0,0,0,0.5)" }} fontSize="medium" />
        {data.share}
        <ReplyRounded
          sx={{ transform: "rotate(360deg)", color: "rgba(0,0,0,0.5)" }}
          fontSize="large"
        />
      </div>
    </div>
  );
};
const PostAction = ({ setpostDetail }) => {
  return (
    <div className="flex items-center justify-between px-3">
      <div className={style.PostActions}>
        <ThumbUpOutlined />
        Thích
      </div>
      <div
        className={style.PostActions}
        onClick={() => setpostDetail((prev) => !prev)}
      >
        <ModeCommentOutlined />
        Bình luận
      </div>
      <div className={style.PostActions}>
        <SendOutlined />
        Gửi
      </div>
    </div>
  );
};
export const Post = ({ data }) => {
  const [postDetail, setpostDetail] = useState(false);
  return (
    <div className="mt-5 h-auto w-125 rounded-md bg-white py-3 shadow-md xs:w-96">
      {postDetail ? (
        <PostDetail data={data} setpostDetail={setpostDetail} />
      ) : null}
      {/* <div className="flex h-10 w-full px-3">
        <div className="flex items-center gap-2 text-base font-bold">
          <Avatar
            sx={{ width: "32px", height: "32px" }}
            src={data?.author.avatar ? data.author.avatar : noAvatar}
          />
          <span className="flex flex-col self-start">
            {data.author.firstname + " " + data.author.surname}
          </span>
        </div>
      </div> */}
      <PostHeader data={data} />
      <PostContent data={data} />
      <PostReaction data={data} />
      <Divider variant="middle" />
      <PostAction setpostDetail={setpostDetail} />
    </div>
  );
};
