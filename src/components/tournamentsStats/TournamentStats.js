import React from 'react'
import {Box,
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableRow,
        Paper,
        Typography,
        TablePagination,
        FormControlLabel,
        TableContainer,
        IconButton,} from '@mui/material';
import Switch from '@mui/material/Switch';
import Notification from '../utils/Notification';
import {useAuthDispatch, getTournamentData, useAuthState } from "../../context";
import { parseSecondstoDateWithSeconds, parseSecondstoHours } from '../utils/Formatters';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import swal from 'sweetalert';


const TournamentStats = () => {
      const state = useAuthState();
      let dispatch = useAuthDispatch();
      const [data, setData] = React.useState([]);
      const [error, setError] = React.useState();
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(50);
      const [notify, setNotify] = React.useState({isOpen:false, message:'', type:'error'})
      const [titleName, setTitleName] = React.useState('Lista completa');

      const [dense, setDense] = React.useState(true);

      const level = JSON.parse(localStorage.getItem("currentUser")).user.level;
      const country = JSON.parse(localStorage.getItem("currentUser")).user.country;
      
      React.useEffect( () => {  
        let cancel = false;
        let body = {
          playerLevel: level.toString(),
          playerCountry: country
        }
       const fetchTournamentData = async () => {
            await getTournamentData(dispatch, body);
            if (cancel) {
              setData([])
              setError("Error al cargar los datos")
              return;
            }else{
              setError(null)
              setTitleName("Lista completa")
              var dataTournaments = state?.tournamentsdata?.stats??[]
              setData(dataTournaments)
            }
        }
        fetchTournamentData();
        return () => { cancel = true };


      },[])


     
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };

    const handleRefresh = async (event) => {

      swal({
        title: "Realizar una nueva consulta?",
        buttons: {
          confirm: {
            text: "Aceptar",
            value: true,
            visible: true,
          },
          cancel: {
            text: "Cancelar",
            value: null,
            visible: true,
          }
        }
        }).then((result) => {
        if (result) {
          setTitleName('Lista completa')
          const body ={
            playerLevel: level.toString(),
            playerCountry: country
          }
            const getData = async () => {
              await getTournamentData(dispatch, body);
            }
          getData();
          const dataTournaments = state?.tournamentsdata?.stats??[]
          var newData = dataTournaments.sort((a, b) => (a.scheduledStartDate > b.scheduledStartDate) ? 1 : -1)
          state.tournamentsdata ? setData(newData) : setData([])
          swal({text: "Peticion realizada", icon: "success"});           
        }
        else{
            swal({text: "Peticion cancelada"});
        }
        })

     
    }


    const handleButtonOptimal = (level) => {
      var dataTournaments = state?.tournamentsdata?.stats??[]
      var newData;
      switch(level) {
        case "optimal": newData = dataTournaments.filter( element => parseFloat(element.field) <= 250 && parseFloat(element.guarantee) > 100);
        setTitleName('Optima');
        break;
        case "suboptimalone": newData = dataTournaments.filter( element => parseFloat(element.field) <= 500 && parseFloat(element.field) >= 251);
        setTitleName('Suboptima 1');
        break;
        case "suboptimaltwo": newData = dataTournaments.filter( element => parseFloat(element.guarantee) <= 100);
        setTitleName('Suboptima 2');
        break;
        case "altavarianza1": newData = dataTournaments.filter( element => parseFloat(element.field) >= 5000);
        setTitleName('Alta varianza 1');
        break;
        case "altavarianza2": newData = dataTournaments.filter( element => parseFloat(element.field) <= 4999 && parseFloat(element.field) >= 2500);
        setTitleName('Alta varianza 2');
        break;
        default : newData = dataTournaments;
        break;

      }      
        setData(newData.sort((a, b) => (a.scheduledStartDate > b.scheduledStartDate) ? 1 : -1))
    }

    return (
      
      <Box sx={{ width: '100%' }}>
        
        <Paper sx={{ background:"#111315", border: 1, borderColor:"#111315", margin:"1%"}}>
        
        <Typography
          sx={{ flex: '1 1 100%', fontFamily:"Barlow", fontWeight:'bold', textAlign:'center', background:"#000000", color:"#ffffff"}}
          variant="h4"
          id="tableTitle"
          component="div"
        >
          {titleName}
        </Typography>
        {(error !== "") ? ( <div className = "error">{error}</div>) : ""}
        <IconButton sx={{float:"left", margin:"1%", background:"#111315", color:"#d3d3d3"}} 
          aria-label="delete" 
          onClick={() => {
            handleRefresh();
          }}>
                    {data.length<1?<DownloadIcon/>:<RefreshIcon/>}
          </IconButton>
        <Button variant="outlined" 
        sx={{ float:"left", 
              fontWeight: 'bold',
              border: 1, 
              borderColor: "#2debab",
              margin:"1%", 
              backgroundColor: '#2debab',
              color: '#111315' ,
              fontFamily:"Barlow",
              "&:hover": {borderColor:"#2debab", background:"#2debab"}}}
              onClick={() => {handleButtonOptimal("optimal")}}
              >Optima</Button>
        <Button variant="outlined" 
        sx={{ float:"left", 
              fontWeight: 'bold',
              border: 1, 
              borderColor: "#2debab",
              margin:"1%", 
              backgroundColor: '#2debab',
              color: '#111315' ,
              fontFamily:"Barlow",
              "&:hover": {borderColor:"#2debab", background:"#2debab"}}}
              onClick={() => {handleButtonOptimal("suboptimalone")}}
              >Suboptima 1</Button>
        <Button variant="outlined" 
        sx={{ float:"left", 
              fontWeight: 'bold',
              border: 1, 
              borderColor: "#454545",
              margin:"1%", 
              backgroundColor: '#2debab',
              color: '#111315' ,
              fontFamily:"Barlow",
              "&:hover": {borderColor:"#2debab", background:"#2debab"}}}
              onClick={() => {handleButtonOptimal("suboptimaltwo")}}
              >Suboptima 2</Button>
        <Button variant="outlined" 
        sx={{ float:"left", 
              fontWeight: 'bold',
              border: 1, 
              borderColor: "#454545",
              margin:"1%", 
              backgroundColor: '#2debab',
              color: '#111315' ,
              fontFamily:"Barlow",
              "&:hover": {borderColor:"#2debab", background:"#2debab"}}}
              onClick={() => {handleButtonOptimal("altavarianza1")}}
              >ALTA VARIANZA 1</Button>
        <Button variant="outlined" 
        sx={{ float:"left", 
              fontWeight: 'bold',
              border: 1, 
              borderColor: "#454545",
              margin:"1%", 
              backgroundColor: '#2debab',
              color: '#111315' ,
              fontFamily:"Barlow",
              "&:hover": {borderColor:"#2debab", background:"#2debab"}}}
              onClick={() => {handleButtonOptimal("altavarianza2")}}
              >ALTA VARIANZA 2</Button>
        
        <Notification
          notify={notify}
          setNotify={setNotify}
        />
        
        <TableContainer>
        
        <Table sx={{ minWidth: 650 }}
            aria-labelledby="simple table"
            size={dense ? 'small' : 'medium'}>
          <TableHead style={{ backgroundColor: '#d3d3d3', height: 50}}> 
            <TableRow >
              <TableCell sx={{fontWeight: 'bold' , color:"#111315", fontFamily:"Barlow"}}>ID</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>Fecha</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315" , fontFamily:"Barlow"}}>Sala</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315" , fontFamily:"Barlow"}}>Buyin</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315" , fontFamily:"Barlow"}}>Garantizado</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315" , fontFamily:"Barlow"}}>Field</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315" , fontFamily:"Barlow"}}>Nombre</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315" , fontFamily:"Barlow"}}>Duracion</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315" , fontFamily:"Barlow"}}>Overlay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => (
              <TableRow 
                style={{ backgroundColor: '#d3d3d3', height: 10 }}
                hover
                tabIndex={-1}
                key={key}>
                <TableCell sx={{ color:"#111315", fontFamily:"Barlow", width:5}}>{row.id}</TableCell>
                <TableCell sx={{ color:"#111315",  fontFamily:"Barlow"}}>
                {row.scheduledStartDate!=="-" ? parseSecondstoDateWithSeconds(row.scheduledStartDate) : row.scheduledStartDate}</TableCell>
                <TableCell sx={{ color:"#111315" , fontFamily:"Barlow"}}>{row.network}</TableCell>
                <TableCell sx={{ color:"#111315" , fontFamily:"Barlow"}}>{row.stake ? '$'+row.stake : row.stake}</TableCell>
                <TableCell sx={{ color:"#111315" , fontFamily:"Barlow"}}>{row.guarantee !== null ? row.guarantee : "-"}</TableCell>
                <TableCell sx={{ color:"#111315" , fontFamily:"Barlow"}}>{row.field!=="-" ? row.field : "-"}</TableCell>
                <TableCell sx={{ color:"#111315", fontFamily:"Barlow"}}>{row.name}</TableCell>
               {/* <TableCell sx={{ color:"#111315", fontFamily:"Barlow"}}>{row.game==="H" ? "NL Hold'em": row.game }</TableCell>
                <TableCell sx={{ color:"#111315" }}>{row.AvAbility>row.TypeAvAbility ? "▲"+row.AvAbility : "▼"+row.AvAbility}</TableCell>
                <TableCell sx={{ color:"#111315" }}>{row.TypeAvAbility}</TableCell>
            <TableCell sx={{ color:"#111315" }}>{row.TypeAvEntrants}</TableCell>*/}
                <TableCell sx={{ color:"#111315" , fontFamily:"Barlow"}}>{row.TypeAvDuration!=="-" ? parseSecondstoHours(row.TypeAvDuration): "-"}</TableCell>
                <TableCell sx={{ color:"#111315" , fontFamily:"Barlow"}}>{row.overlay}</TableCell>
              </TableRow>
            ))}

          </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ color:"#454545", backgroundColor: '#d3d3d3', fontFamily:"Barlow"}}
          rowsPerPageOptions={[50, 75, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        sx = {{ color:"#ffffff"}}
        control={<Switch style={{ color:"#2debab"}} checked={dense} onChange={handleChangeDense} />}
        label="Colapse"
      />
      
      </Box>
      
    );
}



export default TournamentStats;