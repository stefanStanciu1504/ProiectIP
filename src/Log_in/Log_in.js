import React, { Component } from "react";
import md5 from "md5";
import history from "./../history";

class Log_in extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", string: "" };

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
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

  ceva(ceva2) {
    history.push("/About");
  }

  loadDoc(url, cFunction) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          cFunction(this);
        } else {
          alert("Invalid credentials!");
        }
      }
    };
    xhttp.open("POST", url, true);
    xhttp.send();
  }

  handleSubmit(event) {
    this.loadDoc(
      "http://duolingochatapp-env.eba-dv6cpjjy.us-east-2.elasticbeanstalk.com/user/login?username=" +
        this.state.username +
        "&password=" +
        md5(this.state.password),
      this.ceva
    );

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label style={{ position: "absolute", top: 500, left: 400 }}>
            Username:
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChange1}
            />
          </label>
          <label style={{ position: "absolute", top: 600, left: 400 }}>
            Password:
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange2}
            />
          </label>
          <input
            type="submit"
            value="Log in"
            style={{ position: "absolute", top: 700, left: 400 }}
          />
        </form>
      </div>
    );
  }
}

export default Log_in;
