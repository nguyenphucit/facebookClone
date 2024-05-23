import React from "react";
import { Post } from "../Post";
export const ListPost = ({ posts }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <ul className="flex h-4/5  w-full flex-col items-center justify-start">
        {posts.map((item) => (
          <Post data={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};
