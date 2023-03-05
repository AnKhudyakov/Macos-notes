import { shades } from "../../theme";
import {
  Box,
  Button,
  Divider,
  IconButton,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import GridViewIcon from "@mui/icons-material/GridView";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { NoteContext } from "../../context";
import { NoteContextType, INote } from "../../types/notes";
import { useContext, useState } from "react";
import FormatButton from "./FormatButton";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Header() {
  const [focus, setFocus] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const {
    activeNoteId,
    keyword,
    createNote,
    removeNote,
    searchKeyword,
    isOpenFormat,
    setIsOpenFormat,
    isListView,
    setIsListView,
    isEditorShow,
    setIsEditorShow,
  } = useContext(NoteContext) as NoteContextType;

  const addNewNote = () => {
    createNote();
  };

  const removeCurrentNote = () => {
    removeNote(activeNoteId);
  };

  const onSearch = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    searchKeyword(e.target.value);
  };

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
    searchKeyword("");
  };

  const handleClickOpen = () => {
    setOpen(true);
    console.log("OPENClick", open);
  };

  const handleClose = () => {
    setOpen(false);
    console.log("CloSEClick", open);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    margin: theme.spacing(1.5, 2, 2, 0),
    width: "100%",
    height: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(0.5, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box
      sx={{
        width: "100%",
        height: !isNonMobile ? 100 : 50,
        margin: "0px",
        display: !isNonMobile ? "block" : "flex",
        borderRadius: "0 10px 0px 0",
        bgcolor: "secondary.dark",
        "&:hover": {
          borderBottom: `1px solid ${shades.secondary[600]}`,
        },
      }}
    >
      <Box
        sx={{
          minWidth: "214px",
          margin: "0px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <IconButton onClick={() => setIsListView(true)}>
            <ListIcon
              fontSize="large"
              sx={{
                margin: "0px 4px",
                color: `${shades.primary[100]}`,
              }}
            />
          </IconButton>
          <IconButton onClick={() => setIsListView(false)}>
            <GridViewIcon
              sx={{
                margin: "0px 10px",
                color: `${shades.primary[100]}`,
              }}
            />
          </IconButton>

          {!isListView && (
            <IconButton
              onClick={() => setIsEditorShow(false)}
              disabled={isEditorShow ? false : true}
            >
              <ArrowBackIosIcon
                sx={{
                  margin: "0px 10px",
                  color: `${shades.primary[100]}`,
                  opacity: isEditorShow ? 1 : 0.5,
                }}
              />
            </IconButton>
          )}
        </Box>
        <IconButton onClick={handleClickOpen}>
          <DeleteOutlineIcon
            fontSize="large"
            sx={{
              margin: "0px 4px",
              color: `${shades.primary[100]}`,
            }}
          />
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete the note permanently?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You cannot undo this action.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={removeCurrentNote} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Divider
        sx={{
          height: isNonMobile ? 1 : "1px",
          width: isNonMobile ? "1px" : 1,
          bgcolor: `${shades.secondary[600]}`,
        }}
        orientation={isNonMobile ? "vertical" : "horizontal"}
      />
      <Box
        sx={{
          width: 1,
          borderRadius: "0 10px 0 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <IconButton onClick={addNewNote}>
            <BorderColorIcon
              fontSize="medium"
              sx={{
                m: "0 10px",
                color: `${shades.primary[100]}`,
              }}
            />
          </IconButton>
          <Box>
            <IconButton
              disabled={isEditorShow || isListView ? false : true}
              onClick={() => setIsOpenFormat(!isOpenFormat)}
              sx={{ textAlign: "center" }}
              //onClick={() => dispatch(setIsCartOpen({}))}
            >
              <TextFormatIcon
                fontSize="large"
                sx={{
                  m: "5px 5px 0 5px",
                  color: `${shades.primary[100]}`,
                  opacity: isEditorShow || isListView ? 1 : 0.5,
                }}
              />
            </IconButton>
            <FormatButton isOpen={isOpenFormat} />
          </Box>
        </Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            inputRef={(input) => input && focus && input.focus()}
            onChange={onSearch}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={keyword || ""}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </Search>
      </Box>
    </Box>
  );
}

export default Header;
