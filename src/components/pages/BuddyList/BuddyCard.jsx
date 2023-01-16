import React, { useEffect, useState } from "react";
import {CloudinaryImage} from '@cloudinary/url-gen';
import { AdvancedImage } from "@cloudinary/react";
import {fill} from "@cloudinary/url-gen/actions/resize";
import { Link } from "react-router-dom";

function BuddyCard(props) {
  const CLOUDNAME = process.env.REACT_APP_CLOUD_NAME

  const image = new CloudinaryImage(props.buddy.profile_pic.img_id, {cloudName: CLOUDNAME}).resize(fill().width(50).height(50))

    return (
      <div className="buddy-card">
        <Link to={"/profile/" + props.buddy._id}>
          <AdvancedImage
            cldImg={image}
            className="buddy-profile-image"
          />
          <h3>{props.buddy.first_name} {props.buddy.last_name}</h3>
        </Link>
      </div>
    )
}

export default BuddyCard;