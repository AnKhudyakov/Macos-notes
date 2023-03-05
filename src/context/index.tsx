import { createContext } from "react";
import { NoteContextType, INote } from "../react-app-env";
import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { EditorState, ContentState } from "draft-js";
import { RichUtils } from "draft-js";

type NoteProviderProps = {
  children: React.ReactNode;
};

export const NoteContext = createContext<NoteContextType | null>(null);

const textArray = [
  `My first note!\n Lorem ipsum dolor\n sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  `My second note!\n Lorem ipsum dolor\n sit amet, consectetur adipiscing elit,sed do`,
];

export const NoteProvider = ({ children }: NoteProviderProps) => {
  const initialNotes = Array.from({ length: 2 }, (v, k) => {
    const text = textArray[k];
    const contentState = ContentState.createFromText(text);
    return {
      id: faker.datatype.uuid(),
      content: EditorState.createWithContent(contentState),
      updatedAt: faker.date.recent(),
      createdAt: faker.date.recent(),
    };
  });

  const [notes, setNotes] = useState<INote[]>(initialNotes);
  const [activeNoteId, setActiveNoteId] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [sortedAndSearchedNotes, setSortedAndSearchedNotes] = useState<
    null | INote[]
  >(null);
  const [isOpenFormat, setIsOpenFormat] = useState<boolean>(false);
  const [isListView, setIsListView] = useState<boolean>(true);
  const [isEditorShow, setIsEditorShow] = useState<boolean>(false);
  const createNote = () => {
    const newNote: INote = {
      id: faker.datatype.uuid(),
      content: EditorState.createEmpty(),
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const updateNote = (id: string, content: EditorState) => {
    const updatednotes = notes.map((note: INote) => {
      if (note.id === id) {
        const changeType = content.getLastChangeType();
        const updatedNote = { ...note, content };
        if (changeType) updatedNote.updatedAt = new Date();
        return updatedNote;
      }
      return note;
    });
    setNotes([...updatednotes]);
  };

  const removeNote = (id: string) => {
    const newNotes = notes.filter((note: INote) => {
      if (note.id != id) return note;
    });
    setNotes([...newNotes]);
  };

  const setActive = (id: string) => {
    setActiveNoteId(id);
  };

  const getActive = () => {
    let anctiveNote: INote | undefined;
    if (activeNoteId) {
      anctiveNote = notes.find((note: INote) => note.id === activeNoteId);
    }
    return anctiveNote;
  };

  const searchKeyword = (keyword: string) => {
    if (keyword && keyword.length > 0) {
      setKeyword(keyword);
      const sortedNotes = getSortedNotes(notes);
      const filteredResult = filterNotes(sortedNotes, keyword);
      setSortedAndSearchedNotes(filteredResult);
    } else {
      setKeyword("");
      setSortedAndSearchedNotes(null);
    }
  };

  const getSortedNotes = (notes: INote[]) => {
    notes.sort((n1, n2) => +n2.updatedAt - +n1.updatedAt);
    return notes;
  };

  const filterNotes = (notes: INote[], keyword: string) => {
    if (!keyword || keyword.length === 0) return notes;
    return notes.filter((note) => {
      const text = note.content.getCurrentContent().getPlainText();
      return text.toLowerCase().indexOf(keyword.toLowerCase()) >= 0;
    });
  };

  const toggleBlockType = (blockType: string) => {
    if (!getActive()) return;
    const note = getActive();
    if (note) {
      const nextState = RichUtils.toggleBlockType(note.content, blockType);
      updateNote(activeNoteId, nextState);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        activeNoteId,
        keyword,
        sortedAndSearchedNotes,
        isOpenFormat,
        createNote,
        updateNote,
        removeNote,
        setActive,
        getActive,
        searchKeyword,
        setIsOpenFormat,
        toggleBlockType,
        isListView,
        setIsListView,
        isEditorShow,
        setIsEditorShow,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
