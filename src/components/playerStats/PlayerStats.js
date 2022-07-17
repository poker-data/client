import React from "react";
import Grid from '@mui/material/Grid';
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { getPlayerStats, useAuthDispatch } from "../../Context";

export default function PlayerStats() {
    
    let dispatch = useAuthDispatch();

    const resetPlayerStats = async () => {
        let response = await getPlayerStats(dispatch, "TacoAlPastor");
        console.log(response);
        //console.log(state)
        return response
      }

    const rows = [
        { id: 1, col1: 'Hello', col2: 'World' },
        { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
        { id: 3, col1: 'MUI', col2: 'is Amazing' },
      ];
    
      const columns = [
        { field: 'col1', headerName: 'Column 1', width: 150 },
        { field: 'col2', headerName: 'Column 2', width: 150 },
      ];

  return (
    <Grid >
      <h1>Player Stats</h1>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
      <Button variant="contained" color="primary" onClick={resetPlayerStats}>
          Reset player info
        </Button>
    </Grid>
  );
}