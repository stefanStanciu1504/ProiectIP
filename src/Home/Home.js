import React, { Component } from "react";
import Logo from "./../logo.png";
import Computer from "./../logo/computer.png";
import Phone from "./../logo/smartphone.jpg";
import Button from "react-bootstrap/Button";
import Plus from "./../logo/plus.png"
import history from "./../history";

class Home extends Component {
  constructor(props) {
    super(props);
	this.state = { width: 0, height: 0};
	
	this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	this.getFriends = this.getFriends.bind(this);

	this.getFriends();
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
  getFriends() {
	// var request = require("request");
	// // request.get(
	// // 	"https://exalted-density-273820.nw.r.appspot.com/user/test",
	// // 	function(err, response, body) {
	// // 	  if (response.statusCode !== 200) {
	// // 		console.log(err);
	// // 	  } else {
	// // 	   console.log(response);
	// // 	  }
	// // 	}
	// //   );

    // request.get(
    //   this.state.url,
    //   function(err, response, body) {
    //     if (response.statusCode !== 200) {
    //       console.log(response);
    //     } else {
	// 	 console.log(body);
    //     }
    //   }
	// );
	// fetch('https://exalted-density-273820.nw.r.appspot.com/' + "user/test", {
	// 	method: 'GET',
	// 	headers: {
	// 	  Accept: 'text/plain',
	// 	  	'Content-Type': 'text/plain',
	// 		'Access-Control-Allow-Origin':'https://localhost:3000/Home'
	// 	},
	// 	credentials: 'same-origin'
	//   }).then(res => {
	// 	console.log(res);
	//   });

	var requestOptions = {
		method: 'GET',
		redirect: 'follow',
		credentials: 'include',
		host:"http://localhost:3000"
	  };
	  
	  fetch("https://exalted-density-273820.nw.r.appspot.com/friends/list", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
  }

  render() {
    return (
      <div width={this.state.width} height={this.state.height}>
        <img
          src={Logo}
          alt="website logo"
          style={{
            width: this.state.width / 4,
            height: this.state.height / 2.5,
            position: "absolute",
            top: this.state.height / 8,
            right: this.state.width / 6
          }}
        />
        <h1
          style={{
            fontSize: 20,
            position: "absolute",
            top: this.state.height / 5.5,
            left: this.state.width / 6,
            fontFamily: "comic sans ms",
            fontWeight: "300"
          }}
        >
          With Duolingo Chat, you'll get fast, simple messaging
          <br /> available on phones and computers all over the world
        </h1>
        <text
          style={{
            position: "absolute",
            top: this.state.height / 3.7,
            left: this.state.width / 4.1,
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
            width: "100px",
            height: "60px",
            position: "absolute",
			top: this.state.height / 3.9,
            left: this.state.width / 5.3
          }}
        />
        <text
          style={{
            position: "absolute",
            top: this.state.height / 2.74,
            left: this.state.width / 4.1,
            fontWeight: "600",
            color: "blue"
          }}
        >
          Smartphone
        </text>
        <img
          src={Phone}
          alt="phone"
          style={{
            width: "60px",
            height: "60px",
            position: "absolute",
            top: this.state.height / 2.87,
            left: this.state.width / 5.05
          }}
        />
        <Button
          variant="dark"
          style={{
            width: "200px",
            height: "40px",
            position: "absolute",
            top: this.state.height / 2.19,
            left: this.state.width / 5.9
          }}
          onClick={() => history.push("/Log_in")}
        >
          Log in
        </Button>{" "}
		<Button
          variant="dark"
          style={{
            width: "200px",
            height: "40px",
            position: "absolute",
            top: this.state.height / 2.19,
            left: this.state.width / 3.4
          }}
          onClick={() => history.push("/Sign_up")}
        >
          Sign up
        </Button>{" "}
		<hr  style={{
		color: '#D3D3D3',
		width:this.state.width,
		borderColor : '#D3D3D3',
		position: "absolute",
		top: this.state.height / 1.5,
		left: "0px"
		}}/>

		<text
			style={{
			position: "absolute",
			top: this.state.height / 2.74,
			left: this.state.width / 4.1,
			fontWeight: "600",
			color: "blue"
		}}
        >
          Smartphone
        </text>
        <img
          src={Phone}
          alt="phone"
          style={{
            width: "60px",
            height: "60px",
            position: "absolute",
            top: this.state.height / 2.87,
            left: this.state.width / 5.05
          }}
        />
		<text
			style={{
			fontSize:25,
			position: "absolute",
			top: this.state.height / 1.2,
			left: this.state.width / 6.2,
			fontFamily: "comic sans ms",
            fontWeight: "300"
		}}
        >
          Availability
        </text>
		<text
			style={{
			fontSize:20,
			position: "absolute",
			top: this.state.height / 1.13,
			left: this.state.width / 8.6,
			fontFamily: "comic sans ms",
            fontWeight: "300"
		}}
        >
          Available for windows and phone users
        </text>
        <img
          src={Plus}
          alt="Plus"
          style={{
            width: "60px",
            height: "60px",
            position: "absolute",
            top: this.state.height / 1.3,
            left: this.state.width / 5.65
          }}
        />
		<text
			style={{
			fontSize:25,
			position: "absolute",
			top: this.state.height / 1.2,
			left: this.state.width / 2.12,
			fontFamily: "comic sans ms",
            fontWeight: "300"
		}}
        >
          Easy access
        </text>
		<text
			style={{
			fontSize:20,
			position: "absolute",
			top: this.state.height / 1.13,
			left: this.state.width / 2.29,
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
            width: "60px",
            height: "60px",
            position: "absolute",
            top: this.state.height / 1.3,
            left: this.state.width / 2.05
          }}
        />

		<text
			style={{
			fontSize:25,
			position: "absolute",
			top: this.state.height / 1.2,
			left: this.state.width / 1.32,
			fontFamily: "comic sans ms",
            fontWeight: "300"
		}}
        >
          Free for everybody
        </text>
		<text
			style={{
			fontSize:20,
			position: "absolute",
			top: this.state.height / 1.13,
			left: this.state.width / 1.38,
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
            width: "60px",
            height: "60px",
            position: "absolute",
            top: this.state.height / 1.3,
            left: this.state.width / 1.2639
          }}
        />
      </div>
    );
  }
}
export default Home;

