import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./index.css";
import { uploadImage, getImage } from "../../../api";

import { AdvancedImage } from "@cloudinary/react";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';
import PersonalPhilosophy from "../../PersonalPhilosophy";

const CLOUDNAME = process.env.REACT_APP_CLOUD_NAME
const UPLOADPRESET = process.env.REACT_APP_UPLOAD_PRESET

function ProfilePicture(props) {
  const [image, setImage] = useState("")
  const [imgId, setImgId] = useState("")
  const [myImage, setMyImage] = useState(new CloudinaryImage(imgId, {cloudName: CLOUDNAME}).resize(fill().width(300).height(150)))
  
  const profile = props.profile;
  const user = useSelector(state => state.user)
  const inputRef = useRef()
  const { id } = useParams();

  const submitImage = () => {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", UPLOADPRESET)
    formData.append("cloud_name", CLOUDNAME)

    let data = uploadImage(formData).then(data => {
      { data.public_id ? setImgId(data.public_id) : console.log("Failed to upload image.")}
      renderProfilePic();

    })
  }

  const renderProfilePic = async () => {
    setMyImage(new CloudinaryImage(imgId, {cloudName: CLOUDNAME}).resize(fill().width(200).height(200)));
  }

  const renderImage = async () => {
    const data = getImage(id).then(data => {
      setImgId(data.profile_pic.img_id)
    })
  }

  const onButtonClick = () => {
    inputRef.current.click();
  }

  useEffect(() => {
    renderProfilePic()
  }, [imgId])

  useEffect(() => {
    renderImage()
  }, [id])

  return (
    <div>
      <div className="image-div">
        <AdvancedImage 
          cldImg={myImage}
          className="profile-image"
          onClick={ id == user._id ? onButtonClick : undefined }
        />
      </div>
      <input
        type="file"
        accept="image/*"
        style={{display: "none"}}
        ref={inputRef}
        id="file"
        name="file"
        className="file-input"
        onChange={(e) => { setImage(e.target.files[0])}}
      />
      { id == user._id ? <button 
        onClick={submitImage}
        className="submit-button"
      >
        <CloudUploadIcon 
          sx={{ fontSize: 20 }}
        />
            Upload Profile Picture
      </button> : null }
    </div>
  );
}

export default ProfilePicture;
