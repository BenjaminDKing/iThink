import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import Thought from "./Thought";
import MessageInput from "./MessageInput";
import "./index.css";
import axios from "axios";

function Home(userDetails) {

    const user = userDetails.user
    const [thoughtData, setThoughtData] = useState([])

    const getThoughts = async () => {
        
        try {
            const url = process.env.REACT_APP_API_URL;
            const { data } = await axios.get(url, {withCredentials: true});
            setThoughtData( prevData => [...prevData, ...data ])
            console.log(thoughtData)
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getThoughts();
    }, [])

    return (
        <div className="home">
            <Navbar 
                user={user}
            />
            <h1>Welcome back, {user.first_name}!</h1>
            <MessageInput 
                user={user}
            />

            { thoughtData.length ?
                thoughtData.map((thoughtItem, index) => {
                <Thought 
                    key={index}
                    id={index}
                    title={thoughtItem.title}
                    content={thoughtItem.content}
                />
            }) : null }
        </div>
    );
}

export default Home;