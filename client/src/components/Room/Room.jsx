import React from "react";
import NavBar from "../Navbar/Navbar";
import CreateNewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import LeftComponent from "../LeftSidebarLinks/LeftSideBarLinks";

export default function Room() {
  return (
    <div>
      <NavBar />
      <CreateNewPost />
      <LeftComponent />
      <Post />
    </div>
  );
}
