import React, { useContext, useState, useEffect } from "react";
import makeCall from "../api/Call";
import env from "../api/env";
import { ChatContext } from "../context/SharedContext";
import NavBar from "../components/Navbar/Navbar";
import LeftSideBarLinks from "../components/LeftSidebarLinks/LeftSideBarLinks";
import ProjectForm from "../components/Project/ProjectForm";
import ProjectFeed from "../components/Project/ProjectFeed";
import "./projects.css";

export default function Projects() {
  const { state, dispatch } = useContext(ChatContext);
  const [projects, setProjects] = useState([]);
  const [reload, setReload] = useState(true);
  useEffect(() => {
    const getUser = () => {
      console.log("beginning of useEffect");
    };
  });

  useEffect(() => {
    makeCall(env.PROJECTS).then((data) => {
      console.log(data);
      setProjects(data);
    });

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
        .then((response) => {
          dispatch({ type: "AUTHENTICATED", payload: response.user });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, [reload]);

  //   useEffect(() => {

  //   }, []);

  return (
    <div className="main-grid-container">
      <NavBar />
      <LeftSideBarLinks />
      <ProjectForm reload={reload} setReload={setReload} />
      <ProjectFeed projects={projects} />
    </div>
  );
}
