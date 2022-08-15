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
import { useAuthState } from "../../Context";


const PlayersDT = () => {
      const state = useAuthState();
      const [data, setData] = React.useState([]);
      const [error, setError] = React.useState('');
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(5);
      const [notify, setNotify] = React.useState({isOpen:false, message:'', type:'error'})

    const dataTable = []
    let dataValues = []

    React.useEffect(() => {
      console.log(state.playerWithFilter, 'state player');
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
            <TableCell sx={{fontWeight: 'bold'}}>Count</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Entries</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>AvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>AvStake</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>AvROI</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Profit</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Ability</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Stake</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Cashes</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Rake</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>TotalROI</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>ITM</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Bankroll</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>FirstGameDate</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>LastGameDate</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>MostGamesInDay</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>AvGamesPerDay</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>ActiveDayCount</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>TournamentWins</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>FinalTables</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Best100StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Best500StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Worst100StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Worst500StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>AvEntrants</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>TurboRatio</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>PercentFieldBeaten</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>FinshesEarly</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>FinshesEarlyMiddle</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>FinshesMiddle</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>FinshesMiddleLate</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>FinshesLate</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>PTLBPoints</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>MaxWinningStreak</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>MaxLosingStreak</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>MaxCashingStreak</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>WinningDays</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>LosingDays</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>BreakEvenDays</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>AchievementPoints</TableCell>  
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => (
              <TableRow
                key={key}>
                <TableCell>{row.Count}</TableCell>
                <TableCell>{row.Entries}</TableCell>
                <TableCell>{row.AvProfit}</TableCell>
                <TableCell>{row.AvStake}</TableCell>
                <TableCell>{row.AvROI}</TableCell>
                <TableCell>{row.Profit}</TableCell>
                <TableCell>{row.Ability}</TableCell>
                <TableCell>{row.Stake}</TableCell>
                <TableCell>{row.Cashes}</TableCell>
                <TableCell>{row.Rake}</TableCell>
                <TableCell>{row.TotalROI}</TableCell>
                <TableCell>{row.ITM}</TableCell>
                <TableCell>{row.Bankroll}</TableCell>
                <TableCell>{row.FirstGameDate}</TableCell>
                <TableCell>{row.LastGameDate}</TableCell>
                <TableCell>{row.MostGamesInDay}</TableCell>
                <TableCell>{row.AvGamesPerDay}</TableCell>
                <TableCell>{row.ActiveDayCount}</TableCell>
                <TableCell>{row.TournamentWins}</TableCell>
                <TableCell>{row.FinalTables}</TableCell>
                <TableCell>{row.Best100StreakAvProfit}</TableCell>
                <TableCell>{row.Best500StreakAvProfit}</TableCell>
                <TableCell>{row.Worst100StreakAvProfit}</TableCell>
                <TableCell>{row.Worst500StreakAvProfit}</TableCell>
                <TableCell>{row.AvEntrants}</TableCell>
                <TableCell>{row.TurboRatio}</TableCell>
                <TableCell>{row.PercentFieldBeaten}</TableCell>
                <TableCell>{row.FinshesEarly}</TableCell>
                <TableCell>{row.FinshesEarlyMiddle}</TableCell>
                <TableCell>{row.FinshesMiddle}</TableCell>
                <TableCell>{row.FinshesMiddleLate}</TableCell>
                <TableCell>{row.FinshesLate}</TableCell>
                <TableCell>{row.PTLBPoints}</TableCell>
                <TableCell>{row.MaxWinningStreak}</TableCell>
                <TableCell>{row.MaxLosingStreak}</TableCell>
                <TableCell>{row.MaxCashingStreak}</TableCell>
                <TableCell>{row.WinningDays}</TableCell>
                <TableCell>{row.LosingDays}</TableCell>
                <TableCell>{row.BreakEvenDays}</TableCell>
                <TableCell>{row.AchievementPoints}</TableCell>
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