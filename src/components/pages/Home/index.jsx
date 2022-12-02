import axios from "axios";
import React, {useEffect, useState} from "react";
import "./index.css";
import { getThoughts, deleteThought, checkReqUserCall } from "../../../api";

// Components:
import Navbar from "./Navbar";
import Thought from "./Thought";
import MessageInput from "./MessageInput";
import InfiniteScroll from "react-infinite-scroll-component";

function Home(props) {

    const user = props.user
    const [thoughts, setThoughts] = useState([]);

    const renderThoughts = async () => {
        try {
          const data = await getThoughts();
          setThoughts(data);
          console.log(data.length);
        } catch(err) {
          console.log(err);
        }
    }

    function handleAdd(newThought) {
        setThoughts(prevThoughts => {
            return [newThought, ...prevThoughts]
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

    loadMoreThoughts = () => {
        null
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
                <InfiniteScroll
                dataLength={thoughts.length}
                next={loadMoreThoughts}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={<p>Done!</p>}>
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
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default Home;