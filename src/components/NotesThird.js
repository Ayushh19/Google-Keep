

"use client"

import { useState } from "react"
import { Paper, Typography, IconButton, Box } from "@mui/material"
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
import { Tooltip } from "@mui/material";
import axios from "axios"

const NotesThird = ({ title, content, id, isArchived = false, isTrashed = false, onArchiveToggle, onTrashToggle, onDeleteForever }) => {
  const [hovered, setHovered] = useState(false)
  const [isArchiving, setIsArchiving] = useState(false)
  const [isTrashing, setIsTrashing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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
        transition: "box-shadow 0.3s",
        "&:hover": { boxShadow: 6 },
        overflow: "visible",
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
              <IconButton size="small">
                <PaletteIcon sx={{ fontSize: 18, color: "#5f6368" }} />
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
          <Tooltip title="Restore" arrow>
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
          </Tooltip>
          {isTrashed && (
            <Tooltip title="Delete forever" arrow>
            <IconButton 
              size="small"
              onClick={handleDeleteForever}
              disabled={isDeleting}
              sx={{ color: isDeleting ? "#bdbdbd" : "#5f6368" }}
            >
              <DeleteForeverIcon sx={{ fontSize: 18, color: isDeleting ? "#bdbdbd" : "inherit" }} />
            </IconButton>
            </Tooltip>
          )}
        </Box>
      )}
    </Paper>
  )
}

export default NotesThird;