import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const Navigation = props => {
  console.log(props);
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand href="/Home">Duolingo chat</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/About">About</Nav.Link>
          <Nav.Link href="/Contact">Contact</Nav.Link>
          <Nav.Link href="/Features">Features</Nav.Link>
          <Nav.Link href="/Log_in">Log in</Nav.Link>
          <Nav.Link href="/Sign_up">Sign up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Navigation);
