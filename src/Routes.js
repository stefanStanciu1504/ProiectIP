import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import About from "./About/About";
import Contact from "./Contact/Contact";
import Features from "./Features/Features";
import Log_in from "./Log_in/Log_in";
import Sign_in from "./Sign_up/Sign_up";
import history from "./history";

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/Home" component={Home} />
          <Route path="/About" component={About} />
          <Route path="/Contact" component={Contact} />
          <Route path="/Features" component={Features} />
          <Route path="/Log_in" component={Log_in} />
          <Route path="/Sign_up" component={Sign_in} />
        </Switch>
      </Router>
    );
  }
}
