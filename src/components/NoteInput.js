
"use client";

import { useState, useEffect } from "react";
import { TextField, Paper, IconButton, Box } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BrushIcon from "@mui/icons-material/Brush";
import ImageIcon from "@mui/icons-material/Image";
import Notes2 from "./NotesSecond";
import NotesThird from "./NotesThird";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const NoteInput = () => {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState([]);
  const [labels, setLabels] = useState([]);
  const { isListView, searchQuery } = useOutletContext();

  useEffect(() => {
    fetchNotes();
    fetchLabels();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList", {
        headers: {
          Authorization: token,
        },
      });
      if (response.data?.data?.data) {
        const activeNotes = response.data.data.data.filter((note) => !note.isArchived && !note.isDeleted);
        setNotes(activeNotes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const fetchLabels = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://fundoonotes.incubation.bridgelabz.com/api/noteLabels/getNoteLabelList",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data?.data?.details) {
        setLabels(response.data.data.details);
      }
    } catch (error) {
      console.error("Error fetching labels:", error);
    }
  };

  const addNote = async (newNote) => {
    try {
      const token = localStorage.getItem("token");

      const noteData = {
        title: newNote.title,
        description: newNote.note,
        isPined: newNote.isPinned,
        isArchived: false,
        color: "",
      };

      const response = await axios({
        method: "post",
        url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: noteData,
      });

      if (response.data?.status?.success) {
        await fetchNotes();
      }
    } catch (error) {
      console.error("Error adding note:", error?.response?.data || error.message);
    }
  };

  const handleArchiveToggle = (noteId, isArchived) => {
    if (isArchived) {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } else {
      fetchNotes();
    }
  };

  const handleTrashToggle = (noteId, isTrashed) => {
    if (isTrashed) {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } else {
      fetchNotes();
    }
  };

  const handleDeleteForever = (noteId, revert = false) => {
    if (!revert) {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } else {
      fetchNotes();
    }
  };

  const handleColorChange = (noteId, newColor) => {
    setNotes((prevNotes) => prevNotes.map((note) => (note.id === noteId ? { ...note, color: newColor } : note)));
  };
  
  

  const handleLabelChange = (noteId, newLabels) => {
    setNotes((prevNotes) => 
      prevNotes.map((note) => 
        note.id === noteId 
          ? { ...note, noteLabels: newLabels } 
          : note
      )
    );
  };

  const handleEditNote = async (noteId, editedTitle, editedContent) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, title: editedTitle, description: editedContent } : note
      )
    );

    try {
      const token = localStorage.getItem("token");
      await axios({
        method: "post",
        url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: {
          noteId: noteId,
          title: editedTitle,
          description: editedContent,
        },
      });
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>{part}</span>
      ) : (
        part
      )
    );
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {expanded ? (
        <Notes2 addNote={addNote} setExpanded={setExpanded} />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "80px",
            marginLeft: "180px",
            width: "calc(100% - 250px)",
          }}
        >
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "2px 16px",
              width: "600px",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              cursor: "pointer",
            }}
            onClick={() => setExpanded(true)}
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder="Take a note..."
              InputProps={{ disableUnderline: true }}
              sx={{
                fontSize: "16px",
                "&::placeholder": {
                  fontSize: "16px",
                  color: "#757575",
                },
              }}
            />
            <IconButton>
              <CheckBoxIcon sx={{ color: "#5f6368" }} />
            </IconButton>
            <IconButton>
              <BrushIcon sx={{ color: "#5f6368" }} />
            </IconButton>
            <IconButton>
              <ImageIcon sx={{ color: "#5f6368" }} />
            </IconButton>
          </Paper>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: isListView ? "nowrap" : "wrap",
          flexDirection: isListView ? "column" : "row",
          alignItems: isListView ? "center" : "flex-start",
          marginLeft: isListView ? "180px" : "250px",
          marginTop: "20px",
          width: isListView ? "1230px" : "calc(100% - 250px)",
        }}
      >
        {filteredNotes.map((note) => (
          <NotesThird
            key={note.id}
            id={note.id}
            title={highlightText(note.title, searchQuery)}
            content={note.description}
            color={note.color}
            noteLabels={note.noteLabels || []}
            isArchived={false}
            isTrashed={false}
            onArchiveToggle={handleArchiveToggle}
            onTrashToggle={handleTrashToggle}
            onDeleteForever={handleDeleteForever}
            onColorChange={handleColorChange}
            onLabelChange={handleLabelChange}
            onEdit={handleEditNote}
            fetchNotes={fetchNotes}
            availableLabels={labels}
            sx={{
              width: isListView ? "580px" : "200px",
              margin: isListView ? "8px 0" : "8px",
            }}
          />
        ))}
      </Box>
    </>
  );
};

export default NoteInput;