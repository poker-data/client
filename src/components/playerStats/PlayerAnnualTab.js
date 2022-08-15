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
import { setDayWithOptions } from 'date-fns/fp';


const PlayerAnnualTab = () => {
      const state = useAuthState();
      const [data, setData] = React.useState([]);
      const [error, setError] = React.useState('');
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(5);
      const [notify, setNotify] = React.useState({isOpen:false, message:'', type:'error'})

      const [dense, setDense] = React.useState(false);


      const datos = [{
        Profit : '100',
        avProfit  : '100',
        avROI : '100',
        totalROI: '100',
        MTTnumber : '100',
        SNGnumber : '100',
        MTTpercent : '100',
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
        <Paper sx={{ background:"black", color:"#2debab" , border: 1, borderColor:"black"}}>
        <Typography
          sx={{ flex: '1 1 100%', fontWeight:'bold', textAlign:'center', background:"#2debab", color:"black"}}
          variant="h4"
          id="tableTitle"
          component="div"
        >
          Annual Tab
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
            <TableCell sx={{fontWeight: 'bold' , color:"#2debab" }}>Profit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>Av Profit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>Total ROI</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>Av ROI</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>#MTT</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>#SNG</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>%MTT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => (
              <TableRow
                hover
                tabIndex={-1}
                key={key}>
                <TableCell sx={{ color:"#2debab" }}>{row.Profit}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.avProfit}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.avROI}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.totalROI}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.MTTnumber}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.SNGnumber}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.MTTpercent}</TableCell>

              </TableRow>
            ))}

          </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ color:"#2debab" }}
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

        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Colapsar"
      />
      </Box>
    );
}



export default PlayerAnnualTab