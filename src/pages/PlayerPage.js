import React from "react";
import MenuAppBar from "../components/MenuAppBar";
import "./HomePage.css";
import Grid from '@mui/material/Grid';
import PlayerStats from "../components/playerStats/PlayerStats";

function PlayerPage() {

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
      <Grid container spacing={3} sx={{ marginLeft: "2%", marginTop: "2%" }}>
        <PlayerStats />
        
      </Grid>
    </>
  );
}

export default PlayerPage;