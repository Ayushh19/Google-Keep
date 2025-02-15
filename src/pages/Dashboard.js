import React, { useState } from "react";
import PrimarySearchAppBar from "../components/Header"; 
import Sidebar from "../components/Sidebar";
import NoteInput from "../components/NoteInput";
import NotesGrid from "../components/NotesGrid"; 

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const addNote = (note) => setNotes([...notes, note]);
  const deleteNote = (noteToDelete) => {
    setNotes(notes.filter((note) => note !== noteToDelete));
  };

  return (
    <>
      
      <PrimarySearchAppBar toggleDrawer={toggleDrawer} />
      
      <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <div style={{ padding: "20px" }}>
        <NoteInput addNote={addNote} />
        <NotesGrid notes={notes} deleteNote={deleteNote} />
      </div>
    </>
  );
};

export default Dashboard;
