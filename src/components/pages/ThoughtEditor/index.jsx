import React, {useState} from "react";
import Editor from "../../Editor/Editor";
import { Link, useLocation } from "react-router-dom";


export default function ThoughtEditor(props) {
    // ONLY RENDER IF thought.user === current_user._id

    // Will get passed a thought including:
    // _id
    // user
    // title
    // content
    // category
    // date

    const location = useLocation();
    const { state } = location;

    const thought = location.state.thought || {}

    return (
        <div className="thought-editor">
            <Editor 
                id={thought.id}
                title={thought.title}
                content={thought.content}
                date={thought.date}
                isEditable={true}
            />
        </div>
    )
}