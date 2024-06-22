import { Divider, Avatar } from "@mui/material";
import React, { useRef, useState } from "react";
import noAvatar from "../../image/noAvatar.png";
import { useDispatch, useSelector } from "react-redux";
import {
  ModeCommentOutlined,
  ThumbUpOutlined,
  SentimentSatisfiedRounded,
  ModeComment,
  ReplyRounded,
  SendOutlined,
  RecommendRounded,
  Clear,
} from "@mui/icons-material";
import { Comment as CommentComponent } from "../Comment";
import PostApi from "../../api/PostApi";
import { updateCommentToPost } from "../../slice/NewFeedSlice";
import style from "../Post/index.module.css";
const PostDetailHeader = ({ data, setpostDetail }) => {
  return (
    <div>
      {" "}
      <div className="flex h-16 items-center justify-center text-xl font-bold">
        Bài viết của {data.author.firstname + " " + data.author.surname}
      </div>
      <span onClick={() => setpostDetail(false)}>
        <Clear
          sx={{ color: "#bcc0c4" }}
          className="absolute  right-5 top-3 box-content cursor-pointer  rounded-full  bg-hover p-1 hover:bg-hover"
        />
      </span>
    </div>
  );
};

const PostDetailContent = ({ data, commentIpRef }) => {
  return (
    <div className="h-115 w-full overflow-y-scroll scrollbar scrollbar-track-[#E6E7EB] scrollbar-thumb-[#BCC0C4] scrollbar-thumb-rounded-full scrollbar-w-3">
      <div className="flex h-10 w-full px-3">
        <div className="flex items-center gap-2 text-base font-bold">
          <Avatar
            sx={{ width: "40px", height: "40px" }}
            src={data?.author.avatar ? data.author.avatar : noAvatar}
          />
          <span className="flex flex-col self-start">
            {data.author.firstname + " " + data.author.surname}
          </span>
        </div>
      </div>
      <div className="h-auto w-full whitespace-pre-wrap px-3 text-start text-sm">
        {data.content}
      </div>
      <div className="mt-3 w-full">
        <img src={data.file[0]} className="" alt="" />
      </div>
      <div className="flex w-full justify-between px-4 py-1">
        <div className="flex items-center gap-1 text-sm font-semibold text-[rgba(0,0,0,0.6)] ">
          <RecommendRounded color="primary" />
          <SentimentSatisfiedRounded sx={{ color: "#ffc400" }} />
        </div>
        <div className="flex  items-center gap-1 text-sm font-semibold text-[rgba(0,0,0,0.6)]">
          {data.comments.length}
          <ModeComment sx={{ color: "rgba(0,0,0,0.5)" }} fontSize="medium" />
          <ReplyRounded
            sx={{ transform: "rotate(360deg)", color: "rgba(0,0,0,0.5)" }}
            fontSize="large"
          />
        </div>
      </div>
      <Divider variant="middle" />
      <div className="flex items-center justify-between px-3">
        <div className={style.PostActions}>
          <ThumbUpOutlined />
          Thích
        </div>
        <div
          className={`${style.PostActions} cursor-pointer`}
          onClick={() => {
            commentIpRef.current.focus();
          }}
        >
          <ModeCommentOutlined />
          Bình luận
        </div>
        <div className={style.PostActions}>
          <SendOutlined />
          Chia sẻ
        </div>
      </div>
      <Divider variant="middle" />
      {/* comments */}
      <div className="w-full bg-white p-3">
        {data.comments.map((item) => (
          <CommentComponent commentInfo={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

const CommentInput = ({ data, commentIpRef, socket }) => {
  const [Comment, setComment] = useState("");
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSendComment = async () => {
    const commentInfo = {
      content: Comment,
      authorId: userInfo.id,
      postId: data.id,
    };
    const notifyInfo = {
      type: "COMMENT_NOTIFY",
      senderId: userInfo.id,
      receiverId: data.author.id,
      postId: data.id,
    };
    try {
      const response = await PostApi.commentOnPost(commentInfo, data.id);
      if (data.author.id !== userInfo.id) {
        socket?.emit("notification", notifyInfo);
      }
      setComment("");
      dispatch(updateCommentToPost({ commentInfo: response, postId: data.id }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute bottom-2 flex h-28 w-full items-start gap-3 px-4 py-6">
      <Avatar
        sx={{ width: "32px", height: "32px" }}
        src={userInfo.avatar ? userInfo.avatar : noAvatar}
      />
      <div className="h-17 flex-1 rounded-2xl bg-iconHover px-3">
        <input
          type="text"
          placeholder="Viết bình luận..."
          className="w-full border-none bg-inherit text-base outline-none"
          value={Comment}
          ref={commentIpRef}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className=" flex w-full flex-col bg-inherit text-base">
          <span
            className={`self-end text-${Comment !== "" ? "primary" : "registerLabel"} cursor-${Comment !== "" ? "pointer" : "not-allowed"}`}
            onClick={() => handleSendComment()}
          >
            <SendOutlined />
          </span>
        </div>
      </div>
    </div>
  );
};

export const PostDetail = ({ data, setpostDetail }) => {
  const commentIpRef = useRef();
  const { socket } = useSelector((state) => state.socket);
  // const { id } = useSelector((state) => state.user.userInfo);
  // const dispatch = useDispatch();
  // const NotificationListener = (notification) => {
  //   if (id === notification.receiverId) {
  //     console.log(notification)
  //     dispatch(getNotification({ notification: notification }));
  //   }
  // };
  // useEffect(() => {
  //   socket?.on("notification", (notification) =>
  //     NotificationListener(notification),
  //   );
  //   // return async () => {
  //   //   socket?.off("notification", NotificationListener);
  //   // };
  //   // eslint-disable-next-line
  // }, []);
  return (
    <div className="fixed left-0 top-0 z-[100] h-dvh w-dvw bg-[#fcfcfd] bg-opacity-50 ">
      <div className="absolute bottom-0 left-0 right-0 top-0 z-50 mb-auto ml-auto mr-auto mt-auto h-158 w-175 rounded-md bg-white shadow-loginForm xs:w-dvw">
        {/* header */}
        <PostDetailHeader data={data} setpostDetail={setpostDetail} />
        <Divider />
        {/* content */}
        <PostDetailContent data={data} commentIpRef={commentIpRef} />
        {/* Comment input --- bottom */}
        <CommentInput commentIpRef={commentIpRef} data={data} socket={socket} />
      </div>
    </div>
  );
};
