import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { calculateTimeDifference, formatTimeDiff } from "../../helper/TimeDiff";
export const Comment = ({ commentInfo }) => {
  const [timeDiff, settimeDiff] = useState();
  useEffect(() => {
    const Diff = calculateTimeDifference(commentInfo.createdAt);
    settimeDiff(() => Diff);
    // eslint-disable-next-line
  }, []);
  const CommentContent = ({ commentInfo }) => {
    return (
      <div className="flex max-w-full flex-col break-all rounded-2xl bg-iconHover px-3 py-2 leading-tight">
        <div className="flex-1 text-start text-commentAuthor font-semibold">
          <a href="/">
            {`${commentInfo.author.firstname} ${commentInfo.author.surname}`}
          </a>
        </div>
        <p className="text-start text-commentContent">{commentInfo.content}</p>
      </div>
    );
  };
  const CommentAction = ({ timeDiff }) => {
    return (
      <div className="flex w-full items-start justify-start px-14 text-commentAuthor">
        <div className="flex items-start justify-start gap-3">
          <span>
            <a href="/" className="text-registerLabel ">
              {formatTimeDiff(timeDiff)}
            </a>
          </span>
          <span className="font-semibold text-registerLabel">
            <a href="/" className="hover:cursor-pointer hover:underline">
              Thích
            </a>
          </span>
          <span className="font-semibold text-registerLabel">
            <a href="/" className="hover:cursor-pointer hover:underline">
              Phản hồi
            </a>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={`mt-5 w-full `}>
      <div className="flex w-full flex-wrap items-center gap-2 text-base leading-none">
        <Avatar
          src={commentInfo.author.avatar}
          sx={{ width: 32, height: 32 }}
        />
        <CommentContent commentInfo={commentInfo} />
        <CommentAction timeDiff={timeDiff} />
      </div>
    </div>
  );
};
