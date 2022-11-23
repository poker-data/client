import React from "react";
import "./TournamentsPage.css";
import MenuAppBar from "../components/MenuAppBar";
import Grid from '@mui/material/Grid';
import TournamentStats from "../components/tournamentsStats/TournamentStats";

function TournamentsPage() {

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
      <Grid container spacing={2} sx={{ marginLeft: "1%"}}>
        
        <TournamentStats/>
    
      </Grid>
      

      {}
    </>
  );
}

export default TournamentsPage;