import React, {useRef, useState} from "react";
import { Link } from "react-router-dom";
import ExampleTheme from "../themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "../plugins/TreeViewPlugin";
import ToolbarPlugin from "../plugins/ToolbarPlugin";
import YouTubePlugin from "../plugins/YouTubePlugin";
import ImagePlugin from "../plugins/ImagePlugin";
import { YouTubeNode } from "../nodes/YouTubeNode";
import { ImageNode } from "../nodes/ImageNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import ListMaxIndentLevelPlugin from "../plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "../plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "../plugins/AutoLinkPlugin";
import { useSelector, useDispatch } from "react-redux";
import "./EditorStyles.css";
import { postThought, getThought, putThought } from "../../api";
import {
  Menu,
  MenuItem
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Placeholder() {
  return <div className="editor-placeholder">What's on your mind?</div>;
}

function CategoryPlaceholder() {
  return <div className="category-placeholder">Category</div>
}

function TitlePlaceholder() {
  return <div className="title-placeholder">Title</div>
}

export default function CreateEditor(props) {

  const user = useSelector(state => state.user);
  const editorStateRef = useRef();
  const [titleState, setTitleState] = useState("");
  const [categoryState, setCategoryState] = useState("");

  const initialEditorState = null;
  const date = new Date();
  console.log(date);
  const dateString = date.toDateString();
  const newThought = props.newThought;
  const [isEditable, setIsEditable] = useState(props.isEditable);

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const postContent = (content) => {
    const thought = {
      title: titleState,
      category: categoryState,
      content: content
    }
    const response = postThought(thought);
    // Update React State with successful response
  }

  const handleClick = (event) => {
    setAnchorEl(event.target)
  }

  const handleClose = (event) => {
    setAnchorEl(null)
  }

  const handleChange = (event) => {
    
  }

  const editorConfig = {
    // The editor theme
    theme: ExampleTheme,
    editorState: initialEditorState,
    editable: isEditable,
    // Handling of errors during update
    onError(error) {
      throw error;
    },
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
      YouTubeNode,
      ImageNode
    ]
  };

  return (
    <div className="text-editor">
       
        <div className="text-editor-details"> 
        <div className="category-title-div">
          <div className="text-editor-category">
            <input value={ categoryState } onChange={ (e) => { setCategoryState(e.target.value)  } } ></input>
          </div>
          <div className="text-editor-title">
            <input value={ titleState } onChange={ (e) => { handleChange() } } ></input>
          </div>
        </div>

        {/* If edit mode: */}
        {/* category-input + title-input */}
        <div className="text-editor-date">
          <h3>{ dateString }</h3>
          <div className="vert-icon-div">
            <MoreVertIcon 
              sx={{ fontSize: 30 }}    
              id="settings"
              className="button"
              // onMouseOver={handleMouseOver}
              // onMouseOut={handleMouseOut}
              onClick={handleClick}
              aria-controls={ open ? 'settings-menu' : undefined }
              aria-haspopup='true'
              aria-expanded={ open ? 'true' : undefined }>
            </MoreVertIcon>
          </div>
        </div> 

        <Menu id='settings-menu' anchorEl={anchorEl} open={open} 
          MenuListProps={{ 'aria-labelledby': 'settings-button'}}
          onClose={handleClose}>
        </Menu> 
   
      </div>
      
      <LexicalComposer 
        initialConfig={editorConfig}
        >
        <div className="editor-container">
        <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <YouTubePlugin />
            <ImagePlugin />
            <OnChangePlugin onChange={editorState => editorStateRef.current = editorState} />
            <HistoryPlugin />
            {/* <TreeViewPlugin /> */}
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </div>
          <hr/>
        </div>
        <input type="button" value="Submit" onClick={ () => {
          if (editorStateRef.current) {
            postContent(JSON.stringify(editorStateRef.current))
            }
          }
        } />
      </LexicalComposer>
    </div>
  );
}
