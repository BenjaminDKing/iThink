import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getProfile } from "../../../api" 
import "./index.css";

import InfiniteScroll from "react-infinite-scroll-component";

import Navbar from "../../Navbar";
import Thought from "../../Thought";

import ProfilePicture from "./ProfilePicture";
import ProfileDetails from "./ProfileDetails";

function Profile(props) {

    const [profile, setProfile] = useState(null);
    const [thoughts, setThoughts] = useState([]);
    const [totalThoughtCount, setTotalThoughtCount] = useState();

    const user = props.user;
    const { id } = useParams();

    const renderProfile = async () => {
        const data = await getProfile(id);
        setProfile(data.user);
        setThoughts(data.thoughts);
    }

    const loadMoreThoughts = async () => {
        try {
            const data = await getMoreThoughts(thoughts.length);
            setThoughts([...thoughts, ...data.thoughts]);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        renderProfile();
    }, [])

    if (profile) {
        return (
            <div className="profile">
                <Navbar user={ user }/>
                { <h1> { profile.first_name }'s Profile </h1> }
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
                                user={user}
                                title={thoughtItem.title}
                                content={thoughtItem.content}
                                date={thoughtItem.date}/>
                        )
                    })}
                </InfiniteScroll>
            </div>
            </div>
        )
    } 
}


export default Profile;