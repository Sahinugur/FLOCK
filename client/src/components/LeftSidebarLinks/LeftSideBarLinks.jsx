import React from "react";
import "./leftsidebar.css";
// import "../../pages/home.css";

export default function LeftComponent() {
  return (
    <div className="container">
      <button className="options">Room</button>
      <button className="options">Upcoming Events</button>
      <button className="options">Events</button>
    </div>
  );
}
