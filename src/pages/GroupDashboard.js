import React from "react";
import "./GroupDashboard.css";
import MenuAppBar from "../components/MenuAppBar";
import { useAuthDispatch, useAuthState } from '../context'
import Grid from '@mui/material/Grid';
import GroupsDT from "../components/groupStats/GroupsDT";
import LineChart from "../components/charts/LineChart";


function GroupDashboard() {
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
          <GroupsDT/>
        </Grid>  
        <Grid item xs={8}>
          <LineChart 
          title="Total"
          data= {state.defaultGroupFilteredList.data ? state.defaultGroupFilteredList.data : []}
          />
        </Grid>
      </Grid>

      {}
    </>
  );
}

export default GroupDashboard;