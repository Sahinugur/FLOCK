import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../context/SharedContext";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";
import LeftSideBarLinks from "../components/LeftSidebarLinks/LeftSideBarLinks";
import Post from "../components/Post/Post";
import Dummie from "../components/Dummie/Dummie";
import Options from "../components/LeftSidebarLinks/LeftSideBarLinks";
import CreateNewPost from "../components/NewPost/NewPost";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const { state, dispatch } = useContext(ChatContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      console.log("beginning of useEffect");
      fetch("http://localhost:5001/auth/login/success", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          dispatch({ type: "AUTHENTICATED", payload: resObject.user });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  console.log("state of Homepage", state);
  return (
    <div className="grid-container">
      <NavBar />
      <Link to="/events">
        <button className="btn-modal">events</button>
      </Link>
      *<h1>this is the Home page</h1>
      {state.user.source !== "github" ? (
        <h2>{state.user.email}</h2>
      ) : (
        <h2>{state.user.firstName}</h2>
      )}
      <LeftSideBarLinks />
      <Post />{" "}
    </div>
  );
}
