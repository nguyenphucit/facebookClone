import React from "react";
import noAvatar from "../../image/noAvatar.png";
import minaStory from "../../image/storyTest.jpg";
export const Story = () => {
  return (
    <div>
      <div className="w-40 h-64 relative  ">
        <div className="rounded-xl w-full h-full overflow-hidden relative shadow-xl">
          <img
            src={minaStory}
            alt="mina young story"
            className="w-full h-full brightness-75 object-center cursor-pointer hover:brightness-50 hover:scale-105 duration-500"
          />
          <span className="text-white absolute bottom-3 left-4 font-extrabold text-sm">
            Mina young
          </span>
        </div>
        <img
          src={noAvatar}
          alt="story owner"
          className="absolute top-4 left-4 w-10 h-10 rounded-full border-[#0866ff] border-4 z-30"
        />
      </div>
    </div>
  );
};
