import React from "react";
import moment from "moment";
import "./event.css";
import { ChatContext } from "../../../context/SharedContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";

const url = "http://localhost:5001/events";

const Event = ({ event }) => {
  const { state, dispatch } = useContext(ChatContext);

  const deleteEvent = (id) => axios.delete(`${url}/${id}`);

  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        layout
        class="container">
        <div class="cardEvent">
          <div class="card_bodyEvent">
            <span class="category">{event.category}</span>
            <h4>{event.title}</h4>
            <p>{event.description}</p>
          </div>

          <div class="dateTime">
            <p class="dateEvent">{event.date} </p>
            <p>{event.time}</p>
          </div>

          <div class="card__footer">
            <div class="user">
              <img src={state.user.profilePhoto} alt="" className="avatar" />
              <div class="user_infoEvent">
                <h5>{event.creator}</h5>
                <small>{moment(event.createdAt).fromNow()}</small>
              </div>
            </div>
          </div>

          <div class="buttonEvent">
            <Link to={`/events/${event._id}`}>
              <button className="btnEvent">join</button>
            </Link>
            <MdDelete
              size="2rem"
              color="#0f1730"
              onClick={() => dispatch(deleteEvent(event._id))}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Event;
