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
        var remainingRequests = state?.remainingRequests?.remainingRequests??''
        setRemainingRequest(remainingRequests)
      }
  }      
        fetchData();
        return () => { cancel = true };  

},[])



  return (

<IconButton sx={{ marginLeft:'100%'}} 
            aria-label="remainingRequest" >
          <Badge 
          sx={{
            "& .MuiBadge-badge": {
              color: "#2debab",
              backgroundColor: "#111315",
              fontFamily:"Barlow",
              fontWeight:"bold"
            }
          }} badgeContent={"Consultas disponibles: "+remainingRequest} max={999}  >
      </Badge>
</IconButton>


  );
}