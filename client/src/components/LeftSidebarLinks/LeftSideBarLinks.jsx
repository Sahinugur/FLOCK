import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LeftSideBar.css";
import makeCall from "../../api/Call";
import env from "../../api/env";


export default function LeftSideBarLinks() {
  const navigate = useNavigate();
  const [viewRoOptions, setViewRoOptions] = useState([]);
  const [viewPrOptions, setViewPrOptions] = useState([]);
  const [viewEvOptions, setViewEvOptions] = useState([]);

  function viewRooms() {
    navigate("/room");
  }

  function viewProjects() {
    navigate("/projects");
  }

  function viewEvents() {
    navigate("/events");
  }

  useEffect(() => {
    makeCall(env.ROOMS)
    .then((result) => {
      setViewRoOptions(result);
      console.log(result, "test_Leftside");
    });
  }, []);

  useEffect(() => {
    makeCall(env.PROJECTS)
    .then((result) => {
      setViewPrOptions(result);
      console.log(result, "test_Leftside");
    });
  }, []);

  useEffect(() => {
    makeCall(env.EVENTS)
    .then((result) => {
      setViewEvOptions(result.Events);
      console.log(result, "test_Leftside");
    });
  }, []);

  // useEffect(() => {
  //   function randomCall() {
  //     let randomTest = [];
  //     for (let i = 0; i <= viewOptions.length - 1; i++) {
  //       const randomEvents =
  //         viewOptions && viewOptions[Math.floor(Math.random() * 3)];

  //       randomTest.push(randomEvents);
  //       setRandomEvents(randomTest);
  //       console.log(randomEvents, "testhiba");
  //     }
  //   }
  //   randomCall();
  // }, [viewOptions]);

  return (
    <div className="lf_container">
<<<<<<< HEAD
      <div className="room_section">
        
=======
      <div className="shownLinks">
        <h4>Popular Rooms</h4>
>>>>>>> Development
        <ul>
        {viewRoOptions.slice(0, 3).map((elem, index) => (
            <li key={index}>
              <a href={`/${elem.title}`}>{elem.title}</a>
            </li>
          ))}
        </ul>
<<<<<<< HEAD
        <button onClick={viewRooms} className="options">
          Show Rooms
        </button>
      </div>

      <div className="projects_section">
  
=======
        <button onClick={viewRooms} className="viewMore_btn">
          View more Rooms
        </button>
      </div>

      <div className="shownLinks">
        <h4>Popular Projects</h4>
>>>>>>> Development
        <ul>
         {viewPrOptions.slice(0, 3).map((elem, index) => (
            <li key={index}>
              <a href={`/${elem.title}`}>{elem.title}</a>
            </li>
          ))} 
        </ul>
<<<<<<< HEAD
        <button onClick={viewProjects} className="options">
          Show Projects
        </button>
      </div>

      <div className="events_section">
=======
        <button onClick={viewProjects} className="viewMore_btn">
          View more Projects
        </button>
      </div>

      <div className="shownLinks">
        <h4>Popular Events</h4>
>>>>>>> Development
        <ul>
          {viewEvOptions.slice(0, 3).map((test, index) => (
            <li key={index}>
              <a href={`/${test.title}`}>{test.title}</a>
            </li>
          ))}
          {/* {randomEvents && randomEvents.map((rand) => rand.title)} */}
        </ul>
<<<<<<< HEAD
        <button onClick={viewEvents} className="options">
          Show Events
=======

        <button onClick={viewEvents} className="viewMore_btn">
          View more Events
>>>>>>> Development
        </button>
      </div>
    </div>
  );
}
