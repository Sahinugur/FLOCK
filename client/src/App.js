import React from "react";
import "./app.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import SharedContext from "./context/SharedContext";
import Login from "./components/Login.jsx";
import Home from "./pages/Home.js";
import Register from "./components/Register";
import Events from "./components/Events/Events.jsx";
import EventDetails from "./components/EventDetails/EventDetails";

// import Post from "./components/Post.jsx";
export default function App() {
  return (
    <SharedContext>
      <div>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          {/* <Route path="/posts" element={<Post />}></Route> */}
          {/* <Route path="/join" element={<Join />}></Route> */}
          <Route path="/events" exact element={<Events />}></Route>
          <Route path="/events/:id" exact element={<EventDetails />}></Route>
        </Routes>
      </div>
    </SharedContext>
  );
}
