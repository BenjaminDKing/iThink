import axios from "axios";
import React, {useEffect, useState} from "react";
import "./index.css";
import { getThoughts, deleteThought, checkReqUserCall } from "../../../api";

// Components:
import Navbar from "./Navbar";
import Thought from "./Thought";
import MessageInput from "./MessageInput";

function Home(props) {

    const user = props.user
    const [thoughts, setThoughts] = useState([]);

    // Render thoughts on:
    // 1. Page load (Done)
    // 2. POST new Thought ()
    // 3. DELETE Thought ()

    const renderThoughts = async () => {
        try {
          const data = await getThoughts();
          setThoughts(data);
        } catch(err) {
          console.log(err);
        }
    }

    function handleAdd(newThought) {
        setThoughts(prevThoughts => {
            return [...prevThoughts, newThought]
        });
    }

    function handleDelete(id) {
        try {
            deleteThought(id, user)
            .then(response => {
                console.log(response.data.response);
                if(response.data.response == 'Success') {
                    const updatedThoughts = thoughts.filter( thought => {
                        return thought._id !== id;
                    })
                    setThoughts(updatedThoughts);
                }
            })
        } catch(err) {
            console.log(err);
            console.log("Error when deleting Thought.");
        }
    }

    useEffect(() => {
        renderThoughts();
      }, []);    

    return (
        <div className="home">
            <Navbar 
                user={user}
            />
            <h1>Welcome back, {user.first_name}!</h1>
            <MessageInput 
                user={user}
                onAdd={handleAdd}
                renderThoughts={renderThoughts}
                
            />
            <div className="thought-message-board">
                {thoughts.map( (thoughtItem, index) => {
                    return (
                        <Thought 
                            key={index}
                            id={thoughtItem._id}
                            user={user}
                            title={thoughtItem.title}
                            content={thoughtItem.content}
                            date={thoughtItem.date}
                            handleDelete={handleDelete}/>
                    )
                })}
            </div>
        </div>
    );
}

export default Home;