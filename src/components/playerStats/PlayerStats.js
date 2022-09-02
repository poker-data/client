import React from "react";
import Grid from '@mui/material/Grid';
import { DataGrid, } from "@mui/x-data-grid";
import { Button, Stack, Select, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { getPlayerStats, useAuthDispatch, getPlayers, useAuthState, getPlayerByFilter, getRooms, setNewPlayer, getDefaultFilterList, getGroups, setNewGroup } from "../../Context";
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
import GroupForm from './GroupForm';
import { useHistory } from 'react-router-dom';

export default function PlayerStats() {
  const history = useHistory();
  const [openPopup, setOpenPopup] = React.useState(false)
  const [openGroupPopup, setOpenGroupPopup] = React.useState(false)
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: 'error' })
  const initialPlayerState = Object.freeze({ playerName: "", _id: "", shkUsername: "" })
  const initialRoomState = Object.freeze({ roomName: "", _id: "" })
  const initialDateState = Object.freeze({ from: '', to: '' })

  const [playerList, setPlayerList] = React.useState([]);
  const [roomList, setRoomList] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(initialDateState);
  const [player, setPlayer] = React.useState(initialPlayerState);
  const [room, setRoom] = React.useState(initialRoomState);
  const [selectedRoomToFilter, setSelectedRoomToFilter] = React.useState('');
  const [defaultFilterList, setDefaultFilterList] = React.useState([]);
  const [groupList, setGroupList] = React.useState([]);

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
    await getRooms(dispatch);
    await getDefaultFilterList(dispatch);
    await getGroups(dispatch);
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

 React.useEffect(() => {
    state.defaultFilterList.length ? setDefaultFilterList(state.defaultFilterList) : setDefaultFilterList([]);
  }, [state]); 

  React.useEffect(() => {
    state.groups.length ? setGroupList(state.groups) : setGroupList([]);
    console.log(state.groups);
  }, [state]);


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
    history.push('/playerdashboard');
  }


  const rows = playerList?.map((player) => {
    return { id: player._id, Name: player.playerName, shkUsername: player.shkUsername }
  })


  const columns = [
    { field: 'Name', headerName: 'Name', width: 200 },
    { field: 'shkUsername', headerName: 'Username (SharkScope)', width: 200 },
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
//addGroup 
  const addGroup = (values) => {
    if (window.confirm('Esta seguro que desea crear el grupo?')) {
      setNewGroup(values);
      setOpenPopup(false)
    }
    else {
      setNotify({
        isOpen: true,
        message: 'Grupo no agregado',
        type: 'error'
      })
      setOpenPopup(false)
    }
  
  }

  const filterList = [
    { id: 1, filterType: "filterType1" },
    { id: 2, filterType: "filterType2" },
    { id: 3, filterType: "filterType3" },
    { id: 4, filterType: "filterType4" },
    { id: 5, filterType: "filterType5" },]

  return (

    <Grid container spacing={2}   >
      <Grid item xs={4} >
        <Stack sx={{ margin: "2%" }}>
          <h1 style={{ color: "#d3d3d3" }}>Players</h1>
          <div style={{ height: 640, width: '100%' }}>
            <DataGrid
              sx={{ borderRadius: 2, border: 1, flex: '1 1 100%', fontWeight: 'bold', textAlign: 'center', background: "#d3d3d3", color: "#000000" }}
              rows={rows} columns={columns}
            />
          </div>
        </Stack>
      </Grid>

      <Box sx={{ minWidth: 120, margin: "1.5%" }}>
        <h1 style={{ color: "#d3d3d3" }}>Player Filter</h1>
        <FormControl sx={{ border: 1, borderRadius: 2, flex: '1 1 100%', textAlign: 'center', background: "#d3d3d3", color: "#d3d3d3" }} fullWidth>
          <InputLabel id="demo-simple-select-label"> Player</InputLabel>
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
            {playerList.length > 1 ? playerList.map((player) => { return (<option key={player._id} value={player._id}> {player.shkUsername} </option>) }) : <option value="">No hay jugadores (actualizar)</option>}
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
              <InputLabel id="demo-simple-select-label">Room</InputLabel>
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
          <Stack sx={{ display: "flex", flexDirection: "row", padding: "2%", margin: "3%" }}>
            {/* <FormGroup>
              <FormControlLabel sx={{ color:"#454545"}}control={<Checkbox defaultChecked />} label="Clear Filter" />
             </FormGroup> */}
            <Button variant="contained" color="primary" sx={{ fontWeight: 'bold', border: 1, borderColor: "#454545", margin: "3%", backgroundColor: '#515151', color: '#ebe9eb' }} onClick={handleSubmit} disabled={player._id ? false : true}>
              Apply
            </Button>
            <Button
              className="add"
              variant="contained"
              color="primary"
              sx={{ fontWeight: 'bold', border: 1, borderColor: "#454545", margin: "3%", backgroundColor: '#454545', color: '#ebe9eb' }}
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

      <Box sx={{ minWidth: 120, margin: "1.5%" }}>
        <h1 style={{ color: "#d3d3d3" }}>Default Filters</h1>
        <FormControl sx={{ border: 1, borderRadius: 2, flex: '1 1 100%', textAlign: 'center', background: "#d3d3d3", color: "#d3d3d3" }} fullWidth>
          <InputLabel id="demo-simple-select-label"> Group name</InputLabel>
          <NativeSelect
            defaultValue=''
            inputProps={{
              name: 'Group Name',
              id: 'uncontrolled-native',
            }}
            label="Groups"
            onChange={handlePlayerIDChange}
            sx={{ margin: "2%", padding: '2%', background: "#d3d3d3", borderRadius: 1, color: "#000000" }}
          >
            {<option value={""}></option>}
            {groupList.length > 0 ? groupList.map((group) => { return (<option key={group._id} value={group._id}> {group.groupName} </option>) }) : <option value="">No hay grupos (actualizar)</option>}
          </NativeSelect>
          <Stack sx={{ margin: "2%", background: "#d3d3d3", color: "#000000", borderRadius: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Filter type</InputLabel>
              <NativeSelect
                defaultValue=''
                inputProps={{
                  name: 'Filters',
                  id: 'uncontrolled-native',
                }}
                label="Filters"
                onChange={handleRoomChange}
                sx={{ margin: "3%", padding: '3%' }}
              >
                {<option value={room.roomName}></option>}
                {defaultFilterList.length > 0 ? defaultFilterList.map((filter) => { return (<option key={filter.id} value={filter.filterType}> {filter.filterType} </option>) }) : <option value="">no hay filtros</option>}

              </NativeSelect>
            </FormControl>
          </Stack >
          <Stack sx={{ display: "flex", flexDirection: "row", padding: "2%", margin: "3%" }}>

            <Button variant="contained" color="primary" sx={{ fontWeight: 'bold', border: 1, borderColor: "#454545", margin: "3%", backgroundColor: '#515151', color: '#ebe9eb' }} onClick={handleSubmit} disabled={player._id ? false : true}>
              Apply
            </Button>
            <Button
              className="add"
              variant="contained"
              color="primary"
              sx={{ fontWeight: 'bold', border: 1, borderColor: "#454545", margin: "3%", backgroundColor: '#454545', color: '#ebe9eb' }}
              startIcon={<AddIcon />}
              onClick={() => setOpenGroupPopup(true)}
            >Add Group</Button>
          </Stack>
        </FormControl>
        
        <Popup
          title="Ingresar Datos"
          openPopup={openGroupPopup}
          setOpenPopup={setOpenGroupPopup}>
          <GroupForm
            addGroup={addGroup}
          />
        </Popup>
        
      </Box>
    </Grid>
  );
}