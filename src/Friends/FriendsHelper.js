import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";

class FriendsHelper extends Component {
	handleClick = () => {
		this.props.toggle();
	  };

	render() {
		const self = this;
		return(this.props.people.map(function(item) {
				return (<MenuItem key={item} onClick={() => {
					let url = "https://exalted-density-273820.nw.r.appspot.com/friends/add";
					var requestOptions = {
						method: 'POST',
						redirect: 'follow',
						credentials: 'include',
						host: "http://localhost:3000",
						body: item.username
					};
					fetch(url, requestOptions).catch(error => console.log('error', error));
					self.handleClick();
				}} style={{fontFamily: "comic sans ms",
				fontWeight: "300", color:"#000000"}} >
					{" "}
					{item.firstName}{" "}{item.lastName}{" known as "}{item.username}
					<br />
				</MenuItem>); 
		}));
	}
}

export default FriendsHelper;