import React from 'react'
import Box from '@mui/material/Box';
import {getRemainingRequests } from '../../context/actions';
import {useAuthDispatch,useAuthState } from "../../context";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';




export default function RemainingRequests() {

const [remainingRequest, setRemainingRequest] = React.useState('');
const [error, setError] = React.useState('');
const state = useAuthState();
let dispatch = useAuthDispatch();

React.useEffect( async () => {
   
  await getRemainingRequests(dispatch);
  setRemainingRequest(state.remainingRequests.remainingRequests);
    

},[state.remainingRequests])

  return (

<IconButton sx={{marginTop:'2%',marginLeft:'3%',float:"left" }} 
            aria-label="remainingRequest" >
          <Badge badgeContent={"Consultas disponibles: "+remainingRequest} max={999} color="secondary">
      </Badge>
</IconButton>


  );
}