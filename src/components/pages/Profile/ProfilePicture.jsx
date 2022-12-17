import React, { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./index.css";

function ProfilePicture(props) {

    const [file, setFile] = useState(null);

    const onFileChange = (event) => {
        setFile( event.target.files[0] );
    }

    const onFileUpload = () => {
        null;
        // POST request using image file
    }

    return (
        <div class="profile-picture">
            <input id="image-file-upload" type="file" onChange={ onFileChange }/>
            <button onClick={ onFileUpload }>
                Upload Profile Picture
            </button>
        </div>
    )
}

export default ProfilePicture;