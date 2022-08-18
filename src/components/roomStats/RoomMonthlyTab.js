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
import { useAuthState } from "../../Context";


const RoomMonthlyTab = () => {
      const state = useAuthState();
      const [data, setData] = React.useState([]);
      const [error, setError] = React.useState('');
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(5);
      const [notify, setNotify] = React.useState({isOpen:false, message:'', type:'error'})

      const [dense, setDense] = React.useState(true);


      const datos = [{
        Sala : 'iPoker',
        VolumeMTT  : '100',
        MTTpercent : '100',
        SNGpercent: '100',
     }];

    React.useEffect(async () => {
        setData(datos)
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
          Monthly Room Tab
        </Typography>
        {(error !== "") ? ( <div className = "error">{error}</div>) : ""}
        <Notification
          notify={notify}
          setNotify={setNotify}
        />
        <TableContainer>
        <Table sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
            <TableCell sx={{fontWeight: 'bold' , color:"#454545" }}>Sala</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Volume MTT</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>% MTT</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>% SNG</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => (
              <TableRow
                hover
                tabIndex={-1}
                key={key}>
                <TableCell sx={{ color:"#454545" }}>{row.Sala}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.VolumeMTT}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.MTTpercent}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.SNGpercent}</TableCell>
              </TableRow>
            ))}

          </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ color:"#454545" }}
          rowsPerPageOptions={[5, 10, 15]}
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



export default RoomMonthlyTab;