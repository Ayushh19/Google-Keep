

"use client"

import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import NotesThird from "./NotesThird"
import axios from "axios"

const Trash = () => {
  const [trashedNotes, setTrashedNotes] = useState([])

  useEffect(() => {
    fetchTrashedNotes()
  }, [])

  const fetchTrashedNotes = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("https://fundoonotes.incubation.bridgelabz.com/api/notes/getTrashNotesList", {
        headers: {
          Authorization: token,
        },
      })
      if (response.data?.data?.data) {
        const trashed = response.data.data.data.filter(note => note.isDeleted)
        setTrashedNotes(trashed)
      }
    } catch (error) {
      console.error("Error fetching trashed notes:", error)
    }
  }

  const handleTrashToggle = (noteId, isTrashed) => {
    if (!isTrashed) {
      setTrashedNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
    } else {
      fetchTrashedNotes()
    }
  }

  const handleDeleteForever = (noteId, revert = false) => {
    if (revert) {
      fetchTrashedNotes() // Refresh the list if operation failed
    } else {
      setTrashedNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
    }
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", marginLeft: "250px", marginTop: "62px" }}>
      {trashedNotes.map((note) => (
        <NotesThird 
          key={note.id} 
          id={note.id}
          title={note.title} 
          content={note.description} 
          isArchived={false}
          isTrashed={true}
          onTrashToggle={handleTrashToggle}
          onArchiveToggle={() => {}}
          onDeleteForever={handleDeleteForever}
        />
      ))}
    </Box>
  )
}

export default Trash;