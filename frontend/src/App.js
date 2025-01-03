import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import JoblyApi from "./api";


//Route components
import NavBar from "./Navbar";
import Home from "./Home";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Jobs from "./Jobs";
import Companies from "./Companies";
import Company from "./Company";
import Profile from "./Profile";

function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="login" element={<LogIn/>}/>
          <Route path="jobs" element={<Jobs/>}/>
          <Route path="companies" element={<Companies/>}/>
          <Route path="companies/:companyHandle" element={<Company/>}/>
          <Route path="profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;