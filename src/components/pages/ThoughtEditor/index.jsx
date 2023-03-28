import React, {useState} from "react";
import { useSelector } from "react-redux";
import Editor from "../../Editor/Editor";
import CreateEditor from "../../Editor/CreateEditor";
import { useLocation } from "react-router-dom";
import Navbar from "../../Navbar";

export default function ThoughtEditor() {
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

    const props = location.state.thought || {}

    return (
        <div className="thought-editor-page">
            <Navbar />
            { !props.newThought ? 
            <Editor 
                id={props.id}
                title={props.title}
                content={props.content}
                category={props.category}
                date={props.date}
                isEditable={true}
                newThought={false}
            /> : 
            <CreateEditor 
                isEditable={true}
                newThought={true}
            /> }
        </div>
    )
}