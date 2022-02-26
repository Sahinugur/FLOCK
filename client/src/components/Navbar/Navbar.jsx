import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChatContext } from "../../context/SharedContext";
import bird from "../../img/bird.svg";
import { CSSTransition } from "react-transition-group";

import "./navbar.css";
import "../../pages/home.css";

export default function NavBar() {
  const dropdownRef = useRef(null);
  const { state } = useContext(ChatContext);
  const [dropDown, setDropDown] = useState(false);

  const logout = () => {
    window.open("http://localhost:5001/auth/logout", "_self");
  };
  function avatarClick() {
    setDropDown(!dropDown);
  }
  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropDown(!dropDown);
      }
    };
    if (dropDown) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [dropDown]);

  return (
    <div className="navbar ">
      <img className="bird" src={bird} alt="bird"></img>
      <span className="navbar-logo">
        <Link className="link" to="/home">
          Flock
        </Link>
      </span>

      <input className="searchBar" type="text" placeholder="Search.."></input>

      <ul className="navbar-list" ref={dropdownRef}>
        <li className="navbar-listItem">
          <img
            src={state.user.profilePhoto}
            alt=""
            onClick={() => {
              avatarClick();
            }}
            className="navbar-avatar"
          />
        </li>
        <div className="profileMenuContainer">
          <CSSTransition
            in={dropDown}
            timeout={400}
            classNames="profileDropDown"
            unmountOnExit>
            <ul className="profileMenu">
              <li>
                <Link className="link" to="/home">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="link" to="/home">
                  Private Messages
                </Link>
              </li>
              <li onClick={logout}>Logout</li>
            </ul>
          </CSSTransition>
        </div>

        <li>
          {state.user.source !== "github" ? (
            <h2>{state.user.email}</h2>
          ) : (
            <h2>{state.user.firstName}</h2>
          )}
        </li>
      </ul>
    </div>
  );
}
