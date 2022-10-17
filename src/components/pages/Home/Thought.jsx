import React from "react";

function Thought(props) {

    return (
        <div className="thought">
            <div className="title-thought-div">
                <p>{props.title}</p>
            </div>
            <div className="content-thought-div">
                <p>{props.content}</p>
            </div>
        </div>
    )
}

export default Thought;