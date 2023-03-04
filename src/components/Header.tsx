import { shades } from "../theme";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import GridViewIcon from "@mui/icons-material/GridView";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { NoteContext } from "../context";
import { NoteContextType, INote } from "../types/notes";
import { useContext, useState } from "react";

function Header() {
  const [focus, setFocus] = useState<boolean>(false);

  const {
    activeNoteId,
    keyword,
    createNote,
    getActive,
    removeNote,
    searchKeyword,
  } = useContext(NoteContext) as NoteContextType;

  const addNewNote = () => {
    createNote();
  };

  const removeCurrentNote = () => {
    console.log("activeNoteId", activeNoteId);
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

  return (
    <Box
      sx={{
        width: "100%",
        height: 50,
        margin: "0px",
        display: "flex",
        borderRadius: "0 10px 0px 0",
        "&:hover": {
          borderBottom: `1px solid ${shades.secondary[400]}`,
        },
      }}
    >
      <Box
        sx={{
          width: "23%",
          margin: "0px",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "secondary.dark",
          borderRight: `1px solid ${shades.secondary[600]}`,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <IconButton>
            <ListIcon
              fontSize="large"
              sx={{
                margin: "0px 4px",
                color: `${shades.primary[100]}`,
              }}
            />
          </IconButton>
          <IconButton //onClick={() => dispatch(setIsCartOpen({}))}
          >
            <GridViewIcon
              sx={{
                margin: "0px 4px",
                color: `${shades.primary[100]}`,
              }}
            />
          </IconButton>
        </Box>
        <IconButton onClick={removeCurrentNote}>
          <DeleteOutlineIcon
            fontSize="large"
            sx={{
              margin: "0px 4px",
              color: `${shades.primary[100]}`,
              //   "&:hover": {
              //     borderRadius:2,
              //     backgroundColor: "secondary.main",
              //     opacity: [0.9, 0.8, 0.7],
              //  },
            }}
          />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: "77%",
          borderRadius: "0 10px 0 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <IconButton onClick={addNewNote}>
            <BorderColorIcon
              fontSize="medium"
              sx={{
                margin: "2px 5px 0",
                color: `${shades.primary[100]}`,
              }}
            />
          </IconButton>
          <IconButton
            sx={{ marginLeft: 5 }}
            //onClick={() => dispatch(setIsCartOpen({}))}
          >
            <TextFormatIcon
              fontSize="large"
              sx={{
                paddingTop: "5px",
                color: `${shades.primary[100]}`,
              }}
            />
          </IconButton>
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
