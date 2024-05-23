import React from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import noAvatar from "../../image/noAvatar.png";
export const CreateStory = () => {
  return (
    <div>
      <div className="w-40 h-64 relative ">
        <div className="w-full h-full rounded-xl overflow-hidden bg-white">
          <img
            src={noAvatar}
            alt=""
            className="w-full h-3/4 object-cover brightness-75 cursor-pointer hover:scale-105 duration-500"
          />
          <div className="bg-white rounded-full p-1 absolute bottom-10 left-0 right-0 ml-auto mr-auto w-fit h-fit flex justify-center items-center">
            <AddCircleRoundedIcon sx={{ fontSize: "2rem" }} color="primary" />
          </div>
          <span className="text-sm absolute font-bold bottom-3 left-0 right-0 ml-auto mr-auto font-sans">
            Tạo tin
          </span>
        </div>
      </div>
    </div>
  );
};
