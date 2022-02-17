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
        class="container"
      >
        <div class="card">
          <div class="card__body">
            <span class="tag tag-blue">{event.category}</span>
            <h4>{event.title}</h4>
            <p>{event.description}</p>
          </div>

          <div class="card__footer">
            <div class="user">
              <img src={state.user.profilePhoto} alt="" className="avatar" />
              <div class="user__info">
                <h5>{event.creator}</h5>
                <small>{moment(event.createdAt).fromNow()}</small>
              </div>
            </div>
          </div>

          <div class="button">
            <Link to={`/events/${event._id}`}>
              <button className="btn">join</button>
            </Link>
            <MdDelete
              size="1.5rem"
              color="#e50914"
              onClick={() => dispatch(deleteEvent(event._id))}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Event;
