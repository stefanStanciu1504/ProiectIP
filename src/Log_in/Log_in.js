import React, { Component } from "react";
import md5 from "md5";
import history from "./../history";
import { withCookies } from "react-cookie";
import * as Cookie from "js-cookie";
import cookie from "react-cookies";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import Wave from 'react-wavify'

class Log_in extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      string: "",
      url: "https://exalted-density-273820.nw.r.appspot.com/",
	  logged: false,
	  error:""
    };

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onLogin = this.onLogin.bind(this);
	this.onLogout = this.onLogout.bind(this);
  }

  handleChange1(event) {
    this.setState({ username: event.target.value });
  }

  handleChange2(event) {
    this.setState({ password: event.target.value });
  }
  componentWillMount() {
    this.setState({ userId: cookie.load("userId") });
  }

  onLogin(userId) {
    this.setState({ userId });
    cookie.save("userId", userId, { path: "/" });
  }

  onLogout() {
    cookie.remove("userId", { path: "/" });
  }

  handleSubmit() {
	let url = "https://exalted-density-273820.nw.r.appspot.com/user/login?username=" +
	this.state.username +
	"&password=" +
	md5(this.state.password);
	fetch(url, {
		method: 'POST',
		headers: {
		  Accept: 'application/json',
		  'Content-Type': 'application/json',
		},
		credentials: 'include'
	  }).then(res => {
		  if (res.status === 200) {
			Cookie.set("userId", this.state.username, { path: "/", expires: 14 });
			history.push("/Chat");
			window.location.reload();
		  } else {
			  alert("Invalid credentials!");
		  }
	  });
  }

  render() {
	const style = {
		display: "flex",
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		width:"100%",
		height:"100%"
	};

    return (
      <div style={style}>
		<Wave fill='#4682B4'
				paused={false}
				style={{position:"absolute", top:"0%", width:"100%", height:"100%", backgroundColor:"#B0C4DE"}}
				options={{
				height: 600,
				amplitude: 40,
				speed: 0.2,
				points: 7
				}} />
		 <text style={{fontSize:"150%", position:"absolute", top:"23%", color:"black", fontFamily: "comic sans ms",
            fontWeight: "300"}}>
			  Duolingo Chat
			</text>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            type="text"
            value={this.state.username}
			onChange={this.handleChange1}
			style={{position:"absolute", top:"30%" }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            value={this.state.password}
			onChange={this.handleChange2}
			style={{position:"absolute", top:"40%"}}
          />
          <Button
            variant="dark"
            style={{
              width: "200px",
			  height: "40px",
			  position:"absolute",
			  top:"50%"
            }}
            onClick={() => this.handleSubmit()}
          >
            Log in
          </Button>
      </div>
    );
  }
}

export default withCookies(Log_in);