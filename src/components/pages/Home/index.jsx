import axios from "axios";
import React, {useEffect, useState} from "react";
import "./index.css";
import { getThoughts, getMoreThoughts, deleteThought, checkReqUserCall } from "../../../api";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../../actions";

// Components:
import Navbar from "../../Navbar";
import Thought from "../../Thought";
import MessageInput from "./MessageInput";
import InfiniteScroll from "react-infinite-scroll-component";

function Home(props) {

    const counter = useSelector(state => state.counter)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    const [thoughts, setThoughts] = useState([]);
    const [totalThoughtCount, setTotalThoughtCount] = useState();

    const renderThoughts = async () => {
        try {
          const data = await getThoughts(user._id);
          setThoughts(data.thoughts);
          setTotalThoughtCount(data.totalThoughtCount);
        } catch(err) {
          console.log(err);
        }
    }

    const loadMoreThoughts = async () => {
        try {
            const data = await getMoreThoughts(user._id, thoughts.length);
            setThoughts([...thoughts, ...data.thoughts]);
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
            <Navbar />
            <h1>Welcome back, {user.first_name}!</h1>
            
            {/* <h1>Counter: {counter}</h1>
            <button onClick={() => dispatch(increment(5)) }>+</button>
            <button onClick={() => dispatch(decrement())}>-</button> */}

            <MessageInput 
                onAdd={handleAdd}
                renderThoughts={renderThoughts}     
            />
            <div className="thought-message-board">
                <InfiniteScroll
                    dataLength={thoughts.length}
                    next={loadMoreThoughts}
                    hasMore={thoughts.length < totalThoughtCount}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>All thoughts have been loaded.</p>}
                >
                    {thoughts.map( (thoughtItem, index) => {
                        return (
                            <Thought 
                                key={index}
                                id={thoughtItem._id}
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