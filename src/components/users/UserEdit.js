import { useAuthState, useAuthDispatch } from '../../context';
import React, { useState, useEffect } from 'react';
import {
  alertEdit
} from './Alerts';
import { useHistory, useParams } from 'react-router-dom';
import "./User.css"
import {
  Button,
  Grid,
  TextField,
  Stack,
  Box,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Checkbox
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useStylesForm } from './useStylesForm';
import { getCountries, getUsers, userUpdate } from '../../context/actions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import logo from '../../assets/Horizontal.png';

function UserEdit() {
  const state = useAuthState();
  const allUsersId = state.userId;
  const countries = state.countries;
  const { id } = useParams();
  const dispatch = useAuthDispatch();
  const history = useHistory();
  const styles = useStylesForm();
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [admin, setAdmin] = useState('');
  const [shkUsername, setShkUsername] = useState('');
  const [loading, setLoading] = useState('');
  const [checked, setChecked] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    const body = {
      name: name ? name : allUsersId[0].name,
      playerLevel: level ? level : allUsersId[0].level,
      email: email ? email : allUsersId[0].email,
      shkUsername: shkUsername ? shkUsername : allUsersId[0].shkUsername,
      admin: admin ? admin : allUsersId[0].admin,
      country: country ? country : allUsersId[0].country
    };
    try {
      await userUpdate(dispatch, id, body);
      await getUsers(dispatch)
      alertEdit();
      history.push('/admindashboard');
    } catch (error) {
      return error;
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    history.push('/admindashboard');
  };

  useEffect(async () => {
    await getCountries(dispatch)
    if (allUsersId && allUsersId.length < 0) {
      setLoading(true);
    } else {
      setName(allUsersId[0]?.name);
      setEmail(allUsersId[0]?.email);
      setShkUsername(allUsersId[0]?.shkUsername);
      setLevel(allUsersId[0]?.playerLevel);
      setAdmin(allUsersId[0]?.admin);
      setCountry(allUsersId[0]?.country);
    }
  }, [allUsersId]);

  const handleChangeAdmin = (e) => {
    setChecked(e.target.checked);
    if (checked) {
      setAdmin(false);
    } else {
      setAdmin(true);
    }
  };


  if (loading) {
    return <h1>LOADING</h1>;
  } else {
    return (
      <Box display="grid"
        sx={{
          background: "#111315"
        }}
        justifyContent={'center'}>
        <Box
          backgroundColor={'#111315'}
          height={'70vh'}
          width={'50vw'}
          marginTop={'5vh'}
        >
          <Stack
            sx={{
              marginBottom: "4%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={logo} alt="bbzlatam.app" className='image' />

          </Stack>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{
              float: "left",
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
                color: "#2debab",
                fontFamily: "Barlow",
                fontSize: "25px",
                marginLef: "20%"
              }}>Regresar</Typography>

          </IconButton>

          <Box>
              <Grid container sx={{ background: "#454545", width: "100%", borderRadius: 1 , justifyContent: "space-between"}}>
              <TextField
                  spacing={{ xs: 8 }}
                  label="Shark Username"
                  variant="filled"
                  required
                  value={shkUsername}
                  sx={{
                    margin: "2%",
                    background: "#ffffff",
                    borderRadius: 2
                  }}
                  onChange={(e) => setShkUsername(e.target.value)}
                />
                
                <TextField
                  label="Email"
                  variant="filled"
                  type="email"
                  required
                  value={email}
                  sx={{
                    margin: "2%",
                    background: "#ffffff",
                    borderRadius: 2
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  spacing={{ xs: 8 }}
                  label="Nombre"
                  variant="filled"
                  required
                  value={name}
                  sx={{
                    margin: "2%",
                    background: "#ffffff",
                    borderRadius: 2
                  }}
                  onChange={(e) => setName(e.target.value)}
                />

            </Grid>
            <Grid
              container
              sx={{

                background: "#454545",
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5

              }}>
              <Grid item sx={{ background: "#454545", width: "50%", borderBottomLeftRadius: 5 }}>
                <FormControl fullWidth>
                  <InputLabel id="test-select-label">Level</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="role"
                    label="Rol"
                    value={level ?? ''}
                    sx={{
                      margin: "2%",
                      background: "#ffffff",
                      borderRadius: 2
                    }}
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
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sx={{ background: "#454545", width: "50%", borderBottomRightRadius: 5 }}>
                <FormControl fullWidth>
                  <InputLabel id="test-select-label">Country</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="role"
                    label="Rol"
                    value={country ?? ''}
                    sx={{
                      margin: "2%",
                      background: "#ffffff",
                      borderRadius: 2
                    }}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    {countries.map(c =>
                      <MenuItem value={c.region} key={c.region}>{c.region}</MenuItem>
                    )}
                  </Select>
                </FormControl>

              </Grid>
{/*               <Grid item sx={{ margin: "2%" }}>
                <Stack
                  sx={{
                    color: "#2debab",
                    fontWeight: "bold",
                    fontFamily: "Barlow",
                    marginLeft: "2%",
                    marginBottom: "2%"
                  }}>
                  ¿Admin?</Stack>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="Admin"
                  label="Admin"
                  value={admin}
                  sx={{
                    margin: "2%",
                    background: "#ffffff",
                    borderRadius: 2
                  }}
                  onChange={(e) => setAdmin(e.target.value)}
                >
                  <MenuItem value={'true'}>Yes</MenuItem>
                  <MenuItem value={'false'}>No</MenuItem>
                </Select>
              </Grid> */}
              <Grid item sx={{ background:"#454545"}}>
              <Stack sx={{color:"#2debab", fontWeight:"bold",
                      fontFamily:"Barlow", marginLeft:"5%", marginBottom:"5%",
                      width:"100%"
                      
                    }}>¿Es Admin?</Stack>
              <Checkbox
                checked={checked}
                sx={{
                background:"#ffffff",
                marginBottom:"2%",
                marginLeft:"25%",
                "&:hover": { background:"#ffffff"}}}
                onChange={handleChangeAdmin}
                inputProps={{ 'aria-label': 'controlled' }}
              >
              
             </Checkbox>
            
             
            </Grid>
            </Grid>
            <Grid
              item
              container
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            ></Grid>
            <Stack
              className={styles.buttonsContainer}
              sx={{
                background: "#111315",
                alignItems: "center",
              }}
            >

              <Button
                size="large"
                sx={{
                  float: "left",
                  fontWeight: 'bold',
                  border: 1,
                  borderColor: "#454545",
                  margin: "1%",
                  backgroundColor: '#2debab',
                  color: '#111315',
                  fontFamily: "Barlow",
                  "&:hover": { borderColor: "#2debab", background: "#2debab" }
                }}
                onClick={handleSubmit}
              >ACEPTAR</Button>

            </Stack>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default UserEdit;
