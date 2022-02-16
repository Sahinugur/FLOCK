import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../context/SharedContext";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import LeftSideBarLinks from "../components/LeftSidebarLinks/LeftSideBarLinks";
import Post from "../components/Post";
import ProjectForm from "../components/Project/ProjectForm";
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

  function viewProjects() {
    navigate("/projects");
  }

  console.log("state of Homepage", state);
  return (
    <div className="grid-container">
      <NavBar />
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
