import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import Thought from "./Thought";
import MessageInput from "./MessageInput";
import "./index.css";
import axios from "axios";

function Home(props) {

    const user = props.user
    const thoughts = props.thoughts

    // Render thoughts on:
    // 1. Page load (Done)
    // 2. POST new Thought ()
    // 3. DELETE Thought ()

    const renderThoughts = async () => {
        try {
          const url = `${process.env.REACT_APP_API_URL}/auth/check_requser`;
          const { data } = await axios.get(url, {withCredentials: true});
          console.log(data)
        } catch(err) {
          console.log(err);
        }
      }

    function handleDelete() {
        console.log("Handle Delete");
    }

    return (
        <div className="home">
            <Navbar 
                user={user}
            />
            <h1>Welcome back, {user.first_name}!</h1>
            <MessageInput 
                user={user}
                renderThoughts={renderThoughts}
            />
            <div className="thought-message-board">
            {thoughts.map( (thoughtItem, index) => {
                return (
                    <Thought 
                        key={index}
                        id={index}
                        user={user}
                        title={thoughtItem.title}
                        content={thoughtItem.content}
                        handleDelete={handleDelete}/>
                )
            })}
            </div>
        </div>
    );
}

export default Home;