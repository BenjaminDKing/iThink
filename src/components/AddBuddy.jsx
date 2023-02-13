import React from "react"
import { addBuddy } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { addBuddyRedux } from "../actions";

function AddBuddy(props) {
    const buddy = props.buddy
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleClick = () => {
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

    return (
        <div className="add-buddy-div">
            <button onClick={ () => handleClick() }>
                Add Buddy
            </button>
        </div>
    )
}

export default AddBuddy;