import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RightSideBarLinks.css";
import makeCall from "../../api/Call";
import env from "../../api/env";
import CreateNewPost from "../NewPost/NewPost";
import ProjectForm from "../Project/ProjectForm";

export default function RightSideBarLinks() {
  return (
    <div className="rf_container">
      <CreateNewPost />
      <ProjectForm />
    </div>
  );
}
