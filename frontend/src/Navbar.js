import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
 
function NavBar() {
  return (
    <div className="navbar-container">
      <Navbar expand="md" className="custom-navbar">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>
        <Nav className="nav-links">
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
        </Nav>
      </Navbar>
    </div>
  );
}
 
export default NavBar;