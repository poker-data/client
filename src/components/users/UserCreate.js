import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Dialog } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import {
  // modifyUserBy_id,
  useAuthState,
  useAuthDispatch,
} from '../../context';
import { useStylesForm } from './useStylesForm';
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
  Tabs,
  Tab,
  Typography,
} from '@mui/material';
import { alertEditUser, alertPassword, alertRegister } from './Alerts';
import { userRegister } from '../../context/actions';

const UserCreate = () => {
  const history = useHistory();
  const dispatch = useAuthDispatch();
  const styles = useStylesForm();
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
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
    };
    try {
      if (password.length < 11) {
        return alertPassword();
      } else {
        dispatch(userRegister(body));
        alertRegister();
        setName('');
        setEmail('');
        setPassword('');
        setAdmin('');
        setShkUsername('');
        setLevel(1);
        setChecked(false);
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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  return (
    <Box display="grid" justifyContent={'center'}>
      <Box
        backgroundColor={'white'}
        height={'70vh'}
        width={'50vw'}
        marginTop="15vh"
      >
        <Stack
          className={styles.title}
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Create User
        </Stack>
        <Box>
          <Grid container justifyContent="center" sx={{ flexDirection: 'row' }}>
            <Grid item sx={{ padding: '1rem' }}>
              <TextField
                spacing={{ xs: 8 }}
                label="Name"
                variant="filled"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item sx={{ padding: '1rem' }}>
              <TextField
                spacing={{ xs: 8 }}
                label="Email"
                variant="filled"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid
              container
              justifyContent="center"
              sx={{ flexDirection: 'row' }}
            >
              <Grid item sx={{ padding: '1rem' }}>
                <TextField
                  spacing={{ xs: 8 }}
                  label="Shark Username"
                  variant="filled"
                  required
                  value={shkUsername}
                  onChange={(e) => setShkUsername(e.target.value)}
                />
              </Grid>
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
          >
            <Grid item justifyContent="center" xs={10} md={5}>
              <FormControl fullWidth>
                <InputLabel id="test-select-label">Level</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="role"
                  label="Rol"
                  value={level}
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
            <Grid item sx={{ padding: '1rem' }}>
              <Stack>Admin</Stack>
              <Checkbox
                checked={checked}
                onChange={handleChangeAdmin}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Grid>
            <Grid item sx={{ padding: '1rem' }}>
              <TextField
                spacing={{ xs: 8 }}
                label="Password"
                variant="filled"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
            sx={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <Grid className={styles.buttonL}>
              <Button onClick={handleBack}>Back</Button>
            </Grid>
            <Grid className={styles.buttonR}>
              <Button
                disabled_={
                  !name.length < 0 ||
                  !level.length < 0 ||
                  !email.length < 0 ||
                  !password.length < 0
                }
                onClick={handleSubmit}
              >
                Create
              </Button>
            </Grid>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default UserCreate;
