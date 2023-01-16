import React, { useEffect, useState } from "react";
import BuddyCard from "./BuddyCard";
import { getBuddies } from "../../../api";

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
        <div className="buddy-banner">
          <h1>Your Buddies</h1>
        </div>
        {buddies.map( (buddy, index) => {
          return (
            <BuddyCard 
              key={index}
              user={user}
              buddy={buddy}
              handleDelete={handleDelete}  
            />
          )
        })}
      </div>
    )
}

export default BuddyList;