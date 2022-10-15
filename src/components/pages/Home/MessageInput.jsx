import React, {useState} from "react";
import Axios from "axios";

import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import axios from "axios";

function MessageInput(props) {
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
        console.log(message);
        console.log(props.user);
        
        if (props.user) {
            axios.post(process.env.REACT_APP_API_URL, {
                ...message,
                user: props.user
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });    
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
                    maxLength="50"
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