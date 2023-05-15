import React, {useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { postThought, getThought, putThought, deleteThought } from "../../api";
import {
  Menu,
  MenuItem
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { placeholder } from "@cloudinary/react";

function Placeholder() {
  return <div className="editor-placeholder">What's on your mind?</div>;
}

export default function Editor(props) {

  const user = useSelector(state => state.user)
  const editorStateRef = useRef();
  const [titleState, setTitleState] = useState(props.title);
  const [categoryState, setCategoryState] = useState(props.category);
  const initialEditorState = props.content
  const date = new Date(props.date)
  const dateString = date.toDateString();
  const isCurrentUsers = (props.user === user._id);
  const navigate = useNavigate();

  const thought = {
    id: props.id,
    title: props.title,
    date: props.date,
    content: props.content,
    category: props.category,
    user: props.user,
  }

  const [isEditable, setIsEditable] = useState(props.isEditable);

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const putContent = async (content) => {
    if (window.confirm("Save changes to thought?", "Confirm")) {
      const thought = {
        _id: props.id,
        title: titleState,
        category: categoryState,
        content: content
      }
      try {
        const response = await putThought(thought);
        return response
      } catch(err) {
        console.log(err);
      }
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.target)
  }

  const handleClose = (event) => {
    setAnchorEl(null)
  }

  const handleRedirect = () => {
    navigate("/profile/" + user._id); 
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
        { !isEditable ?
          <div className="category-title-div">
            <div className="text-editor-category"><h3>{ props.category } :</h3></div>
            <div className="text-editor-title"><u><h3>{ props.title }</h3></u></div>
          </div>
        : 
        <div className="category-title-div">
          <div className="text-editor-category">
            <input 
              value={ categoryState }
              onChange={ (e) => { setCategoryState(e.target.value) } }
              placeholder="Category"
            ></input>
          </div>
          <div className="text-editor-title">
            <u><input 
              value={ titleState } 
              onChange={ (e) => { setTitleState(e.target.value)  } }
              placeholder="Title" 
            ></input></u>
          </div>
        </div>
        }
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
          { !isEditable && <Link to={`/thought/${ props.id }`} state={{ thought: thought }}><MenuItem onClick={handleClose}><EditIcon fontSize="small"/>Edit</MenuItem></Link>}
          { !isEditable && isCurrentUsers && <MenuItem onClick={ () => {
             handleClose();
             props.handleDelete(props.id, props.user) 
            } 
            }><DeleteIcon fontSize="small"/>Delete</MenuItem>}
        </Menu> 
   
      </div>
      
      <LexicalComposer 
        initialConfig={editorConfig}
        >
        <div className="editor-container">
          { isEditable && <ToolbarPlugin /> }
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
        { isEditable && <input type="button" value="Save" onClick={ () => {
          if (editorStateRef.current) {
             putContent(JSON.stringify(editorStateRef.current)).then(response => {
              if(response.status === 200) {
                handleRedirect();
              }
             }) 
            }
        }} /> }
      </LexicalComposer>
    </div>
  );
}
