


"use client"

import { useState } from "react"
import { TextField, Paper, IconButton, Box, Button } from "@mui/material"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PaletteIcon from "@mui/icons-material/Palette"
import ImageIcon from "@mui/icons-material/Image"
import ArchiveIcon from "@mui/icons-material/Archive"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import UndoIcon from "@mui/icons-material/Undo"
import RedoIcon from "@mui/icons-material/Redo"
import PushPinIcon from "@mui/icons-material/PushPin"

const Notes2 = ({ addNote, setExpanded, editNote = null, onEdit = null, backgroundColor = "#ffffff" }) => {
  const [title, setTitle] = useState(editNote ? editNote.title : "")
  const [note, setNote] = useState(editNote ? editNote.note : "")
  const [isPinned, setIsPinned] = useState(editNote ? editNote.isPinned : false)

  const handleClose = async () => {
    if (title.trim() || note.trim()) {
      try {
        if (editNote) {
          await onEdit({
            id: editNote.id,
            title: title.trim(),
            note: note.trim(),
            isPinned,
          })
        } else {
          await addNote({
            title: title.trim(),
            note: note.trim(),
            isPinned,
          })
        }
        setTitle("")
        setNote("")
        setIsPinned(false)
      } catch (error) {
        console.error("Error in handleClose:", error)
      }
    }
    setExpanded(false)
  }

  return (
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
          flexDirection: "column",
          padding: "12px 16px",
          width: "600px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          backgroundColor: backgroundColor,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Title"
            InputProps={{ disableUnderline: true }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ fontSize: "18px", fontWeight: "bold" }}
          />
          <IconButton onClick={() => setIsPinned(!isPinned)}>
            <PushPinIcon sx={{ color: isPinned ? "#4285f4" : "#5f6368" }} />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          multiline
          variant="standard"
          placeholder="Take a note..."
          InputProps={{ disableUnderline: true }}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          sx={{
            fontSize: "16px",
            marginTop: "8px",
            "&::placeholder": { fontSize: "16px", color: "#757575" },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Box>
            <IconButton>
              <NotificationsNoneIcon sx={{ color: "#5f6368" }} />
            </IconButton>
            <IconButton>
              <PersonAddIcon sx={{ color: "#5f6368" }} />
            </IconButton>
            <IconButton>
              <PaletteIcon sx={{ color: "#5f6368" }} />
            </IconButton>
            <IconButton>
              <ImageIcon sx={{ color: "#5f6368" }} />
            </IconButton>
            <IconButton>
              <ArchiveIcon sx={{ color: "#5f6368" }} />
            </IconButton>
            <IconButton>
              <MoreVertIcon sx={{ color: "#5f6368" }} />
            </IconButton>
          </Box>

          <Box>
            <IconButton disabled>
              <UndoIcon sx={{ color: "#bdbdbd" }} />
            </IconButton>
            <IconButton disabled>
              <RedoIcon sx={{ color: "#bdbdbd" }} />
            </IconButton>
          </Box>

          <Button onClick={handleClose} sx={{ color: "#5f6368", fontSize: "14px" }}>
            {editNote ? "Save" : "Close"}
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default Notes2

