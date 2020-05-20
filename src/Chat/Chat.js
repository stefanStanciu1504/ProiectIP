import React, { Component } from "react";
import ChatBox from "./ChatBox"
import FriendsList from "./FriendsList"

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list:[], messages:[], username:null, toggle: false, requests:[]
		};
		this.addItemList = this.addItemList.bind(this);
		this.addItemMessages = this.addItemMessages.bind(this);
		this.getFriends = this.getFriends.bind(this);
		this.getFriends();
		this.ceva = this.ceva.bind(this);
		this.reqFunc = this.reqFunc.bind(this);
		this.checkContactList = this.checkContactList.bind(this);
		this.checkRequestList = this.checkRequestList.bind(this);
		this.addItemRequests = this.addItemRequests.bind(this);
	}

	componentDidMount() {
		this.timer = setInterval(()=> {this.getFriends();
										if(this.state.username !== null) {
											this.reqFunc(this.state.username)
										}}, 1000);
	}

	getFriends() {
		var requestOptions = {
			method: 'GET',
			redirect: 'follow',
			credentials: 'include',
			host:"http://localhost:3000"
		  };
		  
		  fetch("https://exalted-density-273820.nw.r.appspot.com/friends/list", requestOptions)
			.then(response => response.text())
			.then(result => {
								var aux = JSON.parse(result)
									this.checkContactList(aux);
							})
			.catch(error => console.log('error', error));

			var requestOptions2 = {
				method: 'GET',
				redirect: 'follow',
				credentials: 'include',
				host:"http://localhost:3000"
			  };
			  
			  fetch("https://exalted-density-273820.nw.r.appspot.com/friends/listRequests", requestOptions2)
				.then(response => response.text())
				.then(result => {
									var aux = JSON.parse(result)
									this.checkRequestList(aux);
								})
				.catch(error => console.log('error', error));
	}

	checkContactList(aux) {
		if (aux.length >= this.state.list.length) {
			for (let i = 0; i < aux.length; i++) {
				this.addItemList(aux[i]);
			}
		} else if (aux.length < this.state.list.length) {
			let array = this.state.list.filter(function(val) {
				return aux.indexOf(val) !== -1;
			});
			this.setState({list: array})
		}
	}

	checkRequestList(aux) {
		if (aux.length >= this.state.requests.length) {
			for (let i = 0; i < aux.length; i++) {
				this.addItemRequests(aux[i]);
			}
		} else if (aux.length < this.state.requests.length) {
			let array = this.state.requests.filter(function(val) {
				return aux.indexOf(val) !== -1;
			});
			this.setState({requests: array})
		}
	}

	addItemList(e) {
		const exists = this.state.list.some(v => (v.username === e.username));
		if (exists === false) {
			this.setState((state) => ({
				list: state.list.concat([e])
			  }))
		}
	}

	addItemRequests(e) {
		const exists = this.state.requests.some(v => (v.username === e.username));
		if (exists === false) {
			this.setState((state) => ({
				requests: state.requests.concat([e])
			  }))
		}
	}

	  addItemMessages(e) {
		const exists = this.state.messages.some(v => (v.id === e.id));
		if (exists === false) {
			this.setState((state) => ({
				messages: state.messages.concat([e])
			  }))
		}
	  }

	async reqFunc(user) {
		var requestOptions = {
				method: 'GET',
				redirect: 'follow',
				credentials: 'include',
				host:"http://localhost:3000"
			};
			
			fetch("https://exalted-density-273820.nw.r.appspot.com/chat/list?user=" + user.username + "&group=" + user.group, requestOptions)
			.then(response => response.text())
			.then(result => {
								var aux = JSON.parse(result)
								for (let i = 0; i < aux.length; i++) {
									this.addItemMessages(aux[i]);
								}
							})
			.catch(error => console.log('error', error));
	}
	
	ceva(user) {
		this.setState({username: user});
		this.setState({messages: []});
		this.reqFunc(user);
	}

	render() {
		return (<div>
					<FriendsList list={this.state.list} ceva={this.ceva} requests={this.state.requests} />
					<ChatBox messages={this.state.messages} receiver={this.state.username} ceva={this.ceva}/>
				</div>
				);
		
	}
}

export default Chat;