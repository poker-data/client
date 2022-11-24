import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuthState, useAuthDispatch } from '../../context';
import { getIdUser, getUsers, logicalDeleteUser } from '../../context/actions';
import { useStylesForm } from './useStylesForm';

function AdminDashboard() {
  const history = useHistory();
  const state = useAuthState();
  const dispatch = useAuthDispatch();
  const allUsers = state.users;
  const styles = useStylesForm();

  useEffect(async () => {
    await getUsers(dispatch);
  }, []);

  const createUser = () => {
    history.push('/usercreate');
  };

  const deleteUser = async (id) => {
    await logicalDeleteUser(dispatch, id);
    window.location.reload();
  };

  /*   const editUser = (id) => {
      history.push(`/useredit/${id}`)
    } */

  const llenar = async (id) => {
    await getIdUser(dispatch, id);
  };

  const handleBack = () => {
    history.push('/home');
  };

  return (
    <>
      <Box
        backgroundColor={'white'}
        display="grid"
        alignItems="center"
        justifyContent="center"
      >
        <Box display="flex " alignItems="center" justifyContent="center">
          <Typography className={styles.title}>Admin Dashboard</Typography>
        </Box>
        <Box>
          <Button onClick={handleBack}>Back</Button>
          <Button>ACA VA LA SEARCHBAR</Button>
          <Button onClick={createUser}>Create User</Button>
        </Box>
        <Box>
          <Button>ACA EL PAGINADO</Button>
        </Box>

        <TableContainer direction={'column'}>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Shark Username</TableCell>
              <TableCell>Player Level</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((row) =>
              row.delete ? null : (
                <TableRow key={row.name} value={row.name}>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.shkUsername}</TableCell>
                  <TableCell>{row.playerLevel}</TableCell>
                  <TableCell>{!row.admin ? 'No' : 'Yes'}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteUser(row._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Link to={`/useredit/${row._id}`}>
                      <IconButton
                        aria-label="delete"
                        onClick={() => llenar(row._id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </TableContainer>
      </Box>
    </>
  );
}

export default AdminDashboard;
