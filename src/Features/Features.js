import React, { Component } from "react";
import * as Cookie from "js-cookie";

class Features extends Component {
  render() {
    return (
      <div style={{ display: "flex", position: 'absolute', top: 0, left: 0, 
	  right: 0, bottom: 0, alignItems:"center", justifyContent: "center", padding: 30 }}>
        <div>
          <h2 onClick = {function() {Cookie.remove('userId')}}>Features page</h2>
        </div>
      </div>
    );
  }
}

export default Features;
