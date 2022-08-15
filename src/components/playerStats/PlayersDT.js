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


const PlayersDT = () => {
      const state = useAuthState();
      const [data, setData] = React.useState([]);
      const [error, setError] = React.useState('');
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(5);
      const [notify, setNotify] = React.useState({isOpen:false, message:'', type:'error'})

      const [dense, setDense] = React.useState(false);

      

    React.useEffect(() => {
      console.log(state)
      const dataTable = []
      dataTable.push(state.playerWithFilter)
      setData(dataTable);
    }, [state]);


    // React.useEffect(() => {
    //   console.log(state.playerWithFilter, 'state en tabla')
    //   state.playerWithFilter.map(player => {
    //   const asd = player["@id"] 
    //   const amount = player["$"]
    //   const obj = {[asd] : amount}
    //   dataTable.push(obj)
    //   })
      
    //   console.log(dataTable, 'dataTable')
    //   setData(dataValues);
    // }, [state])

   

    // const datos = [{
    //   playerName: 'John Doe',
    //   username :  'johndoe',
    //   volume : '100',
    //   avGamesDay : '10',
    //   profit : '100',
    //   avProfit  : '100',
    //   avROI : '100',
    //   totalROI : '100',
    //   itm : '100',
    //   turbo : '100',
    //   turboPercent : '100',
    //   hiper : '100',
    //   hiperPercent : '100',
    //   requiredBankroll : '100',
    //   winningDays : '100',
    //   losingDays : '100',
    //   pokerstars : '100',
    //   pokerstarsPercent : '100',
    //   pokerstarsES : '100',
    //   pokerstarsPercentES : '100',
    //   winamax : '100',
    //   winamaxPercent : '100',
    //   wpn : '100',
    //   wpnPercent : '100',
    //   partypoker : '100',
    //   partypokerPercent : '100',
    //   tiger : '100',
    //   tigerPercent : '100',
    //   tripleEight: '100',
    //   tripleEightPercent : '100',
    //   GGNetwork : '100',
    //   GGNetworkPercent : '100',
    //   iPoker : '100',
    //   iPokerPercent : '100',
    // }];



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
        <Paper sx={{ background:"black", color:"lightgreen" }}>
        <Typography
          sx={{ flex: '1 1 100%', fontWeight:'bold', textAlign:'left'}}
          variant="h4"
          id="tableTitle"
          component="div"
        >
          SS Player Statistics
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
            <TableCell sx={{fontWeight: 'bold' , color:"lightgreen" }}>Count</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>Entries</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>AvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>AvStake</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>AvROI</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>Profit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>Ability</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>Stake</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>Cashes</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>Rake</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>TotalROI</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>ITM</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>Bankroll</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>FirstGameDate</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>LastGameDate</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>MostGamesInDay</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>AvGamesPerDay</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>ActiveDayCount</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>TournamentWins</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>FinalTables</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>Best100StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>Best500StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>Worst100StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>Worst500StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>AvEntrants</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>TurboRatio</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>PercentFieldBeaten</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>FinshesEarly</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>FinshesEarlyMiddle</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>FinshesMiddle</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>FinshesMiddleLate</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>FinshesLate</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>PTLBPoints</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>MaxWinningStreak</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>MaxLosingStreak</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>MaxCashingStreak</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>WinningDays</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>LosingDays</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>BreakEvenDays</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"lightgreen" }}>AchievementPoints</TableCell>  
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => (
              <TableRow 
                hover
                tabIndex={-1}
                key={key}>
                <TableCell sx={{ color:"lightgreen" }}>{row.Count}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.Entries}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.AvProfit}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.AvStake}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.AvROI}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.Profit}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.Ability}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.Stake}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.Cashes}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.Rake}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.TotalROI}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.ITM}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.Bankroll}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.FirstGameDate}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.LastGameDate}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.MostGamesInDay}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.AvGamesPerDay}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.ActiveDayCount}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.TournamentWins}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.FinalTables}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.Best100StreakAvProfit}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.Best500StreakAvProfit}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.Worst100StreakAvProfit}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.Worst500StreakAvProfit}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.AvEntrants}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.TurboRatio}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.PercentFieldBeaten}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.FinshesEarly}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.FinshesEarlyMiddle}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.FinshesMiddle}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.FinshesMiddleLate}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.FinshesLate}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.PTLBPoints}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.MaxWinningStreak}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.MaxLosingStreak}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.MaxCashingStreak}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.WinningDays}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.LosingDays}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.BreakEvenDays}</TableCell>
                <TableCell sx={{ color:"lightgreen" }}>{row.AchievementPoints}</TableCell>
              </TableRow>
            ))}
            
          </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ color:"lightgreen" }}
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



export default PlayersDT