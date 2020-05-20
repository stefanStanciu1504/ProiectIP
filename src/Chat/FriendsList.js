import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "react-bootstrap/Button";
import PopUpFriend from "./PopUpFriend"
import PopUpGroup from "./PopUpGroup"
import GroupIcon from '@material-ui/icons/Group';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const drawerWidth = 240;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [], requests:[]
    };
	this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.setState({
      filtered: this.props.items
	});
	this.setState({
		requests: this.props.requests
	  });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.items
	});
	this.setState({
		requests: nextProps.requests
	  });
  }

  handleChange(e) {
    let currentList = [];
	let newList = [];
	if (this.props.items !== undefined) {
		if (e.target.value !== "") {
			currentList = this.props.items;

			newList = currentList.filter(item => {
				if (item.firstName === null) {
					const lc = item.username.toLowerCase();
					const filter = e.target.value.toLowerCase();
					return lc.includes(filter);
				}
				const lc = item.firstName.toLowerCase();
				const filter = e.target.value.toLowerCase();
				return lc.includes(filter);
			});
		} else {
		  newList = this.props.items;
		}
		this.setState({
		  filtered: newList
		})
	}
    
  }


  render() {
	  const self = this;
	  if (this.state.filtered !== undefined) {
		return (
			<div>
			  <TextField
				id="filled-basic"
				label="Search friend"
				type="text"
				variant="filled"
				autoComplete="off"
				onChange={this.handleChange}
				style={{ width: drawerWidth - 1, backgroundColor:"#FFFFFF"}}
				InputProps={{
				  startAdornment: (
					<InputAdornment position="start">
					  <SearchIcon />
					</InputAdornment>
				  ),
				}}
			  />
			  <br/>
			  {this.state.filtered.map(function(item) {
				  if (item.online === false && item.username !== undefined && item.group === false) {
					  return (<MenuItem key={item.username} style={{fontFamily: "comic sans ms",
					  fontWeight: "300", color:"#FFFFFF" }} onClick={() => self.props.ceva(item) }>
						  {" "}
						  {item.firstName}{" "}{item.lastName}
						  <br />
						  {"Offline"}
					  </MenuItem>);
				  } else if (item.online === true && item.username !== undefined && item.group === false) {
					  return (<MenuItem key={item.username} style={{fontFamily: "comic sans ms",
					  fontWeight: "300", color:"#FFFFFF"}} onClick={() => self.props.ceva(item) }>
						  {" "}
						  {item.firstName}{" "}{item.lastName}
						  <br />
						  {"Online"}
					  </MenuItem>);
				  } else if (item.group === true) {
					  return (<MenuItem key={item.username} style={{fontFamily: "comic sans ms",
					  fontWeight: "300", color:"#FFFFFF"}} onClick={() => self.props.ceva(item) }>
						  {" "}
						  {item.username}{" "}
						  <br />
						  {"Group"}
					  </MenuItem>);
				  } else {
					  return null;
				  }
			  })}
			  {this.state.requests.map(function(item) {
					return (<MenuItem key={item.username} style={{fontFamily: "comic sans ms",
					fontWeight: "300", color:"#FFFFFF", paddingBottom:"20%"}} >
						{" "}
						{item.firstName}{" "}{item.lastName}
						<br />
						<Button variant="dark" onClick={() => {
							var requestOptions = {
								method: 'POST',
								redirect: 'follow',
								credentials: 'include',
								host:"http://localhost:3000",
								body: item.username
								};
								
								fetch("https://exalted-density-273820.nw.r.appspot.com/friends/accept", requestOptions)
								.then(response => response.text())
								.catch(error => console.log('error', error));
						}} size="sm" style={{position:"absolute", top:"50%", left:"5%"}}>
							Accept
						</Button>
						<Button variant="dark" size="sm" style={{position:"absolute", top:"50%", left:"35%"}} onClick={() => {
							var requestOptions = {
								method: 'POST',
								redirect: 'follow',
								credentials: 'include',
								host:"http://localhost:3000",
								body: item.username
								};
								
								fetch("https://exalted-density-273820.nw.r.appspot.com/friends/reject", requestOptions)
								.then(response => response.text())
								.catch(error => console.log('error', error));
						}}>
							Refuse
						</Button>
					</MenuItem>);
				})}
			</div>
		  );
	  } else {
		  return null;
	  }
    
  }
}
// , wordWrap:"break-word", flexDirection:'row',
// 					flexWrap: 'wrap'

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: drawerWidth,
    position: "absolute",
    top: "5.94%",
	right: `calc(100% - ${drawerWidth}px)`,
	backgroundColor:"#343A40"
  },
  buttonFriend: {
    width: drawerWidth - 1,
    position: "absolute",
    top: "95.5%",
	right: `calc(100% - ${drawerWidth - 1}px)`,
	backgroundColor:"#343A40"
  },
  buttonGroup: {
    width: drawerWidth - 1,
    position: "absolute",
    top: "91.5%",
	right: `calc(100% - ${drawerWidth - 1}px)`,
	backgroundColor:"#343A40"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    height: "88vh",
    position: "absolute",
	top: "12%",
	backgroundColor: "#54B1D2"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

export default function PermanentDrawerLeft(props) {
	const classes = useStyles();
	const [seenFriend, setSeenFriend] = useState(false);
	const [seenGroup, setSeenGroup] = useState(false);

	const [menu, setMenu] = React.useState(null);
	const isMenuOpen = Boolean(menu)

	const togglePopFriend = () => {
		setSeenFriend(!seenFriend)
		setMenu(null);
	}

	const togglePopGroup = () => {
		setSeenGroup(!seenGroup)
		setMenu(null);
	}
	const handleMenuClose = () => {
		setMenu(null);
	};
	
		const handleMenuOpen = (event) => {
			setMenu(event.currentTarget);
		};
	
	  const renderMenu = (
		<Menu
		anchorEl={menu}
		anchorOrigin={{ vertical: "top", horizontal: "right" }}
		keepMounted
		transformOrigin={{ vertical: "top", horizontal: "left" }}
		open={isMenuOpen}
		onClose={handleMenuClose}
		>
		<MenuItem onClick={togglePopFriend}>
			<IconButton
			aria-label="add friend"
			aria-haspopup="true"
			color="inherit"
			>
			<AddCircleIcon />
			</IconButton>
			Add friend
		</MenuItem>
		<MenuItem onClick={togglePopGroup}>
			<IconButton
			aria-label="create group"
			aria-haspopup="true"
			color="inherit"
			>
			<GroupIcon />
			</IconButton>
			New Group
		</MenuItem>
		</Menu>);

	return (
	  <div className={classes.root}>
		<AppBar position="fixed" className={classes.appBar}>
		  <Toolbar>
			<Typography variant="h6" noWrap >
			  Contact List
			</Typography>
			<IconButton
						aria-label="show more"
						aria-haspopup="true"
						onClick={handleMenuOpen}
						color="inherit"
						style = {{marginLeft: "auto"}}
						>
						  <MenuIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				{renderMenu}
		<Drawer
		  className={classes.drawer}
		  variant="permanent"
		  classes={{
			paper: classes.drawerPaper
		  }}
		  anchor="left"
		>
		  <List items={props.list} ceva={props.ceva} requests={props.requests}/>
		</Drawer>
		{seenFriend ? <PopUpFriend toggle={togglePopFriend} /> : null}
		{seenGroup ? <PopUpGroup toggle={togglePopGroup} friends={props.list} /> : null}
	  </div>
	);
}