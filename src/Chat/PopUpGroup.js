import React, { Component } from "react";
import GroupHelper from "./GroupHelper"
import Modal from 'react-bootstrap/Modal'
import TextField from "@material-ui/core/TextField";
import * as Cookie from "js-cookie";

export default class PopUpGroup extends Component {
	constructor(props) {
		super(props);
		this.state ={ user: "", people: [], group_name: "" }
		this.handleChange = this.handleChange.bind(this);
	}
  handleClick = () => {
	this.props.toggle();
  };

  handleChange(event) {
    this.setState({ group_name: event.target.value });
  }

  render() {
    return (
		<Modal show={true} onHide={this.handleClick} style={{display: 'flex',  justifyContent:'center', alignItems:'center' }} animation={true} centered>
		<Modal.Header closeButton>
          <Modal.Title>New Group</Modal.Title>
        </Modal.Header>
		<TextField
			required
			id="outlined-full-width"
			label="Group Name"
			value={this.state.group_name}
			onChange={this.handleChange}
			margin="normal"
			variant="outlined"
			color="secondary"
			style={{paddingBottom:"5px"}}
        />
		<GroupHelper friends={this.props.friends} toggle={this.handleClick} group_name={this.state.group_name} user={Cookie.get("userId")} />
      </Modal>
    );
  }
}
