


"use client"

import { useState } from "react"
import { Paper, Typography, IconButton, Box } from "@mui/material"
import PushPinIcon from '@mui/icons-material/PushPin';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PaletteIcon from "@mui/icons-material/Palette"
import ImageIcon from "@mui/icons-material/Image"
import ArchiveIcon from "@mui/icons-material/Archive"
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

const NotesThird = ({ title, content }) => {
  const [hovered, setHovered] = useState(false)

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
      {/* Top Icons (Show on Hover) */}
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

      {/* Content Area */}
      <Box sx={{ mt: hovered ? 4 : 0 }}>
        {/* Title */}
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

        {/* Content */}
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

      {/* Bottom Icons (Show on Hover) */}
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
          <IconButton size="small">
            <ArchiveIcon sx={{ fontSize: 18, color: "#5f6368" }} />
          </IconButton>
          <IconButton size="small">
            <DeleteIcon sx={{ fontSize: 18, color: "#5f6368" }} />
          </IconButton>
        </Box>
      )}
    </Paper>
  )
}

export default NotesThird

