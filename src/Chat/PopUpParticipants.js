import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import MenuItem from "@material-ui/core/MenuItem";

export default class PopUpParticipants extends Component {
  handleClick = () => {
	this.props.toggle();
  };
  render() {
	  if (this.props.participants !== null) {
		return (
			<Modal show={true} onHide={this.handleClick} style={{display: 'flex',  justifyContent:'center', alignItems:'center' }} animation={true} centered>
			<Modal.Header closeButton>
			  <Modal.Title>Group's participants:</Modal.Title>
			</Modal.Header>
			{this.props.participants.map(function(item) {
				return(<MenuItem key={item} style={{fontFamily: "comic sans ms",
					fontWeight: "300", color:"#00000" }}>
						{" "}
						{item}
					</MenuItem>);
				}
			)}
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
