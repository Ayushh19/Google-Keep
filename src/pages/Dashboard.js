
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PrimarySearchAppBar from "../components/Header";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isListView, setIsListView] = useState(false); // State for list view

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  // Function to toggle between grid and list views
  const toggleView = () => {
    setIsListView(!isListView);
  };

  return (
    <>
      {/* Pass toggleView to Header */}
      <PrimarySearchAppBar toggleDrawer={toggleDrawer} toggleView={toggleView} />
      <Sidebar open={drawerOpen} onClose={toggleDrawer} />
      <div style={{ padding: "20px" }}>
        {/* Pass isListView to NoteInput via Outlet context */}
        <Outlet context={{ isListView }} />
      </div>
    </>
  );
};

export default Dashboard;