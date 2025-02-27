


// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import PrimarySearchAppBar from "../components/Header";
// import Sidebar from "../components/Sidebar";

// const Dashboard = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);

//   return (
//     <>
//       <PrimarySearchAppBar toggleDrawer={toggleDrawer} />
//       <Sidebar open={drawerOpen} onClose={toggleDrawer} />
//       <div style={{ padding: "20px" }}>
//         <Outlet />  
//       </div>
//     </>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PrimarySearchAppBar from "../components/Header";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true); // State to manage grid/list view

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleViewChange = (isGridView) => {
    setIsGridView(isGridView);
  };

  return (
    <>
      <PrimarySearchAppBar toggleDrawer={toggleDrawer} onViewChange={handleViewChange} />
      <Sidebar open={drawerOpen} onClose={toggleDrawer} />
      <div style={{ padding: "20px" }}>
        <Outlet context={[isGridView]} />  
      </div>
    </>
  );
};

export default Dashboard;