import React, { useEffect, useState } from "react";
import BuddyCard from "./BuddyCard";
import Navbar from "../../Navbar";

import { getBuddies } from "../../../api";
import "./index.css";

function BuddyList(props) {
    const user = props.user
    const [buddies, setBuddies] = useState([]);

    const renderBuddies = async () => {
      const data = await getBuddies(user)
      setBuddies(data)
    }

    const handleDelete = () => {
      console.log("Delete Buddy");
    }

    useEffect(() => {
      renderBuddies()
    }, [])

    return (
      <div>
        <Navbar user={ user }/>
        <div className="buddy-banner">
          <h1>Your Buddies</h1>
        </div>
        <div className="buddy-card-container">
          {buddies.map( (buddy, index) => {
            return (
              <BuddyCard 
                key={index}
                user={user}
                buddy={buddy}
                handleDelete={handleDelete}
                className="buddy-card"  
              />
            )
          })}
        </div>
      </div>
    )
}

export default BuddyList;