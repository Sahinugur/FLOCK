import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Filter.css";
import axios from "axios";

const Filter = ({ data, setData }) => {
  const handleClick = async (e) => {
    const results = await axios.get(
      `http://localhost:5001/events/cat/${e.target.id}`
    );
    const res = results.data;

    setData(res);
    console.log(res);
  };

  const getEvents = async () => {
    const results = await axios.get("http://localhost:5001/events");

    const res = results.data;

    setData(res);
  };

  return (
    <div>
      <div>
        <button onClick={getEvents} className="filter">
          All
        </button>

        <button id="UI-UX Design" onClick={handleClick} className="filter">
          UI-UX Design
        </button>
        <button id="Database" onClick={handleClick} className="filter">
          Database
        </button>
        <button id="DevOps" onClick={handleClick} className="filter">
          DevOps
        </button>
      </div>
    </div>
  );
};

export default Filter;
