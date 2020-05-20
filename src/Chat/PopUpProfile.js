import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";

export default class PopUpFriend extends Component {
  handleClick = () => {
	this.props.toggle();
  };
  render() {
	  if (this.props.details !== null) {
		return (
			<Modal show={true} onHide={this.handleClick} style={{display: 'flex',  justifyContent:'center', alignItems:'center' }} animation={true} centered>
			<Modal.Header closeButton>
			  <Modal.Title>{this.props.details.username}'s Profile</Modal.Title>
			</Modal.Header>
			<text style={{paddingLeft:"1%"}}>First name: {this.props.details.firstName}</text>
			<br />
			<text style={{paddingLeft:"1%"}}>Last name: {this.props.details.lastName}</text>
			<br />
			<text style={{paddingLeft:"1%"}}>Email: {this.props.details.email}</text>
			<br />
			<text style={{paddingLeft:"1%"}}>Join date: {this.props.details.joinDate}</text>
			<Modal.Footer>
			  <Button variant="primary" onClick={this.handleClick}>
				Close
			  </Button>
			</Modal.Footer>
		  </Modal>
		);
	  }
    else {
		return null;
	}
  }
}
