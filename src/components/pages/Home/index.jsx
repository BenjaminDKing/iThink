import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import Thought from "./Thought";
import MessageInput from "./MessageInput";
import "./index.css";
import axios from "axios";
import { Title } from "@mui/icons-material";

function Home(props) {

    const user = props.user
    const thoughts = props.thoughts

    return (
        <div className="home">
            <Navbar 
                user={user}
            />
            <h1>Welcome back, {user.first_name}!</h1>
            <MessageInput 
                user={user}
            />
            {thoughts.map( (thoughtItem, index) => {
                return (
                    <Thought 
                        key={index}
                        id={index}
                        title={thoughtItem.title}
                        content={thoughtItem.content}
                    />
                )
            })}
        </div>
    );
}

export default Home;