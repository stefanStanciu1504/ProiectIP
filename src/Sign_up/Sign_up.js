import React, { Component } from "react";
import history from "../history";
import md5 from "md5";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import Checkbox from "./Checkbox";
import Wave from 'react-wavify'

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

  loadDoc() {
	var data = JSON.stringify({
		username: this.state.username,
		password: md5(this.state.password),
		email: this.state.email,
		firstName: this.state.first_name,
		lastName: this.state.last_name
	  });
	  console.log(data)
	var requestOptions = {
		method: 'POST',
		redirect: 'follow',
		credentials: 'include',
		host:"http://localhost:3000",
		body:data,
		headers: {
			'Content-Type': 'application/json'
		}
	  };
	  
	  fetch("https://exalted-density-273820.nw.r.appspot.com/user/register", requestOptions)
	  .then(response => response.text())
	  .then(result => {
						console.log(result)
						history.push("/Log_in")
							})
		.catch(error => console.log('error', error));
  }

  handleSubmit() {
    if (this.state.checked === false) {
      alert("You must agree with the terms of service!");
    } else {
      this.loadDoc();
    }
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
				height: 800,
				amplitude: 50,
				speed: 0.15,
				points: 5
				}} />
		 <text style={{fontSize:"150%", position:"absolute", top:"7%", color:"black", fontFamily: "comic sans ms",
            fontWeight: "300"}}>
			  Duolingo Chat
			</text>
        <TextField
          required
          id="outlined-required"
          label="Username"
          variant="outlined"
          style={{ position: "absolute", top: "15%", borderBlockColor:"black"}}
		  type="text"
          value={this.state.username}
          onChange={this.handleChange1}
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
          variant="outlined"
          style={{ position: "absolute", top: "25%"}}
          type="password"
          value={this.state.password}
          onChange={this.handleChange2}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          variant="outlined"
          style={{ position: "absolute", top: "35%"}}
          type="text"
          value={this.state.email}
          onChange={this.handleChange3}
        />
        <TextField
          required
          id="outlined-required"
          label="First Name"
          variant="outlined"
          style={{ position: "absolute", top: "45%"}}
          type="text"
          value={this.state.first_name}
          onChange={this.handleChange4}
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          variant="outlined"
          style={{ position: "absolute", top: "55%"}}
          type="text"
          value={this.state.last_name}
          onChange={this.handleChange5}
        />
        <label style={{ position: "absolute", top: "65%"}}>
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
            top: "75%"
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
