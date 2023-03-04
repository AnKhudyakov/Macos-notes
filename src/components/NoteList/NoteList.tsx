import Box from "@mui/material/Box";
import { shades } from "../../theme";
import NoteItem from "./NoteItem";
import { NoteContext } from '../../context';
import { NoteContextType, INote } from "../../types/notes";
import { useContext } from "react";

function NoteList() {

  const { notes } = useContext(NoteContext) as NoteContextType;
  
  return (
    <Box
    sx={{
        width: "23%",
        minHeight: "300px",
        borderRight: `1px solid ${shades.secondary[600]}`,
        backgroundColor: "secondary.dark",
        // "&:hover": {
        //   backgroundColor: "secondary.main",
        //   opacity: [0.9, 0.8, 0.7],
        // },
      }}
    >
       {notes.map((note)=><NoteItem note={note} key={note.id}/>)}
    </Box>
  );
}

export default NoteList;
