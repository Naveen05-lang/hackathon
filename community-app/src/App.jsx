import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PostLoginHome from "./pages/PostLoginHome";
import Dashboard from "./YogaCompnents/Dashboard";
import YogasanaDetail from "./YogaCompnents/YogasanaDetail";
import About from "./pages/About";
import LeadershipBoard from "./pages/LeadershipBoard";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post-login-home" element={<PostLoginHome />} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/yoga/:id" element={<YogasanaDetail />} />
        <Route path="/about" element={<About/>} />
        <Route path="/leadershipboard" element={<LeadershipBoard/>} />
        <Route path="/userprofile" element={<UserProfile/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
