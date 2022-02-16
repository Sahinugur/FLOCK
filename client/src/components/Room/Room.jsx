import React from "react";
import NavBar from "../Navbar/Navbar";
import CreateNewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import LeftComponent from "../LeftSidebarLinks/LeftSideBarLinks";
import "./room.css";

export default function Room() {
  return (
    //Why the class is taking CSS from home.css
    <div className="grid-container">
      <NavBar />
      <LeftComponent />
      <CreateNewPost />
      {/* <div> */}
      {/* <Post /> */}
      {/* </div> */}
    </div>
  );
}
