import { Component } from "react";
import { withCookies } from "react-cookie";
import * as Cookie from "js-cookie";
import history from "./../history";

class Log_out extends Component {
	constructor(props) {
		super(props);
		Cookie.remove('userId');
		var requestOptions = {
			method: 'GET',
			redirect: 'follow',
			credentials: 'include',
			host:"http://localhost:3000"
		  };
		  
		  fetch("https://exalted-density-273820.nw.r.appspot.com/user/logout", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
		history.push("/Home");
		//window.location.reload();
	}

	render() {
		return null;
	}
}

export default withCookies(Log_out);