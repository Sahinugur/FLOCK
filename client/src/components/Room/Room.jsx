import React from "react";
import NavBar from "../Navbar/Navbar";
import CreateNewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import LeftComponent from "../LeftSidebarLinks/LeftSideBarLinks";
import "./room.css";

export default function Room() {
  return (
    <div className="grid-container">
      <NavBar />
      <CreateNewPost />
      <LeftComponent />
      <Post />
    </div>
  );
}
