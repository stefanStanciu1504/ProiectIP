import React, { Component } from "react";
import history from "../history";
import md5 from "md5";

class Sign_up extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      first_name: "",
      last_name: ""
    };

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleChange5 = this.handleChange5.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadDoc = this.loadDoc.bind(this);
    this.ceva = this.ceva.bind(this);
  }

  handleChange1(event) {
    this.setState({ username: event.target.value });
  }

  handleChange2(event) {
    this.setState({ password: event.target.value });
  }

  handleChange3(event) {
    this.setState({ email: event.target.value });
  }

  handleChange4(event) {
    this.setState({ first_name: event.target.value });
  }

  handleChange5(event) {
    this.setState({ last_name: event.target.value });
  }

  ceva(ceva2) {
    history.push("/About");
  }

  loadDoc(url, cFunction) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          cFunction(this);
        } else {
          alert("Invalid credentials");
        }
      }
    };
    var data = JSON.stringify({
      username: this.state.username,
      password: md5(this.state.password),
      email: this.state.email,
      firstName: this.state.first_name,
      lastName: this.state.last_name
    });
    xhttp.send(data);
  }

  handleSubmit(event) {
    this.loadDoc(
      "http://duolingochatapp-env.eba-dv6cpjjy.us-east-2.elasticbeanstalk.com/user/register",
      this.ceva
    );
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label style={{ position: "absolute", top: 200, left: 400 }}>
            Username:
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChange1}
            />
          </label>
          <label style={{ position: "absolute", top: 300, left: 400 }}>
            Password:
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange2}
            />
          </label>
          <label style={{ position: "absolute", top: 400, left: 400 }}>
            Email:
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleChange3}
            />
          </label>
          <label style={{ position: "absolute", top: 500, left: 400 }}>
            First Name:
            <input
              type="text"
              value={this.state.first_name}
              onChange={this.handleChange4}
            />
          </label>
          <label style={{ position: "absolute", top: 600, left: 400 }}>
            Last Name:
            <input
              type="text"
              value={this.state.last_name}
              onChange={this.handleChange5}
            />
          </label>
          <input
            type="submit"
            value="Sign up"
            style={{ position: "absolute", top: 700, left: 400 }}
          />
        </form>
      </div>
    );
  }
}

export default Sign_up;
