import React from "react";
import { Box } from "@mui/material";
import NoteCard from "./NoteCard";

const NotesGrid = ({ notes, deleteNote }) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "none", padding: 2 }}>
      {notes.map((note, index) => (
        <NoteCard key={index} note={note} deleteNote={deleteNote} />
      ))}
    </Box>
  );
};

export default NotesGrid;