import Box from "@mui/material/Box";
import Header from "./Header";
import NoteEditor from "./NoteEditor/NoteEditor";
import NoteList from "./NoteList/NoteList";

function Main() {
  return (
    <Box
      sx={{
        width: "80%",
        height: "80%",
        //minHeight: 350,
        margin: "50px auto",
        //padding: "100px",
        borderRadius: "0 10px 10px 0",
        backgroundColor: "primary.dark",
        // "&:hover": {
        //   backgroundColor: "primary.main",
        //   opacity: [0.9, 0.8, 0.7],
        // },
      }}
    >
      <Header/>
      <Box
    sx={{
        width: "100%",
        height: "100%",
        margin: "0px",
        display:"flex",
         "&:hover": {
        //    borderBottom: `1px solid ${shades.secondary[400]}`,
        //   backgroundColor: "secondary.main",
        //   opacity: [0.9, 0.8, 0.7],
         },
      }}
    >
       <NoteList/>
      <NoteEditor/>
    </Box>
     
    </Box>
  );
}

export default Main;
