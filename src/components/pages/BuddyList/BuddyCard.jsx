import React, { useEffect, useState } from "react";
import {CloudinaryImage} from '@cloudinary/url-gen';
import { AdvancedImage } from "@cloudinary/react";

function BuddyCard(props) {

    return ( 
      <div className="buddy-card">
        <p>{props.buddy.first_name} {props.buddy.last_name}</p> 
      </div>
    )
}

export default BuddyCard;