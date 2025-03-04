

// // // "use client";

// // // import { useState } from "react";
// // // import {
// // //   Paper,
// // //   Typography,
// // //   IconButton,
// // //   Box,
// // //   Popover,
// // //   Modal,
// // // } from "@mui/material";
// // // import PushPinIcon from "@mui/icons-material/PushPin";
// // // import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// // // import PersonAddIcon from "@mui/icons-material/PersonAdd";
// // // import PaletteIcon from "@mui/icons-material/Palette";
// // // import ImageIcon from "@mui/icons-material/Image";
// // // import ArchiveIcon from "@mui/icons-material/Archive";
// // // import UnarchiveIcon from "@mui/icons-material/Unarchive";
// // // import DeleteIcon from "@mui/icons-material/Delete";
// // // import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
// // // import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// // // import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// // // import axios from "axios";
// // // import Notes2 from "./NotesSecond";
// // // import { useOutletContext } from "react-router-dom";

// // // const COLORS = [
// // //   { name: "Default", value: "#ffffff" },
// // //   { name: "Red", value: "#f28b82" },
// // //   { name: "Orange", value: "#fbbc04" },
// // //   { name: "Yellow", value: "#fff475" },
// // //   { name: "Green", value: "#ccff90" },
// // //   { name: "Teal", value: "#a7ffeb" },
// // //   { name: "Blue", value: "#cbf0f8" },
// // //   { name: "Purple", value: "#d7aefb" },
// // //   { name: "Pink", value: "#fdcfe8" },
// // //   { name: "Brown", value: "#e6c9a8" },
// // //   { name: "Gray", value: "#e8eaed" },
// // // ];

// // // const NotesThird = ({
// // //   title,
// // //   content,
// // //   id,
// // //   isArchived = false,
// // //   isTrashed = false,
// // //   color = "#ffffff",
// // //   onArchiveToggle,
// // //   onTrashToggle,
// // //   onDeleteForever,
// // //   onColorChange,
// // //   onEdit,
// // //   fetchNotes,
// // // }) => {
// // //   const [hovered, setHovered] = useState(false);
// // //   const [isArchiving, setIsArchiving] = useState(false);
// // //   const [isTrashing, setIsTrashing] = useState(false);
// // //   const [isDeleting, setIsDeleting] = useState(false);
// // //   const [isChangingColor, setIsChangingColor] = useState(false);
// // //   const [colorAnchorEl, setColorAnchorEl] = useState(null);
// // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // //   const { isListView } = useOutletContext();

// // //   const handleArchiveToggle = async () => {
// // //     if (isArchiving) return;
// // //     setIsArchiving(true);
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       onArchiveToggle(id, !isArchived);
// // //       const response = await axios({
// // //         method: "post",
// // //         url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes",
// // //         headers: {
// // //           Authorization: token,
// // //           "Content-Type": "application/json",
// // //         },
// // //         data: {
// // //           noteIdList: [id],
// // //           isArchived: !isArchived,
// // //         },
// // //       });
// // //       if (!response.data?.status?.success) {
// // //         onArchiveToggle(id, isArchived);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error toggling archive status:", error);
// // //       onArchiveToggle(id, isArchived);
// // //     } finally {
// // //       setIsArchiving(false);
// // //     }
// // //   };

// // //   const handleTrashToggle = async () => {
// // //     if (isTrashing) return;
// // //     setIsTrashing(true);
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       onTrashToggle(id, !isTrashed);
// // //       const response = await axios({
// // //         method: "post",
// // //         url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes",
// // //         headers: {
// // //           Authorization: token,
// // //           "Content-Type": "application/json",
// // //         },
// // //         data: {
// // //           noteIdList: [id],
// // //           isDeleted: !isTrashed,
// // //         },
// // //       });
// // //       if (!response.data?.status?.success) {
// // //         onTrashToggle(id, isTrashed);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error toggling trash status:", error);
// // //       onTrashToggle(id, isTrashed);
// // //     } finally {
// // //       setIsTrashing(false);
// // //     }
// // //   };

// // //   const handleDeleteForever = async () => {
// // //     if (isDeleting) return
    
// // //     setIsDeleting(true)
    
// // //     try {
// // //       const token = localStorage.getItem("token")
      
// // //       onDeleteForever(id)

// // //       const response = await axios({
// // //         method: "post",
// // //         url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes",
// // //         headers: {
// // //           Authorization: token,
// // //           "Content-Type": "application/json",
// // //         },
// // //         data: {
// // //           noteIdList: [id]
// // //         }
// // //       })

// // //       if (!response.data?.status?.success) {
// // //         onDeleteForever(id, true) // Revert if failed
// // //       }
// // //     } catch (error) {
// // //       console.error("Error deleting note forever:", error)
// // //       onDeleteForever(id, true) // Revert if failed
// // //     } finally {
// // //       setIsDeleting(false)
// // //     }
// // //   }


// // //   const handleColorClick = (event) => {
// // //     console.log("Color click triggered"); // Debugging log
// // //     event.stopPropagation(); // Stop the event from propagating to the parent Paper
// // //     setColorAnchorEl(event.currentTarget);
// // //   };

// // //   const handleColorClose = () => {
// // //     setColorAnchorEl(null);
// // //   };

// // //   const handleColorChange = async (newColor) => {
// // //     if (isChangingColor) return;
// // //     setIsChangingColor(true);
// // //     handleColorClose();
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       const oldColor = color;
// // //       onColorChange(id, newColor);
// // //       const response = await axios({
// // //         method: "post",
// // //         url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",
// // //         headers: {
// // //           Authorization: token,
// // //           "Content-Type": "application/json",
// // //         },
// // //         data: {
// // //           noteIdList: [id],
// // //           color: newColor,
// // //         },
// // //       });
// // //       if (!response.data?.status?.success) {
// // //         onColorChange(id, oldColor);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error changing note color:", error);
// // //       onColorChange(id, color);
// // //     } finally {
// // //       setIsChangingColor(false);
// // //     }
// // //   };

// // //   const handleEditClose = () => {
// // //     setIsEditModalOpen(false);
// // //   };

// // //   const handleEditClick = (event) => {
// // //     console.log("Edit click triggered"); // Debugging log
// // //     console.log("Event target:", event.target); // Debugging log
// // //     console.log("Event currentTarget:", event.currentTarget); // Debugging log
// // //     console.log(
// // //       "Closest action button:",
// // //       event.currentTarget.closest('[data-action-button="true"]')
// // //     ); // Debugging log

// // //     // Check if the click originated from an action button
// // //     if (event.currentTarget.closest('[data-action-button="true"]')) {
// // //       console.log("Action button clicked, skipping modal open"); // Debugging log
// // //       return; // Do not open the edit modal
// // //     }
// // //     setIsEditModalOpen(true); // Open the edit modal
// // //   };

// // //   const handleEditSave = async (editedNote) => {
// // //     try {
// // //       await onEdit(id, editedNote.title, editedNote.note); // Call onEdit to update the note
// // //       handleEditClose(); // Close the modal after the note is updated
// // //     } catch (error) {
// // //       console.error("Error updating note:", error);
// // //     }
// // //   };

  
// // //   return (
// // //     <>
// // //       <Paper
// // //         elevation={3}
// // //         sx={{
// // //           width: isListView ? "580px" : "200px",
// // //           height: "fit-content",
// // //           margin: 2,
// // //           padding: 2,
// // //           borderRadius: 2,
// // //           position: "relative",
// // //           transition: "box-shadow 0.3s, background-color 0.3s",
// // //           "&:hover": { boxShadow: 6 },
// // //           overflow: "visible",
// // //           backgroundColor: color,
// // //           cursor: "pointer",
          
// // //         }}
// // //         onMouseEnter={() => setHovered(true)}
// // //         onMouseLeave={() => setHovered(false)}
// // //         onClick={handleEditClick}
// // //       >
// // //         {hovered && (
// // //           <>
// // //             <IconButton
// // //               size="small"
// // //               sx={{
// // //                 position: "absolute",
// // //                 top: 8,
// // //                 left: 8,
// // //                 padding: 0,
// // //               }}
// // //               data-action-button="true"
// // //             >
// // //               <CheckCircleIcon sx={{ fontSize: 20, color: "#5f6368" }} />
// // //             </IconButton>
// // //             <IconButton
// // //               size="small"
// // //               sx={{
// // //                 position: "absolute",
// // //                 top: 8,
// // //                 right: 8,
// // //                 padding: 0,
// // //               }}
// // //               data-action-button="true"
// // //             >
// // //               <PushPinIcon sx={{ fontSize: 20, color: "#5f6368" }} />
// // //             </IconButton>
// // //           </>
// // //         )}

// // //         <Box sx={{ mt: hovered ? 4 : 0 }}>
// // //           <Typography
// // //             variant="subtitle1"
// // //             sx={{
// // //               wordWrap: "break-word",
// // //               mb: 1,
// // //               fontWeight: "normal",
// // //             }}
// // //           >
// // //             {title} {/* Render the highlighted title */}
// // //           </Typography>

// // //           <Typography
// // //             variant="body2"
// // //             color="textSecondary"
// // //             sx={{
// // //               wordWrap: "break-word",
// // //               whiteSpace: "pre-wrap",
// // //               marginBottom: hovered ? 5 : 0,
// // //             }}
// // //           >
// // //             {content}
// // //           </Typography>
// // //         </Box>

// // //         {hovered && (
// // //           <Box
// // //             sx={{
// // //               display: "flex",
// // //               justifyContent: "flex-start",
// // //               alignItems: "center",
// // //               position: "absolute",
// // //               bottom: 8,
// // //               left: 8,
// // //               right: 8,
// // //               gap: 0.5,
// // //             }}
// // //           >
// // //             {!isTrashed && (
// // //               <>
// // //                 <IconButton size="small" data-action-button="true">
// // //                   <NotificationsNoneIcon
// // //                     sx={{ fontSize: 18, color: "#5f6368" }}
// // //                   />
// // //                 </IconButton>
// // //                 <IconButton size="small" data-action-button="true">
// // //                   <PersonAddIcon sx={{ fontSize: 18, color: "#5f6368" }} />
// // //                 </IconButton>
// // //                 <IconButton
// // //                   size="small"
// // //                   onClick={handleColorClick}
// // //                   disabled={isChangingColor}
// // //                   data-action-button="true"
// // //                 >
// // //                   <PaletteIcon
// // //                     sx={{
// // //                       fontSize: 18,
// // //                       color: isChangingColor ? "#bdbdbd" : "#5f6368",
// // //                     }}
// // //                   />
// // //                 </IconButton>
// // //                 <IconButton size="small" data-action-button="true">
// // //                   <ImageIcon sx={{ fontSize: 18, color: "#5f6368" }} />
// // //                 </IconButton>
// // //                 <IconButton
// // //                   size="small"
// // //                   onClick={handleArchiveToggle}
// // //                   disabled={isArchiving}
// // //                   data-action-button="true"
// // //                 >
// // //                   {isArchived ? (
// // //                     <UnarchiveIcon
// // //                       sx={{
// // //                         fontSize: 18,
// // //                         color: isArchiving ? "#bdbdbd" : "#5f6368",
// // //                       }}
// // //                     />
// // //                   ) : (
// // //                     <ArchiveIcon
// // //                       sx={{
// // //                         fontSize: 18,
// // //                         color: isArchiving ? "#bdbdbd" : "#5f6368",
// // //                       }}
// // //                     />
// // //                   )}
// // //                 </IconButton>
// // //               </>
// // //             )}
// // //             <IconButton
// // //               size="small"
// // //               onClick={handleTrashToggle}
// // //               disabled={isTrashing}
// // //               data-action-button="true"
// // //             >
// // //               {isTrashed ? (
// // //                 <RestoreFromTrashIcon
// // //                   sx={{
// // //                     fontSize: 18,
// // //                     color: isTrashing ? "#bdbdbd" : "#5f6368",
// // //                   }}
// // //                 />
// // //               ) : (
// // //                 <DeleteIcon
// // //                   sx={{
// // //                     fontSize: 18,
// // //                     color: isTrashing ? "#bdbdbd" : "#5f6368",
// // //                   }}
// // //                 />
// // //               )}
// // //             </IconButton>
// // //             {isTrashed && (
// // //               <IconButton
// // //                 size="small"
// // //                 onClick={handleDeleteForever}
// // //                 disabled={isDeleting}
// // //                 sx={{ color: "#d32f2f" }}
// // //                 data-action-button="true"
// // //               >
// // //                 <DeleteForeverIcon
// // //                   sx={{
// // //                     fontSize: 18,
// // //                     color: isDeleting ? "#bdbdbd" : "inherit",
// // //                   }}
// // //                 />
// // //               </IconButton>
// // //             )}
// // //           </Box>
// // //         )}

// // //         <Popover
// // //           open={Boolean(colorAnchorEl)}
// // //           anchorEl={colorAnchorEl}
// // //           onClose={handleColorClose}
// // //           anchorOrigin={{
// // //             vertical: "bottom",
// // //             horizontal: "left",
// // //           }}
// // //           transformOrigin={{
// // //             vertical: "top",
// // //             horizontal: "left",
// // //           }}
// // //         >
// // //           <Box
// // //             sx={{
// // //               p: 1,
// // //               display: "flex",
// // //               flexWrap: "wrap",
// // //               gap: 0.5,
// // //               maxWidth: "220px",
// // //             }}
// // //           >
// // //             {COLORS.map((colorOption) => (
// // //               <IconButton
// // //                 key={colorOption.name}
// // //                 onClick={() => handleColorChange(colorOption.value)}
// // //                 sx={{
// // //                   width: 32,
// // //                   height: 32,
// // //                   backgroundColor: colorOption.value,
// // //                   border:
// // //                     color === colorOption.value
// // //                       ? "2px solid #000"
// // //                       : "1px solid #e0e0e0",
// // //                   "&:hover": {
// // //                     backgroundColor: colorOption.value,
// // //                     opacity: 0.8,
// // //                   },
// // //                 }}
// // //                 title={colorOption.name}
// // //               />
// // //             ))}
// // //           </Box>
// // //         </Popover>
// // //       </Paper>

// // //       <Modal
// // //         open={isEditModalOpen}
// // //         onClose={handleEditClose}
// // //         aria-labelledby="edit-note-modal"
// // //         aria-describedby="modal-to-edit-note"
// // //       >
// // //         <div>
// // //           <Notes2
// // //             editNote={{
// // //               id,
// // //               title,
// // //               note: content,
// // //               isPinned: false,
// // //             }}
// // //             onEdit={handleEditSave}
// // //             setExpanded={handleEditClose}
// // //             backgroundColor={color}
// // //           />
// // //         </div>
// // //       </Modal>
// // //     </>
// // //   );
// // // };

// // // export default NotesThird;


// // "use client";

// // import { useState } from "react";
// // import {
// //   Paper,
// //   Typography,
// //   IconButton,
// //   Box,
// //   Popover,
// //   Modal,
// // } from "@mui/material";
// // import PushPinIcon from "@mui/icons-material/PushPin";
// // import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// // import PersonAddIcon from "@mui/icons-material/PersonAdd";
// // import PaletteIcon from "@mui/icons-material/Palette";
// // import ImageIcon from "@mui/icons-material/Image";
// // import ArchiveIcon from "@mui/icons-material/Archive";
// // import UnarchiveIcon from "@mui/icons-material/Unarchive";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
// // import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// // import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// // import axios from "axios";
// // import Notes2 from "./NotesSecond";
// // import { useOutletContext } from "react-router-dom";

// // const COLORS = [
// //   { name: "Default", value: "#ffffff" },
// //   { name: "Red", value: "#f28b82" },
// //   { name: "Orange", value: "#fbbc04" },
// //   { name: "Yellow", value: "#fff475" },
// //   { name: "Green", value: "#ccff90" },
// //   { name: "Teal", value: "#a7ffeb" },
// //   { name: "Blue", value: "#cbf0f8" },
// //   { name: "Purple", value: "#d7aefb" },
// //   { name: "Pink", value: "#fdcfe8" },
// //   { name: "Brown", value: "#e6c9a8" },
// //   { name: "Gray", value: "#e8eaed" },
// // ];

// // const NotesThird = ({
// //   title,
// //   content,
// //   id,
// //   isArchived = false,
// //   isTrashed = false,
// //   color = "#ffffff",
// //   onArchiveToggle,
// //   onTrashToggle,
// //   onDeleteForever,
// //   onColorChange,
// //   onEdit,
// //   fetchNotes,
// // }) => {
// //   const [hovered, setHovered] = useState(false);
// //   const [isArchiving, setIsArchiving] = useState(false);
// //   const [isTrashing, setIsTrashing] = useState(false);
// //   const [isDeleting, setIsDeleting] = useState(false);
// //   const [isChangingColor, setIsChangingColor] = useState(false);
// //   const [colorAnchorEl, setColorAnchorEl] = useState(null);
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const { isListView } = useOutletContext();

// //   const handleArchiveToggle = async () => {
// //     if (isArchiving) return;
// //     setIsArchiving(true);
// //     try {
// //       const token = localStorage.getItem("token");
// //       onArchiveToggle(id, !isArchived);
// //       const response = await axios({
// //         method: "post",
// //         url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes",
// //         headers: {
// //           Authorization: token,
// //           "Content-Type": "application/json",
// //         },
// //         data: {
// //           noteIdList: [id],
// //           isArchived: !isArchived,
// //         },
// //       });
// //       if (!response.data?.status?.success) {
// //         onArchiveToggle(id, isArchived);
// //       }
// //     } catch (error) {
// //       console.error("Error toggling archive status:", error);
// //       onArchiveToggle(id, isArchived);
// //     } finally {
// //       setIsArchiving(false);
// //     }
// //   };

// //   const handleTrashToggle = async () => {
// //     if (isTrashing) return;
// //     setIsTrashing(true);
// //     try {
// //       const token = localStorage.getItem("token");
// //       onTrashToggle(id, !isTrashed);
// //       const response = await axios({
// //         method: "post",
// //         url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes",
// //         headers: {
// //           Authorization: token,
// //           "Content-Type": "application/json",
// //         },
// //         data: {
// //           noteIdList: [id],
// //           isDeleted: !isTrashed,
// //         },
// //       });
// //       if (!response.data?.status?.success) {
// //         onTrashToggle(id, isTrashed);
// //       }
// //     } catch (error) {
// //       console.error("Error toggling trash status:", error);
// //       onTrashToggle(id, isTrashed);
// //     } finally {
// //       setIsTrashing(false);
// //     }
// //   };

// //   const handleDeleteForever = async () => {
// //     if (isDeleting) return
    
// //     setIsDeleting(true)
    
// //     try {
// //       const token = localStorage.getItem("token")
      
// //       onDeleteForever(id)

// //       const response = await axios({
// //         method: "post",
// //         url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes",
// //         headers: {
// //           Authorization: token,
// //           "Content-Type": "application/json",
// //         },
// //         data: {
// //           noteIdList: [id]
// //         }
// //       })

// //       if (!response.data?.status?.success) {
// //         onDeleteForever(id, true) // Revert if failed
// //       }
// //     } catch (error) {
// //       console.error("Error deleting note forever:", error)
// //       onDeleteForever(id, true) // Revert if failed
// //     } finally {
// //       setIsDeleting(false)
// //     }
// //   }


// //   const handleColorClick = (event) => {
// //     event.stopPropagation(); // Stop the event from propagating to the parent Paper
// //     setColorAnchorEl(event.currentTarget);
// //   };

// //   const handleColorClose = () => {
// //     setColorAnchorEl(null);
// //   };

// //   const handleColorChange = async (newColor) => {
// //     if (isChangingColor) return;
// //     setIsChangingColor(true);
// //     handleColorClose();
// //     try {
// //       const token = localStorage.getItem("token");
// //       const oldColor = color;
// //       onColorChange(id, newColor);
// //       const response = await axios({
// //         method: "post",
// //         url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",
// //         headers: {
// //           Authorization: token,
// //           "Content-Type": "application/json",
// //         },
// //         data: {
// //           noteIdList: [id],
// //           color: newColor,
// //         },
// //       });
// //       if (!response.data?.status?.success) {
// //         onColorChange(id, oldColor);
// //       }
// //     } catch (error) {
// //       console.error("Error changing note color:", error);
// //       onColorChange(id, color);
// //     } finally {
// //       setIsChangingColor(false);
// //     }
// //   };

// //   const handleEditClose = () => {
// //     setIsEditModalOpen(false);
// //   };

// //   const handleEditClick = (event) => {
// //     // Check if the click originated from an action button
// //     if (event.currentTarget.closest('[data-action-button="true"]')) {
// //       return; // Do not open the edit modal
// //     }
// //     setIsEditModalOpen(true); // Open the edit modal
// //   };

// //   const handleEditSave = async (editedNote) => {
// //     try {
// //       await onEdit(id, editedNote.title, editedNote.note); // Call onEdit to update the note
// //       handleEditClose(); // Close the modal after the note is updated
// //     } catch (error) {
// //       console.error("Error updating note:", error);
// //     }
// //   };

  
// //   return (
// //     <>
// //       <Paper
// //         elevation={3}
// //         sx={{
// //           width: isListView ? "580px" : "200px",
// //           height: "fit-content",
// //           margin: 2,
// //           padding: 2,
// //           paddingTop: 4, // Always reserve space for top icons
// //           paddingBottom: 5, // Always reserve space for bottom icons
// //           borderRadius: 2,
// //           position: "relative",
// //           transition: "box-shadow 0.3s, background-color 0.3s",
// //           "&:hover": { boxShadow: 6 },
// //           overflow: "visible",
// //           backgroundColor: color,
// //           cursor: "pointer",
// //         }}
// //         onMouseEnter={() => setHovered(true)}
// //         onMouseLeave={() => setHovered(false)}
// //         onClick={handleEditClick}
// //       >
// //         {/* Top action buttons - only visible on hover but space is always reserved */}
// //         <Box
// //           sx={{
// //             position: "absolute",
// //             top: 8,
// //             left: 8,
// //             right: 8,
// //             display: "flex",
// //             justifyContent: "space-between",
// //             opacity: hovered ? 1 : 0,
// //             transition: "opacity 0.2s ease-in-out",
// //           }}
// //         >
// //           <IconButton
// //             size="small"
// //             sx={{ padding: 0 }}
// //             data-action-button="true"
// //           >
// //             <CheckCircleIcon sx={{ fontSize: 20, color: "#5f6368" }} />
// //           </IconButton>
// //           <IconButton
// //             size="small"
// //             sx={{ padding: 0 }}
// //             data-action-button="true"
// //           >
// //             <PushPinIcon sx={{ fontSize: 20, color: "#5f6368" }} />
// //           </IconButton>
// //         </Box>

// //         <Box>
// //           <Typography
// //             variant="subtitle1"
// //             sx={{
// //               wordWrap: "break-word",
// //               mb: 1,
// //               fontWeight: "normal",
// //             }}
// //           >
// //             {title}
// //           </Typography>

// //           <Typography
// //             variant="body2"
// //             color="textSecondary"
// //             sx={{
// //               wordWrap: "break-word",
// //               whiteSpace: "pre-wrap",
// //             }}
// //           >
// //             {content}
// //           </Typography>
// //         </Box>

// //         {/* Bottom action buttons - only visible on hover but space is always reserved */}
// //         <Box
// //           sx={{
// //             display: "flex",
// //             justifyContent: "flex-start",
// //             alignItems: "center",
// //             position: "absolute",
// //             bottom: 8,
// //             left: 8,
// //             right: 8,
// //             gap: 0.5,
// //             opacity: hovered ? 1 : 0,
// //             transition: "opacity 0.2s ease-in-out",
// //           }}
// //         >
// //           {!isTrashed && (
// //             <>
// //               <IconButton size="small" data-action-button="true">
// //                 <NotificationsNoneIcon
// //                   sx={{ fontSize: 18, color: "#5f6368" }}
// //                 />
// //               </IconButton>
// //               <IconButton size="small" data-action-button="true">
// //                 <PersonAddIcon sx={{ fontSize: 18, color: "#5f6368" }} />
// //               </IconButton>
// //               <IconButton
// //                 size="small"
// //                 onClick={handleColorClick}
// //                 disabled={isChangingColor}
// //                 data-action-button="true"
// //               >
// //                 <PaletteIcon
// //                   sx={{
// //                     fontSize: 18,
// //                     color: isChangingColor ? "#bdbdbd" : "#5f6368",
// //                   }}
// //                 />
// //               </IconButton>
// //               <IconButton size="small" data-action-button="true">
// //                 <ImageIcon sx={{ fontSize: 18, color: "#5f6368" }} />
// //               </IconButton>
// //               <IconButton
// //                 size="small"
// //                 onClick={handleArchiveToggle}
// //                 disabled={isArchiving}
// //                 data-action-button="true"
// //               >
// //                 {isArchived ? (
// //                   <UnarchiveIcon
// //                     sx={{
// //                       fontSize: 18,
// //                       color: isArchiving ? "#bdbdbd" : "#5f6368",
// //                     }}
// //                   />
// //                 ) : (
// //                   <ArchiveIcon
// //                     sx={{
// //                       fontSize: 18,
// //                       color: isArchiving ? "#bdbdbd" : "#5f6368",
// //                     }}
// //                   />
// //                 )}
// //               </IconButton>
// //             </>
// //           )}
// //           <IconButton
// //             size="small"
// //             onClick={handleTrashToggle}
// //             disabled={isTrashing}
// //             data-action-button="true"
// //           >
// //             {isTrashed ? (
// //               <RestoreFromTrashIcon
// //                 sx={{
// //                   fontSize: 18,
// //                   color: isTrashing ? "#bdbdbd" : "#5f6368",
// //                 }}
// //               />
// //             ) : (
// //               <DeleteIcon
// //                 sx={{
// //                   fontSize: 18,
// //                   color: isTrashing ? "#bdbdbd" : "#5f6368",
// //                 }}
// //               />
// //             )}
// //           </IconButton>
// //           {isTrashed && (
// //             <IconButton
// //               size="small"
// //               onClick={handleDeleteForever}
// //               disabled={isDeleting}
// //               sx={{ color: "#d32f2f" }}
// //               data-action-button="true"
// //             >
// //               <DeleteForeverIcon
// //                 sx={{
// //                   fontSize: 18,
// //                   color: isDeleting ? "#bdbdbd" : "inherit",
// //                 }}
// //               />
// //             </IconButton>
// //           )}
// //         </Box>

// //         <Popover
// //           open={Boolean(colorAnchorEl)}
// //           anchorEl={colorAnchorEl}
// //           onClose={handleColorClose}
// //           anchorOrigin={{
// //             vertical: "bottom",
// //             horizontal: "left",
// //           }}
// //           transformOrigin={{
// //             vertical: "top",
// //             horizontal: "left",
// //           }}
// //         >
// //           <Box
// //             sx={{
// //               p: 1,
// //               display: "flex",
// //               flexWrap: "wrap",
// //               gap: 0.5,
// //               maxWidth: "220px",
// //             }}
// //           >
// //             {COLORS.map((colorOption) => (
// //               <IconButton
// //                 key={colorOption.name}
// //                 onClick={() => handleColorChange(colorOption.value)}
// //                 sx={{
// //                   width: 32,
// //                   height: 32,
// //                   backgroundColor: colorOption.value,
// //                   border:
// //                     color === colorOption.value
// //                       ? "2px solid #000"
// //                       : "1px solid #e0e0e0",
// //                   "&:hover": {
// //                     backgroundColor: colorOption.value,
// //                     opacity: 0.8,
// //                   },
// //                 }}
// //                 title={colorOption.name}
// //               />
// //             ))}
// //           </Box>
// //         </Popover>
// //       </Paper>

// //       <Modal
// //         open={isEditModalOpen}
// //         onClose={handleEditClose}
// //         aria-labelledby="edit-note-modal"
// //         aria-describedby="modal-to-edit-note"
// //       >
// //         <div>
// //           <Notes2
// //             editNote={{
// //               id,
// //               title,
// //               note: content,
// //               isPinned: false,
// //             }}
// //             onEdit={handleEditSave}
// //             setExpanded={handleEditClose}
// //             backgroundColor={color}
// //           />
// //         </div>
// //       </Modal>
// //     </>
// //   );
// // };

// // export default NotesThird;

// "use client";

// import { useState } from "react";
// import {
//   Paper,
//   Typography,
//   IconButton,
//   Box,
//   Popover,
//   Modal,
// } from "@mui/material";
// import PushPinIcon from "@mui/icons-material/PushPin";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import PaletteIcon from "@mui/icons-material/Palette";
// import ImageIcon from "@mui/icons-material/Image";
// import ArchiveIcon from "@mui/icons-material/Archive";
// import UnarchiveIcon from "@mui/icons-material/Unarchive";
// import DeleteIcon from "@mui/icons-material/Delete";
// import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import axios from "axios";
// import Notes2 from "./NotesSecond";
// import { useOutletContext } from "react-router-dom";

// const COLORS = [
//   { name: "Default", value: "#ffffff" },
//   { name: "Red", value: "#f28b82" },
//   { name: "Orange", value: "#fbbc04" },
//   { name: "Yellow", value: "#fff475" },
//   { name: "Green", value: "#ccff90" },
//   { name: "Teal", value: "#a7ffeb" },
//   { name: "Blue", value: "#cbf0f8" },
//   { name: "Purple", value: "#d7aefb" },
//   { name: "Pink", value: "#fdcfe8" },
//   { name: "Brown", value: "#e6c9a8" },
//   { name: "Gray", value: "#e8eaed" },
// ];

// const NotesThird = ({
//   title,
//   content,
//   id,
//   isArchived = false,
//   isTrashed = false,
//   color = "#ffffff",
//   onArchiveToggle,
//   onTrashToggle,
//   onDeleteForever,
//   onColorChange,
//   onEdit,
//   fetchNotes,
// }) => {
//   const [hovered, setHovered] = useState(false);
//   const [isArchiving, setIsArchiving] = useState(false);
//   const [isTrashing, setIsTrashing] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isChangingColor, setIsChangingColor] = useState(false);
//   const [colorAnchorEl, setColorAnchorEl] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const { isListView } = useOutletContext();

//   const handleArchiveToggle = async (event) => {
//     event.stopPropagation(); // Prevent edit modal from opening
//     if (isArchiving) return;
//     setIsArchiving(true);
//     try {
//       const token = localStorage.getItem("token");
//       onArchiveToggle(id, !isArchived);
//       const response = await axios({
//         method: "post",
//         url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes",
//         headers: {
//           Authorization: token,
//           "Content-Type": "application/json",
//         },
//         data: {
//           noteIdList: [id],
//           isArchived: !isArchived,
//         },
//       });
//       if (!response.data?.status?.success) {
//         onArchiveToggle(id, isArchived);
//       }
//     } catch (error) {
//       console.error("Error toggling archive status:", error);
//       onArchiveToggle(id, isArchived);
//     } finally {
//       setIsArchiving(false);
//     }
//   };

//   const handleTrashToggle = async (event) => {
//     event.stopPropagation(); // Prevent edit modal from opening
//     if (isTrashing) return;
//     setIsTrashing(true);
//     try {
//       const token = localStorage.getItem("token");
//       onTrashToggle(id, !isTrashed);
//       const response = await axios({
//         method: "post",
//         url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes",
//         headers: {
//           Authorization: token,
//           "Content-Type": "application/json",
//         },
//         data: {
//           noteIdList: [id],
//           isDeleted: !isTrashed,
//         },
//       });
//       if (!response.data?.status?.success) {
//         onTrashToggle(id, isTrashed);
//       }
//     } catch (error) {
//       console.error("Error toggling trash status:", error);
//       onTrashToggle(id, isTrashed);
//     } finally {
//       setIsTrashing(false);
//     }
//   };

//   const handleDeleteForever = async (event) => {
//     event.stopPropagation(); // Prevent edit modal from opening
//     if (isDeleting) return;
    
//     setIsDeleting(true);
    
//     try {
//       const token = localStorage.getItem("token");
      
//       onDeleteForever(id);

//       const response = await axios({
//         method: "post",
//         url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes",
//         headers: {
//           Authorization: token,
//           "Content-Type": "application/json",
//         },
//         data: {
//           noteIdList: [id]
//         }
//       });

//       if (!response.data?.status?.success) {
//         onDeleteForever(id, true); // Revert if failed
//       }
//     } catch (error) {
//       console.error("Error deleting note forever:", error);
//       onDeleteForever(id, true); // Revert if failed
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const handleColorClick = (event) => {
//     event.stopPropagation(); // Stop the event from propagating to the parent Paper
//     setColorAnchorEl(event.currentTarget);
//   };

//   const handleColorClose = () => {
//     setColorAnchorEl(null);
//   };

//   const handleColorChange = async (newColor) => {
//     if (isChangingColor) return;
//     setIsChangingColor(true);
//     handleColorClose();
//     try {
//       const token = localStorage.getItem("token");
//       const oldColor = color;
//       onColorChange(id, newColor);
//       const response = await axios({
//         method: "post",
//         url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",
//         headers: {
//           Authorization: token,
//           "Content-Type": "application/json",
//         },
//         data: {
//           noteIdList: [id],
//           color: newColor,
//         },
//       });
//       if (!response.data?.status?.success) {
//         onColorChange(id, oldColor);
//       }
//     } catch (error) {
//       console.error("Error changing note color:", error);
//       onColorChange(id, color);
//     } finally {
//       setIsChangingColor(false);
//     }
//   };

//   const handleEditClose = () => {
//     setIsEditModalOpen(false);
//   };

//   const handleEditClick = (event) => {
//     // Only open the edit modal if the click didn't come from an action button
//     if (!event.target.closest('[data-action-button="true"]')) {
//       setIsEditModalOpen(true);
//     }
//   };

//   const handleEditSave = async (editedNote) => {
//     try {
//       await onEdit(id, editedNote.title, editedNote.note); // Call onEdit to update the note
//       handleEditClose(); // Close the modal after the note is updated
//     } catch (error) {
//       console.error("Error updating note:", error);
//     }
//   };

//   // Handler for action buttons to prevent event propagation
//   const handleActionClick = (event) => {
//     event.stopPropagation();
//   };
  
//   return (
//     <>
//       <Paper
//         elevation={3}
//         sx={{
//           width: isListView ? "580px" : "200px",
//           height: "fit-content",
//           margin: 2,
//           padding: 2,
//           paddingTop: 4, // Always reserve space for top icons
//           paddingBottom: 5, // Always reserve space for bottom icons
//           borderRadius: 2,
//           position: "relative",
//           transition: "box-shadow 0.3s, background-color 0.3s",
//           "&:hover": { boxShadow: 6 },
//           overflow: "visible",
//           backgroundColor: color,
//           cursor: "pointer",
//         }}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         onClick={handleEditClick}
//       >
//         {/* Top action buttons - only visible on hover but space is always reserved */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: 8,
//             left: 8,
//             right: 8,
//             display: "flex",
//             justifyContent: "space-between",
//             opacity: hovered ? 1 : 0,
//             transition: "opacity 0.2s ease-in-out",
//           }}
//         >
//           <IconButton
//             size="small"
//             sx={{ padding: 0 }}
//             data-action-button="true"
//             onClick={handleActionClick}
//           >
//             <CheckCircleIcon sx={{ fontSize: 20, color: "#5f6368" }} />
//           </IconButton>
//           <IconButton
//             size="small"
//             sx={{ padding: 0 }}
//             data-action-button="true"
//             onClick={handleActionClick}
//           >
//             <PushPinIcon sx={{ fontSize: 20, color: "#5f6368" }} />
//           </IconButton>
//         </Box>

//         <Box>
//           <Typography
//             variant="subtitle1"
//             sx={{
//               wordWrap: "break-word",
//               mb: 1,
//               fontWeight: "normal",
//             }}
//           >
//             {title}
//           </Typography>

//           <Typography
//             variant="body2"
//             color="textSecondary"
//             sx={{
//               wordWrap: "break-word",
//               whiteSpace: "pre-wrap",
//             }}
//           >
//             {content}
//           </Typography>
//         </Box>

//         {/* Bottom action buttons - only visible on hover but space is always reserved */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "flex-start",
//             alignItems: "center",
//             position: "absolute",
//             bottom: 8,
//             left: 8,
//             right: 8,
//             gap: 0.5,
//             opacity: hovered ? 1 : 0,
//             transition: "opacity 0.2s ease-in-out",
//           }}
//         >
//           {!isTrashed && (
//             <>
//               <IconButton 
//                 size="small" 
//                 data-action-button="true"
//                 onClick={handleActionClick}
//               >
//                 <NotificationsNoneIcon
//                   sx={{ fontSize: 18, color: "#5f6368" }}
//                 />
//               </IconButton>
//               <IconButton 
//                 size="small" 
//                 data-action-button="true"
//                 onClick={handleActionClick}
//               >
//                 <PersonAddIcon sx={{ fontSize: 18, color: "#5f6368" }} />
//               </IconButton>
//               <IconButton
//                 size="small"
//                 onClick={handleColorClick}
//                 disabled={isChangingColor}
//                 data-action-button="true"
//               >
//                 <PaletteIcon
//                   sx={{
//                     fontSize: 18,
//                     color: isChangingColor ? "#bdbdbd" : "#5f6368",
//                   }}
//                 />
//               </IconButton>
//               <IconButton 
//                 size="small" 
//                 data-action-button="true"
//                 onClick={handleActionClick}
//               >
//                 <ImageIcon sx={{ fontSize: 18, color: "#5f6368" }} />
//               </IconButton>
//               <IconButton
//                 size="small"
//                 onClick={handleArchiveToggle}
//                 disabled={isArchiving}
//                 data-action-button="true"
//               >
//                 {isArchived ? (
//                   <UnarchiveIcon
//                     sx={{
//                       fontSize: 18,
//                       color: isArchiving ? "#bdbdbd" : "#5f6368",
//                     }}
//                   />
//                 ) : (
//                   <ArchiveIcon
//                     sx={{
//                       fontSize: 18,
//                       color: isArchiving ? "#bdbdbd" : "#5f6368",
//                     }}
//                   />
//                 )}
//               </IconButton>
//             </>
//           )}
//           <IconButton
//             size="small"
//             onClick={handleTrashToggle}
//             disabled={isTrashing}
//             data-action-button="true"
//           >
//             {isTrashed ? (
//               <RestoreFromTrashIcon
//                 sx={{
//                   fontSize: 18,
//                   color: isTrashing ? "#bdbdbd" : "#5f6368",
//                 }}
//               />
//             ) : (
//               <DeleteIcon
//                 sx={{
//                   fontSize: 18,
//                   color: isTrashing ? "#bdbdbd" : "#5f6368",
//                 }}
//               />
//             )}
//           </IconButton>
//           {isTrashed && (
//             <IconButton
//               size="small"
//               onClick={handleDeleteForever}
//               disabled={isDeleting}
//               sx={{ color: "#d32f2f" }}
//               data-action-button="true"
//             >
//               <DeleteForeverIcon
//                 sx={{
//                   fontSize: 18,
//                   color: isDeleting ? "#bdbdbd" : "inherit",
//                 }}
//               />
//             </IconButton>
//           )}
//         </Box>

//         <Popover
//           open={Boolean(colorAnchorEl)}
//           anchorEl={colorAnchorEl}
//           onClose={handleColorClose}
//           anchorOrigin={{
//             vertical: "bottom",
//             horizontal: "left",
//           }}
//           transformOrigin={{
//             vertical: "top",
//             horizontal: "left",
//           }}
//           onClick={(e) => e.stopPropagation()} // Prevent clicks inside popover from opening edit modal
//         >
//           <Box
//             sx={{
//               p: 1,
//               display: "flex",
//               flexWrap: "wrap",
//               gap: 0.5,
//               maxWidth: "220px",
//             }}
//             onClick={(e) => e.stopPropagation()} // Extra protection for clicks inside the box
//           >
//             {COLORS.map((colorOption) => (
//               <IconButton
//                 key={colorOption.name}
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent event bubbling
//                   handleColorChange(colorOption.value);
//                 }}
//                 sx={{
//                   width: 32,
//                   height: 32,
//                   backgroundColor: colorOption.value,
//                   border:
//                     color === colorOption.value
//                       ? "2px solid #000"
//                       : "1px solid #e0e0e0",
//                   "&:hover": {
//                     backgroundColor: colorOption.value,
//                     opacity: 0.8,
//                   },
//                 }}
//                 title={colorOption.name}
//               />
//             ))}
//           </Box>
//         </Popover>
//       </Paper>

//       <Modal
//         open={isEditModalOpen}
//         onClose={handleEditClose}
//         aria-labelledby="edit-note-modal"
//         aria-describedby="modal-to-edit-note"
//       >
//         <div>
//           <Notes2
//             editNote={{
//               id,
//               title,
//               note: content,
//               isPinned: false,
//             }}
//             onEdit={handleEditSave}
//             setExpanded={handleEditClose}
//             backgroundColor={color}
//           />
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default NotesThird;


"use client";

import { useState } from "react";
import {
  Paper,
  Typography,
  IconButton,
  Box,
  Popover,
  Modal,
} from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaletteIcon from "@mui/icons-material/Palette";
import ImageIcon from "@mui/icons-material/Image";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import Notes2 from "./NotesSecond";
import { useOutletContext } from "react-router-dom";

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
];

const NotesThird = ({
  title,
  content,
  id,
  isArchived = false,
  isTrashed = false,
  color = "#ffffff",
  onArchiveToggle,
  onTrashToggle,
  onDeleteForever,
  onColorChange,
  onEdit,
  fetchNotes,
}) => {
  const [hovered, setHovered] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [isTrashing, setIsTrashing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingColor, setIsChangingColor] = useState(false);
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [localColor, setLocalColor] = useState(color);
  const { isListView } = useOutletContext();

  // Update local color when prop changes
  if (color !== localColor) {
    setLocalColor(color);
  }

  const handleArchiveToggle = async (event) => {
    event.stopPropagation(); // Prevent edit modal from opening
    if (isArchiving) return;
    setIsArchiving(true);
    try {
      const token = localStorage.getItem("token");
      onArchiveToggle(id, !isArchived);
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
      });
      if (!response.data?.status?.success) {
        onArchiveToggle(id, isArchived);
      }
    } catch (error) {
      console.error("Error toggling archive status:", error);
      onArchiveToggle(id, isArchived);
    } finally {
      setIsArchiving(false);
    }
  };

  const handleTrashToggle = async (event) => {
    event.stopPropagation(); // Prevent edit modal from opening
    if (isTrashing) return;
    setIsTrashing(true);
    try {
      const token = localStorage.getItem("token");
      onTrashToggle(id, !isTrashed);
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
      });
      if (!response.data?.status?.success) {
        onTrashToggle(id, isTrashed);
      }
    } catch (error) {
      console.error("Error toggling trash status:", error);
      onTrashToggle(id, isTrashed);
    } finally {
      setIsTrashing(false);
    }
  };

  const handleDeleteForever = async (event) => {
    event.stopPropagation(); // Prevent edit modal from opening
    if (isDeleting) return;
    
    setIsDeleting(true);
    
    try {
      const token = localStorage.getItem("token");
      
      onDeleteForever(id);

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
      });

      if (!response.data?.status?.success) {
        onDeleteForever(id, true); // Revert if failed
      }
    } catch (error) {
      console.error("Error deleting note forever:", error);
      onDeleteForever(id, true); // Revert if failed
    } finally {
      setIsDeleting(false);
    }
  };

  const handleColorClick = (event) => {
    event.stopPropagation(); // Stop the event from propagating to the parent Paper
    setColorAnchorEl(event.currentTarget);
  };

  const handleColorClose = () => {
    setColorAnchorEl(null);
  };

  const handleColorChange = async (newColor, event) => {
    if (event) {
      event.stopPropagation();
    }
    
    if (isChangingColor) return;
    setIsChangingColor(true);
    handleColorClose();
    
    // Update local color immediately for a smooth transition
    setLocalColor(newColor);
    
    try {
      const token = localStorage.getItem("token");
      
      // Call the parent's onColorChange to update the state in the parent component
      onColorChange(id, newColor);
      
      const response = await axios({
        method: "post",
        url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: {
          noteIdList: [id],
          color: newColor,
        },
      });
      
      if (!response.data?.status?.success) {
        // If API call fails, revert to the original color
        setLocalColor(color);
        onColorChange(id, color);
      }
    } catch (error) {
      console.error("Error changing note color:", error);
      // If there's an error, revert to the original color
      setLocalColor(color);
      onColorChange(id, color);
    } finally {
      setIsChangingColor(false);
    }
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditClick = (event) => {
    // Only open the edit modal if the click didn't come from an action button
    if (!event.target.closest('[data-action-button="true"]')) {
      setIsEditModalOpen(true);
    }
  };

  const handleEditSave = async (editedNote) => {
    try {
      await onEdit(id, editedNote.title, editedNote.note); // Call onEdit to update the note
      handleEditClose(); // Close the modal after the note is updated
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Handler for action buttons to prevent event propagation
  const handleActionClick = (event) => {
    event.stopPropagation();
  };
  
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: isListView ? "580px" : "200px",
          height: "fit-content",
          margin: 2,
          padding: 2,
          paddingTop: 4, // Always reserve space for top icons
          paddingBottom: 5, // Always reserve space for bottom icons
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
        {/* Top action buttons - only visible on hover but space is always reserved */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            right: 8,
            display: "flex",
            justifyContent: "space-between",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <IconButton
            size="small"
            sx={{ padding: 0 }}
            data-action-button="true"
            onClick={handleActionClick}
          >
            <CheckCircleIcon sx={{ fontSize: 20, color: "#5f6368" }} />
          </IconButton>
          <IconButton
            size="small"
            sx={{ padding: 0 }}
            data-action-button="true"
            onClick={handleActionClick}
          >
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
        </Box>

        {/* Bottom action buttons - only visible on hover but space is always reserved */}
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
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          {!isTrashed && (
            <>
              <IconButton 
                size="small" 
                data-action-button="true"
                onClick={handleActionClick}
              >
                <NotificationsNoneIcon
                  sx={{ fontSize: 18, color: "#5f6368" }}
                />
              </IconButton>
              <IconButton 
                size="small" 
                data-action-button="true"
                onClick={handleActionClick}
              >
                <PersonAddIcon sx={{ fontSize: 18, color: "#5f6368" }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleColorClick}
                disabled={isChangingColor}
                data-action-button="true"
              >
                <PaletteIcon
                  sx={{
                    fontSize: 18,
                    color: isChangingColor ? "#bdbdbd" : "#5f6368",
                  }}
                />
              </IconButton>
              <IconButton 
                size="small" 
                data-action-button="true"
                onClick={handleActionClick}
              >
                <ImageIcon sx={{ fontSize: 18, color: "#5f6368" }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleArchiveToggle}
                disabled={isArchiving}
                data-action-button="true"
              >
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
            </>
          )}
          <IconButton
            size="small"
            onClick={handleTrashToggle}
            disabled={isTrashing}
            data-action-button="true"
          >
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
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside popover from opening edit modal
        >
          <Box
            sx={{
              p: 1,
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              maxWidth: "220px",
            }}
            onClick={(e) => e.stopPropagation()} // Extra protection for clicks inside the box
          >
            {COLORS.map((colorOption) => (
              <IconButton
                key={colorOption.name}
                onClick={(e) => handleColorChange(colorOption.value, e)}
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: colorOption.value,
                  border:
                    localColor === colorOption.value
                      ? "2px solid #000"
                      : "1px solid #e0e0e0",
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
    </>
  );
};

export default NotesThird;