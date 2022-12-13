import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getProfile } from "../../../api" 
import "./index.css";

import Navbar from "../Home/Navbar";
import ProfilePicture from "./ProfilePicture";
import ProfileDetails from "./ProfileDetails";

function Profile(props) {

    const user = props.user;
    const { id } = useParams();
    const [profile, setProfile] = useState(null);

    // Make get request, find user by _id, first_name + last_name, etc., render /profile/:id by response

    const renderProfile = async () => {
        const data = await getProfile(id);
        setProfile(data);
    }

    useEffect(() => {
        renderProfile();
    }, [])

    if (profile) {
        return (
            <div className="profile">
                { <h1> { profile.user.first_name }'s Profile </h1> }
            </div>
        )
    } else {
        <Navigate to="/404" />
    }
}


export default Profile;