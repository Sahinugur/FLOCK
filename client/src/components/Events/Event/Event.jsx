import React from "react";
import moment from "moment";
import "./event.css";
import { ChatContext } from "../../../context/SharedContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Event = ({ post }) => {
  const { state, dispatch } = useContext(ChatContext);
  return (
    <>
      <div class="container">
        <div class="card">
          <div class="card__body">
            <span class="tag tag-blue">{post.category}</span>
            <h4>{post.title}</h4>
            <p>{post.description}</p>
          </div>

          <div class="card__footer">
            <div class="user">
              <img src={state.user.profilePhoto} alt="" className="avatar" />
              <div class="user__info">
                <h5>{post.creator}</h5>
                <small>{moment(post.createdAt).fromNow()}</small>
              </div>
            </div>
          </div>

          <div class="button">
            <Link to="/events">
              <button className="btn">join</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
