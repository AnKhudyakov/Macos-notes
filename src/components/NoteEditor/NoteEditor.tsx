import Box from "@mui/material/Box";
import { shades } from "../../theme";
import { NoteContext } from "../../context";
import { NoteContextType, INote } from "../../types/notes";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import moment from "moment";
import { EditorContext } from "../../context/EditorContext";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from "draft-js";
import { Typography } from "@mui/material";

function NoteEditor() {
  const { activeNoteId, updateNote, getActive } = useContext(
    NoteContext
  ) as NoteContextType;
  const note = getActive();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editor = useRef<Editor>(null);

  const focusEditor = useCallback(() => {
    if (editor.current) {
      editor.current.focus();
    }
  }, [editor]);

  useEffect(() => {
    focusEditor();
  }, []);

  const displayTime = () => {
    const time = moment(note?.createdAt).format('MMMM DD, YYYY \\at HH:mm');
    return time;
  }

  const keyBindingFn = (event: any) => {
    if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 66) {
      return "text-bold";
    }
    if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 73) {
      return "text-italic";
    }
    if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 85) {
      return "text-underline";
    }
    return getDefaultKeyBinding(event);
  };

  const handleKeyCommand = (command: string, editorState: any) => {
    let nextState;
    if (command === "text-bold")
      nextState = RichUtils.toggleInlineStyle(editorState, "BOLD");
    if (command === "text-italic")
      nextState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
    if (command === "text-underline")
      nextState = RichUtils.toggleInlineStyle(editorState, "UNDERLINE");
    if (nextState) {
      updateNote(activeNoteId, nextState);
      return "handled";
    }
    return "not-handled";
  };

  const onChange = ((editorState:EditorState)=>{
    if (note){
      updateNote(note.id, editorState)
    }
  }
 )

  return (
    <Box
      sx={{
        width: "77%",
        minHeight: "300px",
        margin: "0px",
        padding:"10px",
        borderRadius: "0 0 10px 0",
        color: `${shades.primary[100]}`,
      }}
    >
      <Typography sx={{textAlign: "center"}} >
           { displayTime() }
           </Typography>

        <EditorContext.Provider value={editorState} key={note?.id}>
          {note&&
          <Editor
            editorState={note.content}
            onChange={onChange}
            keyBindingFn={keyBindingFn}
            handleKeyCommand={handleKeyCommand}
            ref={editor}
          ></Editor>}
        </EditorContext.Provider>
    
    </Box>
  );
}

export default NoteEditor;
