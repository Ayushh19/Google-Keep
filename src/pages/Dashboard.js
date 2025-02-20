

import React, { useState } from "react";
import PrimarySearchAppBar from "../components/Header"; 
import Sidebar from "../components/sidebar";
import NoteInput from "../components/NoteInput";


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
      </div>
    </>
  );
};

export default Dashboard;
