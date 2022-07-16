import React, { useEffect, useState } from "react";

import MenuAppBar from "../components/MenuAppBar";
import "./HomePage.css";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
 import  { getPlayerStats,useAuthDispatch , useAuthState} from '../Context'

function HomePage() {
  const state = useAuthState();
  const dispatch = useAuthDispatch();
useEffect(async() => {
  let response = await getPlayerStats(dispatch, "TacoAlPastor");
  //console.log(response);
  //console.log(state)
}, []);

   const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];
  
   const columns = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];
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

      <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>

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