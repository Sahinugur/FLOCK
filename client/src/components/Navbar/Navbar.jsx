import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ChatContext } from "../../context/SharedContext";
import Menu from "../LeftSidebarLinks/LeftSideBarLinks";
import bird from "../../img/bird.svg";

// the style of the menu is not right!! thats the white thing in the navbar!!!
import "../Dropdown/Dropdown";
import "./navbar.css";
import "../../pages/home.css";

export default function NavBar() {
  const [selected, setSelected] = useState("Menu");
  const { state, dispatch } = useContext(ChatContext);

  const logout = () => {
    window.open("http://localhost:5001/auth/logout", "_self");
  };

  return (
    <div className="navbar ">
      <img className="bird" src={bird} alt="bird"></img>
      <span className="navbar-logo">
        <Link className="link" to="/home">
          Flock
        </Link>
      </span>

      {/* Searchbar */}
      <input className="searchBar" type="text" placeholder="Search.."></input>

      {/* Dropdown checks his own name! :) */}
      {/* < Menu selected={selected} setSelected={setSelected} />  */}

      <ul className="navbar-list">
        <li className="navbar-listItem">
          <img src={state.user.profilePhoto} alt="" className="navbar-avatar" />
        </li>
        <li>
          {state.user.source !== "github" ? (
            <h2>{state.user.email}</h2>
          ) : (
            <h2>{state.user.firstName}</h2>
          )}
        </li>

        <li className="navbar-listItem" onClick={logout}>
          Logout
        </li>
      </ul>
    </div>
  );
}
