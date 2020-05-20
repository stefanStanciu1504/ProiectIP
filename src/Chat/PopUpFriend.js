import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Divider from '@material-ui/core/Divider';
import FriendsHelper from "../Friends/FriendsHelper"
import * as Cookie from "js-cookie";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";

export default class PopUpFriend extends Component {
	constructor(props) {
		super(props);
		this.state ={ user: "", people: [], copy_user: ""}
		this.handleChange = this.handleChange.bind(this);
		this.send = this.send.bind(this);
		this.sendClick = this.sendClick.bind(this);
	}


  handleClick = () => {
	this.props.toggle();
  };

  async sendClick() {
	let url = "https://exalted-density-273820.nw.r.appspot.com/search?query=" + this.state.user;
	if (this.state.user.trim() !== Cookie.get("userId") && this.state.user.trim() !== "") {
		var requestOptions = {
			method: 'GET',
			redirect: 'follow',
			credentials: 'include',
			host:"http://localhost:3000"
		};
		const users = await fetch(url, requestOptions)
			.then(response => response.text())
			.catch(error => console.log('error', error));
		this.setState({ people: JSON.parse(users) });
		let aux = this.state.user;
		this.setState({ copy_user: aux});
		this.setState({ user: "" });
	} else {
		alert("Can't search!");
	}
	this.setState({ user: "" });
  }

  async send(event) {
	if (event.key === 'Enter') {
		let url = "https://exalted-density-273820.nw.r.appspot.com/search?query=" + this.state.user;
		if (this.state.user.trim() !== Cookie.get("userId") && this.state.user.trim() !== "") {
			var requestOptions = {
				method: 'GET',
				redirect: 'follow',
				credentials: 'include',
				host:"http://localhost:3000"
			};
			const users = await fetch(url, requestOptions)
				.then(response => response.text())
				.catch(error => console.log('error', error));
			this.setState({ people: JSON.parse(users) });
			let aux = this.state.user;
			this.setState({ copy_user: aux});
			this.setState({ user: "" });
		} else {
			alert("Can't search!");
		}
		this.setState({ user: "" });
	}
}
handleChange(event) {
	this.setState({ user: event.target.value });
}

  render() {
    return (
		<Modal show={true} onHide={this.handleClick} style={{display: 'flex',  justifyContent:'center', alignItems:'center' }} animation={true} centered>
		<Modal.Header closeButton>
          <Modal.Title>Search for friends</Modal.Title>
        </Modal.Header>
		  <TextField
					id="outlined-basic"
					label="Search user"
					variant="outlined"
					type="text"
					value={this.state.user}
					onChange={this.handleChange}
					onKeyDown={this.send}
				/>
		<Divider />
		<div>
			<FriendsHelper user={this.state.user} people={this.state.people} copy_user={this.state.copy_user} toggle={this.handleClick} />
		</div>
		<Modal.Footer>
          <Button variant="primary" onClick={this.sendClick}>
            Search for friend
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
