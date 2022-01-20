import React, { useState, useContext } from "react";
import makeCall from "../api/Call";
import { ChatContext } from "../context/SharedContext";
import { useNavigate } from "react-router-dom";
import Google from "../img/google.png";
import Github from "../img/github.png";
import env from '../api/env';
import styled from 'styled-components';
import { GlobalStyles } from "./GlobalStyles.style.jsx" // works like a global css file.


// **** This is a styled React component ****



export default function Login() {

    // State Hook
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
    // if the login is successful we are send to /home
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

    // using the styled Components below:

    return (
        <>
            <GlobalStyles />
            <LoginDiv>
                <LoginTitle>Choose a login Method</LoginTitle>
                <WrapperIt>
                    <LeftDiv>
                        <GoogleLoginButton onClick={google}>
                            <GoogleIcon></GoogleIcon>
                            Google
                        </GoogleLoginButton>

                        <GithubLoginButton onClick={github}>
                            <GithubIcon></GithubIcon>
                            Github
                        </GithubLoginButton>
                    </LeftDiv>

                    <CenterDiv>
                        {/* <LineDiv></LineDiv> */}
                    </CenterDiv>

                    <RightDiv>
                        <FormDiv onChange={getValue} onSubmit={login}>
                            <InputField type="text" placeholder="username" name="username"></InputField>
                            <InputField type="password" placeholder="password" name="password"></InputField>
                            <SubmitField type="submit" className="submit" value="Login">Login</SubmitField>
                        </FormDiv>
                    </RightDiv>
                </WrapperIt>
            </LoginDiv>
        </>
    )
};



// **** styled components ****

const LoginDiv = styled.div`
    position: relative;
    top: 40px;
    height: calc(100vh - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
    `;

const LoginTitle = styled.h1`
    position: absolute;
    top: 150px;
    color: black;
    border-bottom: 2px solid black;
    padding: 20px;


    `;
const WrapperIt = styled.div`
    width: 60%;
    height: 75%;
    -webkit-box-shadow: 0px 5px 33px -21px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 5px 33px -21px rgba(66, 68, 90, 1);
    box-shadow: 0px 5px 33px -21px rgba(66, 68, 90, 1);
    box-shadow-bottom: 10px 5px 10px 20px black;
    display: flex;
    align-items: center;
    border-radius: 20px;
    background-color: rgba(253,255,255,1);
    border-left: 1px solid black;
    border-bottom: 4.5px solid black;
    border-right: 7px solid black;
    
    `;
const LeftDiv = styled.div`
    position: relative;
    bottom: 23px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    `;
const GoogleLoginButton = styled.div`
    background-color: #df4930;
    width: 150px;
    padding: 15px 25px;
    border-radius: 5px;
    color: white;
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-bottom: 20px;
    cursor: pointer;

    &:hover {
        border-radius:30px;
        transition: 0.5s;
    }
    `;
const GoogleIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 10px;
    `;

// next wrap
const GithubLoginButton = styled.div`
    background-color: black;
    width: 150px;
    padding: 15px 25px;
    border-radius: 5px;
    color: white;
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-bottom: 20px;
    cursor: pointer; 

    &:hover {
        border-radius:30px;
        transition: 0.5s;
    }
    `;
const GithubIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 10px;
    `;
//  next wrap
const CenterDiv = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    `;
const LineDiv = styled.div`
    // height: 0.5px;
    // width: 300px;

    width: 0.5px;
    height: 70%;
    background-color: gray;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: -1;
    `;

// next wrap
const RightDiv = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    `;

const FormDiv = styled.form` 
    `;
const InputField = styled.input`
    position:relative;
    width: 200px;
    padding: 15px 20px;
    margin-bottom: 20px;

    &:hover {
        left: 10px;
    }
    `;

const SubmitField = styled.form`
    width: 200px;
    background-color: rgba(128, 0, 128, 0.671);
    color: white;
    font-weight: bold;
    border: none;
    padding: 15px 20px;
    border-radius: 1px;


    &:hover {
        border-radius:30px;
        transition: 0.5s;
        font-size: 1.2rem;
        border: 2px solid black;
        width: 100px;
       
    }
    `;

