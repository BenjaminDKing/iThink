import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getProfile, getThoughts, getMoreThoughts } from "../../../api" 
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
    }

    const renderThoughts = async () => {
        try {
          const data = await getThoughts(id);
          setThoughts(data.thoughts);
          setTotalThoughtCount(data.totalThoughtCount);
        } catch(err) {
          console.log(err);
        }
    } 

    const loadMoreThoughts = async () => {
        try {
            const data = await getMoreThoughts(id, thoughts.length);
            setThoughts([...thoughts, ...data.thoughts]);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        renderProfile();
    }, [])

    useEffect(() => {
        renderThoughts();
    }, [profile])

    if (profile) {
        return (
            <div className="profile">
                <Navbar user={ user }/>
                <div>
                    <ProfilePicture user={ user }/>
                    { <h1> { profile.first_name } { profile.last_name } </h1> }
                </div>
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
                                user={profile}
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