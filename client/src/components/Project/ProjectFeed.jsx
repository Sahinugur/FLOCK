import React from "react";
import ProjectCard from "./ProjectCard";
import "./ProjectFeed.css";

export default function ProjectFeed({ projects }) {
  return (
    <div className="prOuterWrap">
      <div className="prFeed_container">
        <div className="prCard">
          {projects.map((project, index) => (
            <ProjectCard key={index} pdata={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
