import React from 'react'
import './LeftSideBar.css';
import { useNavigate } from "react-router-dom";
// import "../../pages/home.css";

export default function LeftSideBarLinks() {
    const navigate = useNavigate();


    function viewProjects() {
        navigate("/projects")
    }

    return (
        <div className="lf_container">
            <div className="room_section">
                <h4>Popular Rooms</h4>
                <ul>
                    <li><a href=""></a></li>
                    <li><a href=""></a></li>
                    <li><a href=""></a></li>
                </ul>
                <button className="options">View more Rooms</button>
            </div> 

            <div className="projects_section">
                <h4>Popular Projects</h4>
                <ul>
                    <li><a href=""></a></li>
                    <li><a href=""></a></li>
                    <li><a href=""></a></li>
                </ul>
                <button onClick={viewProjects} className ="options">View more Projects</button>
            </div>
                
            <div className="events_section">
                <h4>Popular Events</h4>
                <ul>
                    <li><a href=""></a></li>
                    <li><a href=""></a></li>
                    <li><a href=""></a></li>
                </ul>
                <button className ="options">View more Events</button>
            </div>
        </div>
    )
}
