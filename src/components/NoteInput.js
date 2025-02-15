import React, { useState } from "react";
import { TextField, Paper, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const NoteInput = ({ addNote }) => {
  const [note, setNote] = useState("");

  const handleAddNote = () => {
    if (note.trim()) {
      addNote(note);
      setNote("");
    }
  };

  return (
    <Paper sx={{ display: "flex", padding: 2, alignItems: "center", gap: 1 }}>
      <TextField
        fullWidth
        placeholder="Take a note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <IconButton onClick={handleAddNote}>
        <AddIcon />
      </IconButton>
    </Paper>
  );
};

export default NoteInput;
