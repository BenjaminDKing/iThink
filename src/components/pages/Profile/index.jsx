import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import "./index.css";

import Navbar from "../Home/Navbar";
import ProfilePicture from "./ProfilePicture";
import ProfileDetails from "./ProfileDetails";

function Profile(props) {

    const user = props.user;
    const { id } = useParams();
    // Make get request, find user by _id, first_name + last_name, etc., render /profile/:id by response

    return (
        <div className="profile">
            { user && <h1> { user.first_name }'s Profile </h1>}
        </div>
    )
}

export default Profile;