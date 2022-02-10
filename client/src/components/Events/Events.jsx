import React, { useEffect, useState } from "react";
import Event from "./Event/Event";
import axios from "axios";
import { ModalPopUp } from "../Form/ModalPopUp";
import Navbar from "../Navbar";
import "./events.css";
const Events = () => {
  const [data, setData] = useState([]);

  const getPost = async () => {
    const results = await axios.get("http://localhost:5001/events");

    const res = results.data;

    setData(res);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <Navbar />
      <ModalPopUp />
      <div className="testflex">
        {data.Events &&
          data.Events.map((post) => (
            <div key={post._id}>
              <Event post={post} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Events;
