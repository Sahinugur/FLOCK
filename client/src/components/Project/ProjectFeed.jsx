import React from "react";
import "./ProjectFeed.css"

import ProjectCard from "./ProjectCard";

export default function ProjectFeed(props) {

    return (
        <div className="pFeed_container">
            <div className="pFeed_body" value={props}>
                {props.projects.map((project, index) => 
                    <ProjectCard key={index} pdata={project} />
                    )}
            </div>
        </div>
    )

}