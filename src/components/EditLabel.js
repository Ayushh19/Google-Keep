


// import { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   TextField,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import LabelIcon from "@mui/icons-material/Label";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import CloseIcon from "@mui/icons-material/Close";
// import DoneIcon from "@mui/icons-material/Done";
// import axios from "axios";

// const EditLabels = () => {
//   const [labels, setLabels] = useState([]);
//   const [newLabelText, setNewLabelText] = useState("");
//   const [editingLabelId, setEditingLabelId] = useState(null);
//   const [editingLabelText, setEditingLabelText] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [labelToDelete, setLabelToDelete] = useState(null);
//   const [isAddingLabel, setIsAddingLabel] = useState(false);

//   useEffect(() => {
//     fetchLabels();
//   }, []);

//   const fetchLabels = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "https://fundoonotes.incubation.bridgelabz.com/api/noteLabels/getNoteLabelList",
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );
//       if (response.data?.data?.details) {
//         setLabels(response.data.data.details);
//       }
//     } catch (error) {
//       console.error("Error fetching labels:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAddLabel = async () => {
//     if (!newLabelText.trim()) return;

//     setIsAddingLabel(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios({
//         method: "post",
//         url: "https://fundoonotes.incubation.bridgelabz.com/api/noteLabels",
//         headers: {
//           Authorization: token,
//           "Content-Type": "application/json",
//         },
//         data: {
//           label: newLabelText,
//           isDeleted: false,
//           userId: localStorage.getItem("userId"),
//         },
//       });

//       if (response.data?.status?.success) {
//         setNewLabelText("");
//         fetchNotes(); // Refresh the notes to get the updated labels
//       }
//     } catch (error) {
//       console.error("Error adding label:", error);
//     } finally {
//       setIsAddingLabel(false);
//     }
//   };


//   const handleEditLabel = (labelId, labelText) => {
//     setEditingLabelId(labelId);
//     setEditingLabelText(labelText);
//     setIsEditing(true);
//   };

//   const handleSaveEdit = async () => {
//     if (!editingLabelText.trim()) return;
  
//     setLabels((prevLabels) =>
//       prevLabels.map((label) =>
//         label.id === editingLabelId ? { ...label, label: editingLabelText } : label
//       )
//     ); // Instant Update
  
//     setEditingLabelId(null);
//     setEditingLabelText("");
//     setIsEditing(true);
  
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         `https://fundoonotes.incubation.bridgelabz.com/api/noteLabels/${editingLabelId}/updateNoteLabel`,
//         { label: editingLabelText },
//         { headers: { Authorization: token, "Content-Type": "application/json" } }
//       );
  
//       if (response.data?.status?.success) {
//         fetchLabels(); // Fetch actual data to sync
//       }
//     } catch (error) {
//       console.error("Error updating label:", error);
//       fetchLabels(); // Sync data if an error occurs
//     } finally {
//       setIsEditing(false);
//     }
//   };
  
//   const handleCancelEdit = () => {
//     setEditingLabelId(null);
//     setEditingLabelText("");
//     setIsEditing(false);
//   };

//   const handleDeleteConfirm = (labelId, labelText) => {
//     setLabelToDelete({ id: labelId, label: labelText });
//     setDeleteConfirmOpen(true);
//   };

//   const handleDeleteLabel = async () => {
//     if (!labelToDelete) return;
  
//     setLabels((prevLabels) => prevLabels.filter((label) => label.id !== labelToDelete.id)); // Instant Removal
//     setDeleteConfirmOpen(false);
//     setIsDeleting(true);
  
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.delete(
//         `https://fundoonotes.incubation.bridgelabz.com/api/noteLabels/${labelToDelete.id}/deleteNoteLabel`,
//         { headers: { Authorization: token } }
//       );
  
//       if (response.data?.status?.success) {
//         fetchLabels(); // Sync data with server
//       }
//     } catch (error) {
//       console.error("Error deleting label:", error);
//       fetchLabels(); // Sync data if an error occurs
//     } finally {
//       setIsDeleting(false);
//       setLabelToDelete(null);
//     }
//   };
  

//   return (
//     <Box sx={{ p: 3, maxWidth: 600, margin: "0 auto", mt: 4 }}>
//       <Typography variant="h5" sx={{ mb: 3 }}>
//         Edit labels
//       </Typography>
      
//       {/* Add new label */}
//       <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//         <IconButton>
//           <AddIcon />
//         </IconButton>
//         <TextField
//           fullWidth
//           placeholder="Create new label"
//           value={newLabelText}
//           onChange={(e) => setNewLabelText(e.target.value)}
//           variant="standard"
//           sx={{ mx: 1 }}
//         />
//         <IconButton 
//           onClick={handleAddLabel} 
//           disabled={!newLabelText.trim() || isAddingLabel}
//         >
//           {isAddingLabel ? <CircularProgress size={24} /> : <DoneIcon />}
//         </IconButton>
//       </Box>
      
//       {/* Labels list */}
//       {isLoading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <List>
//           {labels.map((label) => (
//             <ListItem
//               key={label.id}
//               sx={{
//                 borderBottom: "1px solid #e0e0e0",
//                 py: 1,
//               }}
//             >
//               <ListItemIcon>
//                 <LabelIcon />
//               </ListItemIcon>
              
//               {editingLabelId === label.id ? (
//                 <>
//                   <TextField
//                     fullWidth
//                     value={editingLabelText}
//                     onChange={(e) => setEditingLabelText(e.target.value)}
//                     variant="standard"
//                     autoFocus
//                     sx={{ mx: 1 }}
//                   />
//                   <IconButton onClick={handleCancelEdit}>
//                     <CloseIcon />
//                   </IconButton>
//                   <IconButton 
//                     onClick={handleSaveEdit}
//                     disabled={!editingLabelText.trim() || isEditing}
//                   >
//                     {isEditing ? <CircularProgress size={24} /> : <DoneIcon />}
//                   </IconButton>
//                 </>
//               ) : (
//                 <>
//                   <ListItemText primary={label.label} />
//                   <IconButton onClick={() => handleEditLabel(label.id, label.label)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleDeleteConfirm(label.id, label.label)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </>
//               )}
//             </ListItem>
//           ))}
//         </List>
//       )}
      
//       {/* Delete confirmation dialog */}
//       <Dialog
//         open={deleteConfirmOpen}
//         onClose={() => setDeleteConfirmOpen(false)}
//       >
//         <DialogTitle>Delete label</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete the label "{labelToDelete?.label}"?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
//           <Button 
//             onClick={handleDeleteLabel} 
//             color="error"
//             disabled={isDeleting}
//           >
//             {isDeleting ? <CircularProgress size={24} /> : "Delete"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default EditLabels;




import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import LabelIcon from "@mui/icons-material/Label";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";

const EditLabels = () => {
  const [labels, setLabels] = useState([]);
  const [newLabelText, setNewLabelText] = useState("");
  const [editingLabelId, setEditingLabelId] = useState(null);
  const [editingLabelText, setEditingLabelText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [labelToDelete, setLabelToDelete] = useState(null);
  const [isAddingLabel, setIsAddingLabel] = useState(false);

  useEffect(() => {
    fetchLabels();
  }, []);

  const fetchLabels = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://fundoonotes.incubation.bridgelabz.com/api/noteLabels/getNoteLabelList",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data?.data?.details) {
        setLabels(response.data.data.details);
      }
    } catch (error) {
      console.error("Error fetching labels:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLabel = async () => {
    if (!newLabelText.trim()) return;
  
    setIsAddingLabel(true);
    const tempId = Date.now().toString(); // Temporary ID for UI update
  
    // Optimistically update UI
    const newLabel = { id: tempId, label: newLabelText, isDeleted: false };
    setLabels((prevLabels) => [...prevLabels, newLabel]); // Update UI immediately
    setNewLabelText("");
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://fundoonotes.incubation.bridgelabz.com/api/noteLabels",
        {
          label: newLabelText,
          isDeleted: false,
          userId: localStorage.getItem("userId"),
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data?.status?.success) {
        setLabels((prevLabels) =>
          prevLabels.map((label) =>
            label.id === tempId ? { ...label, id: response.data.data.id } : label
          )
        ); // Update label with actual backend ID
      } else {
        fetchLabels(); // Fallback if API fails
      }
    } catch (error) {
      console.error("Error adding label:", error);
      fetchLabels(); // Sync labels if error occurs
    } finally {
      setIsAddingLabel(false);
    }
  };
  


  const handleEditLabel = (labelId, labelText) => {
    setEditingLabelId(labelId);
    setEditingLabelText(labelText);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!editingLabelText.trim()) return;
  
    setLabels((prevLabels) =>
      prevLabels.map((label) =>
        label.id === editingLabelId ? { ...label, label: editingLabelText } : label
      )
    ); // Instant Update
  
    setEditingLabelId(null);
    setEditingLabelText("");
    setIsEditing(true);
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://fundoonotes.incubation.bridgelabz.com/api/noteLabels/${editingLabelId}/updateNoteLabel`,
        { label: editingLabelText },
        { headers: { Authorization: token, "Content-Type": "application/json" } }
      );
  
      if (response.data?.status?.success) {
        fetchLabels(); // Fetch actual data to sync
      }
    } catch (error) {
      console.error("Error updating label:", error);
      fetchLabels(); // Sync data if an error occurs
    } finally {
      setIsEditing(false);
    }
  };
  
  const handleCancelEdit = () => {
    setEditingLabelId(null);
    setEditingLabelText("");
    setIsEditing(false);
  };

  const handleDeleteConfirm = (labelId, labelText) => {
    setLabelToDelete({ id: labelId, label: labelText });
    setDeleteConfirmOpen(true);
  };

  const handleDeleteLabel = async () => {
    if (!labelToDelete) return;
  
    setLabels((prevLabels) => prevLabels.filter((label) => label.id !== labelToDelete.id)); // Instant Removal
    setDeleteConfirmOpen(false);
    setIsDeleting(true);
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://fundoonotes.incubation.bridgelabz.com/api/noteLabels/${labelToDelete.id}/deleteNoteLabel`,
        { headers: { Authorization: token } }
      );
  
      if (response.data?.status?.success) {
        fetchLabels(); // Sync data with server
      }
    } catch (error) {
      console.error("Error deleting label:", error);
      fetchLabels(); // Sync data if an error occurs
    } finally {
      setIsDeleting(false);
      setLabelToDelete(null);
    }
  };
  

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: "0 auto", mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Edit labels
      </Typography>
      
      {/* Add new label */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton>
          <AddIcon />
        </IconButton>
        <TextField
          fullWidth
          placeholder="Create new label"
          value={newLabelText}
          onChange={(e) => setNewLabelText(e.target.value)}
          variant="standard"
          sx={{ mx: 1 }}
        />
        <IconButton 
          onClick={handleAddLabel} 
          disabled={!newLabelText.trim()|| isAddingLabel}
        >
          {isAddingLabel ? <CircularProgress size={24} /> : <DoneIcon />}
        </IconButton>
      </Box>
      
      {/* Labels list */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {labels.map((label) => (
            <ListItem
              key={label.id}
              sx={{
                borderBottom: "1px solid #e0e0e0",
                py: 1,
              }}
            >
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>
              
              {editingLabelId === label.id ? (
                <>
                  <TextField
                    fullWidth
                    value={editingLabelText}
                    onChange={(e) => setEditingLabelText(e.target.value)}
                    variant="standard"
                    autoFocus
                    sx={{ mx: 1 }}
                  />
                  <IconButton onClick={handleCancelEdit}>
                    <CloseIcon />
                  </IconButton>
                  <IconButton 
                    onClick={handleSaveEdit}
                    disabled={!editingLabelText.trim() || isEditing}
                  >
                    {isEditing ? <CircularProgress size={24} /> : <DoneIcon />}
                  </IconButton>
                </>
              ) : (
                <>
                  <ListItemText primary={label.label} />
                  <IconButton onClick={() => handleEditLabel(label.id, label.label)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteConfirm(label.id, label.label)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </ListItem>
          ))}
        </List>
      )}
      
      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Delete label</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the label "{labelToDelete?.label}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleDeleteLabel} 
            color="error"
            disabled={isDeleting}
          >
            {isDeleting ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditLabels;