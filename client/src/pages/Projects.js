import React, { useContext, useState, useEffect } from "react";
import makeCall from "../api/Call";
import env from "../api/env";
import { ChatContext } from "../context/SharedContext";
import NavBar from "../components/Navbar";
import LeftSideBarLinks from "../components/LeftSidebarLinks/LeftSideBarLinks";
import ProjectForm from "../components/Project/ProjectForm";
import Post from "../components/Post";
import ProjectFeed from "../components/Project/ProjectFeed";
import ProjectCard from "../components/Project/ProjectCard";

export default function Projects() {
    const { state, dispatch } = useContext(ChatContext);
    const [projects, setProjects] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect(() => {
            const getUser = () => {
            console.log('beginning of useEffect')
            }
        });


        useEffect(() => {
            makeCall(env.PROJECTS)
            .then((data) => {
                console.log(data)
                setProjects(data);
            });
        }, [reload]);

    // useEffect(() => {
    //     const getUser = () => {
    //     console.log('beginning of useEffect')
    //     fetch("http://localhost:5001/auth/login/success", {
    //         method: "GET",
    //         credentials: "include",
    //     })
    //         .then((response) => {
    //         if (response.status === 200) return response.json();
    //         throw new Error("authentication has been failed!");
    //         })
    //         .then((resObject) => {
    //         dispatch(
    //             { type: "AUTHENTICATED", payload: resObject.user });
    //         })
    //         .catch((err) => {
    //         console.log(err);
    //         });
    //     };
    //     getUser();
    // }, []);

    return (
        <div>
            <NavBar />
            <LeftSideBarLinks />
            <ProjectForm reload={reload} setReload={setReload}/> 
            <ProjectFeed projects={projects}/>
        </div>
    )

}