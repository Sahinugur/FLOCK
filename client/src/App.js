import React from "react";
import "./app.css";
import { Routes, Route } from "react-router-dom";
import SharedContext from "./context/SharedContext";
import Login from "./components/Login/Login";
import Home from "./pages/Home.js";
import Register from "./components/Register/Register";
import Projects from "./pages/Projects.jsx";
import Post from "./components/Post/Post";
import Events from "./components/Events/Events.jsx";
import EventDetails from "./components/EventDetails/EventDetails";

// import Post from "./components/Post.jsx";
export default function App() {
  return (
    <>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js"></script>

      <SharedContext>
        <Routes>
          <Route path="/" exact element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/posts" element={<Post />}></Route>
          {/* <Route path="/join" element={<Join />}></Route>  */}
          {/* <Route path="/posts" element={<Post />}></Route> */}
          {/* <Route path="/join" element={<Join />}></Route> */}
          <Route path="/events" exact element={<Events />}></Route>
          <Route path="/events/:id" exact element={<EventDetails />}></Route>
        </Routes>
      </SharedContext>
    </>
  );
}
