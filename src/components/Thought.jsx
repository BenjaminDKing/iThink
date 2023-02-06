import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";

function Thought(props) {
    const user = useSelector(state => state.user)

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
                    <button className="delete-button">
                        <DeleteIcon
                            sx={{fontSize: 30}}    
                            className="delete-icon"
                            onClick={ () => props.handleDelete(props.id)}/>
                    </button>
                </div>
            </div>
            <div className="content-thought-div">
                <p>{props.content}</p>        
            </div>
        </div>
    )
}

export default Thought;