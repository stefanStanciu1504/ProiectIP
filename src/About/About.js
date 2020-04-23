import React, { Component } from "react";
import { withCookies } from 'react-cookie';

class About extends Component {
  render() {
	
    return (
      <div style={{ display: "flex", position: 'absolute', top: 0, left: 0, 
	  right: 0, bottom: 0, alignItems:"center", justifyContent: "center", padding: 30 }}>
        <div>
          <h2>About Page</h2>
        </div>
      </div>
    );
  }
}

export default withCookies(About);
