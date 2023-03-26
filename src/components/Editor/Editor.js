import React, {useRef, useState} from "react";
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
import { createEditor } from "lexical";
import { postThought, getThought } from "../../api";


function Placeholder() {
  return <div className="editor-placeholder">What's on your mind?</div>;
}

export default function Editor(props) {

  const user = useSelector(state => state.user)
  const editorStateRef = useRef();
  const initialEditorState = props.content
  const title = props.title;
  // const date = props.date;
  const date = new Date(props.date)
  const dateString = date.toDateString();
  const [isEditable, setIsEditable] = useState(props.isEditable);

  const saveContent = (content) => {
    const title = prompt("Title: ")
    const category = prompt("Category: ")
    const thought = {
      title: title,
      category: category,
      content: content
    }
    const response = postThought(thought);
    // Update React State with successful response
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
    <div className="text-editor" onDoubleClick={() => { console.log("Render single-thought page") }}>
      <div className="text-editor-details">
        <div className="text-editor-title"><h3><u>{ title }</u></h3></div>
        <div className="text-editor-date"><h3>{ dateString }</h3></div>
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
        { isEditable ? <input type="button" value="Submit" onClick={ () => {
          if (editorStateRef.current) {
            saveContent(JSON.stringify(editorStateRef.current))
          }
        }} /> : null }
      </LexicalComposer>
    </div>
  );
}
