import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./EventDetail.css";
import Chat from "./Chat";
import Navbar from "../Navbar/Navbar";

const EventDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);

  const getEvents = async () => {
    const results = await axios.get("http://localhost:5001/events");

    const res = results.data;

    setData(res);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        {data.Events &&
          data.Events.map(
            (event) =>
              event._id === id && (
                <h1 className="EventHeader" key={id}>
                  Welcome to the {event.title} event
                </h1>
              )
          )}
      </div>

      <div>
        {data.Events &&
          data.Events.map(
            (event) =>
              event._id === id && (
                <Chat key={id} name={event.creator} title={event.title} />
              )
          )}
      </div>
    </>
  );
};

export default EventDetails;
