import React from 'react'
import {Box,
        Table,
        TableBody, 
        TableCell,
        TableHead,
        TableRow, 
        Paper,
        Typography,
        TableFooter,
        TablePagination} from '@mui/material';
import Notification from '../utils/Notification';

const PlayersDT = () => {
    const [data, setData] = React.useState([]);
    const [error, setError] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [notify, setNotify] = React.useState({isOpen:false, message:'', type:'error'})

   

    const datos = [{
      playerName: 'John Doe',
      username :  'johndoe',
      volume : '100',
      avGamesDay : '10',
      profit : '100',
      avProfit  : '100',
      avROI : '100',
      totalROI : '100',
      itm : '100',
      turbo : '100',
      turboPercent : '100',
      hiper : '100',
      hiperPercent : '100',
      requiredBankroll : '100',
      winningDays : '100',
      losingDays : '100',
      pokerstars : '100',
      pokerstarsPercent : '100',
      pokerstarsES : '100',
      pokerstarsPercentES : '100',
      winamax : '100',
      winamaxPercent : '100',
      wpn : '100',
      wpnPercent : '100',
      partypoker : '100',
      partypokerPercent : '100',
      tiger : '100',
      tigerPercent : '100',
      tripleEight: '100',
      tripleEightPercent : '100',
      GGNetwork : '100',
      GGNetworkPercent : '100',
      iPoker : '100',
      iPokerPercent : '100',
    }];

React.useEffect(() => {
  setData(datos);
} , []);
    

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    return (
      <Box sx={{ width: '100%' }}>
        <Paper >
        <Typography
          sx={{ flex: '1 1 100%', fontWeight:'bold', textAlign:'left'}}
          variant="h4"
          id="tableTitle"
          component="div"
        >
          Player Statistics
        </Typography>
        {(error !== "") ? ( <div className = "error">{error}</div>) : ""} 
        <Notification
          notify={notify}
          setNotify={setNotify}
        />
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
            
              <TableCell sx={{fontWeight: 'bold'}}>Player</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Username</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>%VOL</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Av Games/Day</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Profit</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Av Profit</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Av ROI %</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Total ROI%</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>ITM%</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Turbo</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Turbo %</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Hiper</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Hiper %</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Required Bankroll</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Winning Days</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Losing Days</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>PS</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>PS %</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>PS ES</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>PS ES %</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>WMX</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>WMX %</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>WPN</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>WPN %</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>PP</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>PP %</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>TIGER</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>TIGER %</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>888</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>888 %</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>GG</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>GG %</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>IP</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>IP %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => (
              <TableRow
                key={key}>
                <TableCell>{row.playerName}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.volume}</TableCell>
                <TableCell>{row.avGamesDay}</TableCell>
                <TableCell>{row.profit}</TableCell>
                <TableCell>{row.avProfit}</TableCell>
                <TableCell>{row.avROI}</TableCell>
                <TableCell>{row.totalROI}</TableCell>
                <TableCell>{row.itm}</TableCell>
                <TableCell>{row.turbo}</TableCell>
                <TableCell>{row.turboPercent}</TableCell>
                <TableCell>{row.hiper}</TableCell>
                <TableCell>{row.hiperPercent}</TableCell>
                <TableCell>{row.requiredBankroll}</TableCell>
                <TableCell>{row.winningDays}</TableCell>
                <TableCell>{row.losingDays}</TableCell>
                <TableCell>{row.pokerstars}</TableCell>
                <TableCell>{row.pokerstarsPercent}</TableCell>
                <TableCell>{row.pokerstarsES}</TableCell>
                <TableCell>{row.pokerstarsPercentES}</TableCell>
                <TableCell>{row.winamax}</TableCell>
                <TableCell>{row.winamaxPercent}</TableCell>
                <TableCell>{row.wpn}</TableCell>
                <TableCell>{row.wpnPercent}</TableCell>
                <TableCell>{row.partypoker}</TableCell>
                <TableCell>{row.partypokerPercent}</TableCell>
                <TableCell>{row.tiger}</TableCell>
                <TableCell>{row.tigerPercent}</TableCell>
                <TableCell>{row.tripleEight}</TableCell>
                <TableCell>{row.tripleEightPercent}</TableCell>
                <TableCell>{row.GGNetwork}</TableCell>
                <TableCell>{row.GGNetworkPercent}</TableCell>
                <TableCell>{row.iPoker}</TableCell>
                <TableCell>{row.iPokerPercent}</TableCell>
                
              </TableRow>
            ))}
            
          </TableBody>
          <TableFooter>
              <TableRow>
              <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
              />
              </TableRow>
          </TableFooter>
        </Table>
      </Paper>
      </Box>
    );
}    



export default PlayersDT