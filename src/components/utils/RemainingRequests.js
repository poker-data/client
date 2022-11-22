import React from 'react'
import {getRemainingRequests } from '../../context/actions';
import {useAuthDispatch,useAuthState } from "../../context";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

export default function   RemainingRequests() {

const [remainingRequest, setRemainingRequest] = React.useState('');
const state = useAuthState();
let dispatch = useAuthDispatch();


React.useEffect( () => {

  let cancel = false;
  const fetchData = async () => {
    await getRemainingRequests(dispatch);
      if (cancel) {
        setRemainingRequest('')
        return;
      }else{
        let remainingRequests = state?.remainingRequests?.remainingRequests??''
        setRemainingRequest(remainingRequests)
      }
  }      
        fetchData();
        return () => { cancel = true };  

},[state.remainingRequests])

  return (

<IconButton sx={{marginLeft:'100%'}} 
            aria-label="remainingRequest" >
          <Badge badgeContent={"Consultas disponibles: "+remainingRequest} max={999} color="secondary">
      </Badge>
</IconButton>


  );
}