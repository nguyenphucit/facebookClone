import { Avatar, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { calculateTimeDifference, formatTimeDiff } from "../../helper/TimeDiff";
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
import PostApi from "../../api/PostApi";
import { useSelector } from "react-redux";
const PostHeader = ({ data }) => {
  const [timeDiff, settimeDiff] = useState();
  useEffect(() => {
    const Diff = calculateTimeDifference(data.createdAt);
    settimeDiff(() => Diff);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="flex h-10 w-full px-3">
      <div className="flex items-center gap-2 text-base font-bold">
        <Avatar
          sx={{ width: "32px", height: "32px" }}
          src={data?.author.avatar ? data.author.avatar : noAvatar}
        />
        <span className="flex flex-col self-start">
          {data.author.firstname + " " + data.author.surname}
          <p className="-mt-1 text-start text-commentAuthor font-normal">
            <a href="text-registerLabel">{formatTimeDiff(timeDiff)}</a>
          </p>
        </span>
      </div>
    </div>
  );
};

const PostContent = ({ data }) => {
  return (
    <div className="mt-3">
      <div className="h-auto w-full whitespace-pre-wrap px-3 text-start text-sm">
        {data.content}
      </div>
      <div className="mt-3 flex w-full justify-center">
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
const PostAction = React.memo(({ setpostDetail, data }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [isLike, setisLike] = useState(() => {
    const initialLike = data.likes.find(
      (item) => item.authorId === userInfo.id,
    );
    return initialLike ? true : false;
  });
  const likeHandling = async () => {
    try {
      const response = await PostApi.likePost(data.id, userInfo.id);
      if (response.data === 0) setisLike(() => false);
      else if (response.data === 1) setisLike(() => true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-between px-3">
      <div className={style.PostActions} onClick={() => likeHandling()}>
        <ThumbUpOutlined className={`${isLike ? "text-primary" : ""}`} />
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
});
export const Post = ({ data, search }) => {
  const [postDetail, setpostDetail] = useState(false);
  return (
    <div
      className={`mt-5 h-auto w-${search ? "175" : "125"} rounded-md bg-white py-3 shadow-md xs:w-96`}
    >
      {postDetail ? (
        <PostDetail data={data} setpostDetail={setpostDetail} />
      ) : null}
      <PostHeader data={data} />
      <PostContent data={data} />
      <PostReaction data={data} />
      <Divider variant="middle" />
      <PostAction setpostDetail={setpostDetail} data={data} />
    </div>
  );
};
