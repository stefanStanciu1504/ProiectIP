import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import TextField from "@material-ui/core/TextField";
import * as Cookie from "js-cookie";

class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filtered: [], chating:false, message:"", username: Cookie.get("userId"), url: "https://exalted-density-273820.nw.r.appspot.com/friends/list"
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getFriends = this.getFriends.bind(this);
		this.getFriends();
	}
	
	
  componentDidMount() {
    this.setState({
      filtered: this.props.items
    });
  }

  getFriends() {
	var request = require("request");
	request.get(
		"https://exalted-density-273820.nw.r.appspot.com/user/test",
		function(err, response, body) {
			if (response.statusCode !== 200) {
				console.log(err);
			} else {
				console.log(response);
			}
		}
	  );

    request.get(
      this.state.url,
      function(err, response, body) {
        if (response.statusCode !== 200) {
          console.log(response);
        } else {
		 console.log(body);
        }
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.items
    });
  }

  handleSubmit(item) {
	  this.setState({chating:true});
  }
	handleChange(e) {
    let currentList = [];
    let newList = [];
		
    if (e.target.value !== "") {
      currentList = this.props.items;
			
      newList = currentList.filter(item => {
        const lc = item.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.props.items;
    }
    this.setState({
      filtered: newList
    });
  }
	
	render() {
		return (
			<div>
				 <TextField
					id="outlined-basic"
					label="Search friends"
					variant="outlined"
					type="text"
					autoComplete="off"
					onChange={this.handleChange}
				/>
				<br />
				<br />
				{this.state.filtered.map(item => (
					<Button variant="primary" key={item} onClick={() => this.handleSubmit(item)} style={{width: "auto",
					height: "auto"}}>
						{item} &nbsp;
					</Button>
				))}
				</div>
		)
	}
}


class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: ["ADI SERIFUL"], message:""
		};
		this.addItem = this.addItem.bind(this);
		this.handleChange1 = this.handleChange1.bind(this);
	}

	addItem(e) {
		e.preventDefault();
	
		let list = this.state.list;
		const newItem = document.getElementById("addInput");
		const form = document.getElementById("addItemForm");
	
		if (newItem.value !== "") {
		  list.push(newItem.value);
		  this.setState({
			list: list
		  });
		  newItem.classList.remove("is-danger");
		  form.reset();
		} else {
		  newItem.classList.add("is-danger");
		}
	  }

	  handleChange1(event) {
		this.setState({ message: event.target.value });
	  }

	render() {
		return (
			<div className="content" style = {{position:"absolute", top:400, left:400}}>
			  <div className="container">
				<section className="section">
							  <List items={this.state.list} />
				</section>
				<section className="chatbox">
					<TextField
						id="outlined-basic"
						label="Type a message"
						variant="outlined"
						type="text"
						autoComplete="off"
						value={this.state.message}
						onChange={this.handleChange1}
						style={{ width:"400px", marginLeft:"98%"}}
					/>
				</section>
			  </div>
			</div>
		  );
	}
}

export default Chat;
