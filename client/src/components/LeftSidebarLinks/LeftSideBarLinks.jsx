import React from "react";
import { useNavigate } from "react-router-dom";
import "./leftsidebar.css";

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
        <h4>Popular Rooms</h4>
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
          View more Rooms
        </button>
      </div>

      <div className="projects_section">
        <h4>Popular Projects</h4>
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
          View more Projects
        </button>
      </div>

      <div className="events_section">
        <h4>Popular Events</h4>
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
          View more Events
        </button>
      </div>
    </div>
  );
}
