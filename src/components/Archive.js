

"use client"

import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import NotesThird from "./NotesThird"
import axios from "axios"

const Archive = () => {
  const [archivedNotes, setArchivedNotes] = useState([])

  useEffect(() => {
    fetchArchivedNotes()
  }, [])

  const fetchArchivedNotes = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("https://fundoonotes.incubation.bridgelabz.com/api/notes/getArchiveNotesList", {
        headers: {
          Authorization: token,
        },
      })
      if (response.data?.data?.data) {
        const archived = response.data.data.data.filter(note => note.isArchived)
        setArchivedNotes(archived)
      }
    } catch (error) {
      console.error("Error fetching archived notes:", error)
    }
  }

  const handleArchiveToggle = (noteId, isArchived) => {
    if (!isArchived) {
      setArchivedNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
    } else {
      fetchArchivedNotes()
    }
  }

  const handleColorChange = (noteId, newColor) => {
    setArchivedNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === noteId ? { ...note, color: newColor } : note
      )
    )
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", marginLeft: "250px", marginTop: "62px" }}>
      {archivedNotes.map((note) => (
        <NotesThird 
          key={note.id} 
          id={note.id}
          title={note.title} 
          content={note.description} 
          color={note.color}
          isArchived={true}
          isTrashed={false}
          onArchiveToggle={handleArchiveToggle}
          onTrashToggle={() => {}}
          onColorChange={handleColorChange}
        />
      ))}
    </Box>
  )
}

export default Archive;

