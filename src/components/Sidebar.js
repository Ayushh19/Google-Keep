



import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Tooltip } from "@mui/material";
import {
  Lightbulb as LightbulbIcon,
  Notifications as NotificationsIcon,
  Edit as EditIcon,
  Archive as ArchiveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const menuItems = [
  { icon: LightbulbIcon, text: "Notes", path: "/dashboard" },
  { icon: NotificationsIcon, text: "Reminders", path: "/dashboard/reminders" },
  { icon: EditIcon, text: "Edit labels", path: "/dashboard/edit-labels" },
  { icon: ArchiveIcon, text: "Archive", path: "/dashboard/archive" },
  { icon: DeleteIcon, text: "Trash", path: "/dashboard/trash" },
];

function Sidebar() {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get current route
  const drawerWidth = hovered ? 280 : 72;

  return (
    <Drawer
      anchor="left"
      open={true}
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path; // ✅ Check if this item is active
            return (
              <ListItem
                key={item.text}
                sx={{
                  borderTopRightRadius: "50px",
                  borderBottomRightRadius: "50px",
                  borderTopLeftRadius: "50px",
                  borderBottomLeftRadius: "50px",
                  mr: 1,
                  backgroundColor: isActive ? "#feefc3" : "transparent", // ✅ Highlight active button
                  "&:hover": !isActive && { backgroundColor: "#D3D3D3" },
                  cursor: "pointer",
                  justifyContent: hovered ? "flex-start" : "center",
                  px: hovered ? 2 : 1,
                }}
                onClick={() => navigate(item.path)}
              >
                <Tooltip title={hovered ? "" : item.text} placement="right">
                  <ListItemIcon sx={{ minWidth: hovered ? 56 : "auto" }}>
                    <item.icon />
                  </ListItemIcon>
                </Tooltip>
                {hovered && <ListItemText primary={item.text} />}
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;