import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import makeCall from "../../api/Call";
import { ChatContext } from "../../context/SharedContext";
import { useNavigate } from "react-router-dom";
import Google from "../../img/google.png";
import Github from "../../img/github.png";
import env from "../../api/env";

import "./login.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    username: yup.string().required("No username provided."),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  })
  .required();
  
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onFocus",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const { state, dispatch } = useContext(ChatContext);
  let navigate = useNavigate();

  function login(inputValues) {
    //e.preventDefault();
    makeCall(env.LOGIN, "POST", inputValues).then((result) => {
      dispatch({ type: "AUTHENTICATED", payload: result.user });
      console.log(`result.status`, result);
      if (result.status) {
        navigate(`/home`);
      } else {
        setErrorMsg(result.msg);
      }
    });
  }
  function handleErrors() {
    console.log(`errors`, errors);
    setErrorMsg("");
  }
  const google = () => {
    window.open("http://localhost:5001/auth/google", "_self");
    console.log(`logged by google`);
  };

  const github = () => {
    window.open("http://localhost:5001/auth/github", "_self");
    console.log(`logged by github`);
  };

  return (
  
    <div className="login">
      <div className="wrapper">
        <div className="animation-or-picture">here gonna rock the animation</div>
        <div className="right">
          <h1 className="loginTitle">Login </h1>
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
          <div className="center">
            <div className="line" />
            <div className="or"></div>
          </div>
          <form
            onFocus={handleErrors}
            onSubmit={handleSubmit((d) => login(d))}
            className="form"
          >
            <input
              type="text"
              placeholder="username"
              name="username"
              {...register("username", { required: "please enter a username" })}
            />
            <p>{errors.username?.message}</p>
            <input
              type="password"
              placeholder="password"
              name="password"
              {...register("password")}
            />
            <p>{errors.password?.message}</p>
            {errorMsg && <h3> {errorMsg} </h3>}
            <input type="submit" className="submit" value="Login" />
          </form>

          <li>
            <Link to="/users/resetpassword" className="password-forgotten" >Password forgotten?</Link>
          </li>
          <li>
            <Link to="/register" className="create-account" >Create an account</Link>
          </li>
        </div>
      </div>
    </div>
  );
}
