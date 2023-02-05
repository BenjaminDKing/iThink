import React from "react"
import { addBuddy } from "../api";

function AddBuddy(props) {

    const handleClick = () => {
        console.log("Make API Call to add buddy")
        addBuddy();
    }

    return (
        <div className="add-buddy-div">
            <button onClick={ () => handleClick() }>
                Add Buddy
            </button>
        </div>
    )
}

export default AddBuddy;