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

      const [dense, setDense] = React.useState(true);

      

    React.useEffect(() => {
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
      <Box sx={{ width: '100%'}}>
        <Paper sx={{ background:"black", color:"#2debab" , border: 1, borderColor:"black"}}>
        <Typography
          sx={{ flex: '1 1 100%', fontWeight:'bold', textAlign:'center', background:"#2debab", color:"black"}}
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
          <TableHead>
            <TableRow>
            <TableCell sx={{fontWeight: 'bold' , color:"#2debab" }}>Count</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>Entries</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>AvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>AvStake</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>AvROI</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>Profit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>Ability</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>Stake</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>Cashes</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>Rake</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>TotalROI</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>ITM</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>Bankroll</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>FirstGameDate</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>LastGameDate</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>MostGamesInDay</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>AvGamesPerDay</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>ActiveDayCount</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>TournamentWins</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>FinalTables</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>Best100StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>Best500StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>Worst100StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>Worst500StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>AvEntrants</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>TurboRatio</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>PercentFieldBeaten</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>FinshesEarly</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>FinshesEarlyMiddle</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>FinshesMiddle</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>FinshesMiddleLate</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>FinshesLate</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>PTLBPoints</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>MaxWinningStreak</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>MaxLosingStreak</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>MaxCashingStreak</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>WinningDays</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>LosingDays</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>BreakEvenDays</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#2debab" }}>AchievementPoints</TableCell>  
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => (
              <TableRow 
                hover
                tabIndex={-1}
                key={key}>
                <TableCell sx={{ color:"#2debab" }}>{row.Count}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.Entries}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.AvProfit}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.AvStake}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.AvROI}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.Profit}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.Ability}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.Stake}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.Cashes}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.Rake}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.TotalROI}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.ITM}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.Bankroll}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.FirstGameDate}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.LastGameDate}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.MostGamesInDay}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.AvGamesPerDay}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.ActiveDayCount}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.TournamentWins}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.FinalTables}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.Best100StreakAvProfit}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.Best500StreakAvProfit}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.Worst100StreakAvProfit}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.Worst500StreakAvProfit}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.AvEntrants}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.TurboRatio}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.PercentFieldBeaten}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.FinshesEarly}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.FinshesEarlyMiddle}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.FinshesMiddle}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.FinshesMiddleLate}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.FinshesLate}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.PTLBPoints}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.MaxWinningStreak}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.MaxLosingStreak}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.MaxCashingStreak}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.WinningDays}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.LosingDays}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.BreakEvenDays}</TableCell>
                <TableCell sx={{ color:"#2debab" }}>{row.AchievementPoints}</TableCell>
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



export default PlayersDT