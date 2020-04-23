import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import * as Cookie from "js-cookie" 
const Navigation = props => {
	if (Cookie.get("userId") === undefined) {
		return (
			<Navbar bg="dark" variant="dark" fixed="top">
			  <Navbar.Brand href="/Home">Duolingo chat</Navbar.Brand>
			  <Navbar.Collapse id="basic-navbar-nav">
				<Nav style = {{ width : "100%" }}>
				  <Nav.Link href="/About">About</Nav.Link>
				  <Nav.Link href="/Contact">Contact</Nav.Link>
				  <Nav.Link href="/Features" >Features</Nav.Link>
				  <Nav.Link href="/Log_in" style = {{ marginLeft:"auto" }}>Log in</Nav.Link>
				  <Nav.Link href="/Sign_up" style = {{marginLeft: "0.3%" }}>Sign up</Nav.Link>
				 
				</Nav>
			  </Navbar.Collapse>
			</Navbar>
		  );
	}
	  else {
		return (
			<Navbar bg="dark" variant="dark" fixed="top" width={window.width}>
			  <Navbar.Brand href="/Home">Duolingo chat</Navbar.Brand>
			  <Navbar.Collapse id="basic-navbar-nav">
				<Nav style = {{ width: "100%" }}>
				  <Nav.Link href="/About">About</Nav.Link>
				  <Nav.Link href="/Contact">Contact</Nav.Link>
				  <Nav.Link href="/Features">Features</Nav.Link>
				  <Navbar.Text style = {{marginLeft: "auto"}}>
						Signed in as: <a href="#login">{Cookie.get("userId")}</a>
				  </Navbar.Text>
				  <Nav.Link href="/Log_out" style = {{ marginLeft:"2%" }}>Log Out</Nav.Link>
				</Nav>
			  </Navbar.Collapse>
			</Navbar>
		  );
	  }
};

export default withRouter(Navigation);
