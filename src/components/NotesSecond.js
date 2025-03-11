


"use client"

import { useState } from "react"
import { TextField, Paper, IconButton, Box, Button, Popover } from "@mui/material"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PaletteIcon from "@mui/icons-material/Palette"
import ImageIcon from "@mui/icons-material/Image"
import ArchiveIcon from "@mui/icons-material/Archive"
import UnarchiveIcon from "@mui/icons-material/Unarchive"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import UndoIcon from "@mui/icons-material/Undo"
import RedoIcon from "@mui/icons-material/Redo"
import PushPinIcon from "@mui/icons-material/PushPin"
import axios from "axios"

const COLORS = [
  { name: "Default", value: "#ffffff" },
  { name: "Red", value: "#f28b82" },
  { name: "Orange", value: "#fbbc04" },
  { name: "Yellow", value: "#fff475" },
  { name: "Green", value: "#ccff90" },
  { name: "Teal", value: "#a7ffeb" },
  { name: "Blue", value: "#cbf0f8" },
  { name: "Purple", value: "#d7aefb" },
  { name: "Pink", value: "#fdcfe8" },
  { name: "Brown", value: "#e6c9a8" },
  { name: "Gray", value: "#e8eaed" },
]

const Notes2 = ({ addNote, setExpanded, editNote = null, onEdit = null, backgroundColor = "#ffffff" }) => {
  const [title, setTitle] = useState(editNote ? editNote.title : "")
  const [note, setNote] = useState(editNote ? editNote.note : "")
  const [isPinned, setIsPinned] = useState(editNote ? editNote.isPinned : false)
  const [isArchived, setIsArchived] = useState(editNote?.isArchived || false)
  const [color, setColor] = useState(backgroundColor)
  const [colorAnchorEl, setColorAnchorEl] = useState(null)
  const [isChangingColor, setIsChangingColor] = useState(false)
  const [isArchiving, setIsArchiving] = useState(false)

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

  const handleColorClick = (event) => {
    event.stopPropagation()
    setColorAnchorEl(event.currentTarget)
  }

  const handleColorClose = () => {
    setColorAnchorEl(null)
  }

  const handleColorChange = async (newColor, event) => {
    if (event) event.stopPropagation()
    if (isChangingColor || !editNote) return

    setIsChangingColor(true)
    handleColorClose()
    setColor(newColor)

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        "https://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",
        {
          noteIdList: [editNote.id],
          color: newColor,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        },
      )

      if (!response.data?.status?.success) {
        // setColor(backgroundColor)
      }
    } catch (error) {
      console.error("Error changing note color:", error)
      // setColor(backgroundColor)
    } finally {
      setIsChangingColor(false)
    }
  }

  const handleArchiveToggle = async (event) => {
    event.stopPropagation()
    if (isArchiving || !editNote) return

    setIsArchiving(true)
    const newArchiveState = !isArchived
    setIsArchived(newArchiveState)

    try {
      const token = localStorage.getItem("token")
      const response = await axios({
        method: "post",
        url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: {
          noteIdList: [editNote.id],
          isArchived: newArchiveState,
        },
      })

      if (!response.data?.status?.success) {
        // setIsArchived(!newArchiveState)
      } else {
        handleClose()
      }
    } catch (error) {
      console.error("Error toggling archive status:", error)
      // setIsArchived(!newArchiveState)
    } finally {
      setIsArchiving(false)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: { xs: "20px", sm: "40px", md: "80px" },
        marginLeft: { xs: "16px", sm: "100px", md: "250px" },
        marginRight: { xs: "16px", sm: "16px", md: 0 },
        width: { xs: "calc(100% - 32px)", sm: "calc(100% - 120px)", md: "calc(100% - 250px)" },
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "12px 16px",
          width: { xs: "100%", sm: "80%", md: "600px" },
          maxWidth: "600px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          backgroundColor: color,
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap" },
            gap: { xs: 1, sm: 1, md: 0 },
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            <IconButton>
              <NotificationsNoneIcon sx={{ color: "#5f6368" }} />
            </IconButton>
            <IconButton>
              <PersonAddIcon sx={{ color: "#5f6368" }} />
            </IconButton>
            <IconButton onClick={handleColorClick} disabled={isChangingColor}>
              <PaletteIcon sx={{ color: isChangingColor ? "#bdbdbd" : "#5f6368" }} />
            </IconButton>
            <IconButton>
              <ImageIcon sx={{ color: "#5f6368" }} />
            </IconButton>
            <IconButton onClick={handleArchiveToggle} disabled={isArchiving}>
              {isArchived ? (
                <UnarchiveIcon sx={{ color: isArchiving ? "#bdbdbd" : "#5f6368" }} />
              ) : (
                <ArchiveIcon sx={{ color: isArchiving ? "#bdbdbd" : "#5f6368" }} />
              )}
            </IconButton>
            <IconButton>
              <MoreVertIcon sx={{ color: "#5f6368" }} />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton disabled>
              <UndoIcon sx={{ color: "#bdbdbd" }} />
            </IconButton>
            <IconButton disabled>
              <RedoIcon sx={{ color: "#bdbdbd" }} />
            </IconButton>
            <Button onClick={handleClose} sx={{ color: "#5f6368", fontSize: "14px" }}>
              {editNote ? "Save" : "Close"}
            </Button>
          </Box>
        </Box>

        <Popover
          open={Boolean(colorAnchorEl)}
          anchorEl={colorAnchorEl}
          onClose={handleColorClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Box
            sx={{
              p: 1,
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              maxWidth: "220px",
            }}
          >
            {COLORS.map((colorOption) => (
              <IconButton
                key={colorOption.name}
                onClick={(e) => handleColorChange(colorOption.value, e)}
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: colorOption.value,
                  border: color === colorOption.value ? "2px solid #000" : "1px solid #e0e0e0",
                  "&:hover": {
                    backgroundColor: colorOption.value,
                    opacity: 0.8,
                  },
                }}
                title={colorOption.name}
              />
            ))}
          </Box>
        </Popover>
      </Paper>
    </Box>
  )
}

export default Notes2;



