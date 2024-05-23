import React from "react";
import { Story } from "../StoryItem";
import { CreateStory } from "../CreateStory";

export const StoryList = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="pt-6 flex gap-6 w-4/5 overflow-x-hidden text-center items-center">
        <CreateStory />
        <Story />
        <Story />
        <Story />
        <Story />
      </div>
    </div>
  );
};
