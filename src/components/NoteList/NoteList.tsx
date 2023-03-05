import Box from "@mui/material/Box";
import { shades } from "../../theme";
import NoteItem from "./NoteItem";
import { NoteContext } from "../../context";
import { NoteContextType, INote } from "../../react-app-env";
import { useContext } from "react";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

function NoteList() {
  const {
    notes,
    keyword,
    sortedAndSearchedNotes,
    isListView,
    activeNoteId,
    setActive,
    isEditorShow,
    setIsEditorShow,
  } = useContext(NoteContext) as NoteContextType;

  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box
      //onClick={() => (activeNoteId && !isListView ? setActive("") : null)}
      minWidth={
        !isNonMobile && isListView ? "100px" : isListView ? "215px" : "100%"
      }
      display={
        isEditorShow ? "none" : isListView || !isNonMobile ? "block" : "grid"
      }
      overflow="auto"
      gap="15px"
      gridTemplateColumns="repeat(auto-fill, 200px)"
      gridTemplateRows={
        !isNonMobile ? "repeat(auto-fill, 100px)" : "repeat(auto-fill, 200px)"
      }
      justifyContent="space-around"
      rowGap="0px"
      columnGap="2.33%"
      sx={{
        borderRight: isListView ? `1px solid ${shades.secondary[600]}` : "0",
        borderRadius: isListView ? "0" : "0 0 10px 0",
        bgcolor: "secondary.dark",
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      {!notes.length && (
        <Typography
          variant="h2"
          sx={{
            color: `${shades.primary[100]}`,
            textAlign: "center",
            marginTop: 6,
          }}
        >
          No Notes
        </Typography>
      )}
      {!keyword && notes.map((note) => <NoteItem note={note} key={note.id} />)}
      {sortedAndSearchedNotes &&
        sortedAndSearchedNotes.map((note) => (
          <NoteItem note={note} key={note.id} />
        ))}
    </Box>
  );
}

export default NoteList;
