import React, {useState} from "react";
import Navbar from "./Navbar";
import MessageBoard from "./MessageBoard";
import MessageInput from "./MessageInput";
import "./index.css";

function Home(userDetails) {

    const user = userDetails.user
    console.log(user)

    return (
        <div className="home">
            <Navbar 
                user={user}
            />
            <h1>Welcome back, {user.given_name}!</h1>
            <MessageInput 
                user={user}
            />
            <MessageBoard 
                user={user}
            />
        </div>
    )
}

export default Home;