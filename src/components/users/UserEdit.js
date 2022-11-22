import { useAuthState, useAuthDispatch } from '../../context';
import React, { useState, useEffect } from 'react';
import {
  alertEdit,
  alertEditUser,
  alertPassword,
  alertRegister,
} from './Alerts';
import { useHistory, useParams } from 'react-router-dom';

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
import MenuItem from '@mui/material/MenuItem';
import { useStylesForm } from './useStylesForm';
import { getUsers, userUpdate } from '../../context/actions';

function UserEdit() {
  const state = useAuthState();
  const allUsersId = state.userId;
  const { id } = useParams();
  const dispatch = useAuthDispatch();
  const history = useHistory();
  const styles = useStylesForm();
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState('');
  const [checked, setChecked] = useState(false);
  const [shkUsername, setShkUsername] = useState('');
  const [loading, setLoading] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      playerLevel: level ? level : allUsersId[0].level,
      email: email ? email : allUsersId[0].email,
      shkUsername: shkUsername ? shkUsername : allUsersId[0].shkUsername,
      admin: admin ? admin : allUsersId[0].admin,
    };
    try {
      await userUpdate(dispatch, id, body);
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
    if (allUsersId && allUsersId.length < 0) {
      setLoading(true);
    } else {
      setName(allUsersId[0]?.name);
      setEmail(allUsersId[0]?.email);
      setShkUsername(allUsersId[0]?.shkUsername);
      setLevel(allUsersId[0]?.playerLevel);
      setAdmin(allUsersId[0]?.admin);
    }
  }, [allUsersId]);

  if (loading) {
    return <h1>LOADING</h1>;
  } else {
    return (
      <Box display="grid" justifyContent={'center'}>
        <Box
          backgroundColor={'white'}
          height={'70vh'}
          width={'50vw'}
          marginTop={'15vh'}
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
            Edit User
          </Stack>
          <Box>
            <Grid
              container
              justifyContent="center"
              sx={{ flexDirection: 'row' }}
            >
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
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="Admin"
                  label="Admin"
                  value={admin}
                  onChange={(e) => setAdmin(e.target.value)}
                >
                  <MenuItem value={'true'}>Yes</MenuItem>
                  <MenuItem value={'false'}>No</MenuItem>
                </Select>
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
                <Button onClick={handleSubmit}>Edit</Button>
              </Grid>
            </Stack>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default UserEdit;
