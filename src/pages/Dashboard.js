


import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PrimarySearchAppBar from "../components/Header";
import Sidebar from "../components/sidebar";

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <PrimarySearchAppBar toggleDrawer={toggleDrawer} />
      <Sidebar open={drawerOpen} onClose={toggleDrawer} />
      <div style={{ padding: "20px" }}>
        <Outlet />  
      </div>
    </>
  );
};

export default Dashboard;
