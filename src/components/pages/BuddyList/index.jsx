import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import BuddyCard from "./BuddyCard";
import BuddyBrowser from "./BuddyBrowser";
import Navbar from "../../Navbar";

import { getBuddies } from "../../../api";
import "./index.css";

function BuddyList(props) {
    const user = useSelector(state => state.user)
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
        <Navbar />
        <div className="buddy-banner">
          <h1>Your Buddies</h1>
        </div>
        <div className="buddy-card-container">
          {buddies.map( (buddy, index) => {
            return (
              <BuddyCard 
                key={index}
                buddy={buddy}
                handleDelete={handleDelete}
                className="buddy-card"  
              />
            )
          })}
        </div>
        <BuddyBrowser />
      </div>
    )
}

export default BuddyList;