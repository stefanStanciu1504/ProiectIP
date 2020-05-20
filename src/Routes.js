import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import About from "./About/About";
import Log_in from "./Log_in/Log_in";
import Log_out from "./Log_out/Log_out";
import Sign_in from "./Sign_up/Sign_up";
import Chat from "./Chat/Chat"
import history from "./history";
import * as Cookie from "js-cookie";

export default class Routes extends Component {
  render() {
	  if (Cookie.get("userId") !== undefined) {
		  return (
			<Router history={history}>
			<Switch>
				<Route path="/" exact component={Chat} />
				<Route path="/Log_out" component={Log_out} />
				<Route path="/Chat" component={Chat} />
				<Route path="/Home" component={Chat} />
				<Route path="/About" component={Chat} />
				<Route path="/Log_in" component={Chat} />
				<Route path="/Sign_up" component={Chat} />
			</Switch>
		  </Router>
		  );
	  }
	  else {
		return (
			<Router history={history}>
			  <Switch>
				  <Route path="/Home" component={Home} />
				  <Route path="/" exact component={Home} />
				  <Route path="/About" component={About} />
				  <Route path="/Log_in" component={Log_in} />
				  <Route path="/Sign_up" component={Sign_in} />	
				  <Route path="/Chat" component={Home} />
				  <Route path="/Log_out" component={Home} />
			  </Switch>
			</Router>
		  );

	  }
  }
}
