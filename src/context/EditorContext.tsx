import { EditorState } from "draft-js";
import { createContext } from "react";

export const EditorContext = createContext<EditorState>(
  EditorState.createEmpty()
);
