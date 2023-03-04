export interface INote {
  id: string;
  content: EditorState;
  updatedAt: any;
  createdAt: any;
}
export type NoteContextType = {
  notes: INote[];
  activeNoteId: string;
  keyword: string;
  sortedAndSearchedNotes: INote[] | null;
  createNote: () => void;
  updateNote: (id: string, content: EditorState) => void;
  removeNote: (id: string) => void;
  setActive: (id: string) => void;
  getActive: () => INote | undefined;
  searchKeyword: (keyword: string) => void;
};
