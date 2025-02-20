


// import React, { useState } from "react";
// import { TextField, Paper, IconButton, Box } from "@mui/material";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import BrushIcon from "@mui/icons-material/Brush";
// import ImageIcon from "@mui/icons-material/Image";
// import Notes2 from "./NotesSecond"; // Import expanded view

// const NoteInput = ({ addNote }) => {
//   const [expanded, setExpanded] = useState(false); // Track expansion

//   return expanded ? (
//     <Notes2 addNote={addNote} setExpanded={setExpanded} />
//   ) : (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         marginTop: "80px", // Adjust based on header
//         marginLeft: "250px", // Adjust based on sidebar
//         width: "calc(100% - 250px)", // Full width minus sidebar
//       }}
//     >
//       <Paper
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           padding: "2px 16px",
//           width: "600px",
//           borderRadius: "8px",
//           boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
//           cursor: "pointer",
//         }}
//         onClick={() => setExpanded(true)} // Expand on click
//       >
//         <TextField
//           fullWidth
//           variant="standard"
//           placeholder="Take a note..."
//           InputProps={{ disableUnderline: true }}
//           sx={{
//             fontSize: "16px",
//             "&::placeholder": {
//               fontSize: "16px",
//               color: "#757575",
//             },
//           }}
//         />
//         <IconButton>
//           <CheckBoxIcon sx={{ color: "#5f6368" }} />
//         </IconButton>
//         <IconButton>
//           <BrushIcon sx={{ color: "#5f6368" }} />
//         </IconButton>
//         <IconButton>
//           <ImageIcon sx={{ color: "#5f6368" }} />
//         </IconButton>
//       </Paper>
//     </Box>
//   );
// };

// export default NoteInput;


import React, { useState } from "react";
import { TextField, Paper, IconButton, Box } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BrushIcon from "@mui/icons-material/Brush";
import ImageIcon from "@mui/icons-material/Image";
import Notes2 from "./NotesSecond"; // Expanded view
import NotesThird from "./NotesThird"; // Notes display

const NoteInput = () => {
  const [expanded, setExpanded] = useState(false); // Track expansion
  const [notes, setNotes] = useState([]); // Store notes

  const addNote = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]); // Add new note
  };

  return (
    <>
      {expanded ? (
        <Notes2 addNote={addNote} setExpanded={setExpanded} />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "80px", // Adjust based on header
            marginLeft: "250px", // Adjust based on sidebar
            width: "calc(100% - 250px)", // Full width minus sidebar
          }}
        >
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "2px 16px",
              width: "600px",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              cursor: "pointer",
            }}
            onClick={() => setExpanded(true)} // Expand on click
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder="Take a note..."
              InputProps={{ disableUnderline: true }}
              sx={{
                fontSize: "16px",
                "&::placeholder": {
                  fontSize: "16px",
                  color: "#757575",
                },
              }}
            />
            <IconButton>
              <CheckBoxIcon sx={{ color: "#5f6368" }} />
            </IconButton>
            <IconButton>
              <BrushIcon sx={{ color: "#5f6368" }} />
            </IconButton>
            <IconButton>
              <ImageIcon sx={{ color: "#5f6368" }} />
            </IconButton>
          </Paper>
        </Box>
      )}

      {/* Display NotesThird for Each Note */}
      <Box sx={{ display: "flex", flexWrap: "wrap", marginLeft: "250px", marginTop: "20px" }}>
        {notes.map((note, index) => (
          <NotesThird key={index} title={note.title} content={note.note} />
        ))}
      </Box>
    </>
  );
};

export default NoteInput;
