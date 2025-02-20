

import React, { useState } from "react";
import PrimarySearchAppBar from "../components/Header"; 
import Sidebar from "../components/sidebar";
import NoteInput from "../components/NoteInput";
import NotesGrid from "../components/NotesGrid"; 
import NotesThird from "../components/NotesThird";

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <PrimarySearchAppBar toggleDrawer={toggleDrawer} />
      <Sidebar open={drawerOpen} onClose={toggleDrawer} />
      <div style={{ padding: "20px" }}>
        <NoteInput />
       
        {/* <NotesGrid notes={notes} /> */}
      </div>
    </>
  );
};

export default Dashboard;
