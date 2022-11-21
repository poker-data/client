import React from "react";
import "./PlayerDashboard.css";
import MenuAppBar from "../components/MenuAppBar";
import Grid from '@mui/material/Grid';

function RoomDashboard() {
  const [sidebarVisible, setSidebarVisible] = React.useState(false);

  const toggleSidebar = () => {
    if (!sidebarVisible) {
      setSidebarVisible(true);
    } else {
      setSidebarVisible(false);
    }
  };



  return (
    <>
      <MenuAppBar handleBtnClick={toggleSidebar} />
      <Grid container spacing={2} sx={{ marginLeft: "2%", marginTop: "2%"}}>
        
        
      </Grid>
      

      {}
    </>
  );
}

export default RoomDashboard;