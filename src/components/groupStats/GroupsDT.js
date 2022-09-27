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


const GroupsDT = () => {
      const state = useAuthState();
      const [data, setData] = React.useState([]);
      const [error, setError] = React.useState('');
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(5);
      const [notify, setNotify] = React.useState({isOpen:false, message:'', type:'error'})

      const [dense, setDense] = React.useState(true);

      

    React.useEffect(() => {
      const dataTable = []
      //dataTable.push(state.playerWithFilter)
      //setData(dataTable);
    }, [state]);





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
      <Box sx={{ width: '100%'}}>
        <Paper sx={{ background:"#d3d3d3", color:"#ebe9eb" , border: 1, borderColor:"#000000"}}>
        <Typography
          sx={{ flex: '1 1 100%', fontWeight:'bold', textAlign:'center', background:"#000000", color:"#ebe9eb"}}
          variant="h4"
          id="tableTitle"
          component="div"
        >
          SharkScope Statistics
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
          <TableHead >
            <TableRow >
            <TableCell sx={{fontWeight: 'bold' , color:"#454545" }}>Count</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Entries</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>AvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>AvStake</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>AvROI</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Profit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Ability</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Stake</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Cashes</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Rake</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>TotalROI</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>ITM</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Bankroll</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>FirstGameDate</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>LastGameDate</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>MostGamesInDay</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>AvGamesPerDay</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>ActiveDayCount</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>TournamentWins</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>FinalTables</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Best100StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Best500StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Worst100StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>Worst500StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>AvEntrants</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>TurboRatio</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>PercentFieldBeaten</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>FinshesEarly</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>FinshesEarlyMiddle</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>FinshesMiddle</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>FinshesMiddleLate</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>FinshesLate</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>PTLBPoints</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>MaxWinningStreak</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>MaxLosingStreak</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>MaxCashingStreak</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>WinningDays</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>LosingDays</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>BreakEvenDays</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#454545" }}>AchievementPoints</TableCell>  
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => (
              <TableRow 
                hover
                tabIndex={-1}
                key={key}>
                <TableCell sx={{ color:"#454545" }}>{row.Count}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.Entries}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.AvProfit}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.AvStake}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.AvROI}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.Profit}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.Ability}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.Stake}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.Cashes}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.Rake}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.TotalROI}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.ITM}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.Bankroll}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.FirstGameDate}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.LastGameDate}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.MostGamesInDay}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.AvGamesPerDay}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.ActiveDayCount}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.TournamentWins}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.FinalTables}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.Best100StreakAvProfit}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.Best500StreakAvProfit}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.Worst100StreakAvProfit}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.Worst500StreakAvProfit}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.AvEntrants}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.TurboRatio}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.PercentFieldBeaten}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.FinshesEarly}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.FinshesEarlyMiddle}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.FinshesMiddle}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.FinshesMiddleLate}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.FinshesLate}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.PTLBPoints}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.MaxWinningStreak}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.MaxLosingStreak}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.MaxCashingStreak}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.WinningDays}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.LosingDays}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.BreakEvenDays}</TableCell>
                <TableCell sx={{ color:"#454545" }}>{row.AchievementPoints}</TableCell>
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
        
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        sx = {{ color:"#d3d3d3" }}
        label="Colapse"
      />
      </Box>
    );
}    



export default GroupsDT