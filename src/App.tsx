import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Main from './components/Main'; 
import { theme } from "./theme";
import { NoteProvider } from './context';

function App() {
  const [isOpenNote, setIsOpenNote] = useState(false);
  return (
    <NoteProvider>
    <ThemeProvider theme={theme}>
        <Main />
    
    </ThemeProvider>
    </NoteProvider>   
  );
}

export default App;
