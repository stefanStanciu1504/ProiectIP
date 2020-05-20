import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ReactDOM from 'react-dom';
import SplitText from 'react-pose-text';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PopUpProfile from "./PopUpProfile"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PopUpParticipants from "./PopUpParticipants"

const charPoses = {
	exit: { opacity: 0, y: 20 },
	enter: {
	  opacity: 1,
	  y: 0,
	  delay: ({ charIndex }) => charIndex * 20
	}
  };

const drawerWidth = 240;

const hasOverflow = chatContainer => chatContainer.clientHeight < chatContainer.scrollHeight

const isScrolledDown = (chatContainer, threshold) => {
    const bottom = chatContainer.scrollTop + chatContainer.clientHeight
    return bottom >= chatContainer.scrollHeight - threshold
}

const isScrolledUp = chatContainer => chatContainer.scrollTop === 0

const scrollDown = chatContainer => chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.clientHeight

const scrollDownBy = (amount, chatContainer) => chatContainer.scrollTop += amount

class ChatMessages extends Component {
	constructor(props) {
		super(props);
		this.state = { new_message:"", messages:[], menu: null, details: null, seenProfile:false, seenParticipants:false, participants:[] }
		this.handleChange = this.handleChange.bind(this);
		this.send = this.send.bind(this);
		this.handleMenuClose = this.handleMenuClose.bind(this);
		this.handleMenuOpen = this.handleMenuOpen.bind(this);
		this.handleProfile = this.handleProfile.bind(this);
		this.handleLeave = this.handleLeave.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.renderMenuFriend = this.renderMenuFriend.bind(this);
		this.renderMenuGroup = this.renderMenuGroup.bind(this);
		this.togglePopGroupParticipants = this.togglePopGroupParticipants.bind(this);
		this._isScrolledDown = true
        this._el = React.createRef()
        this._scrollHeight = null
		this._isScrolledUp = null
		this.isScrolledDownThreshold = 150;
	}

	scrollDownIfNeeded(){
        if(this._isScrolledDown && hasOverflow(this._el)){
            scrollDown(this._el)
        }
    }
    handleScroll(e){
        this._isScrolledDown = isScrolledDown(this._el, this.isScrolledDownThreshold)
        if(isScrolledUp(this._el)){
            this.props.onScrolledTop && this.props.onScrolledTop(e)
        }
        this.props.onScrolled && this.props.onScrolled(e)
    }
    componentWillUpdate(nextProps, nextState){
        this._scrollHeight = this._el.scrollHeight
        this._isScrolledUp = isScrolledUp(this._el)
    }
    componentDidUpdate(){ 
        if(this._isScrolledUp && this._scrollHeight !== null){
            const difference = this._el.scrollHeight - this._scrollHeight
            this._scrollHeight = null
            scrollDownBy(difference, this._el)
        }
        else this.scrollDownIfNeeded()
    }

	handleMenuClose() {
		this.setState({menu: null});
	  };

	handleMenuOpen (event) {
		this.setState({menu:event.currentTarget});
	  };

	togglePopProfile = () => {
		this.setState({seenProfile: !this.state.seenProfile})
		this.handleProfile();
		this.handleMenuClose();
	}

	togglePopParticipants = () => {
		this.setState({seenParticipants: !this.state.seenParticipants})
		this.togglePopGroupParticipants();
		this.handleMenuClose();
	}

	handleProfile() {
		var requestOptions = {
			method: 'GET',
			redirect: 'follow',
			credentials: 'include',
			host:"http://localhost:3000"
			};
			
			fetch("https://exalted-density-273820.nw.r.appspot.com/user/details?username=" + this.props.receiver.username, requestOptions)
			.then(response => response.text())
			.then(result => {
								var aux = JSON.parse(result)
								this.setState({details: aux});
							})
			.catch(error => console.log('error', error));
	}

	togglePopGroupParticipants() {
		var requestOptions = {
			method: 'POST',
			redirect: 'follow',
			credentials: 'include',
			host:"http://localhost:3000",
			body: this.props.receiver.username
			};
			
			fetch("https://exalted-density-273820.nw.r.appspot.com/group/members", requestOptions)
			.then(response => response.text())
			.then(result => {
				var aux = JSON.parse(result)
				this.setState({participants: aux})
			})
			.catch(error => console.log('error', error));
	}

	handleRemove() {
		var requestOptions = {
			method: 'POST',
			redirect: 'follow',
			credentials: 'include',
			host:"http://localhost:3000",
			body: this.props.receiver.username
			};
			
			fetch("https://exalted-density-273820.nw.r.appspot.com/friends/remove", requestOptions)
			.then(response => response.text())
			.catch(error => console.log('error', error));
	}

	handleLeave() {
		let url = "https://exalted-density-273820.nw.r.appspot.com/group/leave";
		var requestOptions = {
			method: 'POST',
			redirect: 'follow',
			credentials: 'include',
			host:"http://localhost:3000",
			body: this.props.receiver.username,
			headers: {
				'Content-Type': 'text/plain'
			}
		};
		fetch(url, requestOptions)
				.then(response => response.text())
				.catch(error => console.log('error', error));
		this.handleMenuClose();
	}

	handleDelete() {
		let url = "https://exalted-density-273820.nw.r.appspot.com/group/delete";
		var requestOptions = {
			method: 'POST',
			redirect: 'follow',
			credentials: 'include',
			host:"http://localhost:3000",
			body: this.props.receiver.username,
			headers: {
				'Content-Type': 'text/plain'
			}
		};
		fetch(url, requestOptions)
				.then(response => response.text())
				.catch(error => console.log('error', error));
		this.handleMenuClose();
	}

	renderMenuFriend () {
		const isMenuOpen = Boolean(this.state.menu)
		return (
		<Menu
		anchorEl={this.state.menu}
		anchorOrigin={{ vertical: "top", horizontal: "left" }}
		keepMounted
		transformOrigin={{ vertical: "top", horizontal: "right" }}
		open={isMenuOpen}
		onClose={this.handleMenuClose}
		>
		<MenuItem onClick={this.togglePopProfile}>
			<IconButton
			aria-label="account of receiver"
			aria-haspopup="true"
			color="inherit"
			>
			<AccountCircle />
			</IconButton>
			Profile
		</MenuItem>
		<MenuItem onClick={this.handleRemove}>
			<IconButton
			aria-label="remove friend"
			aria-haspopup="true"
			color="inherit"
			>
			<HighlightOffIcon />
			</IconButton>
			Remove friend
		</MenuItem>
		</Menu>);
	  }

	  renderMenuGroup () {
		const isMenuOpen = Boolean(this.state.menu)
		if (this.props.receiver !== null && this.props.receiver.role === "ADMIN") {
			return (
				<Menu
				anchorEl={this.state.menu}
				anchorOrigin={{ vertical: "top", horizontal: "left" }}
				keepMounted
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				open={isMenuOpen}
				onClose={this.handleMenuClose}
				>
				<MenuItem onClick={this.togglePopParticipants}>
					<IconButton
					aria-label="participants"
					aria-haspopup="true"
					color="inherit"
					>
					<PeopleAltIcon />
					</IconButton>
					Participants
				</MenuItem>
				<MenuItem onClick={this.handleDelete}>
					<IconButton
					aria-label="delete group"
					aria-haspopup="true"
					color="inherit"
					>
					<HighlightOffIcon />
					</IconButton>
					Delete Group
				</MenuItem>
				<MenuItem onClick={this.handleLeave}>
					<IconButton
					aria-label="leave group"
					aria-haspopup="true"
					color="inherit"
					>
					<ExitToAppIcon />
					</IconButton>
					Leave Group
				</MenuItem>
			</Menu>);
		} else if (this.props.receiver !== null) {
			return (
				<Menu
				anchorEl={this.state.menu}
				anchorOrigin={{ vertical: "top", horizontal: "left" }}
				keepMounted
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				open={isMenuOpen}
				onClose={this.handleMenuClose}
				>
				<MenuItem onClick={this.togglePopParticipants}>
					<IconButton
					aria-label="participants"
					aria-haspopup="true"
					color="inherit"
					>
					<PeopleAltIcon />
					</IconButton>
					Participants
				</MenuItem>
				<MenuItem onClick={this.handleLeave}>
					<IconButton
					aria-label="leave group"
					aria-haspopup="true"
					color="inherit"
					>
					<ExitToAppIcon />
					</IconButton>
					Leave Group
				</MenuItem>
			</Menu>);
		} else {
			return null;
		}
		
	  }

	componentDidMount() {
		this.setState({
		  messages: this.props.messages
		});
		this.scrollDownIfNeeded()
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
		  messages: nextProps.messages
		});
	}

	handleNewContacts = () => {
		this.props.toggle();
	  };

	send(event) {
		if (event.key === 'Enter') {
			if (this.state.new_message.trim() !== "") {
				var data = JSON.stringify({
					receiver: this.props.receiver.username,
					text: this.state.new_message,
					group: this.props.receiver.group
				});
				this.setState({ new_message: "" });
				var requestOptions = {
					method: 'POST',
					redirect: 'follow',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					  },
					credentials: 'include',
					host:"http://localhost:3000",
					body: data
					};
					
					fetch("https://exalted-density-273820.nw.r.appspot.com/chat/send", requestOptions)
					.then(response => response.text())
					.catch(error => console.log('error', error));
			}
		}
	}

	handleChange(event) {
		this.setState({ new_message: event.target.value });
	}

    render() {
        const style = {
            backgroundColor: '#B0E0E6',
            padding: "15",
            height: "93.5%",
            overflowY: 'scroll',
            display: 'flex',
			flexDirection: 'column',
			position:"relative"
		};
		
		const styleDiv = {
			height: "93.5%",
			width: `calc(100% - ${drawerWidth}px)`,
			textAlign: 'center',
			marginLeft: '0%',
			position:"absolute",
			left:"240px",
			top:"54px",
			backgroundColor:"#FFFFFF"
		}

		const styleDivNone = {
			height: "94.2%",
			width: `calc(100% - ${drawerWidth}px)`,
			position:"absolute",
			left:"240px",
			top:"54px",
			backgroundColor:"#B0E0E6",
			display:"flex",
			alignItems: 'center',
			justifyContent: 'center',
			color: "#000",
			fontSize: "32px",
			textShadow: "2px 2px 0px rgba(0, 0, 0, 0.2)",
			fontWeight: "200",
			fontFamily: "PT Sans, Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
			flexDirection:'row',
			flexWrap: 'wrap'
		}

		const stylesPaper = {
            height: "94%",
            width: "100%",
            textAlign: 'center',
			position:"absolute",
			top:"6.6%",
			backgroundColor:"#FFFFFF"
        };
		const appBar = {
			width: "100%",
			height: "6.6%",
			position: "absolute",
			top: "0.2%",
			right: 0,
			backgroundColor:"#483D8B"
		  }

        const msgs = this.state.messages.map((message, i) =>
            this.renderMessages(message, i)
		);
		
		const renderMenuA = this.renderMenuFriend()
		const renderMenuB = this.renderMenuGroup()

		if (this.props.receiver !== null && this.props.receiver.group === false) {
			return (
				<div style={styleDiv}>
				<AppBar position="fixed" style={appBar}>
					<Toolbar>
					<Typography variant="h6" noWrap>
						{this.props.receiver.username}
					</Typography>
					<IconButton
						aria-label="show more"
						aria-haspopup="true"
						onClick={this.handleMenuOpen}
						color="inherit"
						style = {{marginLeft: "auto"}}
						>
						  <MoreIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				{renderMenuA}
				{this.state.seenProfile ? <PopUpProfile toggle={this.togglePopProfile} details={this.state.details} /> : null}
				<Paper style={stylesPaper} zdepth={2}>
				<div style={style} ref={ chatContainer => this._el = ReactDOM.findDOMNode(chatContainer) }
            			onScroll={ e => this.handleScroll(e)} >
					{msgs}
				</div>
				<Divider/>
					<TextField
						id="outlined-basic"
						label="Type message here..."
						variant="outlined"
						type="text"
						value={this.state.new_message}
						onChange={this.handleChange}
						onKeyDown={this.send}
						style={{width:"100%"}}
					/>
				</Paper>
				</div>
			)
		} else if (this.props.receiver !== null && this.props.receiver.group === true) { 
			return (
				<div style={styleDiv}>
				<AppBar position="fixed" style={appBar}>
					<Toolbar>
					<Typography variant="h6" noWrap>
						{this.props.receiver.username}
					</Typography>
					<IconButton
						aria-label="show more"
						aria-haspopup="true"
						onClick={this.handleMenuOpen}
						color="inherit"
						style = {{marginLeft: "auto"}}
						>
						  <MoreIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				{renderMenuB}
				{this.state.seenParticipants ? <PopUpParticipants toggle={this.togglePopParticipants} participants={this.state.participants} /> : null}
				<Paper style={stylesPaper} zdepth={2}>
				<div style={style} ref={ chatContainer => this._el = ReactDOM.findDOMNode(chatContainer) }
            			onScroll={ e => this.handleScroll(e)} >
					{msgs}
				</div>
				<Divider/>
					<TextField
						id="outlined-basic"
						label="Type message here..."
						variant="outlined"
						type="text"
						value={this.state.new_message}
						onChange={this.handleChange}
						onKeyDown={this.send}
						style={{width:"100%"}}
					/>
				</Paper>
				</div>
			)
		} else {
			return (
				<div style={styleDivNone}>
					<SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
						Welcome back! Select one of your friends or groups from the contact list and start chatting!
      				</SplitText>	
				</div>
			)
		}
    }

    renderMessages(message, i) {
        const style = {
            display: 'block',
            margin: '5px 0'
		};

        const isMe = this.props.thisUser === message.sender;
        const floatDirection = isMe ? 'right' : 'left'
        const nameColor = isMe ? 'green' : 'red';
        const margin = isMe ? ' 0 0 0 40px' : '0 40px 0 0 ';

        const textStyle = {
            float: floatDirection,
            backgroundColor: '#FEFFFF',
            padding: '6px 10px',
            borderRadius: '15px',
            margin: margin,
			textAlign: 'left',
			fontSize: "18px",
			maxWidth:"900px",
			wordWrap:"break-word",
			marginLeft:"10px",
			marginRight:"10px",
			marginBottom:"10px",
			marginTop:"10px"
        }

        const nameStyle = {
            color: nameColor,
			float: floatDirection,
			fontWeight: 'bold'
        }

        return (
            <div key={i} style={style}>
                <span style={textStyle}>
                    <span style={nameStyle}>{message.sender}</span>
                    <br />
                    {message.text}
                </span>
            </div>
        );
    }
}

export default ChatMessages;