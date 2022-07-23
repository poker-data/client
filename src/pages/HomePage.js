import React, { useEffect, useState } from "react";

import MenuAppBar from "../components/MenuAppBar";
import "./HomePage.css";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { getPlayerStats, useAuthDispatch, useAuthState } from '../Context'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PlayerStats from "../components/playerStats/PlayerStats";

function HomePage() {
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
      <Grid container spacing={3} sx={{ marginLeft: "2%", marginTop: "2%" }}>
        <PlayerStats/>
        
      </Grid>

      {/*  <Grid
        container
        // spacing={3}
        // direction="column"
        // alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid container item justifyContent="space-betwean" alignItems="center" xs={6}>
          <Card
            sx={{ width: "100%", height: "70%" }}
          // sx={{ minWidth: 275 }}
          >
            <CardContent>
               <Typography
                sx={{ fontSize: 18 }}
                color="text.secondary"
                gutterBottom
              >
                Metricas
              </Typography> 
              <HomeComissionPieChart invoices={invoices} />
            </CardContent>
          </Card>
        </Grid>
        <Grid container item justifyContent="center" alignItems="center" xs={6}>
          <Card
            sx={{ width: "100%", height: "70%" }}
          // sx={{ minWidth: 275 }}
          >
            <CardContent>
             <Typography
                sx={{ fontSize: 18 }}
                color="text.secondary"
                gutterBottom
              >
                Comisiones
              </Typography> 
              <HomeBarChart invoices={invoices} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
     */}
    </>
  );
}

export default HomePage;