import React, { useState } from "react";
import "./NavBar.css";
import { NavLink, Navigate } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
 
function NavBar() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
 
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user-token");
    setShouldRedirect(true);
    window.location.reload();
  };
 
  return (
    <div className="navbar-container">
      <Navbar expand="md" className="custom-navbar">
        <NavLink to="/" className="navbar-brand">
          Jobly
        </NavLink>
        <Nav className="nav-links">
          {localStorage.getItem("user-token") ? (
            <NavItem>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
              <NavLink to="/jobs" className="nav-item-link">
                Jobs
              </NavLink>
              <NavLink to="/companies" className="nav-item-link">
              Companies
              </NavLink>
              <NavLink to="/profile" className="nav-item-link">
                Profile
              </NavLink>
            </NavItem>
          ) : (
            <>
              <NavItem>
                <NavLink to="/login" className="nav-item-link">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/signup" className="nav-item-link">
                  Sign Up
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
      {shouldRedirect && <Navigate to="/" />}
    </div>
  );
}
 
export default NavBar;