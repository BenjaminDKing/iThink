import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getProfile } from "../../../api" 
import "./index.css";

import Navbar from "../../Navbar";
import ProfilePicture from "./ProfilePicture";
import ProfileDetails from "./ProfileDetails";

function Profile(props) {

    const user = props.user;
    const { id } = useParams();
    const [profile, setProfile] = useState(null);

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
                <Navbar user={ user }/>
                { <h1> { profile.user.first_name }'s Profile </h1> }
            </div>
        )
    } 
}


export default Profile;