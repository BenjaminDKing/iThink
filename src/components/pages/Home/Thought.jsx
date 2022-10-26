import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Thought(props) {

    return (
        <div className="thought"> 
            <div className="top-div">
                <div className="author-div">
                    <h5>{props.user.first_name} {props.user.last_name}</h5>
                </div>  

                <div className="title-div"> 
                    <h3>{props.title}</h3>
                </div>

                <div className="delete-div">
                    <button className="delete-button">
                        <DeleteIcon
                            sx={{fontSize: 30}}    
                            className="delete-icon"
                            onClick={props.handleDelete}/>
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