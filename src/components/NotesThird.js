

"use client"

import { useState } from "react"
import { Paper, Typography, IconButton, Box, Popover } from "@mui/material"
import PushPinIcon from '@mui/icons-material/PushPin';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PaletteIcon from "@mui/icons-material/Palette"
import ImageIcon from "@mui/icons-material/Image"
import ArchiveIcon from "@mui/icons-material/Archive"
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
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
  { name: "Gray", value: "#e8eaed" }
]

const NotesThird = ({ title, content, id, isArchived = false, isTrashed = false, color = "#ffffff", onArchiveToggle, onTrashToggle, onDeleteForever, onColorChange }) => {
  const [hovered, setHovered] = useState(false)
  const [isArchiving, setIsArchiving] = useState(false)
  const [isTrashing, setIsTrashing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isChangingColor, setIsChangingColor] = useState(false)
  const [colorAnchorEl, setColorAnchorEl] = useState(null)

  const handleArchiveToggle = async () => {
    if (isArchiving) return
    
    setIsArchiving(true)
    
    try {
      const token = localStorage.getItem("token")
      
      onArchiveToggle(id, !isArchived)

      const response = await axios({
        method: "post",
        url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: {
          noteIdList: [id],
          isArchived: !isArchived
        }
      })

      if (!response.data?.status?.success) {
        onArchiveToggle(id, isArchived)
      }
    } catch (error) {
      console.error("Error toggling archive status:", error)
      onArchiveToggle(id, isArchived)
    } finally {
      setIsArchiving(false)
    }
  }

  const handleTrashToggle = async () => {
    if (isTrashing) return
    
    setIsTrashing(true)
    
    try {
      const token = localStorage.getItem("token")
      
      onTrashToggle(id, !isTrashed)

      const response = await axios({
        method: "post",
        url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: {
          noteIdList: [id],
          isDeleted: !isTrashed
        }
      })

      if (!response.data?.status?.success) {
        onTrashToggle(id, isTrashed)
      }
    } catch (error) {
      console.error("Error toggling trash status:", error)
      onTrashToggle(id, isTrashed)
    } finally {
      setIsTrashing(false)
    }
  }

  const handleDeleteForever = async () => {
    if (isDeleting) return
    
    setIsDeleting(true)
    
    try {
      const token = localStorage.getItem("token")
      
      onDeleteForever(id)

      const response = await axios({
        method: "post",
        url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: {
          noteIdList: [id]
        }
      })

      if (!response.data?.status?.success) {
        onDeleteForever(id, true) // Revert if failed
      }
    } catch (error) {
      console.error("Error deleting note forever:", error)
      onDeleteForever(id, true) // Revert if failed
    } finally {
      setIsDeleting(false)
    }
  }

  const handleColorClick = (event) => {
    setColorAnchorEl(event.currentTarget)
  }

  const handleColorClose = () => {
    setColorAnchorEl(null)
  }

  const handleColorChange = async (newColor) => {
    if (isChangingColor) return
    
    setIsChangingColor(true)
    handleColorClose()
    
    try {
      const token = localStorage.getItem("token")
      const oldColor = color
      
      onColorChange(id, newColor)

      const response = await axios({
        method: "post",
        url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: {
          noteIdList: [id],
          color: newColor
        }
      })

      if (!response.data?.status?.success) {
        onColorChange(id, oldColor)
      }
    } catch (error) {
      console.error("Error changing note color:", error)
      onColorChange(id, color)
    } finally {
      setIsChangingColor(false)
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: 200,
        height: "fit-content",
        margin: 2,
        padding: 2,
        borderRadius: 2,
        position: "relative",
        transition: "box-shadow 0.3s, background-color 0.3s",
        "&:hover": { boxShadow: 6 },
        overflow: "visible",
        backgroundColor: color,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <>
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              padding: 0,
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 20, color: "#5f6368" }} />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              padding: 0,
            }}
          >
            <PushPinIcon sx={{ fontSize: 20, color: "#5f6368" }} />
          </IconButton>
        </>
      )}

      <Box sx={{ mt: hovered ? 4 : 0 }}>
        <Typography
          variant="subtitle1"
          sx={{
            wordWrap: "break-word",
            mb: 1,
            fontWeight: "normal",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            marginBottom: hovered ? 5 : 0,
          }}
        >
          {content}
        </Typography>
      </Box>

      {hovered && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            position: "absolute",
            bottom: 8,
            left: 8,
            right: 8,
            gap: 0.5,
          }}
        >
          {!isTrashed && (
            <>
              <IconButton size="small">
                <NotificationsNoneIcon sx={{ fontSize: 18, color: "#5f6368" }} />
              </IconButton>
              <IconButton size="small">
                <PersonAddIcon sx={{ fontSize: 18, color: "#5f6368" }} />
              </IconButton>
              <IconButton 
                size="small"
                onClick={handleColorClick}
                disabled={isChangingColor}
              >
                <PaletteIcon sx={{ fontSize: 18, color: isChangingColor ? "#bdbdbd" : "#5f6368" }} />
              </IconButton>
              <IconButton size="small">
                <ImageIcon sx={{ fontSize: 18, color: "#5f6368" }} />
              </IconButton>
              <IconButton 
                size="small" 
                onClick={handleArchiveToggle}
                disabled={isArchiving}
              >
                {isArchived ? (
                  <UnarchiveIcon sx={{ fontSize: 18, color: isArchiving ? "#bdbdbd" : "#5f6368" }} />
                ) : (
                  <ArchiveIcon sx={{ fontSize: 18, color: isArchiving ? "#bdbdbd" : "#5f6368" }} />
                )}
              </IconButton>
            </>
          )}
          <IconButton 
            size="small"
            onClick={handleTrashToggle}
            disabled={isTrashing}
          >
            {isTrashed ? (
              <RestoreFromTrashIcon sx={{ fontSize: 18, color: isTrashing ? "#bdbdbd" : "#5f6368" }} />
            ) : (
              <DeleteIcon sx={{ fontSize: 18, color: isTrashing ? "#bdbdbd" : "#5f6368" }} />
            )}
          </IconButton>
          {isTrashed && (
            <IconButton 
              size="small"
              onClick={handleDeleteForever}
              disabled={isDeleting}
              sx={{ color: "#d32f2f" }}
            >
              <DeleteForeverIcon sx={{ fontSize: 18, color: isDeleting ? "#bdbdbd" : "inherit" }} />
            </IconButton>
          )}
        </Box>
      )}

      <Popover
        open={Boolean(colorAnchorEl)}
        anchorEl={colorAnchorEl}
        onClose={handleColorClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ 
          p: 1, 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 0.5, 
          maxWidth: '220px' 
        }}>
          {COLORS.map((colorOption) => (
            <IconButton
              key={colorOption.name}
              onClick={() => handleColorChange(colorOption.value)}
              sx={{
                width: 32,
                height: 32,
                backgroundColor: colorOption.value,
                border: color === colorOption.value ? '2px solid #000' : '1px solid #e0e0e0',
                '&:hover': {
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
  )
}

export default NotesThird;
