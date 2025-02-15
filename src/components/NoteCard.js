import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const NoteCard = ({ note, deleteNote }) => {
  return (
    <Card sx={{ width: 250, margin: 2 }}>
      <CardContent>
        <Typography>{note}</Typography>
      </CardContent>
      <IconButton onClick={() => deleteNote(note)}>
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default NoteCard;
