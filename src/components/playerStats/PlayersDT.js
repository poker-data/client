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
import { useAuthState } from "../../context";
import { parseSecondstoDate } from '../utils/Formatters';


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
      state.playerWithFilter.stats ? dataTable.push(state.playerWithFilter.stats) : dataTable.push([]) 
      setData(dataTable);
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
        <Paper sx={{ background:"#111315", border: 1, borderColor:"#111315", margin:"1%"}}>
        <Typography
          sx={{ flex: '1 1 100%', fontFamily:"Barlow", fontWeight:'bold', textAlign:'center', background:"#000000", color:"#ffffff"}}
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
            aria-labelledby="simple table"
            size={dense ? 'small' : 'medium'}>
          <TableHead style={{ backgroundColor: '#d3d3d3', height: 50}}>
            <TableRow >
            <TableCell sx={{fontWeight: 'bold' , color:"#111315", fontFamily:"Barlow"}}>Count</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>Entries</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>AvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>AvStake</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>AvROI</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>Profit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>Ability</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>Stake</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>Cashes</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>Rake</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>TotalROI</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>ITM</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>Bankroll</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>FirstGameDate</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>LastGameDate</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>MostGamesInDay</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>AvGamesPerDay</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>ActiveDayCount</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>TournamentWins</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>FinalTables</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>Best100StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>Best500StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>Worst100StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>Worst500StreakAvProfit</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>AvEntrants</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>TurboRatio</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>PercentFieldBeaten</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>FinshesEarly</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>FinshesEarlyMiddle</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>FinshesMiddle</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>FinshesMiddleLate</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>FinshesLate</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>PTLBPoints</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>MaxWinningStreak</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>MaxLosingStreak</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>MaxCashingStreak</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>WinningDays</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow" }}>LosingDays</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>BreakEvenDays</TableCell>
              <TableCell sx={{fontWeight: 'bold', color:"#111315", fontFamily:"Barlow"}}>AchievementPoints</TableCell>  
            </TableRow>
          </TableHead>
          <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => (
              <TableRow 
                style={{ backgroundColor: '#d3d3d3', height: 10 }}
                hover
                tabIndex={-1}
                key={key}>
                <TableCell sx={{ color:"#111315", fontFamily:"Barlow" }}>{row.Count}</TableCell>
                <TableCell sx={{ color:"#111315", fontFamily:"Barlow" }}>{row.Entries}</TableCell>

                <TableCell 
                sx={{ color:"#111315", fontFamily:"Barlow" }}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.AvProfit)) === 1 && '#111315') ||
                  (Math.sign(parseFloat(row.AvProfit)) === -1 && 'red'))
                  }}>{row.AvProfit ? '$'+row.AvProfit : row.AvProfit}</TableCell>

                <TableCell 
                sx={{ color:"#111315", fontFamily:"Barlow" }}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.AvStake)) === 1 && '#111315') ||
                  (Math.sign(parseFloat(row.AvStake)) === -1 && 'red'))
                  }}>{row.AvStake ? '$'+row.AvStake : row.AvStake}</TableCell>

                <TableCell 
                sx={{ color:"#111315", fontFamily:"Barlow" }}
                >{row.AvROI ? row.AvROI+ '%' : row.AvROI}</TableCell>

                <TableCell 
                sx={{ color:"#111315", fontFamily:"Barlow" }}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.Profit)) === 1 && '#111315') ||
                  (Math.sign(parseFloat(row.Profit)) === -1 && 'red'))
                  }}>{row.Profit ? '$'+row.Profit : row.Profit}</TableCell>

                <TableCell sx={{ color:"#111315", fontFamily:"Barlow" }}>{row.Ability}</TableCell>

                <TableCell 
                sx={{ color:"#111315", fontFamily:"Barlow" }}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.Stake)) === 1 && '#111315') ||
                  (Math.sign(parseFloat(row.Stake)) === -1 && 'red'))
                  }}>{row.Stake ? '$'+row.Stake : row.Stake}</TableCell>

                <TableCell 
                sx={{ color:"#111315", fontFamily:"Barlow" }}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.Cashes)) === 1 && '#111315') ||
                  (Math.sign(parseFloat(row.Cashes)) === -1 && 'red'))
                  }}>{row.Cashes ? '$'+row.Cashes : row.Cashes}</TableCell>
                
                <TableCell 
                sx={{ color:"#111315", fontFamily:"Barlow" }}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.Rake)) === 1 && '#111315') ||
                  (Math.sign(parseFloat(row.Rake)) === -1 && 'red'))
                  }}>{row.Rake ? '$'+row.Rake : row.Rake}</TableCell>

                <TableCell 
                sx={{ color:"#111315", fontFamily:"Barlow" }}
                >{row.TotalROI ? row.TotalROI+ '%' : row.TotalROI}</TableCell>

                <TableCell 
                sx={{ color:"#111315", fontFamily:"Barlow" }}
                >{row.ITM ? row.ITM+ '%' : row.ITM}</TableCell>

                <TableCell 
                sx={{ color:"#111315" , fontFamily:"Barlow"}}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.Bankroll)) === 1 && '#111315') ||
                  (Math.sign(parseFloat(row.Bankroll)) === -1 && 'red'))
                  }}>{row.Bankroll ? '$'+row.Bankroll : row.Bankroll}</TableCell>

                <TableCell 
                sx={{ color:"#111315" , fontFamily:"Barlow"}}
                >{row.FirstGameDate ? parseSecondstoDate(row.FirstGameDate) : row.FirstGameDate}</TableCell>

                <TableCell sx={{ color:"#111315" , fontFamily:"Barlow"}}
                >{row.LastGameDate ? parseSecondstoDate(row.LastGameDate) : row.LastGameDate}</TableCell>

                <TableCell sx={{ color:"#111315" , fontFamily:"Barlow"}}>{row.MostGamesInDay}</TableCell>

                <TableCell sx={{ color:"#111315" , fontFamily:"Barlow"}}>{row.AvGamesPerDay}</TableCell>

                <TableCell sx={{ color:"#111315", fontFamily:"Barlow" }}>{row.ActiveDayCount}</TableCell>

                <TableCell sx={{ color:"#111315", fontFamily:"Barlow" }}>{row.TournamentWins}</TableCell>

                <TableCell sx={{ color:"#111315" , fontFamily:"Barlow"}}>{row.FinalTables}</TableCell>

                <TableCell 
                sx={{ color:"#111315" , fontFamily:"Barlow"}}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.Best100StreakAvProfit)) === 1 && '#111315') ||
                  (Math.sign(parseFloat(row.Best100StreakAvProfit)) === -1 && 'red'))
                 }}>{row.Best100StreakAvProfit ? '$'+row.Best100StreakAvProfit : row.Best100StreakAvProfit}</TableCell>


                <TableCell 
                sx={{ color:"#111315", fontFamily:"Barlow" }}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.Best500StreakAvProfit)) === 1 && '#111315') ||
                  (Math.sign(parseFloat(row.Best500StreakAvProfit)) === -1 && 'red'))
                 }}>{row.Best500StreakAvProfit ? '$'+row.Best500StreakAvProfit : row.Best500StreakAvProfit}</TableCell>

                <TableCell 
                sx={{ color:"#111315" , fontFamily:"Barlow"}}
                style={{
                  color:
                  ((Math.sign(parseFloat(row.Worst100StreakAvProfit)) === 1 && '#111315') ||
                  (Math.sign(parseFloat(row.Worst100StreakAvProfit)) === -1 && 'red'))
                 }}>{row.Worst100StreakAvProfit ? '$'+row.Worst100StreakAvProfit : row.Worst100StreakAvProfit}</TableCell>

                <TableCell sx={{ color:"#111315" , fontFamily:"Barlow"}}
                 style={{
                  color:
                  ((Math.sign(parseFloat(row.Worst500StreakAvProfit)) === 1 && '#111315') ||
                  (Math.sign(parseFloat(row.Worst500StreakAvProfit)) === -1 && 'red'))
                 }}>{row.Worst500StreakAvProfit ? '$'+row.Worst500StreakAvProfit : row.Worst500StreakAvProfit}</TableCell>

                <TableCell sx={{ color:"#111315", fontFamily:"Barlow" }}>{row.AvEntrants}</TableCell>

                <TableCell 
                sx={{ color:"#111315", fontFamily:"Barlow" }}
                >{row.TurboRatio ? row.TurboRatio+ '%' : row.TurboRatio}</TableCell>

                <TableCell 
                sx={{ color:"#111315" , fontFamily:"Barlow"}}
                >{row.PercentFieldBeaten ? row.PercentFieldBeaten+ '%' : row.PercentFieldBeaten}</TableCell>

                <TableCell 
                sx={{ color:"#111315", fontFamily:"Barlow" }}
                >{row.FinshesEarly ? row.FinshesEarly+ '%' : row.FinshesEarly}</TableCell>

                <TableCell 
                sx={{ color:"#111315" , fontFamily:"Barlow"}}
                >{row.FinshesEarlyMiddle ? row.FinshesEarlyMiddle+ '%' : row.FinshesEarlyMiddle}</TableCell>


                <TableCell 
                sx={{ color:"#111315" , fontFamily:"Barlow"}}
                >{row.FinshesMiddle ? row.FinshesMiddle+ '%' : row.FinshesMiddle}</TableCell>

                <TableCell 
                sx={{ color:"#111315" , fontFamily:"Barlow"}}
                >{row.FinshesMiddleLate ? row.FinshesMiddleLate+ '%' : row.FinshesMiddleLate}</TableCell>


                <TableCell 
                sx={{ color:"#111315", fontFamily:"Barlow" }}
                >{row.FinshesLate ? row.FinshesLate+ '%' : row.FinshesLate}</TableCell>

                <TableCell sx={{ color:"#111315", fontFamily:"Barlow" }}>{row.PTLBPoints}</TableCell>

                <TableCell sx={{ color:"#111315", fontFamily:"Barlow" }}>{row.MaxWinningStreak}</TableCell>

                <TableCell sx={{ color:"#111315", fontFamily:"Barlow" }}>{row.MaxLosingStreak}</TableCell>

                <TableCell sx={{ color:"#111315", fontFamily:"Barlow" }}>{row.MaxCashingStreak}</TableCell>

                <TableCell sx={{ color:"#111315", fontFamily:"Barlow" }}>{row.WinningDays}</TableCell>

                <TableCell sx={{ color:"#111315" , fontFamily:"Barlow"}}>{row.LosingDays}</TableCell>

                <TableCell sx={{ color:"#111315" , fontFamily:"Barlow"}}>{row.BreakEvenDays}</TableCell>

                <TableCell sx={{ color:"#111315", fontFamily:"Barlow" }}>{row.AchievementPoints}</TableCell>

              </TableRow>
            ))}
            
          </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ color:"#454545", backgroundColor: '#d3d3d3', fontFamily:"Barlow"}}
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
        
        control={<Switch style={{ color:"#2debab"}} checked={dense} onChange={handleChangeDense} />}
        sx = {{ color:"#ffffff"}}
        label="Colapse"
      />
      </Box>
    );
}    



export default PlayersDT