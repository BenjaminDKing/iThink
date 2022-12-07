import { useEffect, useState } from "react";
import "./index.css";

import Navbar from "../Home/Navbar";
import ProfilePicture from "./ProfilePicture";
import ProfileDetails from "./ProfileDetails";

function Profile(props) {

    const user = props.user;

    return (
        <div className="profile">
            <ProfilePicture />
            <h1> { user.first_name }'s Profile </h1>
            <ProfileDetails />
        </div>
    )
}

export default Profile;