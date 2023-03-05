import { Box, Button, Typography } from "@mui/material";
import { shades } from "../../theme";
import moment from "moment";
//import Highlighter from 'react-highlighter';
import { EditorState, ContentState } from "draft-js";
import { NoteContext } from "../../context";
import { NoteContextType, INote } from "../../types/notes";
import { useContext } from "react";

type NoteItemProps = {
  note: INote;
};

const getDateText = (date: moment.MomentInput) => {
  const momentDate = moment(date);
  if (momentDate.isSame(new Date(), "day")) {
    return momentDate.format("HH:mm");
  }
  if (momentDate.isSame(new Date(), "week")) {
    return momentDate.format("dddd");
  }
  return momentDate.format("DD/MM/YYYY");
};

const getTitleAndDescription = (noteContent: EditorState) => {
  const content = noteContent.getCurrentContent().getPlainText();
  const textArray = content.split("\n");
  const title = textArray[0] !== "" ? textArray[0] : null;
  const description = (textArray.length > 0 && textArray[1]) || null;
  return { title, description };
};

function NoteItem({ note }: NoteItemProps) {
  const { title, description } = getTitleAndDescription(note.content);
  const { setActive } = useContext(NoteContext) as NoteContextType;

  return (
    <Box
      onClick={() => setActive(note.id)}
      sx={{
        margin: 1.5,
        height: "60px",
        borderRadius: 1.5,
        bgcolor: "secondary.dark",
        "&:hover": {
          cursor: "pointer",
          bgcolor: "secondary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Box
        sx={{
          display: "block",
          padding: "5px",
          height: "50px",
          width: "100%",
          margin: "0px auto",
          color: `${shades.primary[100]}`,
        }}
      >
        <Typography variant="h3">{title || "New Note"}</Typography>
        <Typography variant="h4">
          {getDateText(note.updatedAt)}
          {description || "No addition text"}{" "}
        </Typography>
      </Box>
      <Box
        sx={{
          height: "5px",
          width: "80%",
          margin: "0px auto",
          borderBottom: `1px solid ${shades.secondary[400]}`,
        }}
      ></Box>
    </Box>
  );
}

export default NoteItem;
