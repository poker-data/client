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



const TournamentStats = () => {
      const state = useAuthState();
      let dispatch = useAuthDispatch();
      const [data, setData] = React.useState([]);
      const [error, setError] = React.useState('');
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(50);
      const [notify, setNotify] = React.useState({isOpen:false, message:'', type:'error'})

      const [dense, setDense] = React.useState(true);

      const level = JSON.parse(localStorage.getItem("currentUser")).user.level;
      
      React.useEffect( () => {  
        let cancel = false;
        let body = {
          playerLevel: level.toString()
        }
        const fetchTournamentData = async () => {
            await getTournamentData(dispatch, body);
            if (cancel) {
              setData([])
              return;
            }else{
              let dataTournaments = state?.tournamentsdata?.stats??[]
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

      if (window.confirm('Esta seguro que desea realizar otra consulta hacia la API?')) {
        setNotify({
          isOpen: true,
          message: 'Cargando consulta',
          type: 'info'
        })
        let body ={
          playerLevel: level.toString()
        }
          const getData = async () => {
            await getTournamentData(dispatch, body);
          }
        getData();
        let newData = state.tournamentsdata.stats.sort((a, b) => (a.scheduledStartDate > b.scheduledStartDate) ? 1 : -1)
        state.tournamentsdata ? setData(newData) : setData([])
      }
      else {
        setNotify({
          isOpen: true,
          message: 'Consulta cancelada',
          type: 'error'
        })
      } 
     
    }


    const handleButtonOptimal = (level) => {
      let newData;
      switch(level) {
        case "optimal": newData = state.tournamentsdata.stats.filter( element => parseFloat(element.field) <= 200 && parseFloat(element.guarantee) > 100);
        break;
        case "suboptimalone": newData = state.tournamentsdata.stats.filter( element => parseFloat(element.field) <= 500 && parseFloat(element.field) >= 201);
        break;
        case "suboptimaltwo": newData = state.tournamentsdata.stats.filter( element => parseFloat(element.guarantee) <= 100);
        break;
        default : newData = state.tournamentsdata.stats;
        break;

      }      
        setData(newData.sort((a, b) => (a.scheduledStartDate > b.scheduledStartDate) ? 1 : -1))
    }

    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ background:"#d3d3d3", color:"#ebe9eb" , border: 1, borderColor:"#000000"}}>
        <Typography
          sx={{ flex: '1 1 100%', fontWeight:'bold', textAlign:'center', background:"#000000", color:"#ebe9eb"}}
          variant="h4"
          id="tableTitle"
          component="div"
        >
          Upcoming Tournaments
        </Typography>
        <IconButton sx={{float:"left", background:"#d3d3d3"}} 
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
              borderColor: "#454545",
              margin:"0.2%", 
              backgroundColor: '#454545',
              color: '#ebe9eb' ,
              "&:hover": {borderColor:"black", background:"grey"}}}
              onClick={() => {handleButtonOptimal("optimal")}}
              >Optima</Button>
        <Button variant="outlined" 
        sx={{ float:"left", 
              fontWeight: 'bold',
              border: 1, 
              borderColor: "#454545",
              margin:"0.2%", 
              backgroundColor: '#454545',
              color: '#ebe9eb' ,
              "&:hover": {borderColor:"black", background:"grey"}}}
              onClick={() => {handleButtonOptimal("suboptimalone")}}
              >Suboptima 1</Button>
        <Button variant="outlined" 
        sx={{ float:"left", 
              fontWeight: 'bold',
              border: 1, 
              borderColor: "#454545",
              margin:"0.2%", 
              backgroundColor: '#454545',
              color: '#ebe9eb' ,
              "&:hover": {borderColor:"black", background:"grey"}}}
              onClick={() => {handleButtonOptimal("suboptimaltwo")}}
              >Suboptima 2</Button>
    
        {(error !== "") ? ( <div className = "error">{error}</div>) : ""}
        <Notification
          notify={notify}
          setNotify={setNotify}
        />
        <TableContainer>
        <Table sx={{ minWidth: 650 }}
            aria-labelledby="simple table"
            size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 'bold' , color:"#454545" }}>ID</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545"}}>Fecha</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Sala</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Stake</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Garantia</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Field</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Tipo</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Nombre</TableCell>
              {/*<TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Habilidad media</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Habilidad media por tipo</TableCell>
        <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Participantes medios por tipo</TableCell>*/}
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Duracion media por tipo</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Overlay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => (
              <TableRow
                hover
                tabIndex={-1}
                key={key}>
                <TableCell sx={{ color:"#454545" }}>{row.id}</TableCell>
                <TableCell sx={{ color:"#454545" }}>
                {row.scheduledStartDate!=="-" ? parseSecondstoDateWithSeconds(row.scheduledStartDate) : row.scheduledStartDate}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.network}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.stake ? '$'+row.stake : row.stake}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.guarantee ? '$'+row.guarantee : row.guarantee}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.field!=="-" ? row.field : "-"}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.game==="H" ? "NL Hold'em": row.game }</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.name}</TableCell>
                {/*<TableCell sx={{ color:"#454545" }}>{row.AvAbility>row.TypeAvAbility ? "▲"+row.AvAbility : "▼"+row.AvAbility}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.TypeAvAbility}</TableCell>
            <TableCell sx={{ color:"#454545" }}>{row.TypeAvEntrants}</TableCell>*/}
                <TableCell sx={{ color:"#454545" }}>{row.TypeAvDuration!=="-" ? parseSecondstoHours(row.TypeAvDuration): "-"}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.overlay}</TableCell>
              </TableRow>
            ))}

          </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ color:"#454545" }}
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
        sx = {{ color:"#d3d3d3" }}
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Colapse"
      />
      
      </Box>
      
    );
}



export default TournamentStats;