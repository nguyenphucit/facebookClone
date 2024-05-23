import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { calculateTimeDifference } from "../../helper/TimeDiff";
export const Notification = ({ notificationInfo }) => {
  const [timeDiff, settimeDiff] = useState();
  useEffect(() => {
    const Diff = calculateTimeDifference(notificationInfo.createdAt);
    settimeDiff(() => Diff);
    // eslint-disable-next-line
  }, []);
  console.log(timeDiff);
  return (
    <div className="mb-4 h-23.5 w-86 cursor-pointer rounded-lg bg-white px-1 hover:bg-iconHover ">
      <div className="flex h-full w-full py-2 pr-3">
        <div className="flex h-full w-20 justify-center">
          <Avatar
            src={notificationInfo.sender.avatar}
            sx={{
              width: "56px",
              height: "56px",
              border: "1px #b6b8bd solid",
            }}
          />
        </div>
        <div className="relative flex-1 text-start text-commentContent">
          <strong>
            {notificationInfo.sender.firstname +
              " " +
              notificationInfo.sender.surname +
              " "}
          </strong>
          {notificationInfo.content}
          <div className="absolute -bottom-2 left-1 text-commentAuthor">
            <a href="text-registerLabel">
              {" "}
              {timeDiff?.years !== 0
                ? timeDiff?.years + " năm"
                : timeDiff?.months !== 0
                  ? timeDiff?.months + " tháng"
                  : timeDiff?.weeks !== 0
                    ? timeDiff?.weeks + " tuần"
                    : timeDiff?.days !== 0
                      ? timeDiff?.days + " ngày"
                      : timeDiff.hours
                        ? timeDiff.hours + " giờ"
                        : timeDiff?.minutes + " phút"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
