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
        <button onClick={getEvents} className="filterBtn">
          All
        </button>

        <button id="UI-UX Design" onClick={handleClick} className="filterBtn">
          UI-UX Design
        </button>
        <button id="Database" onClick={handleClick} className="filterBtn">
          Database
        </button>
        <button id="DevOps" onClick={handleClick} className="filterBtn">
          DevOps
        </button>
        <button id="IoT" onClick={handleClick} className="filterBtn">
          IoT
        </button>
        <button id="Cryptography" onClick={handleClick} className="filterBtn">
          Cryptography
        </button>
      </div>
    </div>
  );
};

export default Filter;
