import React from 'react'
import './leftsidebarlinks.css';
import "../../pages/home.css";

function leftComponent() {
    return (
        <div className="container">
            <buttons className ="options">Room</buttons>
            <buttons className ="options">Upcoming Events</buttons>
            <buttons className ="options">Events</buttons>
        </div>
    )
}

export default leftComponent
