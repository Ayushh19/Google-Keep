import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import NotesThird from "./NotesThird";
import { useOutletContext } from "react-router-dom";

const ReminderNotes = () => {
  const [notes, setNotes] = useState([]);
  const [labels, setLabels] = useState([]);
  const { isListView, searchQuery } = useOutletContext();

  useEffect(() => {
    fetchNotes();
    fetchLabels();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://fundoonotes.incubation.bridgelabz.com/api/notes/getReminderNotesList",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data?.data?.data) {
        setNotes(response.data.data.data);
      }
    } catch (error) {
      console.error("Error fetching reminder notes:", error);
    }
  };

  const fetchLabels = async () => {
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
    }
  };

  const handleArchiveToggle = (noteId, isArchived) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  const handleTrashToggle = (noteId, isTrashed) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  const handleDeleteForever = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  const handleColorChange = (noteId, newColor) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, color: newColor } : note
      )
    );
  };

  const handleLabelChange = (noteId, newLabels) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, noteLabels: newLabels } : note
      )
    );
  };

  const handleEditNote = async (noteId, editedTitle, editedContent) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? { ...note, title: editedTitle, description: editedContent }
          : note
      )
    );

    try {
      const token = localStorage.getItem("token");
      await axios({
        method: "post",
        url: "https://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: {
          noteId: noteId,
          title: editedTitle,
          description: editedContent,
        },
      });
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: "250px",
        marginTop: "80px",
        width: "calc(100% - 250px)",
      }}
    >
      {/* <Typography variant="h5" sx={{ mb: 4 }}>
        Notes with Reminders
      </Typography> */}

      <Box
        sx={{
          display: "flex",
          flexWrap: isListView ? "nowrap" : "wrap",
          flexDirection: isListView ? "column" : "row",
          alignItems: isListView ? "center" : "flex-start",
          width: "100%",
        }}
      >
        {filteredNotes.map((note) => (
          <NotesThird
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.description}
            color={note.color}
            noteLabels={note.noteLabels || []}
            reminder={note.reminder}
            isArchived={false}
            isTrashed={false}
            onArchiveToggle={handleArchiveToggle}
            onTrashToggle={handleTrashToggle}
            onDeleteForever={handleDeleteForever}
            onColorChange={handleColorChange}
            onLabelChange={handleLabelChange}
            onEdit={handleEditNote}
            fetchNotes={fetchNotes}
            availableLabels={labels}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ReminderNotes;