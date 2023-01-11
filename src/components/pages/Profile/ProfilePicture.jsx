import React, { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./index.css";
import { uploadImage, getImage } from "../../../api";

import { AdvancedImage } from "@cloudinary/react";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';

const CLOUDNAME = process.env.REACT_APP_CLOUD_NAME
const UPLOADPRESET = process.env.REACT_APP_UPLOAD_PRESET

function ProfilePicture(props) {
  const [image, setImage] = useState("")
  const [imgId, setImgId] = useState("")
  console.log(CLOUDNAME)

  const [myImage, setMyImage] = useState(new CloudinaryImage(imgId, {cloudName: CLOUDNAME}).resize(fill().width(300).height(300)))

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

  const renderProfilePic = () => {
    setMyImage(new CloudinaryImage(imgId, {cloudName: CLOUDNAME}).resize(fill().width(300).height(300)));
  }

  const renderImage = () => {
    const data = getImage().then(data => {
      console.log(data.profile_pic.img_id)
      setImgId(data.profile_pic.img_id)
    })
  }

  useEffect(() => {
    renderProfilePic()
  }, [imgId])

  useEffect(() => {
    renderImage()
  }, [])

  return (
    <div>
      <div>
        <AdvancedImage cldImg={myImage}/>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={submitImage}>
        Submit
      </button>
    </div>
  );
}

export default ProfilePicture;
