import React from "react";
import noAvatar from "../../image/noAvatar.png";
import minaStory from "../../image/storyTest.jpg";
export const Story = () => {
  return (
    <div>
      <div className="relative h-64 w-40  ">
        <div className="relative h-full w-full overflow-hidden rounded-xl shadow-xl">
          <img
            src={minaStory}
            alt="mina young story"
            className="h-full w-full cursor-pointer object-center brightness-75 duration-500 hover:scale-105 hover:brightness-50"
          />
          <span className="absolute bottom-3 left-4 text-sm font-extrabold text-white">
            Mina young
          </span>
        </div>
        <img
          src={noAvatar}
          alt="story owner"
          className="absolute left-4 top-4 h-10 w-10 rounded-full border-4 border-[#0866ff]"
        />
      </div>
    </div>
  );
};
