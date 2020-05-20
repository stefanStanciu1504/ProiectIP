import React, { Component } from 'react';
import ChatMessages from './ChatMessages';
import * as Cookie from "js-cookie";

class ChatBox extends Component {
	constructor(props) {
		super(props);
		this.state ={ messages:[] }
	}

	componentDidMount() {
		this.setState({
		  messages: this.props.messages
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
		  messages: nextProps.messages
		});
	}

    render() {
        return (
			<div>
            	<ChatMessages messages={this.state.messages} thisUser={Cookie.get("userId")} receiver={this.props.receiver} ceva={this.props.ceva}/>
			</div>
        );
    }

}

export default ChatBox;