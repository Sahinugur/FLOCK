import React, { useState } from "react";
import makeCall from "../api/Call";
import env from "../api/env";
import { useNavigate } from "react-router-dom";
export default function Registration() {
    let navigate = useNavigate();
  const [infos, setInfos] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  function getValue(e) {
    e.preventDefault();
    setInfos({ ...infos, [e.target.name]: e.target.value });
  }

  async function postInfos(e) {
    try {
      e.preventDefault();
      await makeCall(env.REGISTRATION, "POST", infos);
      navigate(`/home`);
    } catch (error) {
      console.log(error);
    }
  }
  async function getUsers(e) {
    try {
      const result = await makeCall(env.USERS);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login" >
      <div className="wrapper">
     
      <form onSubmit={postInfos} className="registration-form "> 
      <h1>Registration</h1>
        <input
          onChange={getValue}
          type="text"
          placeholder="first name"
          id="first_name"
          name="firstName"
        />
        <input
          onChange={getValue}
          type="text"
          placeholder="last name"
          id="last_name"
          name="lastName"
        />
        <input
          onChange={getValue}
          type="text"
          placeholder="user name"
          id="user_name"
          name="userName"
        />
        <input
          onChange={getValue}
          type="email"
          placeholder="email"
          id="email"
          name="email"
        />
        <input
          onChange={getValue}
          type="password"
          placeholder="password"
          id="password"
          name="password"
        />
        <input
          onChange={getValue}
          type="password"
          placeholder="confirm your password"
          id="confirm_password"
          name="confirm_password"
        />
        <input
          onChange={getValue}
          class="w-3/12"
          type="submit"
          value="Register"
        />
         <button onClick={getUsers}>list of registered users</button>
      </form>
     
    </div>
    </div>
  );
}


