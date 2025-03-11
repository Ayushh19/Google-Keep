


"use client"

import { useState, useEffect } from "react"
import {
  Paper,
  Typography,
  IconButton,
  Box,
  Popover,
  Modal,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Tooltip,
} from "@mui/material"
import PushPinIcon from "@mui/icons-material/PushPin"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PaletteIcon from "@mui/icons-material/Palette"
import ImageIcon from "@mui/icons-material/Image"
import ArchiveIcon from "@mui/icons-material/Archive"
import UnarchiveIcon from "@mui/icons-material/Unarchive"
import DeleteIcon from "@mui/icons-material/Delete"
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import LabelIcon from "@mui/icons-material/Label"
import CloseIcon from "@mui/icons-material/Close"
import axios from "axios"
import Notes2 from "./NotesSecond"
import ReminderDialog from "./ReminderDialog"
import { useOutletContext } from "react-router-dom"

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

const NotesThird = ({
  title,
  content,
  id,
  isArchived = false,
  isTrashed = false,
  color = "#ffffff",
  noteLabels = [],
  reminder = null,
  onArchiveToggle,
  onTrashToggle,
  onDeleteForever,
  onColorChange,
  onEdit,
  onLabelChange,
  fetchNotes,
  availableLabels = [],
}) => {
  const [hovered, setHovered] = useState(false)
  const [isArchiving, setIsArchiving] = useState(false)
  const [isTrashing, setIsTrashing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isChangingColor, setIsChangingColor] = useState(false)
  const [isChangingLabels, setIsChangingLabels] = useState(false)
  const [colorAnchorEl, setColorAnchorEl] = useState(null)
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLabelDialogOpen, setIsLabelDialogOpen] = useState(false)
  const [selectedLabels, setSelectedLabels] = useState(noteLabels || [])
  const [newLabelText, setNewLabelText] = useState("")
  const [isAddingLabel, setIsAddingLabel] = useState(false)
  const [isRemovingLabel, setIsRemovingLabel] = useState(false)
  const [hasReminder, setHasReminder] = useState(Boolean(reminder))
  const [isTogglingReminder, setIsTogglingReminder] = useState(false)
  const { isListView } = useOutletContext()
  const [localColor, setLocalColor] = useState(color)
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false)

  useEffect(() => {
    setHasReminder(Boolean(reminder))
  }, [reminder])

  if (color !== localColor) {
    setLocalColor(color)
  }

  const handleAddLabel = async () => {
    if (!newLabelText.trim()) return

    setIsAddingLabel(true)
    try {
      const token = localStorage.getItem("token")
      const response = await axios({
        method: "post",
        url: "https://fundoonotes.incubation.bridgelabz.com/api/noteLabels",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: {
          label: newLabelText,
          isDeleted: false,
          userId: localStorage.getItem("userId"),
        },
      })

      if (response.data?.status?.success) {
        setNewLabelText("")

        const labelsResponse = await axios.get(
          "https://fundoonotes.incubation.bridgelabz.com/api/noteLabels/getNoteLabelList",
          {
            headers: {
              Authorization: token,
            },
          },
        )

        if (labelsResponse.data?.data?.details) {
          const newLabel = labelsResponse.data.data.details.find((label) => label.label === newLabelText.trim())

          if (newLabel) {
            setSelectedLabels((prev) => [...prev, newLabel])
          }
        }

        fetchNotes()
      }
    } catch (error) {
      console.error("Error adding label:", error)
    } finally {
      setIsAddingLabel(false)
    }
  }

  const handleRemoveLabel = async (labelId, event) => {
    if (event) {
      event.stopPropagation()
    }

    if (isRemovingLabel) return
    setIsRemovingLabel(true)

    const updatedLabels = selectedLabels.filter((label) => label.id !== labelId)
    setSelectedLabels(updatedLabels)
    onLabelChange(id, updatedLabels)

    try {
      const token = localStorage.getItem("token")

      const response = await axios({
        method: "post",
        url: `https://fundoonotes.incubation.bridgelabz.com/api/notes/${id}/addLabelToNotes/${labelId}/remove`,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })

      if (!response.data?.status?.success) {
        // setSelectedLabels(selectedLabels)
        // onLabelChange(id, selectedLabels)
      }
    } catch (error) {
      console.error("Error removing label:", error)
      setSelectedLabels(selectedLabels)
      onLabelChange(id, selectedLabels)
    } finally {
      setIsRemovingLabel(false)
    }
  }

  const handleLabelToggle = (labelId) => {
    const currentIndex = selectedLabels.findIndex((label) => label.id === labelId)
    const newSelectedLabels = [...selectedLabels]

    if (currentIndex === -1) {
      const labelToAdd = availableLabels.find((label) => label.id === labelId)
      if (labelToAdd) {
        newSelectedLabels.push(labelToAdd)
      }
    } else {
      newSelectedLabels.splice(currentIndex, 1)
    }

    setSelectedLabels(newSelectedLabels)
  }

  const handleSaveLabels = async (event) => {
    if (event) {
      event.stopPropagation()
    }

    if (isChangingLabels) return
    setIsChangingLabels(true)

    try {
      const token = localStorage.getItem("token")

      for (const label of selectedLabels) {
        await axios({
          method: "post",
          url: `https://fundoonotes.incubation.bridgelabz.com/api/notes/${id}/addLabelToNotes/${label.id}/add`,
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        })
      }

      onLabelChange(id, selectedLabels)

      await fetchNotes()
    } catch (error) {
      console.error("Error changing note labels:", error)
      setSelectedLabels(noteLabels || [])
    } finally {
      setIsChangingLabels(false)
      handleLabelDialogClose()
    }
  }

  const handleLabelDialogClose = (event) => {
    if (event) {
      event.stopPropagation()
    }
    setIsLabelDialogOpen(false)
  }

  const handleArchiveToggle = async (event) => {
    event.stopPropagation()
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
          isArchived: !isArchived,
        },
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

  const handleTrashToggle = async (event) => {
    event.stopPropagation()
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
          isDeleted: !isTrashed,
        },
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

  const handleDeleteForever = async (event) => {
    event.stopPropagation()
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
          noteIdList: [id],
        },
      })

      if (!response.data?.status?.success) {
        onDeleteForever(id, true)
      }
    } catch (error) {
      console.error("Error deleting note forever:", error)
      onDeleteForever(id, true)
    } finally {
      setIsDeleting(false)
    }
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
    if (isChangingColor) return

    setIsChangingColor(true)
    handleColorClose()

    setLocalColor(newColor)
    onColorChange(id, newColor)

    try {
      const token = localStorage.getItem("token")

      const response = await axios.post(
        "https://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",
        {
          noteIdList: [id],
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
        // setLocalColor(color);
        // onColorChange(id, color);
      }
    } catch (error) {
      console.error("Error changing note color:", error)
      setLocalColor(color)
      onColorChange(id, color)
    } finally {
      setIsChangingColor(false)
    }
  }

  const handleMoreMenuOpen = (event) => {
    event.stopPropagation()
    setMoreMenuAnchorEl(event.currentTarget)
  }

  const handleMoreMenuClose = (event) => {
    if (event) {
      event.stopPropagation()
    }
    setMoreMenuAnchorEl(null)
  }

  const handleLabelDialogOpen = (event) => {
    if (event) {
      event.stopPropagation()
    }
    handleMoreMenuClose(event)
    setSelectedLabels(noteLabels || [])
    setIsLabelDialogOpen(true)
  }

  const handleEditClose = () => {
    setIsEditModalOpen(false)
  }

  const handleEditClick = (event) => {
    if (!event.target.closest('[data-action-button="true"]')) {
      setIsEditModalOpen(true)
    }
  }

  const handleEditSave = async (editedNote) => {
    try {
      // Update the note content
      await onEdit(id, editedNote.title, editedNote.note)

      // Update color if changed
      if (editedNote.color && editedNote.color !== localColor) {
        setLocalColor(editedNote.color)
        onColorChange(id, editedNote.color)
      }

      // Update archive status if changed
      if (editedNote.isArchived !== isArchived) {
        onArchiveToggle(id, editedNote.isArchived)
      }

      handleEditClose()

      // Refresh notes to get the latest data
      await fetchNotes()
    } catch (error) {
      console.error("Error updating note:", error)
    }
  }

  const handleActionClick = (event) => {
    event.stopPropagation()
  }

  const handleAddReminder = async (date, event) => {
    if (event) {
      event.stopPropagation()
    }
    if (isTogglingReminder) return

    setIsTogglingReminder(true)
    setHasReminder(true)

    try {
      const token = localStorage.getItem("token")

      const response = await axios.post(
        "https://fundoonotes.incubation.bridgelabz.com/api/notes/addUpdateReminderNotes",
        {
          noteIdList: [id],
          reminder: date.toISOString(),
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        },
      )

      if (!response.data?.status?.success) {
        // setHasReminder(false);
      } else {
        await fetchNotes()
      }
    } catch (error) {
      console.error("Error adding reminder:", error)
      setHasReminder(false)
    } finally {
      setIsTogglingReminder(false)
    }
  }

  const handleToggleReminder = async (event) => {
    event.stopPropagation()
    if (isTogglingReminder) return

    if (hasReminder) {
      // Remove reminder
      setIsTogglingReminder(true)
      setHasReminder(false)

      try {
        const token = localStorage.getItem("token")
        const response = await axios.post(
          "https://fundoonotes.incubation.bridgelabz.com/api/notes/removeReminderNotes",
          { noteIdList: [id] },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          },
        )

        if (!response.data?.status?.success) {
          // setHasReminder(true);
          fetchNotes()
        } else {
          await fetchNotes()
        }
      } catch (error) {
        console.error("Error removing reminder:", error)
        setHasReminder(true)
      } finally {
        setIsTogglingReminder(false)
      }
    } else {
      // Open reminder dialog
      setIsReminderDialogOpen(true)
    }
  }

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: {
            xs: "100%",
            sm: isListView ? "90%" : "45%",
            md: isListView ? "580px" : "200px",
          },
          height: "fit-content",
          margin: { xs: 1, sm: 1, md: 2 },
          padding: 2,
          paddingTop: 4,
          paddingBottom: 5,
          borderRadius: 2,
          position: "relative",
          transition: "all 0.3s ease",
          "&:hover": { boxShadow: 6 },
          overflow: "visible",
          backgroundColor: localColor,
          cursor: "pointer",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleEditClick}
      >
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            right: 8,
            display: "flex",
            justifyContent: "space-between",
            opacity: { xs: 1, sm: 1, md: hovered ? 1 : 0 },
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <IconButton size="small" sx={{ padding: 0 }} data-action-button="true" onClick={handleActionClick}>
            <CheckCircleIcon sx={{ fontSize: 20, color: "#5f6368" }} />
          </IconButton>
          <IconButton size="small" sx={{ padding: 0 }} data-action-button="true" onClick={handleActionClick}>
            <PushPinIcon sx={{ fontSize: 20, color: "#5f6368" }} />
          </IconButton>
        </Box>

        <Box>
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
            }}
          >
            {content}
          </Typography>

          {selectedLabels && selectedLabels.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1, maxWidth: "100%" }}>
              {selectedLabels.map((label) => (
                <Box
                  key={label.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.08)",
                    borderRadius: "4px",
                    padding: "2px 8px",
                    fontSize: { xs: "10px", sm: "10px", md: "12px" },
                    marginBottom: "4px",
                    "&:hover": {
                      "& .remove-icon": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <LabelIcon sx={{ fontSize: 12, mr: 0.5 }} />
                  {label.label}
                  <Tooltip title="Remove label">
                    <IconButton
                      size="small"
                      onClick={(e) => handleRemoveLabel(label.id, e)}
                      disabled={isRemovingLabel}
                      className="remove-icon"
                      data-action-button="true"
                      sx={{
                        padding: 0,
                        ml: 0.5,
                        opacity: 0,
                        transition: "opacity 0.2s",
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.04)",
                        },
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 12 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            position: "absolute",
            bottom: 8,
            left: 8,
            right: 8,
            gap: { xs: 0.25, sm: 0.25, md: 0.5 },
            flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap" },
            opacity: { xs: 1, sm: 1, md: hovered ? 1 : 0 },
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          {!isTrashed && (
            <>
              <Tooltip title={hasReminder ? "Remove reminder" : "Add reminder"}>
                <IconButton
                  size="small"
                  onClick={handleToggleReminder}
                  disabled={isTogglingReminder}
                  data-action-button="true"
                >
                  {hasReminder ? (
                    <NotificationsActiveIcon
                      sx={{
                        fontSize: 18,
                        color: isTogglingReminder ? "#bdbdbd" : "#5f6368",
                      }}
                    />
                  ) : (
                    <NotificationsNoneIcon
                      sx={{
                        fontSize: 18,
                        color: isTogglingReminder ? "#bdbdbd" : "#5f6368",
                      }}
                    />
                  )}
                </IconButton>
              </Tooltip>
              <IconButton size="small" data-action-button="true" onClick={handleActionClick}>
                <PersonAddIcon sx={{ fontSize: 18, color: "#5f6368" }} />
              </IconButton>
              <IconButton size="small" onClick={handleColorClick} disabled={isChangingColor} data-action-button="true">
                <PaletteIcon
                  sx={{
                    fontSize: 18,
                    color: isChangingColor ? "#bdbdbd" : "#5f6368",
                  }}
                />
              </IconButton>
              <IconButton size="small" data-action-button="true" onClick={handleActionClick}>
                <ImageIcon sx={{ fontSize: 18, color: "#5f6368" }} />
              </IconButton>
              <IconButton size="small" onClick={handleArchiveToggle} disabled={isArchiving} data-action-button="true">
                {isArchived ? (
                  <UnarchiveIcon
                    sx={{
                      fontSize: 18,
                      color: isArchiving ? "#bdbdbd" : "#5f6368",
                    }}
                  />
                ) : (
                  <ArchiveIcon
                    sx={{
                      fontSize: 18,
                      color: isArchiving ? "#bdbdbd" : "#5f6368",
                    }}
                  />
                )}
              </IconButton>
              <IconButton size="small" onClick={handleMoreMenuOpen} data-action-button="true">
                <MoreVertIcon sx={{ fontSize: 18, color: "#5f6368" }} />
              </IconButton>
            </>
          )}
          <IconButton size="small" onClick={handleTrashToggle} disabled={isTrashing} data-action-button="true">
            {isTrashed ? (
              <RestoreFromTrashIcon
                sx={{
                  fontSize: 18,
                  color: isTrashing ? "#bdbdbd" : "#5f6368",
                }}
              />
            ) : (
              <DeleteIcon
                sx={{
                  fontSize: 18,
                  color: isTrashing ? "#bdbdbd" : "#5f6368",
                }}
              />
            )}
          </IconButton>
          {isTrashed && (
            <IconButton
              size="small"
              onClick={handleDeleteForever}
              disabled={isDeleting}
              sx={{ color: "#d32f2f" }}
              data-action-button="true"
            >
              <DeleteForeverIcon
                sx={{
                  fontSize: 18,
                  color: isDeleting ? "#bdbdbd" : "inherit",
                }}
              />
            </IconButton>
          )}
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
          onClick={(e) => e.stopPropagation()}
        >
          <Box
            sx={{
              p: 1,
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              maxWidth: { xs: "180px", sm: "180px", md: "220px" },
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {COLORS.map((colorOption) => (
              <IconButton
                key={colorOption.name}
                onClick={(e) => handleColorChange(colorOption.value, e)}
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: colorOption.value,
                  border: localColor === colorOption.value ? "2px solid #000" : "1px solid #e0e0e0",
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

        <Menu
          anchorEl={moreMenuAnchorEl}
          open={Boolean(moreMenuAnchorEl)}
          onClose={handleMoreMenuClose}
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem onClick={handleLabelDialogOpen}>
            <ListItemIcon>
              <LabelIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add label</ListItemText>
          </MenuItem>
        </Menu>

        <ReminderDialog
          open={isReminderDialogOpen}
          onClose={() => setIsReminderDialogOpen(false)}
          onSave={handleAddReminder}
        />

        <Dialog
          open={isLabelDialogOpen}
          onClose={handleLabelDialogClose}
          onClick={(e) => e.stopPropagation()}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Add label</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TextField
                fullWidth
                placeholder="Create new label"
                value={newLabelText}
                onChange={(e) => setNewLabelText(e.target.value)}
                variant="standard"
                sx={{ mx: 1 }}
              />
              <IconButton onClick={handleAddLabel} disabled={!newLabelText.trim() || isAddingLabel}>
                {isAddingLabel ? <CircularProgress size={24} /> : <PersonAddIcon />}
              </IconButton>
            </Box>

            {availableLabels.map((label) => (
              <MenuItem
                key={label.id}
                onClick={() => handleLabelToggle(label.id)}
                sx={{
                  backgroundColor: selectedLabels.some((l) => l.id === label.id)
                    ? "rgba(0, 0, 0, 0.08)"
                    : "transparent",
                }}
              >
                <ListItemIcon>
                  <LabelIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{label.label}</ListItemText>
              </MenuItem>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLabelDialogClose}>Cancel</Button>
            <Button onClick={handleSaveLabels} disabled={isChangingLabels}>
              Done
            </Button>
          </DialogActions>
        </Dialog>

        <Modal
          open={isEditModalOpen}
          onClose={handleEditClose}
          aria-labelledby="edit-note-modal"
          aria-describedby="modal-to-edit-note"
        >
          <div>
            <Notes2
              editNote={{
                id,
                title,
                note: content,
                isPinned: false,
              }}
              onEdit={handleEditSave}
              setExpanded={handleEditClose}
              backgroundColor={localColor}
            />
          </div>
        </Modal>
      </Paper>
    </>
  )
}

export default NotesThird;



