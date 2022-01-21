import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../context/SharedContext";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
export default function Home() {
  const { state, dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5001/auth/login/success", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          dispatch(
            { type: "AUTHENTICATED", payload: resObject.user },
            console.log(`resObject.user`, resObject.user)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  console.log("state", state);
  return (
    <div>
      <NavBar />
      <h1>this is the Home page</h1>
      {state.user.source !== "github" ? (
        <h2>{state.user.email}</h2>
      ) : (
        <h2>{state.user.firstName}</h2>
      )}
    </div>
  );
}
