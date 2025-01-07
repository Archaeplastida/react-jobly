import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import "./Home.css";

function Home() {

  if (localStorage.getItem("reload")) {
    window.location.reload();
    localStorage.removeItem("reload");
  }

  return (
    <div className="home-container">
      {localStorage.getItem("user-token") ? (
        <Card className="home-card">
          <CardBody>
            <CardTitle tag="h1" className="card-title text-center">
              Welcome back {localStorage.getItem("user-name")}
            </CardTitle>
            <p className="card-text text-center">All jobs, in one place.</p>
          </CardBody>
        </Card>
      ) : (
        <Card className="home-card">
          <CardBody>
            <CardTitle tag="h1" className="card-title text-center">
              Jobly
            </CardTitle>
            <p className="card-text text-center">All Jobs, in one place.</p>
            <div className="button-container">
              <Button color="primary">
                <Link to="/login" className="text-white text-decoration-none">
                  LOG IN
                </Link>
              </Button>
              <Button color="success">
                <Link to="/signup" className="text-white text-decoration-none">
                  SIGN UP
                </Link>
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default Home;