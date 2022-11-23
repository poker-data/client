import React from "react";
import Grid from '@mui/material/Grid';
import { DataGrid, } from "@mui/x-data-grid";
import { Button, Stack, Select, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useAuthDispatch,  useAuthState, getGroupDataByFilter, getDefaultFilterList, getGroups, setNewGroup } from "../../context";
import NativeSelect from '@mui/material/NativeSelect';
import AddIcon from '@mui/icons-material/Add';
import Popup from '../utils/Popup';
import GroupForm from './GroupForm';
import { useHistory } from 'react-router-dom';
import CircularIndeterminate from "../utils/CircularIndeterminate";

export default function GroupStats({ userToken }) {
  //console.log("userToken", userToken);
  const history = useHistory();
  const [openPopup, setOpenPopup] = React.useState(false)
  const [openGroupPopup, setOpenGroupPopup] = React.useState(false)
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: 'error' })
  const initialDateState = Object.freeze({ from: '', to: '' })
  const initialFilterState = Object.freeze({filterType:"", _id:""})
  const initialGroupState = Object.freeze({groupName:"", shkName: "", _id:""})

  const [filter, setFilter] = React.useState(initialFilterState);
  const [group, setGroup] = React.useState(initialGroupState);

  const [defaultFilterList, setDefaultFilterList] = React.useState([]);
  const [groupList, setGroupList] = React.useState([]);
  const [groupToCreate, setGroupToCreate] = React.useState({ groupName: '' });

  const [isLoading, setIsLoading] = React.useState(false);



  const state = useAuthState();
  let dispatch = useAuthDispatch();





  const handleFilterChange = (e) => {
    const filterSelectedFilter= defaultFilterList.filter(filter => filter.filterType === e.target.value);
    setFilter({
      ...filter,
      filterType: filterSelectedFilter[0].filterType
    })

  }

  const handleGroupChange = (e) => {
    const filterSelectedGroup = groupList.filter(group => group._id === e.target.value);
    setGroup({
      ...group,
      groupName: filterSelectedGroup[0].groupName,
      shkName: filterSelectedGroup[0].shkName,
      _id: filterSelectedGroup[0]._id
    })

  }

  React.useEffect(async () => {
    await getDefaultFilterList(dispatch);
    await getGroups(dispatch);
  }, []);



 React.useEffect(() => {
    state.defaultFilterList.length ? setDefaultFilterList(state.defaultFilterList) : setDefaultFilterList([]);
  }, [state]); 

  React.useEffect(() => {
    state.groups.length ? setGroupList(state.groups) : setGroupList([]);
   // console.log(state.groups);
  }, [state]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //const dateFrom = selectedDate.from !== "" ? selectedDate.from.getTime() : null;
    //const dateTo = selectedDate.to !== "" ? selectedDate.to.getTime() : null;

    const options = {
      _id: group._id,
      shkName: group.shkName,
      filterType: filter.filterType,
    }
    const response = await getGroupDataByFilter(dispatch, options);
    setIsLoading(false);
    history.push('/groupdashboard');
  }


  const rows = groupList?.map((group) => {
    return { id: group._id, Name: group.groupName, shkName: group.shkName }
  })



  const columns = [
    { field: 'Name', headerName: 'Name', width: 200 },
    { field: 'shkName', headerName: 'Username', width: 200 },
  ];


//addGroup 
  const addGroup = (values) => {
    if (window.confirm('Esta seguro que desea crear el grupo?')) {
      setNewGroup(values);
      setOpenGroupPopup(false)
    }
    else {
      setNotify({
        isOpen: true,
        message: 'Grupo no agregado',
        type: 'error'
      })
      setOpenGroupPopup(false)
    }
  
  }


  return (


    <Grid container spacing={2}   >
      <Grid item xs={4} >
        <Stack sx={{ margin: "2%" }}>
          <h1 style={{ color: "#d3d3d3" }}>Groups</h1>
          <div style={{ height: 640, width: '100%' }}>
            <DataGrid
              sx={{ borderRadius: 2, border: 1, flex: '1 1 100%', fontWeight: 'bold', textAlign: 'center', background: "#d3d3d3", color: "#000000" }}
              rows={rows} columns={columns}
            />
          </div>
        </Stack>
      </Grid>

      <Box sx={{ minWidth: 120, margin: "1.9%" }}>
        <h1 style={{ color: "#d3d3d3" }}>Group Filter</h1>
        <FormControl sx={{ border: 1, borderRadius: 2, flex: '1 1 100%', textAlign: 'center', background: "#d3d3d3", color: "#d3d3d3" }} fullWidth>
          <InputLabel id="demo-simple-select-label"> Group name</InputLabel>
          <NativeSelect
            defaultValue=''
            inputProps={{
              name: 'Group Name',
              id: 'uncontrolled-native',
            }}
            label="Groups"
            onChange={handleGroupChange}
            sx={{ margin: "2%", padding: '2%', background: "#d3d3d3", borderRadius: 1, color: "#000000" }}
          >
            {<option value={group.shkName}></option>}
            {groupList.length > 0 ? groupList.map((group) => { return (<option key={group._id} value={group._id}> {group.groupName} </option>) }) : <option value="">No hay grupos</option>}
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
                onChange={handleFilterChange}
                sx={{ margin: "3%", padding: '3%' }}
              >
                {<option value={filter.filterName}></option>}
                {defaultFilterList.length > 0 ? defaultFilterList.map((filter) => { return (<option key={filter.filterType} value={filter.filterType}> {filter.filterName} </option>) }) : <option value="">No hay filtros</option>}

              </NativeSelect>
            </FormControl>
          </Stack >
          <Stack sx={{ display: "flex", flexDirection: "row", padding: "2%", margin: "3%" }}>

            <Button variant="contained" color="primary" 
              sx={{ fontWeight: 'bold',
                    border: 1, 
                    borderColor: "#454545", 
                    margin: "3%", 
                    backgroundColor: '#515151',
                    color: '#ebe9eb' }}
               onClick={handleSubmit} disabled={group._id ? false : true}>
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
        {isLoading ? <CircularIndeterminate /> : null}
        
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