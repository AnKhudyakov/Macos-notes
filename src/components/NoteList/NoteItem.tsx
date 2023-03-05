import { Box, Button, Divider, Typography, useMediaQuery } from "@mui/material";
import { shades } from "../../theme";
import moment from "moment";
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
  const { setActive, isListView, activeNoteId,setIsEditorShow } = useContext(
    NoteContext
  ) as NoteContextType;

  const onOpenEditor = (()=>{
    setActive(note.id)
    setIsEditorShow(true)
  })

  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box
      onDoubleClick={onOpenEditor}
      onClick={() => setActive(note.id)}
      height={!isNonMobile ? "90px" : isListView ? "60px" : "200px"}
      sx={{
        margin: 1.5,
        borderRadius: 1.5,
        bgcolor: activeNoteId == note.id ? "secondary.main" : "secondary.dark",

        "&:hover": {
          cursor: "pointer",
          bgcolor: "secondary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Box
        height={isListView || !isNonMobile? "50px" : "50px"}
        sx={{
          textAlign:isListView?"":"center",
          display: "block",
          padding: "5px",
          width: "100%",
          margin: isListView?"0px auto":"5px auto",
          color: `${shades.primary[100]}`,
        }}
      >
        <Typography variant="h3">{title || "New Note"}</Typography>
        <Typography variant="h4">
          {getDateText(note.updatedAt)}
          {description || "No addition text"}{" "}
        </Typography>
      </Box>
      <Divider
        sx={{
          height: 2,
          width: "80%",
          margin: !isNonMobile ? "39px auto" : "9px auto",
          bgcolor: `${shades.secondary[500]}`,
        }}
      ></Divider>
    </Box>
  );
}

export default NoteItem;
