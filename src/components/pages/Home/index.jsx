import axios from "axios";
import React, {useEffect, useState} from "react";
import "./index.css";
import { getThoughts, getMoreThoughts, deleteThought, checkReqUserCall } from "../../../api";

// Components:
import Navbar from "./Navbar";
import Thought from "./Thought";
import MessageInput from "./MessageInput";
import InfiniteScroll from "react-infinite-scroll-component";

function Home(props) {

    const user = props.user
    const [thoughts, setThoughts] = useState([]);
    const [totalThoughtCount, setTotalThoughtCount] = useState();
    // thoughts.length will reflect the index at which to GET more thoughts
    // totalThoughtCount will reflect the total number of thoughts available when scrolling

    const renderThoughts = async () => {
        try {
          const data = await getThoughts();
          console.log(data);
          setThoughts(data.thoughts);
          setTotalThoughtCount(data.totalThoughtCount);
        } catch(err) {
          console.log(err);
        }
    }

    const loadMoreThoughts = async () => {
        try {
            const data = getMoreThoughts(thoughts.length);
            console.log(data);
            setThoughts(...thoughts, data);
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
                <InfiniteScroll
                    dataLength={thoughts.length}
                    next={loadMoreThoughts}
                    hasMore={thoughts.length < totalThoughtCount}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>Done!</p>}
                >
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