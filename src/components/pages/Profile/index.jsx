import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getProfile, getThoughts, getMoreThoughts, getBuddies } from "../../../api" 
import "./index.css";
import CreateIcon from '@mui/icons-material/Create';

import InfiniteScroll from "react-infinite-scroll-component";

import Navbar from "../../Navbar";
import Thought from "../../Thought";
import AddBuddy from "../../AddBuddy";
import ProfilePicture from "./ProfilePicture";
import ProfileDetails from "./ProfileDetails";
import PersonalPhilosophy from "../../PersonalPhilosophy";
import Editor from "../../Editor/Editor";

function Profile() {

    const [profile, setProfile] = useState(null);
    const [thoughts, setThoughts] = useState([]);
    const [totalThoughtCount, setTotalThoughtCount] = useState();

    const user = useSelector(state => state.user)
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

    const handleClick = () => {
        console.log("Doo doo")
    }

    useEffect(() => {
        renderProfile();
    }, [id])

    useEffect(() => {
        renderThoughts();
    }, [profile])

    if (profile) {
        return (
            <div className="profile">
                <Navbar />
                <div className="banner-top">
                    <div className="profile-pic-div">
                        <ProfilePicture profile={profile}/>
                        <AddBuddy buddy={ profile } />
                        { <h1> { profile.first_name } { profile.last_name } </h1> }
                    </div>
                    <div className="personal-philosophy-div">
                        <PersonalPhilosophy profile={profile}/>
                        { (profile._id == user._id) && <button className="edit-pp-btn"> <CreateIcon onClick={handleClick} sx={{ fontSize: 20 }} /> </button> }
                    </div>
                </div>
                <div className="thought-message-board">
                <Link to="/createthought"><input type="button" className="create-thought-btn" value="New Thought"></input></Link>
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
                            title={thoughtItem.title}
                            content={thoughtItem.content}
                            date={thoughtItem.date}
                            isEditable={false}
                        />
                    )
                })}
                </InfiniteScroll>
            </div>
            </div>
        )
    } 
}


export default Profile;