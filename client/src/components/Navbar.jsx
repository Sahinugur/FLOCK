import React, {useContext,useState } from "react";
import { Link } from "react-router-dom";
import { ChatContext } from "../context/SharedContext";
import  Dropdown from "./Dropdown.jsx";

export default function NavBar() {
  const [selected,setSelected] = useState("Menu");
  const { state, dispatch } = useContext(ChatContext);

  const logout = () => {
    window.open("http://localhost:5001/auth/logout", "_self");
  };

  return (

    <div>

      <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Flock
        </Link>
      </span>
      
      < Dropdown selected={selected} setSelected={setSelected} />

        <ul className="list">
          <li className="listItem">
            <img
              src={state.user.profilePhoto}
              alt=""
              className="avatar"
            />

       

          </li>
          <li className="listItem">{state.user.source ==='google'?state.user.firstName + ' ' + state.user.lastName:state.user.userName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
    </div>

    </div>
  )
}
