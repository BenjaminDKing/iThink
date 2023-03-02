import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import {
    Menu,
    MenuItem,
  } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';


function Thought(props) {
    const user = props.user
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)  

    const handleClick = (event) => {
        setAnchorEl(event.target)
      }
    
      const handleClose = (event) => {
        setAnchorEl(null)
      }

    return (
        <div className="thought"> 
            <div className="top-div">
                <div className="author-div">
                    <Link to={"/profile/" + user._id}><h5>{user.first_name} {user.last_name}</h5></Link>
                </div>  

                <div className="title-div"> 
                    <h3>{props.title}</h3>
                </div>

                <div className="delete-div">

                    <MoreVertIcon 
                        sx={{ fontSize: 30 }}    
                        id="settings"
                        className="button"
                        onClick={handleClick}
                        aria-controls={ open ? 'profile-dropdown' : undefined }
                        aria-haspopup='true'
                        aria-expanded={ open ? 'true' : undefined }>
                    </MoreVertIcon>

                    <Menu id='settings-menu' anchorEl={anchorEl} open={open} 
                        MenuListProps={{ 'aria-labelledby': 'settings-button'}}
                        onClose={handleClose}>
                         { props.isCurrentUser && <MenuItem onClick={ () => props.handleDelete(props.id)}><DeleteIcon sx={{fontSize: 20}} className="delete-icon"/> Delete Thought</MenuItem> }
                    </Menu>

                </div>
            </div>
            <div className="content-thought-div">
                <p>{props.content}</p>        
            </div>
        </div>
    )
}

export default Thought;