import React from "react";
import Grid from '@mui/material/Grid';
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { getPlayerStatsWithFilters, useAuthDispatch } from "../../Context";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function PlayerStats() {
  let dispatch = useAuthDispatch();

  const [values, setValues] = React.useState({
    playerName: '',
    date: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.value)
  }
  const resetPlayerStats = async () => {



    let response = await getPlayerStatsWithFilters(dispatch, "TacoAlPastor");
    //console.log(response);
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
    <Grid sx={{
      height: "100%",
      width: "100%"
    }}>
      <h1>Player Stats</h1>

      <Box
        component="form"
        sx={{
          padding: "5%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "right"
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="standard-basic" label="Buscar jugador" variant="standard" 
        name="playerName"
        sx={{ padding: "2%" }} 
        onChange={handleChange}
        />
        <Button variant="contained" color="primary"
          sx={{ padding: "2%", height: "30%" }}
          value={values.playerName}
          onClick={handleSubmit}
        >
          Buscar
        </Button>
      </Box>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>

    </Grid>
  );
}