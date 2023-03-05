import { shades } from "../../theme";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NoteContext } from "../../context";
import { NoteContextType, INote } from "../../types/notes";
import { useContext, useState } from "react";

const formats = [
  {
    name: "header-one",
    label: "Title",
  },
  {
    name: "header-two",
    label: "Heading",
  },
  {
    name: "unstyled",
    label: "body",
  },
  {
    name: "unordered-list-item",
    label: "Unordered list",
  },
  {
    name: "ordered-list-item",
    label: "Order list",
  },
];

type FormatButtonProps = {
  isOpen: boolean;
};

const FormatButton = ({ isOpen }: FormatButtonProps) => {
  const { setActive, toggleBlockType } = useContext(
    NoteContext
  ) as NoteContextType;

  return isOpen ? (
    <Box
      sx={{
        position: "absolute",
        top: 80,
        left: "50%",
        width: "100%",
        maxWidth: 200,
        maxHeight: 300,
        margin: "0 auto",
        bgcolor: `background.paper`,
        textAlign: "center",
        borderRadius: "5px",
      }}
    >
      {/* <nav aria-label="main mailbox folders">
        <IconButton //onClick={addNewNote}
        >
          <FormatBoldIcon
            fontSize="medium"
            sx={{
              margin: "2px 5px 0",
              color: `${shades.primary[500]}`,
            }}
          />
        </IconButton>
      </nav>
      <Divider /> */}
      <nav aria-label="primary mailbox folders">
        <List
          sx={{
            bgcolor: `${shades.primary[400]}`,
          }}
        >
          {formats.map((format) => (
            <ListItem disablePadding key={format.name}>
              <ListItemButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  toggleBlockType(format.name);
                }}
              >
                <ListItemText primary={format.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  ) : (
    <Box width={0}></Box>
  );
};

export default FormatButton;
