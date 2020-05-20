import React, { Component } from "react";
import { withCookies } from 'react-cookie';
import back from "./back.png"

class About extends Component {
  render() {
	const style = {
		display: "flex",
		position: 'absolute',
		alignItems:"center",
		justifyContent: "left",
		height:"100%",
		width:"100%",
	};
    return (
      <div style={style}>
		  <img src={back}
		   	alt="back"
		  	style={{position:"absolute", top:"10%", width:"70%", height:"90%", left:"25%"}}
		  />
          <h2 style={{position:"absolute", top:"10%", left:"3%"}}>About Duolingo Chat</h2>
		  <text style={{
			fontFamily: "comic sans ms",
			fontWeight: "300",
			position:"absolute",
			top:"15%",
			left:"3%",
			maxWidth:"500px",
			wordWrap:"break-word"
			}} >
			It was developed by 3 people and those people are: Stanciu Stefan-Lucian, Petre Ovidu-Adrian and Corcodel Florina-Denisa. The interface was made by Stefan, the database by Denisa and the backend by Adrian.
			  </text>
			  <h2 style={{position:"absolute", top:"30%", left:"3%"}}>What is Duolingo chat?</h2>
		  <text style={{
			fontFamily: "comic sans ms",
			fontWeight: "300",
			position:"absolute",
			top:"35%",
			left:"3%",
			maxWidth:"500px",
			wordWrap:"break-word"
			}} >
			  Well, it's a free chatting website where where you can talk to anyone at any time.
			  </text>
      </div>
    );
  }
}

export default withCookies(About);
