import React, { Component } from "react";
import * as Cookie from "js-cookie";
import TextField from "@material-ui/core/TextField";
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import FriendsHelper from "./FriendsHelper"


class Friends extends Component {
	constructor(props) {
		super(props);
		this.state ={ user: "", people: [], copy_user: ""}
		this.handleChange = this.handleChange.bind(this);
		this.send = this.send.bind(this);
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
	const styles = {
		height: "40%",
		width: "40%",
		textAlign: 'center',
		marginLeft: '0%',
		position:"absolute",
		left:"240px",
		top:"54px",
		backgroundColor:"#FFFFFF"
	};
    return (
		<Paper style={styles} zdepth={2} >
		<TextField
					id="outlined-basic"
					label="Search user"
					variant="outlined"
					type="text"
					value={this.state.user}
					onChange={this.handleChange}
					onKeyDown={this.send}
					style={{ display: "flex", position: 'absolute', top: 200, left: 200 }}
				/>
		<Divider />
		<div style={{position:"absolute", top:300, left:200}} >
			<FriendsHelper user={this.state.user} people={this.state.people} copy_user={this.state.copy_user} />
		</div>
        </Paper>
    );
  }
}

export default Friends;
