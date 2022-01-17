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
    <div class="w 6/12 flex flex-col flex-around text-lg ">
      <h1>Registration</h1>
      <form onSubmit={postInfos} class="flex flex-col border-2 border-inherit flex-around ">
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
          class="w-3/12"
          type="submit"
          value="Register"
        />
      </form>
      <button onClick={getUsers}>list of registered users</button>
    </div>
  );
}


