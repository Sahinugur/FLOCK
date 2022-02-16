import React, { useState, useContext } from "react";
import makeCall from "../../api/Call";
import env from "../../api/env";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../context/SharedContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./register.css";

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("No username provided."),
    lastName: yup.string().required("No lastName provided."),
    userName: yup.string().required("No username provided"),
    email: yup.string().required("No email provided").email(),
    password: yup
      .string()
      .required("No password provided")
      .min(4, "password is too short- should be 4 chars minimum. ")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
        "Password should include at least one uppercase character one number and one special character"
      ),
  })
  .required();
export default function Registration() {
  const { state, dispatch } = useContext(ChatContext);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onFocus",
  });

  async function postInfos(infos) {
    try {
      // e.preventDefault();
      await makeCall(env.REGISTRATION, "POST", infos).then((result) => {
        console.log(`resultpost`, result.errors);
      });

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
  console.log("errors", errors);
  return (
    <div className="login">
      <div className="wrapper">
        {console.log(``)}
        <form
          onSubmit={handleSubmit((d) => postInfos(d))}
          className="registration-form "
        >
          <h1>Registration</h1>
          <input 
            type="text"
            placeholder="first name"
            id="first_name"
            name="firstName"
            {...register("firstName", {
              required: "please enter your firstName",
            })}
          />
          <p>{errors.firstName?.message}</p>
          <input
            type="text"
            placeholder="last name"
            id="last_name"
            name="lastName"
            {...register("lastName", {
              required: "please enter your lastName",
            })}
          />
          <p>{errors.lastName?.message}</p>
          <input
            type="text"
            placeholder="user name"
            id="user_name"
            name="userName"
            {...register("userName", { required: "please enter a username" })}
          />
          <p>{errors.userName?.message}</p>
          <input
            type="email"
            placeholder="email"
            id="email"
            name="email"
            {...register("email", { required: "please enter a username" })}
          />
          <p>{errors.email?.message}</p>
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            {...register("password", { required: "please enter a username" })}
          />
          <p>{errors.password?.message}</p>
          {/* <input
          onChange={getValue}
          type="password"
          placeholder="confirm your password"
          id="confirm_password"
          name="confirm_password"
        /> */}
          <input type="submit" value="Register" />
          <button onClick={getUsers}>list of registered users</button>
        </form>
      </div>
    </div>
  );
}
