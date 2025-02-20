

import { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Tooltip } from "@mui/material";
import {
  Lightbulb as LightbulbIcon,
  Notifications as NotificationsIcon,
  Edit as EditIcon,
  Archive as ArchiveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const menuItems = [
  { icon: LightbulbIcon, text: "Notes" },
  { icon: NotificationsIcon, text: "Reminders" },
  { icon: EditIcon, text: "Edit labels" },
  { icon: ArchiveIcon, text: "Archive" },
  { icon: DeleteIcon, text: "Trash" },
];

function Sidebar() {
  const [hovered, setHovered] = useState(false);
  const drawerWidth = hovered ? 280 : 72; // Expand when hovered

  return (
    <Drawer
      anchor="left"
      open={true} // Always open, we just change width
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: "width 0.3s ease-in-out",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          top: "64px",
          height: "calc(100% - 64px)",
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
          borderRight: "none",
        },
      }}
      onMouseEnter={() => setHovered(true)} // Open on hover
      onMouseLeave={() => setHovered(false)} // Close when cursor leaves
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={item.text}
              sx={{
                borderTopRightRadius: "25px",
                borderBottomRightRadius: "25px",
                mr: 1,
                backgroundColor: index === 0 ? "#feefc3" : "transparent",
                "&:hover": index !== 0 && { backgroundColor: "#D3D3D3" },
                cursor: "pointer",
                justifyContent: hovered ? "flex-start" : "center",
                px: hovered ? 2 : 1,
              }}
            >
              <Tooltip title={hovered ? "" : item.text} placement="right">
                <ListItemIcon sx={{ minWidth: hovered ? 56 : "auto" }}>
                  <item.icon />
                </ListItemIcon>
              </Tooltip>
              {hovered && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
