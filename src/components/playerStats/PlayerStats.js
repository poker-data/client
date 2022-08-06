import React from "react";
import Grid from '@mui/material/Grid';
import { DataGrid, } from "@mui/x-data-grid";
import { Button, Stack, Select, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { getPlayerStats, useAuthDispatch, getPlayers, useAuthState, getPlayerByFilter } from "../../Context";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import NativeSelect from '@mui/material/NativeSelect';

export default function PlayerStats() {
  const initialPlayerState = Object.freeze({ playerName: "", _id: "" })
  const initialDateState = Object.freeze({ from: '', to: '' })

  const [playerList, setPlayerList] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(initialDateState);
  const [player, setPlayer] = React.useState(initialPlayerState);

  const state = useAuthState();
  let dispatch = useAuthDispatch();

  const handlePlayerIDChange = (e) => {
    const filterSelectedPlayer = playerList.filter(player => player._id === e.target.value);
    setPlayer({
      ...player,
      playerName: filterSelectedPlayer[0].playerName,
      _id: filterSelectedPlayer[0]._id
    })
  };

  React.useEffect(async () => {
    await getPlayers(dispatch);
  }, []);

  React.useEffect(() => {
    state.players.length ? setPlayerList(state.players) : setPlayerList([]);
  }, [state, selectedDate, player]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateFrom = selectedDate.from !== "" ? selectedDate.from.getTime() : null;
    const dateTo = selectedDate.to !== "" ? selectedDate.to.getTime() : null;
    const options = {
      _id: player._id,
      playerName: player.playerName,
      dateFrom: dateFrom,
      dateTo: dateTo
    }
    console.log("objectTodb: ", options);
    const response = await getPlayerByFilter(dispatch, options);
    console.log("response: ", response);
  }


  const rows = playerList?.map((player) => {
    return { id: player._id, Name: player.playerName, shkUsername: player.shkUsername }
  })


  const columns = [
    { field: 'Name', headerName: 'Name', width: 150 },
    { field: 'shkUsername', headerName: 'shkUsername', width: 150 },
  ];

  return (
    <Grid >
      <h1>Filtrados</h1>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"> Jugador</InputLabel>
          <NativeSelect
            defaultValue={player.playerName}
            inputProps={{
              name: 'Jugador',
              id: 'uncontrolled-native',
            }}
            label="Jugadores"
            onChange={handlePlayerIDChange}
            sx={{ margin: "3%", padding: '3%', color: 'black' }}
          >
            {playerList.length > 1 ? playerList.map((player) => { return (<option key={player._id} value={player._id}> {player.playerName} </option>) }) : <option value="">No hay jugadores (actualizar)</option>}

          </NativeSelect>
          <Stack>
            <Stack sx={{ display: "flex", flexDirection: "row" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Seleccionar fecha desde"
                  value={selectedDate.from}
                  onChange={(newDate) => {
                    setSelectedDate({ ...selectedDate, from: newDate })
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Seleccionar fecha hasta"
                  value={selectedDate.to}
                  onChange={(newDate) => {
                    setSelectedDate({ ...selectedDate, to: newDate })
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>

            <Button variant="contained" color="primary" sx={{ margin: "3%" }} onClick={handleSubmit} disabled={player._id ? false : true}>
              aplicar filtro
            </Button>
          </Stack>
        </FormControl>
      </Box>
    </Grid>
  );
}