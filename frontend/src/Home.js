import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";

import "./Home.css";

function Home() {

  return (
    <div>{
      localStorage.getItem("user-token") ? (
        <>
        <h1>Welcome back {localStorage.getItem("user-name")}</h1>
        <p>All jobs, in one place.</p>
        </>
      ) : (
        <div>
          <h1>Jobly</h1>
          <p>All Jobs, in one place.</p>
          <Link to="login">LOG IN</Link>
          <Link to="signup">SIGN UP</Link>
        </div>
      )
    }
    </div>
  )
}

export default Home;
