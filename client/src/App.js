import React from "react";
import './app.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import SharedContext from "./context/SharedContext";
import Login from "./components/Login.styled.js";
import Home from "./pages/Home.js";


import { GlobalStyles } from "./components/GlobalStyles.style"

export default function App() {
  return (
    <>  
    <GlobalStyles />
    <SharedContext>
      <div>
    
        <Routes>
          <Route path="/" element={<Login />}></Route>
           <Route path="/home" element={<Home />}></Route>
         {/* <Route path="/join" element={<Join />}></Route> */}
        </Routes>
      </div>
    </SharedContext>
    </>
  );
}
