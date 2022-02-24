import React from "react";
import { useNavigate } from "react-router-dom";
import "./LeftSideBar.css";

export default function LeftSideBarLinks() {
  const navigate = useNavigate();

  function viewRooms() {
    navigate("/room");
  }

  function viewProjects() {
    navigate("/projects");
  }

  function viewEvents() {
    navigate("/events");
  }

  return (
    <div className="lf_container">
      <div className="room_section">
        
        <ul>
          <li>
            <a href=""></a>
          </li>
          <li>
            <a href=""></a>
          </li>
          <li>
            <a href=""></a>
          </li>
        </ul>
        <button onClick={viewRooms} className="options">
          Show Rooms
        </button>
      </div>

      <div className="projects_section">
  
        <ul>
          <li>
            <a href=""></a>
          </li>
          <li>
            <a href=""></a>
          </li>
          <li>
            <a href=""></a>
          </li>
        </ul>
        <button onClick={viewProjects} className="options">
          Show Projects
        </button>
      </div>

      <div className="events_section">
        <ul>
          <li>
            <a href=""></a>
          </li>
          <li>
            <a href=""></a>
          </li>
          <li>
            <a href=""></a>
          </li>
        </ul>
        <button onClick={viewEvents} className="options">
          Show Events
        </button>
      </div>
    </div>
  );
}
