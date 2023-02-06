import React, {useState} from "react";
import { useSelector } from "react-redux";

import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import axios from "axios";

import { postThought } from "../../../api";

function MessageInput(props) {
    const user = useSelector(state => state.user)
    const [ message, setMessage ] = useState({title: "", content: ""})

    function handleChange(event) {
        const { name, value } = event.target;

        setMessage(prevValue => {
            return {
                ...prevValue, [name]: value
            } 
        })
    }

    function handleClick(event) {
        event.preventDefault();
        
        if (user) {
            try {
                postThought({...message, user: user})
                .then(response => {
                    if(response.data.response == 'Success') {
                        props.onAdd(message);
                    }
                })
            } catch(err) {
                console.log(err);
            }

            setMessage({title: "", content: ""});
        }
    }

    return (
    <div>
        <form>
            <div className="title-input-div">
                <input
                    name="title" 
                    type="text"
                    value={message.title}
                    placeholder="What's on your mind?"
                    className="title-input"
                    maxLength="40"
                    onChange={ handleChange }>
                </input>
            </div>
            <div className="content-input-div">
                <textarea
                    name="content" 
                    type="text"
                    value={message.content}
                    className="content-input"
                    maxLength="500"
                    onChange={ handleChange }>
                </textarea>
            </div>
            <button className="add-button">
                <CreateIcon
                    className="add-icon"
                    sx={{ fontSize: 30 }}
                    onClick={handleClick}/>
            </button>
        </form>
    </div>
)}

export default MessageInput;