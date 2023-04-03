import axios from "axios";
import React, {useEffect, useState} from "react";
import styles from "./index.css";
import { getThoughts, getMoreThoughts, deleteThought, checkReqUserCall } from "../../../api";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../../actions";

// Components:
import Navbar from "../../Navbar";
import Thought from "../../Thought";
import InfiniteScroll from "react-infinite-scroll-component";
import Editor from "../../Editor/Editor";

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

    const handleAdd = async (newThought) => {
        setThoughts(prevThoughts => {
            return [newThought, ...prevThoughts]
        });
    }

    const handleDelete = async (id, user) => {
        if(window.confirm("Are you sure you want to delete?", "Delete")) {
            try {
              const response = await deleteThought(id, user);
              // Update React state depending on response
              if(response.status == 200) {
                const updatedThoughts = thoughts.filter( thought => {
                    return thought._id !== id;
                })
                setThoughts(updatedThoughts);
              }
            } catch(err) {
              console.log(err);
            }
        }
    }

    useEffect(() => {
        renderThoughts();
      }, []);    

    return (
        <div className="home">
            <Navbar />
            <h1>Welcome back, {user.first_name}!</h1>
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
                        <Editor 
                            key={index}
                            id={thoughtItem._id}
                            user={thoughtItem.user}
                            title={thoughtItem.title}
                            category={thoughtItem.category}
                            content={thoughtItem.content}
                            date={thoughtItem.date}
                            isEditable={false}
                            handleDelete={handleDelete}
                        />
                    )
                })}
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default Home;