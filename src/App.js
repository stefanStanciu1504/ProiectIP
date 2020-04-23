import React, {Component} from "react";
import Navigation from "./components/Navigation";
import Routes from "./Routes";
import "./App.css";
import cookie from 'react-cookies'
import { withCookies } from 'react-cookie';


class App extends Component {
	constructor () {
		super()
		this.onLogin = this.onLogin.bind(this)
		this.onLogout = this.onLogout.bind(this)
	  }
	 
	  componentWillMount() {
		this.setState({ userId: cookie.load('userId') });
	  }
	 
	  onLogin(userId) {
		this.setState({ userId })
		cookie.save('userId', userId, { path: '/' })
	  }
	 
	  onLogout() {
		cookie.remove('userId', { path: '/' })
	  }

	  render() {
		return (
			<div className="App">
				<Navigation />
				<Routes />
			</div>
			);
	}
}

export default withCookies(App);
