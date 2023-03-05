import Box from "@mui/material/Box";
import { shades } from "../../theme";
import NoteItem from "./NoteItem";
import { NoteContext } from "../../context";
import { NoteContextType, INote } from "../../types/notes";
import { useContext } from "react";
import { Typography } from "@mui/material";

function NoteList() {
  const { notes, keyword, sortedAndSearchedNotes, isListView } = useContext(
    NoteContext
  ) as NoteContextType;

  console.log(isListView);

  return (
    <Box
    minWidth= {isListView ? "200px" : "100%"}
      sx={{
        minHeight: "300px",
        borderRight: isListView ?`1px solid ${shades.secondary[600]}`:"0",
        borderRadius: isListView ? "0" : "0 0 10px 0",
        bgcolor: "secondary.dark",
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
