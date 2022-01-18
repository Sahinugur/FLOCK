import React, {useState, useContext } from "react";
import {Link} from 'react-router-dom'
import makeCall from "../api/Call";
import { ChatContext } from "../context/SharedContext";
import { useNavigate } from "react-router-dom";
import Google from "../img/google.png";
import Github from "../img/github.png";
import env from '../api/env';

export default function Login() {
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });
  const { state, dispatch } = useContext(ChatContext);
  let navigate = useNavigate();


  function getValue(e) {
    e.preventDefault();
    console.log(`e`, e);
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  }
  function login(e) {
    e.preventDefault();
    makeCall(env.LOGIN, "POST", inputValues)
      .then((result) => {
      dispatch({ type: "AUTHENTICATED", payload: result.user });
      navigate(`/home`);
     
    }); 
  }


  const google = () => {
    window.open(env.BASE_URL + env.GOOGLE, "_self");
    console.log(`logged by google`);
  };

  const github = () => {
    window.open(env.BASE_URL + env.GITHUB, "_self");
    console.log(`logged by github`);
  };

  return (
    <div className="login">
      
      <div className="wrapper">
        
       <div>here gonna rock the animation</div>
        <div className="right">
          <h1 className="loginTitle">Choose a Login Method</h1>
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
          <div className="or">OR</div>
        </div>
          <form onChange={getValue} onSubmit={login} className="form">
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="password" name="password" />
            <input type="submit" className="submit" value="Login"/>
          </form>
          <li><Link to='/users/resetpassword'>Password forgotten?</Link></li>
          <li><Link to='/register'>Create an account</Link></li>
        </div> 
        </div>
      </div>
    
  );
}
