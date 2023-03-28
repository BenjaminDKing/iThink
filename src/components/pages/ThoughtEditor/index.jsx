import React, {useState} from "react";
import { useSelector } from "react-redux";
import Editor from "../../Editor/Editor";
import { useLocation } from "react-router-dom";
import Navbar from "../../Navbar";


export default function ThoughtEditor(props) {
    // ONLY RENDER IF thought.user === current_user._id

    // Will get passed a thought including:
    // _id
    // user
    // title
    // content
    // category
    // date

    const user = useSelector(state => state.user)
    const location = useLocation();
    const { state } = location;

    const thought = location.state.thought || {}

    return (
        <div className="thought-editor-page">
            <Navbar />
            { location.state.thought ? 
            <Editor 
                id={thought.id}
                title={thought.title}
                content={thought.content}
                category={thought.category}
                date={thought.date}
                isEditable={true}
                newThought={false}
            /> : 
            <Editor 
                isEditable={true}
                newThought={true}
            />}
        </div>
    )
}