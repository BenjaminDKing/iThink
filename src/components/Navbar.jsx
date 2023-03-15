import React, {useState} from "react";
import { Outlet, Link, Navigate, NavLink } from "react-router-dom";

import {
  Button,
  Menu,
  MenuItem,
} from '@mui/material'

import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from "react-redux";

const logo = require('../images/iThink_logo.png');

function Navbar(props) {
  const user = useSelector(state => state.user)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const [isMouseHover, setMouseHover] = useState(
    {
      home: false,
      friends: false,
      settings: false,
    })

  const handleClick = (event) => {
    setAnchorEl(event.target)
  }

  const handleClose = (event) => {
    setAnchorEl(null)
  }

  function handleMouseOver(event) {
    if (event.target.id) {  
      setMouseHover(prevValue => {
        return {
          ...prevValue, 
          [event.target.id]: true
        }
      })
    }
  }

  function handleMouseOut(event) {
    if (event.target.id) {
      setMouseHover(prevValue => {
        return {
          ...prevValue, 
          [event.target.id]: false
        }
      })
    }
  }

  const logout = () => {
    window.open(
        `${process.env.REACT_APP_API_URL}/auth/logout`,
        "_self"
    )   
  }

  return ( 
  <div className="header container">
    <div className="leftItems">
      <img className="logo-image" src={logo} />
    </div>
    <div className="rightItems">

      <Link to={"/"}>
        <HomeIcon 
          sx={{ fontSize: 50 }}    
          id="home"
          className="button"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}>
        </HomeIcon>
      </Link>

      <Link to={"/buddies/"}>
        <GroupIcon 
          sx={{ fontSize: 50 }}    
          id="friends"
          className="button"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}>
        </GroupIcon>
      </Link>

      <Link to={"/profile/" + user._id}>
        <PersonIcon
          sx={{ fontSize: 50 }}
          id="profile"
          className="button"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}>
        </PersonIcon>
      </Link>

      <SettingsIcon 
        sx={{ fontSize: 50 }}    
        id="settings"
        className="button"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
        aria-controls={ open ? 'settings-menu' : undefined }
        aria-haspopup='true'
        aria-expanded={ open ? 'true' : undefined }>
      </SettingsIcon>

      <Menu id='settings-menu' anchorEl={anchorEl} open={open} 
        MenuListProps={{ 'aria-labelledby': 'settings-button'}}
        onClose={handleClose}>
        <MenuItem onClick={handleClose}> <AccountCircleIcon fontSize="small"/> Profile Settings</MenuItem>
        <MenuItem onClick={handleClose}> <SettingsApplicationsIcon fontSize="small"/> Account Settings</MenuItem>
        <MenuItem onClick={handleClose}><a href={`${process.env.REACT_APP_API_URL}/logout`}><LogoutIcon fontSize="small"/> Logout</a></MenuItem>
      </Menu>

    </div>
  </div>
)}

export default Navbar;
