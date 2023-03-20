import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import * as React from "react";

import "../styles.css";
import { INSERT_YOUTUBE_COMMAND } from "./YouTubePlugin";

export function FillURL() {
  const url = prompt("Enter the URL of the YouTube video:", "");

  const match = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(
    url
  );

  const id = match ? (match?.[2].length === 11 ? match[2] : null) : null;

  if (id != null) {
    return id;
  }

  return null;
}

export default function ToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="toolbar">
      <button
        onClick={() => {
          editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, FillURL());
        }}
        className={"toolbar-item spaced "}
      >
        <span className="text">Insert YouTube Video</span>
      </button>
    </div>
  );
}
