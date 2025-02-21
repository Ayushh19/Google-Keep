

"use client"

import { useState, useEffect } from "react"
import { TextField, Paper, IconButton, Box } from "@mui/material"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import BrushIcon from "@mui/icons-material/Brush"
import ImageIcon from "@mui/icons-material/Image"
import Notes2 from "./NotesSecond"
import NotesThird from "./NotesThird"
import axios from "axios"

const NoteInput = () => {
  const [expanded, setExpanded] = useState(false)
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("https://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList", {
        headers: {
          Authorization: token,
        },
      })
      if (response.data?.data?.data) {
        setNotes(response.data.data.data)
      }
    } catch (error) {
      console.error("Error fetching notes:", error)
    }
  }

  const addNote = async (newNote) => {
    try {
      const token = localStorage.getItem("token")

      // Create note data object
      const noteData = {
        title: newNote.title,
        description: newNote.note,
        isPined: newNote.isPinned,
        isArchived: false,
        color: "",
      }

      const response = await axios({
        method: "post",
        url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: noteData,
      })

      if (response.data?.status?.success) {
        await fetchNotes()
      }
    } catch (error) {
      console.error("Error adding note:", error?.response?.data || error.message)
    }
  }

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
            marginLeft: "250px",
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

      <Box sx={{ display: "flex", flexWrap: "wrap", marginLeft: "250px", marginTop: "20px" }}>
        {notes.map((note) => (
          <NotesThird key={note.id} title={note.title} content={note.description} />
        ))}
      </Box>
    </>
  )
}

export default NoteInput;

