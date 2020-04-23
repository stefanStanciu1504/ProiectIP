import React, { Component } from "react";
import md5 from "md5";
import history from "./../history";
import { withCookies } from "react-cookie";
import * as Cookie from "js-cookie";
import cookie from "react-cookies";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";

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
	// var request = require("request");
	// var username = this.state.username;
    // request.post(
    //   this.state.url +
    //     "user/login?username=" +
    //     this.state.username +
    //     "&password=" +
    //     md5(this.state.password),
    //   function(err, response, body) {
    //     if (response.statusCode !== 200) {
    //       alert("Invalid credentials!");
    //     } else {
    //       Cookie.set("userId", username, { path: "/", expires: 14 });
	// 	  //history.push("/Chat");
	// 	//   window.location.reload();
    //     }
    //   }
	// );
	fetch('https://exalted-density-273820.nw.r.appspot.com/' + "user/login?username=" +
        this.state.username +
        "&password=" +
        md5(this.state.password), {
		method: 'POST',
		headers: {
		  Accept: 'application/json',
		  'Content-Type': 'application/json',
		},
		credentials: 'include'
	  }).then(res => {
		console.log(res);
	  });
  }

  render() {
    return (
      <div>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            type="text"
            value={this.state.username}
            onChange={this.handleChange1}
            style={{ position: "absolute", top: 500, left: 400 }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            value={this.state.password}
            onChange={this.handleChange2}
            style={{ position: "absolute", top: 600, left: 400 }}
          />
          <Button
            variant="dark"
            style={{
              width: "200px",
              height: "40px",
              position: "absolute",
              top: 700,
              left: 400
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