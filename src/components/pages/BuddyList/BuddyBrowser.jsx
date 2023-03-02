import React, { useState, useEffect } from "react";
import BuddyCard from "./BuddyCard";

import { getBrowseBuddies } from "../../../api";

function BuddyBrowser() {
    const [users, setUsers] = useState([]);

    const renderBrowseBuddies = async () => {
        const data = await getBrowseBuddies();
        setUsers(data);
    }

    useEffect(() => {
        renderBrowseBuddies();
    }, [])

    return (
        <div className="buddy-browser">
            <div className="browse-buddies-banner">
                <h1>Find New Buddies</h1>
            </div>
            <div className="user-card-container">
                {users.map( (user, index) => {
                    return (
                        <BuddyCard 
                            key={index}
                            buddy={user}
                            className="buddy-card"  
                        />)
            })}
            </div>
        </div>
    )
}

export default BuddyBrowser;