import React, { useEffect, useState } from "react";
import Event from "./Event/Event";
import axios from "axios";
import { ModalPopUp } from "../Form/ModalPopUp";
import Navbar from "../Navbar";
import "./events.css";
import { ChatContext } from "../../context/SharedContext";
import { useContext } from "react";
import Filter from "./Filter";
import { motion, AnimatePresence } from "framer-motion";

const Events = () => {
  const [data, setData] = useState([]);

  const getEvents = async () => {
    const results = await axios.get("http://localhost:5001/events");

    const res = results.data;

    setData(res);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const { state, dispatch } = useContext(ChatContext);

  //--------------Cokies----------------------------
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5001/auth/login/success", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          dispatch(
            { type: "AUTHENTICATED", payload: resObject.user },
            console.log(`resObject.user`, resObject.user)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  //--------------------------------------------

  return (
    <div>
      <Navbar />
      <Filter setData={setData} data={data} />
      <ModalPopUp />
      <motion.div layout className="testflex">
        <AnimatePresence>
          {data.Events &&
            data.Events.map((event) => (
              <div key={event._id}>
                <Event event={event} />
              </div>
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Events;
