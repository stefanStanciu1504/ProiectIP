import React, { Component } from "react";
import history from "../history";
import md5 from "md5";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import Checkbox from "./Checkbox";

class Sign_up extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      first_name: "",
      last_name: "",
      url: "https://exalted-density-273820.nw.r.appspot.com/",
      checked: false
    };

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleChange5 = this.handleChange5.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.loadDoc = this.loadDoc.bind(this);
    this.ceva = this.ceva.bind(this);
  }

  createCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  );

  handleCheckboxChange = event =>
    this.setState({ checked: event.target.checked });

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
    history.push("/Log_in");
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

  handleSubmit() {
    if (this.state.checked === false) {
      alert("You must agree with the terms of service!");
    } else {
      this.loadDoc(this.state.url + "/user/register", this.ceva);
    }
  }

  render() {
    return (
      <div>
        <TextField
          required
          id="outlined-required"
          label="Username"
          defaultValue=""
          variant="outlined"
          style={{ position: "absolute", top: 200, left: 400 }}
          type="text"
          value={this.state.username}
          onChange={this.handleChange1}
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
          defaultValue=""
          variant="outlined"
          style={{ position: "absolute", top: 300, left: 400 }}
          type="password"
          value={this.state.password}
          onChange={this.handleChange2}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          defaultValue=""
          variant="outlined"
          style={{ position: "absolute", top: 400, left: 400 }}
          type="email"
          value={this.state.email}
          onChange={this.handleChange3}
        />
        <TextField
          required
          id="outlined-required"
          label="First Name"
          defaultValue=""
          variant="outlined"
          style={{ position: "absolute", top: 500, left: 400 }}
          type="text"
          value={this.state.first_name}
          onChange={this.handleChange4}
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          defaultValue=""
          variant="outlined"
          style={{ position: "absolute", top: 600, left: 400 }}
          type="text"
          value={this.state.last_name}
          onChange={this.handleChange5}
        />
        <label style={{ position: "absolute", top: 700, left: 400 }}>
          <Checkbox
            checked={this.state.checked}
            onChange={this.handleCheckboxChange}
          />
          <span style={{ marginLeft: 8, fontWeight: "600" }}>
            I agree to the terms of service
          </span>
        </label>
        <Button
          variant="dark"
          style={{
            width: "200px",
            height: "40px",
            position: "absolute",
            top: 800,
            left: 400
          }}
          onClick={() => this.handleSubmit()}
        >
          Sign up
        </Button>
      </div>
    );
  }
}

export default Sign_up;
