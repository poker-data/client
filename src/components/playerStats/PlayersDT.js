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


    const parseSecondstoDate = (date) => {
      let dateObj = new Date(date * 1000);
      let dateResult = dateObj.getDate()+
          "/"+(dateObj.getMonth()+1)+
          "/"+dateObj.getFullYear()
      return dateResult;
    }

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
          Player Statistics
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

                <TableCell 
                sx={{ color:"#454545" }}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.AvProfit)) === 1 && '#454545') ||
                  (Math.sign(parseFloat(row.AvProfit)) === -1 && 'red'))
                  }}>{row.AvProfit ? '$'+row.AvProfit : row.AvProfit}</TableCell>

                <TableCell 
                sx={{ color:"#454545" }}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.AvStake)) === 1 && '#454545') ||
                  (Math.sign(parseFloat(row.AvStake)) === -1 && 'red'))
                  }}>{row.AvStake ? '$'+row.AvStake : row.AvStake}</TableCell>

                <TableCell 
                sx={{ color:"#454545" }}
                >{row.AvROI ? row.AvROI+ '%' : row.AvROI}</TableCell>

                <TableCell 
                sx={{ color:"#454545" }}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.Profit)) === 1 && '#454545') ||
                  (Math.sign(parseFloat(row.Profit)) === -1 && 'red'))
                  }}>{row.Profit ? '$'+row.Profit : row.Profit}</TableCell>

                <TableCell sx={{ color:"#454545" }}>{row.Ability}</TableCell>

                <TableCell 
                sx={{ color:"#454545" }}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.Stake)) === 1 && '#454545') ||
                  (Math.sign(parseFloat(row.Stake)) === -1 && 'red'))
                  }}>{row.Stake ? '$'+row.Stake : row.Stake}</TableCell>

                <TableCell 
                sx={{ color:"#454545" }}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.Cashes)) === 1 && '#454545') ||
                  (Math.sign(parseFloat(row.Cashes)) === -1 && 'red'))
                  }}>{row.Cashes ? '$'+row.Cashes : row.Cashes}</TableCell>
                
                <TableCell 
                sx={{ color:"#454545" }}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.Rake)) === 1 && '#454545') ||
                  (Math.sign(parseFloat(row.Rake)) === -1 && 'red'))
                  }}>{row.Rake ? '$'+row.Rake : row.Rake}</TableCell>

                <TableCell 
                sx={{ color:"#454545" }}
                >{row.TotalROI ? row.TotalROI+ '%' : row.TotalROI}</TableCell>

                <TableCell 
                sx={{ color:"#454545" }}
                >{row.ITM ? row.ITM+ '%' : row.ITM}</TableCell>

                <TableCell 
                sx={{ color:"#454545" }}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.Bankroll)) === 1 && '#454545') ||
                  (Math.sign(parseFloat(row.Bankroll)) === -1 && 'red'))
                  }}>{row.Bankroll ? '$'+row.Bankroll : row.Bankroll}</TableCell>

                <TableCell 
                sx={{ color:"#454545" }}
                >{row.FirstGameDate ? parseSecondstoDate(row.FirstGameDate) : row.FirstGameDate}</TableCell>

                <TableCell sx={{ color:"#454545" }}
                >{row.LastGameDate ? parseSecondstoDate(row.LastGameDate) : row.LastGameDate}</TableCell>

                <TableCell sx={{ color:"#454545" }}>{row.MostGamesInDay}</TableCell>

                <TableCell sx={{ color:"#454545" }}>{row.AvGamesPerDay}</TableCell>

                <TableCell sx={{ color:"#454545" }}>{row.ActiveDayCount}</TableCell>

                <TableCell sx={{ color:"#454545" }}>{row.TournamentWins}</TableCell>

                <TableCell sx={{ color:"#454545" }}>{row.FinalTables}</TableCell>

                <TableCell sx={{ color:"#454545" }}>{row.Best100StreakAvProfit}</TableCell>

                <TableCell sx={{ color:"#454545" }}>{row.Best500StreakAvProfit}</TableCell>

                <TableCell 
                sx={{ color:"#454545" }}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.Worst100StreakAvProfit)) === 1 && '#454545') ||
                  (Math.sign(parseFloat(row.Worst100StreakAvProfit)) === -1 && 'red'))
                 }}>{row.Worst100StreakAvProfit ? '$'+row.Worst100StreakAvProfit : row.Worst100StreakAvProfit}</TableCell>

                <TableCell sx={{ color:"#454545" }}
                 style={{
                  color:
                  ((Math.sign(parseFloat(row.Worst500StreakAvProfit)) === 1 && '#454545') ||
                  (Math.sign(parseFloat(row.Worst500StreakAvProfit)) === -1 && 'red'))
                 }}>{row.Worst500StreakAvProfit ? '$'+row.Worst500StreakAvProfit : row.Worst500StreakAvProfit}</TableCell>

                <TableCell sx={{ color:"#454545" }}>{row.AvEntrants}</TableCell>

                <TableCell 
                sx={{ color:"#454545" }}
                >{row.TurboRatio ? row.TurboRatio+ '%' : row.TurboRatio}</TableCell>

                <TableCell 
                sx={{ color:"#454545" }}
                >{row.PercentFieldBeaten ? row.PercentFieldBeaten+ '%' : row.PercentFieldBeaten}</TableCell>

                <TableCell 
                sx={{ color:"#454545" }}
                >{row.FinshesEarly ? row.FinshesEarly+ '%' : row.FinshesEarly}</TableCell>

                <TableCell 
                sx={{ color:"#454545" }}
                >{row.FinshesEarlyMiddle ? row.FinshesEarlyMiddle+ '%' : row.FinshesEarlyMiddle}</TableCell>


                <TableCell 
                sx={{ color:"#454545" }}
                >{row.FinshesMiddle ? row.FinshesMiddle+ '%' : row.FinshesMiddle}</TableCell>

                <TableCell 
                sx={{ color:"#454545" }}
                >{row.FinshesMiddleLate ? row.FinshesMiddleLate+ '%' : row.FinshesMiddleLate}</TableCell>


                <TableCell 
                sx={{ color:"#454545" }}
                >{row.FinshesLate ? row.FinshesLate+ '%' : row.FinshesLate}</TableCell>

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



export default PlayersDT