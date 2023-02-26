import React, { useState } from "react"
import { addBuddy, removeBuddy } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { addBuddyRedux, removeBuddyRedux } from "../actions";

import {
    Button,
    Menu,
    MenuItem,
  } from '@mui/material'
  
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function AddBuddy(props) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const buddy = props.buddy
    const user = useSelector(state => state.user);
    const addRenderCondition = (buddy._id != user._id && !user.buddies.includes(buddy._id))
    const removeRenderCondition = !addRenderCondition
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.target)
      }
    
      const handleClose = (event) => {
        setAnchorEl(null)
      }

    const handleAdd = () => {
        try {
            addBuddy(buddy._id).then( (res) => {
                console.log(res);
                if(res.response == 'Success') {
                    console.log("Dispatch")
                    dispatch(addBuddyRedux(buddy._id));
                }
            })
        } catch(err) {
            console.log(err);
        }
    }

    const handleDelete = () => {
        try {
            removeBuddy(buddy._id).then( (res) => {
                // Change to reflect DB contents
                console.log(res);
                if((res.response == 'Success') && (!res.user.buddies.includes(buddy._id))) {
                    console.log("Dispatch")
                    dispatch(removeBuddyRedux(buddy._id))
                }
            })  
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="add-buddy-div">

            <MoreVertIcon 
                sx={{ fontSize: 30 }}    
                id="settings"
                className="button"
                onClick={handleClick}
                aria-controls={ open ? 'profile-dropdown' : undefined }
                aria-haspopup='true'
                aria-expanded={ open ? 'true' : undefined }>
            </MoreVertIcon>

            <Menu id='profile-dropdown' anchorEl={anchorEl} open={open} MenuListProps={{ 'aria-labelledby': 'settings-button'}} 
                onClose={handleClose}>
                
                { addRenderCondition ? <MenuItem onClick={ () => handleAdd() }>
                    <PersonAddIcon fontSize="small" /> Add Buddy
                </MenuItem> : null }
                
                { removeRenderCondition ? <MenuItem onClick={ () => handleDelete() }>
                    <PersonRemoveIcon fontSize="small" /> Remove Buddy
                </MenuItem> : null }

            </Menu>
        </div>
    )
}

export default AddBuddy;