import React from "react";
import Grid from '@mui/material/Grid';
import { DataGrid, } from "@mui/x-data-grid";
import { Button, Stack, Select, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { getPlayerStats, useAuthDispatch, getPlayers, useAuthState, getPlayerByFilter, getRooms, setNewPlayer } from "../../Context";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import NativeSelect from '@mui/material/NativeSelect';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import Popup from '../utils/Popup';
import PlayerForm from './PlayerForm';

export default function PlayerStats() {
  const [openPopup, setOpenPopup] = React.useState(false)
  const [notify, setNotify] = React.useState({isOpen:false, message:'', type:'error'})

  const initialPlayerState = Object.freeze({ playerName: "", _id: "" , shkUsername : ""})
  const initialRoomState = Object.freeze({ roomName: "", _id: "" })
  const initialDateState = Object.freeze({ from: '', to: '' })

  const [playerList, setPlayerList] = React.useState([]);
  const [roomList, setRoomList] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(initialDateState);
  const [player, setPlayer] = React.useState(initialPlayerState);
  const [room, setRoom] = React.useState(initialRoomState);
  const [selectedRoomToFilter, setSelectedRoomToFilter] = React.useState('');

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
    const filterSelectedRoom = roomList.filter(room => room.room=== e.target.value);
    setRoom({
      ...room,
      roomName: filterSelectedRoom[0].room
    })
  }
  // const handleRoomChange = (e) => {
    
  //   if (selectedRoomToFilter.length > 0) {
  //     const addRoom = selectedRoomToFilter.concat(e.target.value);
  //     setSelectedRoomToFilter(addRoom);
  //   } else {
  //     setSelectedRoomToFilter(e.target.value);
  //   }
  // };


  React.useEffect(async () => {
    await getPlayers(dispatch);

  }, []);

  React.useEffect(async () => {
    await getRooms(dispatch);

  }, []);

  React.useEffect(() => {
    state.players.length ? setPlayerList(state.players) : setPlayerList([]);
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
      playerName: player.playerName,
      shkUsername: player.shkUsername,
      dateFrom: dateFrom,
      dateTo: dateTo,
      roomName: room.roomName
    }
    const response = await getPlayerByFilter(dispatch, options);
  }


  const rows = playerList?.map((player) => {
    return { id: player._id, Name: player.playerName, shkUsername: player.shkUsername }
  })


  const columns = [
    { field: 'Name', headerName: 'Name', width: 150 },
    { field: 'Username', headerName: 'Username', width: 150 },
  ];

  //addPlayer
  const addPlayer = (values) => {

        if(window.confirm('Esta seguro que desea crear el usuario?'))
        {
          setNewPlayer(values);
        }
          else{
            setNotify({
              isOpen: true,
              message: 'Usuario no agregado',
              type: 'error'
            })
         }     
}

  return (
    <Grid >
      <Stack sx={{margin:"%"}}>
      <h1>Players</h1>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
      </Stack>
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
            {playerList.length > 1 ? playerList.map((player) => { return (<option key={player._id} value={player._id}> {player.shkUsername} </option>) }) : <option value="">No hay jugadores (actualizar)</option>}
          </NativeSelect>
          <Stack>
            <Stack sx={{ display: "flex", flexDirection: "row", margin:"3%" }}>
             <Stack>
              <LocalizationProvider 
              dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Seleccionar fecha desde"
                  value={selectedDate.from ? selectedDate.from : null}
                  onChange={(newDate) => {
                    setSelectedDate({ ...selectedDate, from: newDate })
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Seleccionar fecha hasta"
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
                  defaultValue=""
                  inputProps={{
                    name: 'Salas',
                    id: 'uncontrolled-native',
                  }}
                  label="Salas"
                  onChange={handleRoomChange}
                  sx={{ margin: "3%", padding: '3%', color: 'black' }}
                >
                  {roomList.length > 0 ? roomList.map((room) => { return (<option key={room.room} value={room.room}> {room.room} </option>) }) : <option value="">No hay salas (seleccionar)</option>}

                </NativeSelect>
              </FormControl>
            </Stack >
            <Stack sx={{display:"flex", flexDirection:"row",padding:"2%", margin:"3%"}}>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Clear Filter" />
             </FormGroup>
            <Button variant="contained" color="primary" sx={{ margin: "3%", backgroundColor:'black', color:'lightgreen' }} onClick={handleSubmit} disabled={player._id ? false : true}>
              Apply
            </Button>
            <Button 
              className="add" 
              variant="contained" 
              color="primary"
              sx={{ margin: "3%", backgroundColor:'black', color:'lightgreen'}} 
              startIcon={<AddIcon/>}
              onClick={() => setOpenPopup(true)}
              >Add Player</Button>
            </Stack>
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