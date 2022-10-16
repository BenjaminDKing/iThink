import React from "react";

function Thought(props) {

    return (
        <div className="thought">
            <p>{props.title}</p>
            <p>{props.content}</p>
        </div>
    )
}

export default Thought;