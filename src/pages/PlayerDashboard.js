import React from "react";

import "./PlayerDashboard.css";
import MenuAppBar from "../components/MenuAppBar";
import { useAuthDispatch, useAuthState } from '../Context'
import Grid from '@mui/material/Grid';
import PlayersDT from "../components/playerStats/PlayersDT";
import LineChart from "../components/charts/LineChart";



function PlayerDashboard() {
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
      <Grid container spacing={3} sx={{ marginLeft: "2%", marginTop: "2%"}}>
        <Grid item xs={11}>
          <PlayersDT/>
        </Grid> 
        <Grid item xs={8} >
          <LineChart 
          title="Total"
          data= {state.playerWithFilter.data ? state.playerWithFilter.data : []}
          />
        </Grid>
      </Grid>  

      {}
    </>
  );
}

export default PlayerDashboard;