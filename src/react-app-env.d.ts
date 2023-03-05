/// <reference types="react-scripts" />

export interface INote {
    id: string;
    content: EditorState;
    updatedAt: Date;
    createdAt: Date;
  }
  export type NoteContextType = {
    notes: INote[];
    activeNoteId: string;
    keyword: string;
    sortedAndSearchedNotes: INote[] | null;
    isOpenFormat: boolean;
    createNote: () => void;
    updateNote: (id: string, content: EditorState) => void;
    removeNote: (id: string) => void;
    setActive: (id: string) => void;
    getActive: () => INote | undefined;
    searchKeyword: (keyword: string) => void;
    setIsOpenFormat: Dispatch<React.SetStateAction<boolean>>;
    toggleBlockType: (blockType: string) => void;
    isListView: boolean;
    setIsListView: Dispatch<React.SetStateAction<boolean>>;
    isEditorShow: boolean;
    setIsEditorShow: Dispatch<React.SetStateAction<boolean>>;
  };
  