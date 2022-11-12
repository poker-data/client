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
        TableContainer,} from '@mui/material';
import Switch from '@mui/material/Switch';
import Notification from '../utils/Notification';
import {useAuthDispatch, getTournamentData, useAuthState } from "../../Context";
import { parseSecondstoDateWithSeconds } from '../utils/Formatters';



const TournamentStats = () => {
      const state = useAuthState();
      let dispatch = useAuthDispatch();
      const [data, setData] = React.useState([]);
      const [error, setError] = React.useState('');
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(5);
      const [notify, setNotify] = React.useState({isOpen:false, message:'', type:'error'})

      const [dense, setDense] = React.useState(true);



    React.useEffect(async () => {

        let body ={}
        const response = await getTournamentData(dispatch, body);
        state.tournamentsdata ? setData(state.tournamentsdata.stats) : setData([])

    }, [])

     



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
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Habilidad media</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Habilidad media por tipo</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Participantes medios por tipo</TableCell>
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
                <TableCell sx={{ color:"#454545" }}>{row.AvAbility>row.TypeAvAbility ? "▲"+row.AvAbility : "▼"+row.AvAbility}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.TypeAvAbility}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.TypeAvEntrants}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.TypeAvDuration}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.overlay}</TableCell>
              </TableRow>
            ))}

          </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ color:"#454545" }}
          rowsPerPageOptions={[5, 25, 100]}
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