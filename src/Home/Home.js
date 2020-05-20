import React, { Component } from "react";
import Logo from "./../logo.png";
import Computer from "./../logo/computer.png";
import Button from "react-bootstrap/Button";
import Plus from "./../logo/plus.png"
import history from "./../history";

class Home extends Component {
  constructor(props) {
    super(props);
	this.state = { width: 0, height: 0};
	
	this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return (
      <div width="100%" height="100%">
        <img
          src={Logo}
          alt="website logo"
          style={{
            width: "20%",
            height: "35%",
            position: "absolute",
            top: "15%",
            right: "15%"
          }}
        />
        <h1
          style={{
            fontSize: "125%",
            position: "absolute",
            top: "17%",
            left: "17%",
            fontFamily: "comic sans ms",
            fontWeight: "300"
          }}
        >
          With Duolingo Chat, you'll get fast, simple messaging
          <br /> available on computers all over the world
        </h1>
        <text 
          style={{
            position: "absolute",
            top: "27.5%",
            left: "24.5%",
            fontWeight: "600",
            color: "blue"
          }}
        >
          Personal Computer
        </text>
        <img
          src={Computer}
          alt="computer"
          style={{
            width: "6%",
            height: "6%",
            position: "absolute",
			top: "26%",
            left: "18.5%"
          }}
        />
        <Button
          variant="dark"
          style={{
            width: "10%",
            height: "4%",
            position: "absolute",
            top: "40%",
            left: "17%"
          }}
          onClick={() => history.push("/Log_in")}
        >
          Log in
        </Button>{" "}
		<Button
          variant="dark"
          style={{
            width: "10%",
            height: "4%",
            position: "absolute",
            top: "40%",
            left: "29%"
          }}
          onClick={() => history.push("/Sign_up")}
        >
          Sign up
        </Button>{" "}
		<hr  style={{
		color: '#D3D3D3',
		width:"100%",
		borderColor : '#D3D3D3',
		position: "absolute",
		top: "65%",
		left: "0%"
		}}/>
		<text
			style={{
			fontSize: "155%",
			position: "absolute",
			top: "83%",
			left: "16.1%",
			fontFamily: "comic sans ms",
            fontWeight: "300"
		}}
        >
          Availability
        </text>
		<text
			style={{
			fontSize: "130%",
			position: "absolute",
			top: "88%",
			left: "12.2%",
			fontFamily: "comic sans ms",
            fontWeight: "300"
		}}
        >
          Available for windows users
        </text>
        <img
          src={Plus}
          alt="Plus"
          style={{
			width: "3%",
            height: "5.8%",
            position: "absolute",
            top: "76%",
            left: "18.3%"
          }}
        />
		<text
			style={{
			fontSize:"155%",
			position: "absolute",
			top: "83%",
			left: "46%",
			fontFamily: "comic sans ms",
            fontWeight: "300"
		}}
        >
          Easy access
        </text>
		<text
			style={{
			fontSize:"130%",
			position: "absolute",
			top: "88%",
			left: "41%",
			fontFamily: "comic sans ms",
            fontWeight: "300"
		}}
        >
          Just sign in and you're good to go
        </text>
        <img
          src={Plus}
          alt="Plus"
          style={{
            width: "3%",
            height: "5.8%",
            position: "absolute",
            top: "76%",
            left: "48.4%"
          }}
        />

		<text
			style={{
			fontSize: "155%",
			position: "absolute",
			top: "83%",
			left: "76%",
			fontFamily: "comic sans ms",
            fontWeight: "300"
		}}
        >
          Free for everybody
        </text>
		<text
			style={{
			fontSize: "130%",
			position: "absolute",
			top: "88%",
			left: "71.3%",
			fontFamily: "comic sans ms",
            fontWeight: "300"
		}}
        >
          Everybody can join and start messaging
        </text>
        <img
          src={Plus}
          alt="Plus"
          style={{
            width: "3%",
            height: "5.8%",
            position: "absolute",
            top: "76%",
            left: "80%"
          }}
        />
      </div>
    );
  }
}
export default Home;

