import React, { useState } from "react";
import { Paper, Typography, IconButton, Box } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaletteIcon from "@mui/icons-material/Palette";
import ImageIcon from "@mui/icons-material/Image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const NotesThird = ({ title, content }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Paper
      elevation={3}
      sx={{
        marginTop: 10,
        marginLeft: 40,
        padding: 3.4,
        borderRadius: 2,
        maxWidth: 250,
        transition: "0.3s",
        position: "relative",
        "&:hover": { boxShadow: 6 },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Check Circle Icon (Appears on Hover) */}
      {hovered && (
        <IconButton
          sx={{ position: "absolute", top: 5, left: 5 }}
          size="small"
        >
          <CheckCircleIcon />
        </IconButton>
      )}

      {/* Title */}
      <Typography variant="subtitle1" fontWeight="bold">
        {title}
      </Typography>

      {/* Content */}
      <Typography variant="body2" color="textSecondary">
        {content}
      </Typography>

      {/* Icons (Appear on Hover) */}
      {hovered && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 1,
          }}
        >
          <Box>
            <IconButton size="small">
              <NotificationsNoneIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <PersonAddIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <PaletteIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <ImageIcon fontSize="small" />
            </IconButton>
          </Box>
          <IconButton size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
};

export default NotesThird;
