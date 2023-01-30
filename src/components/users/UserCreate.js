import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  useAuthState,
  useAuthDispatch,
} from '../../context';
import MenuItem from '@mui/material/MenuItem';
import {
  Button,
  Grid,
  TextField,
  Stack,
  Box,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  Typography,
} from '@mui/material';
import { alertEmailExist, alertPassword, alertRegister } from './Alerts';
import { getCountries, getUsers, userRegister } from '../../context/actions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import logo from '../../assets/Horizontal.png';
import "./User.css" 
import { useStylesForm } from './useStylesForm';

const UserCreate = () => {
  const state = useAuthState();
  const history = useHistory();
  const dispatch = useAuthDispatch();
  const styles = useStylesForm();
  const countries = state.countries
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState('');
  const [checked, setChecked] = useState(false);
  const [shkUsername, setShkUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: name,
      playerLevel: level,
      email: email,
      shkUsername: shkUsername,
      password: password,
      admin: admin,
      country: country
    };
    try {
      if (password.length < 8) {
        return alertPassword();
      } else {
        const newUser = await userRegister(body)
        if(!newUser.info.error){
          alertRegister();
          setName('');
          setEmail('');
          setPassword('');
          setAdmin('');
          setShkUsername('');
          setLevel('');
          setCountry('');
          setChecked(false);
          await getUsers(dispatch)
          history.push('/admindashboard');
        } else if(newUser.info.error){
          alertEmailExist()
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    history.push('/admindashboard');
  };

  const handleChangeAdmin = (e) => {
    setChecked(e.target.checked);
    if (checked) {
      setAdmin(false);
    } else {
      setAdmin(true);
    }
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  useEffect( () => {
    const fetchData = async () => {
      await getCountries(dispatch);
    }
    fetchData();
  }, []);


  return (
    
    <Box display="grid" 
    sx={{    
      background:"#111315"
    }} 
    justifyContent={'center'}>
      
     
      <Box
        sx={{
          background:"#111315",
          borderRadius: 2
        }}
        height={'70vh'}
        width={'50vw'}
        marginTop="5vh"
      >
     {/*    <Stack
            className={styles.title}
            sx={{
              justifyContent: 'space-between',
              fontFamily:"Barlow",
              color:"#2debab"
            }}
          >
            CREAR NUEVO USUARIO
          </Stack> */}
            <Stack
            sx={{
              marginBottom: "4%",
              alignItems: "center",
              justifyContent: "center",
            }}
              >
                <img src={logo}  alt= "bbzlatam.app" className='image'/>

        </Stack>
         <IconButton
    size="large"
    edge="start"
    aria-label="menu"
    sx={{
      float:"left",
      "& svg": {
        fontSize: "35px",
        color: "#111315",
        fill: "#ebe9eb",
      },
    }}
    onClick={handleBack}
  >
    <ArrowBackIcon />
    <Typography 
    sx={{
      color:"#2debab",
      fontFamily:"Barlow",
      fontSize:"25px",
      marginLef:"20%"}}>Regresar</Typography>
  </IconButton>

  
         
        <Box >
        
              {/* <Stack
          className={styles.title}
          sx={{
            justifyContent: 'space-between',
            fontFamily:"Barlow",
            color:"#2debab"
  
          }}
        >
          CREAR NUEVO USUARIO
        </Stack> */}
          <Grid container 
          sx={{ 
            justifyContent: "space-between" ,
            flexDirection:"row"

             }}>
            <Grid item sx={{ background:"#454545", width:"100%" , borderRadius:1}}>
              <TextField
                
                label="Name"
                variant="filled"
                required
                value={name}
                sx={{ 
                  margin:"2%",
                  background:"#ffffff",
                  borderRadius:2}}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                
                label="Email"
                variant="filled"
                type="email"
                required
                value={email}
                sx={{ 
                  margin:"2%",
                  float:"right",
                  background:"#ffffff",
                  borderRadius:2}}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid
              container

            >
              <Grid item sx={{  flexDirection: 'row',  background:"#454545", width:"100%" }}>
                <TextField
                  spacing={{ xs: 8 }}
                  label="Shark Username"
                  variant="filled"
                  required
                  value={shkUsername}
                  sx={{ 
                    margin:"2%",
                    background:"#ffffff",
                    borderRadius:2}}
                  onChange={(e) => setShkUsername(e.target.value)}
                />

              <TextField
                spacing={{ xs: 8 }}
                label="Password"
                variant="filled"
                required
                value={password}
                sx={{ 
                  margin:"2%",
                  background:"#ffffff",
                  float:"right",
                  borderRadius:2}}
                onChange={(e) => setPassword(e.target.value)}
              />


              </Grid>
              
            </Grid>

          </Grid>
          <Grid item sx={{ background:"#454545"}}>
              <Stack sx={{color:"#2debab", fontWeight:"bold",fontFamily:"Barlow", marginLeft:"2%", marginBottom:"2%"}}>¿Es Admin?</Stack>
              <Checkbox
                checked={checked}
                sx={{
                background:"#ffffff",
                marginBottom:"2%",
                marginLeft:"7%",
                "&:hover": { background:"#ffffff"}}}
                onChange={handleChangeAdmin}
                inputProps={{ 'aria-label': 'controlled' }}
              >
              
             </Checkbox>
            
             
            </Grid>

            <Grid
            container 
            sx={{ 
              justifyContent: "space-between" ,
              flexDirection:"row",
              background:"#454545",
              borderBottomLeftRadius:5,
              borderBottomRightRadius:5
  
               }}>


            <Grid item sx={{ background:"#454545", width:"50%", borderBottomLeftRadius:5}}>
              <FormControl fullWidth >
                <InputLabel id="test-select-label">Level</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="role"
                  label="Rol"
                  value={level}
                  sx={{ 
                    margin:"2%",
                    background:"#ffffff",
                    borderRadius:2}}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <MenuItem value={'1'}>1</MenuItem>
                  <MenuItem value={'2'}>2</MenuItem>
                  <MenuItem value={'3'}>3</MenuItem>
                  <MenuItem value={'4'}>4</MenuItem>
                  <MenuItem value={'5'}>5</MenuItem>
                  <MenuItem value={'6'}>6</MenuItem>
                  <MenuItem value={'7'}>7</MenuItem>
                  <MenuItem value={'8'}>8</MenuItem>
                  <MenuItem value={'9'}>9</MenuItem>
                </Select>
              </FormControl>
              
            </Grid>
            <Grid item sx={{ background:"#454545", width:"50%", borderBottomRightRadius:5}}>
              <FormControl fullWidth>
                <InputLabel id="test-select-label">Country</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="role"
                  label="Rol"
                  value={country}
                  sx={{ 
                    margin:"2%",
                    background:"#ffffff",
                    borderRadius:2}}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countries.map(c => 
                        <MenuItem value={c.region} key={c.region}>{c.region}</MenuItem>
                  )}
                </Select>
              </FormControl>
              
            </Grid>
            <Stack
              className={styles.buttonsContainer}
              sx={{ 
                background:"#111315",
                alignItems:"center",
             }}
            >
            <Button
              size="large"
              sx={{ 
              fontWeight: 'bold',
              border: 1, 
              borderColor: "#454545",
              margin:"1%", 
              backgroundColor: '#2debab',
              color: '#111315' ,
              fontFamily:"Barlow",
              "&:hover": {borderColor:"#2debab", background:"#2debab"}}}
                disabled_={
                  !name.length < 0 ||
                  !level.length < 0 ||
                  !email.length < 0 ||
                  !password.length < 0
                }
                onClick={handleSubmit}
              >
                ACEPTAR
              </Button>
              </Stack>


          </Grid>     
          
        </Box>
      </Box>
    </Box>
  );
};

export default UserCreate;
