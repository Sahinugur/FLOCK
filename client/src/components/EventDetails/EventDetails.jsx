import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);

  console.log(data.Events);

  const getEvents = async () => {
    const results = await axios.get("http://localhost:5001/events");

    const res = results.data;

    setData(res);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      {data.Events &&
        data.Events.map(
          (event) =>
            event._id === id && <h1> WELCOME TO EVENT {event.title} </h1>
        )}
    </div>
  );
};

export default EventDetails;
