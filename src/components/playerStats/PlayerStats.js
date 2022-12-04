import React from "react";
import Grid from '@mui/material/Grid';
import { DataGrid, } from "@mui/x-data-grid";
import { Button, Stack, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {  useAuthDispatch, 
  getPlayers, 
  useAuthState, 
  getPlayerByFilter, 
  getRooms, 
  setNewPlayer,
  getUsers
} from "../../context";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import NativeSelect from '@mui/material/NativeSelect';
import AddIcon from '@mui/icons-material/Add';
import Popup from '../utils/Popup';
import PlayerForm from './PlayerForm';
import { useHistory } from 'react-router-dom';

export default function PlayerStats() {
  const history = useHistory();
  const [openPopup, setOpenPopup] = React.useState(false)
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: 'error' })
  const initialPlayerState = Object.freeze({ playerName: "", _id: "", shkUsername: "" })
  const initialRoomState = Object.freeze({ roomName: "", _id: "" })
  const initialDateState = Object.freeze({ from: '', to: '' })

  const [playerList, setPlayerList] = React.useState([]);
  const [roomList, setRoomList] = React.useState([]);

  const [selectedDate, setSelectedDate] = React.useState(initialDateState);
  const [player, setPlayer] = React.useState(initialPlayerState);
  const [room, setRoom] = React.useState(initialRoomState);

  const state = useAuthState();
  let dispatch = useAuthDispatch();

  const handlePlayerIDChange = (e) => {
    const filterSelectedPlayer = playerList.filter(player => player._id === e.target.value);
    setPlayer({
      ...player,
      playerName: filterSelectedPlayer[0].playerName,
      _id: filterSelectedPlayer[0]._id,
      shkUsername: filterSelectedPlayer[0].shkUsername,
    })
  };


  const handleRoomChange = (e) => {
    const filterSelectedRoom = roomList.filter(room => room.room === e.target.value);
    setRoom({
      ...room,
      roomName: filterSelectedRoom[0].room
    })

  }
 
  React.useEffect(async () => {
    await getPlayers(dispatch);
    await getUsers(dispatch);
    await getRooms(dispatch);
  }, []);


  React.useEffect(() => {
    state.users.length ? setPlayerList(state.users) : setPlayerList([]);
  }, [state, selectedDate, player]);

  React.useEffect(() => {
    state.rooms.length ? setRoomList(state.rooms) : setRoomList([]);
  }, [state, room]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateFrom = selectedDate.from !== "" ? selectedDate.from.getTime() : null;
    const dateTo = selectedDate.to !== "" ? selectedDate.to.getTime() : null;

    const options = {
      _id: player._id,
      playerName: player.name,
      shkUsername: player.shkUsername,
      dateFrom: dateFrom,
      dateTo: dateTo,
      roomName: room.roomName
    }
    const response = await getPlayerByFilter(dispatch, options);
    history.push('/playerdashboard');
  }


  const rows = playerList?.map((player) => {
    return { id: player._id, Name: player.name, shkUsername: player.shkUsername }
  })


  const columns = [
    { field: 'Name', headerName: 'Nombre', width: 200 },
    { field: 'shkUsername', headerName: 'Usuario Shk', width: 200 },
  ];

  //addPlayer
  const addPlayer = (values) => {

    if (window.confirm('Esta seguro que desea crear el usuario?')) {
      setNewPlayer(values);
      setOpenPopup(false)
    }
    else {
      setNotify({
        isOpen: true,
        message: 'Usuario no agregado',
        type: 'error'
      })
      setOpenPopup(false)
    }
  }



  return (

    <Grid container spacing={2} >
      <Grid item xs={4} >
        <Stack sx={{ margin: "0.9%" }}>
          <h1 style={{ color: "#ffffff", fontFamily:"Barlow", textAlign:'center' }}>Jugadores</h1>
          <div style={{ height: 640, width: '100%' }}>
            <DataGrid
              sx={{  
                    border: 1,
                    flex: '1 1 100%',
                    fontFamily:"Barlow",
                    textAlign: 'center',
                    background: "#d3d3d3",
                    color: "#000000",
                    "& .MuiDataGrid-columnHeaderTitle": {fontWeight:"bold"} }}
              rows={rows} columns={columns}
            />
          </div>
        </Stack>
      </Grid>

      <Box sx={{ minWidth: 120, margin: "1.9%"}}>
        <h1 style={{ color: "#ffffff", fontFamily:"Barlow", textAlign:'center' }}>Obtener Estadisticas</h1>
        <FormControl sx={{ border: 1, flex: '1 1 100%', textAlign: 'center', background: "#d3d3d3", color: "#111315" }} fullWidth>
          <InputLabel id="demo-simple-select-label"> Jugador</InputLabel>
          <NativeSelect
            defaultValue=''
            inputProps={{
              name: 'Jugador',
              id: 'uncontrolled-native',
            }}
            label="Jugadores"
            onChange={handlePlayerIDChange}
            sx={{ margin: "2%", padding: '2%', background: "#d3d3d3", borderRadius: 1, color: "#000000" }}
          >
            {<option value={player.shkUsername}></option>}
            {playerList.length > 0 ? playerList.map((player) => { return (<option key={player._id} value={player._id}> {player.shkUsername} </option>) }) : <option value="">No hay jugadores (actualizar)</option>}
          </NativeSelect>
          <Stack sx={{ margin: "2%", background: "#d3d3d3", color: "#000000", borderRadius: 2 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1 }}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select date from"
                  value={selectedDate.from ? selectedDate.from : null}
                  onChange={(newDate) => {
                    setSelectedDate({ ...selectedDate, from: newDate })
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select date to"
                  value={selectedDate.to ? selectedDate.to : null}
                  onChange={(newDate) => {
                    setSelectedDate({ ...selectedDate, to: newDate })
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sala</InputLabel>
              <NativeSelect
                defaultValue=''
                inputProps={{
                  name: 'Salas',
                  id: 'uncontrolled-native',
                }}
                label="Salas"
                onChange={handleRoomChange}
                sx={{ margin: "3%", padding: '3%' }}
              >
                {<option value={room.roomName}></option>}
                {roomList.length > 0 ? roomList.map((room) => { return (<option key={room.room} value={room.room}> {room.room} </option>) }) : <option value="">No hay salas (seleccionar)</option>}

              </NativeSelect>
            </FormControl>
          </Stack >
          <Stack sx={{ background:"#111315", display: "flex", flexDirection: "row"}}>
            {/* <FormGroup>
              <FormControlLabel sx={{ color:"#454545"}}control={<Checkbox defaultChecked />} label="Clear Filter" />
             </FormGroup> */}
            <Button variant="contained" color="primary" 
            sx={{ fontWeight: 'bold',
             border: 1,
             borderColor: "#111315",
             margin: "3%",
             backgroundColor: '#2debab',
             color: '#111315',
             fontFamily:"Barlow",
            "&:hover": {borderColor:"#2debab", background:"#2debab"}}} 
            onClick={handleSubmit} disabled={(player._id ? false : true) && room.roomName === ""}>
              Apply
            </Button>
            <Button
              className="add"
              variant="contained"
              color="primary"
              sx={{ 
                fontWeight: 'bold',
                border: 1,
                borderColor: "#111315",
                margin: "3%", 
                backgroundColor: '#2debab',
                color: '#111315',
                fontFamily:"Barlow",
                "&:hover": {borderColor:"#2debab", background:"#2debab"} }}

              startIcon={<AddIcon />}
              onClick={() => setOpenPopup(true)}
            >Add Player</Button>
          </Stack>
        </FormControl>
        <Popup
          title="Ingresar Datos"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <PlayerForm
            addPlayer={addPlayer}
          />
        </Popup>
      </Box>
    </Grid>
  );
}