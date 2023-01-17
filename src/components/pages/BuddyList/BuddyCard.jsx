import React, { useEffect, useState } from "react";
import {CloudinaryImage} from '@cloudinary/url-gen';
import { AdvancedImage } from "@cloudinary/react";
import {fill} from "@cloudinary/url-gen/actions/resize";
import { Link } from "react-router-dom";

function BuddyCard(props) {
  const CLOUDNAME = process.env.REACT_APP_CLOUD_NAME

  const image = new CloudinaryImage(props.buddy.profile_pic.img_id, {cloudName: CLOUDNAME}).resize(fill().width(300).height(300))

    return (
      <div className="buddy-card">
        <div className="buddy-image-div">
          <Link to={"/profile/" + props.buddy._id}>
            <AdvancedImage
              cldImg={image}
              className="buddy-profile-image"
            />
          </Link>
        </div>
        <div className="text-div">
          <h2>{props.buddy.first_name} {props.buddy.last_name}</h2>
          <div className="card-body-div">
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </div>
    )
}

export default BuddyCard;