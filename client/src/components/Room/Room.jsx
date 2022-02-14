import React from "react";
import NavBar from "../Navbar";
import CreateNewPost from "../NewPost/NewPost";
import Post from "../Post";

export default function Room() {
  return (
    <div>
      <NavBar />
      <CreateNewPost />
      <Post />
    </div>
  );
}
