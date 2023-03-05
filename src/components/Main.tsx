import Box from "@mui/material/Box";
import Header from "./Header/Header";
import NoteEditor from "./NoteEditor/NoteEditor";
import NoteList from "./NoteList/NoteList";
import { NoteContext } from "../context";
import { NoteContextType, INote } from "../types/notes";
import { useContext } from "react";
import { shades } from "../theme";

function Main() {
  const { isOpenFormat, setIsOpenFormat } = useContext(
    NoteContext
  ) as NoteContextType;
  return (
    <Box
      onClick={() => (isOpenFormat ? setIsOpenFormat(false) : null)}
      sx={{
        width: "80%",
        height: "80%",
        margin: "50px auto",
        color: `${shades.primary[100]}`,
        borderRadius: "0 10px 10px 0",
      }}
    > 
      <Header/>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          margin: "0px",
          display: "flex",
        }}
      >
        <NoteList />
        <NoteEditor />
      </Box>
    </Box>
  );
}

export default Main;
