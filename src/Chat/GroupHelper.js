import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";

export default class GroupHelper extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		filtered: [], group_users:[]
	  };
	  this.handleChange = this.handleChange.bind(this);
	  this.addGroupPeople = this.addGroupPeople.bind(this);
	  this.sendClick = this.sendClick.bind(this);
	  this.removePeople = this.removePeople.bind(this);
	}

	handleClick = () => {
		this.props.toggle();
	};

	sendClick(event) {
		let url = "https://exalted-density-273820.nw.r.appspot.com/group/create";
		var data = JSON.stringify ({
			groupName: this.props.group_name,
			groupUsers:this.state.group_users
		});
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
		fetch(url, requestOptions)
				.then(response => response.text())
				.catch(error => console.log('error', error));
		event.preventDefault();
		this.handleClick();
	  }

	addGroupPeople(e) {
		const exists = this.state.group_users.some(v => (v === e.username));
		if (exists === false) {
			this.setState((state) => ({
				group_users: state.group_users.concat([e.username])
			  }))
		}
		this.removePeople(e)
	}
	componentDidMount() {
	  this.setState({
		filtered: this.props.friends
	  });
	}
	componentWillReceiveProps(nextProps) {
	  this.setState({
		filtered: nextProps.friends
	  });
	}
  
	handleChange(e) {
	  let currentList = [];
	  let newList = [];
  
	  if (e.target.value !== "") {
		currentList = this.props.friends;
  
		newList = currentList.filter(item => {
			if (item.group === false) {
				const lc = item.firstName.toLowerCase();
				const filter = e.target.value.toLowerCase();
				return lc.includes(filter);
			} else {
				return null;
			}
		});
	  } else {
		newList = this.props.friends;
	  }
	  this.setState({
		filtered: newList
	  });
	}

	removePeople(e) {
		var array = [...this.state.filtered];
		var index = array.indexOf(e)
		if (index !== -1) {
		  array.splice(index, 1);
		  this.setState({filtered: array});
		}
	}
  
  
	render() {
		const self = this;
	  return (
		<Container fluid style={{paddingBottom:"1%"}}>
			<text> Participants: </text>
			{this.state.group_users.map(function(item) {
				return (<MenuItem key={item} style={{fontFamily: "comic sans ms",
				  fontWeight: "300", color:"#000000" }}>
					  {" "}
					  {item}
				  </MenuItem>);
		  })}
		  <TextField
			id="filled-basic"
			label="Search friends"
			type="text"
			variant="filled"
			autoComplete="off"
			onChange={this.handleChange}
			fullWidth
			style={{paddingBottom:"1%"}}
		  />
		  <text>Add participants</text>
		  {this.state.filtered.map(function(item) {
			  if (item.username !== undefined && item.group === false) {
				  return (<MenuItem key={item.username} style={{fontFamily: "comic sans ms",
				  fontWeight: "300", color:"#000000" }}>
					  {" "}
					  {item.firstName}{" "}{item.lastName}
					  <Button variant="primary" size="sm" style={{marginLeft:"auto"}} onClick={() => {self.addGroupPeople(item)}}>
								Add
					</Button>
				  </MenuItem>);
			  } else {
				  return null;
			  }
		  })}
		  <br/>
		  <Row>
			  <Col md={{span: 4, offset: 4}}>
			<Button variant="dark" onClick={this.sendClick} >
				Create Group
			</Button>
			</Col>
		</Row>
		</Container>
	  );
	}
  }