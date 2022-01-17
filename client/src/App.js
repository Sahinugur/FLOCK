import React from "react";
import './app.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import SharedContext from "./context/SharedContext";
import Login from "./components/Login.jsx";
import Home from "./pages/Home.js";
import Posts from "./components/posts.jsx"
export default function App() {
  return (
    <SharedContext>
      <div>
        <Routes>
          <Route path="/" element={<Login />}></Route>
           <Route path="/home" element={<Home />}></Route>
           <Route path="/posts" element={<Posts />}></Route>
         {/* <Route path="/join" element={<Join />}></Route> */}
        </Routes>
      </div>
    </SharedContext>
  );
}
