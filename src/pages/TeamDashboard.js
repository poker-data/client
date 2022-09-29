import React from "react";

import "./PlayerDashboard.css";
import MenuAppBar from "../components/MenuAppBar";
import { useAuthDispatch, useAuthState } from '../Context'
import Grid from '@mui/material/Grid';
import PlayerAnnualTab from "../components/playerStats/PlayerAnnualTab";
import PlayerMonthlyTab from "../components/playerStats/PlayerMonthlyTab";
import PlayerWeeklyTab from "../components/playerStats/PlayerWeeklyTab";
import RoomAnnualTab from "../components/roomStats/RoomAnnualTab";
import RoomMonthlylTab from "../components/roomStats/RoomMonthlyTab";

function TeamDashboard() {
  const state = useAuthState();
  const dispatch = useAuthDispatch();


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
        <Grid item xs={3}>
          <PlayerAnnualTab/>
        </Grid>
        <Grid item xs={3}>
          <PlayerMonthlyTab/>
        </Grid>
        <Grid item xs={3}>
          <PlayerWeeklyTab/>
        </Grid>
        <Grid item xs={5}>
          <RoomAnnualTab/>
        </Grid>
        <Grid item xs={5}>
          <RoomMonthlylTab/>
        </Grid>
        
      </Grid>
      

      {}
    </>
  );
}

export default TeamDashboard;