import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../context/SharedContext";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";
import Post from "../components/Post/Post";
import Dummie from "../components/Dummie/Dummie";
import Options from "../components/LeftSidebarLinks/LeftSideBarLinks";
import CreateNewPost from "../components/NewPost/NewPost";
import "./home.css";

export default function Home() {
  const { state, dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5001/auth/login/success", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          dispatch(
            { type: "AUTHENTICATED", payload: resObject.user },
            console.log(`resObject.user`, resObject.user)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  // console.log("state", state);
  return (
    <div className="grid-container">
      <NavBar />
      {/* <h1 className = "head">this is the Home page</h1> */}
      {/* {state.user.source !== "github" ? (
        // <h2>Your logged in as</h2>
        <h2>{state.user.email}</h2>
      ) : (
        <h2>{state.user.firstName}</h2>
      )} */}

      <Options />
      <Post />
      <Dummie />
    </div>
  );
}
