import React, {useState} from "react";

function PersonalPhilosophy(props) {
    const profile = props.profile

    return (
        <div>
            <p>{profile.personal_philosophy}</p>
        </div>
    )   
}

export default PersonalPhilosophy;