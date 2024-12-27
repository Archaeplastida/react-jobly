import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./Home.css";

function Home() {
  return (
  <div>{
    localStorage.getItem("user-token") ? (
      <h1>Welcome back INSERT_USER</h1>
  ):(
    <div>
      <h1>Jobly</h1>
      <p>All Jobs, in one place.</p>
      <button>LOG IN</button>
      <button>SIGN UP</button>
    </div>
  )
  }
  </div>
    )
  }

export default Home;
