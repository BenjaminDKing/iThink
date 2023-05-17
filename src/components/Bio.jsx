import React, {useState} from "react";

function Bio(props) {
    const profile = props.profile

    return (
        <div>
            <p>{profile.bio}</p>
        </div>
    )   
}

export default Bio;