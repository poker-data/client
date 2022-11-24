import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button,TablePagination } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuthState, useAuthDispatch } from '../../context';
import { getIdUser, getUsers, logicalDeleteUser } from '../../context/actions';
import UserEdit from './UserEdit';
import { useStylesForm } from './useStylesForm';

function AdminDashboard() {
  const history = useHistory();
  const state = useAuthState();
  const dispatch = useAuthDispatch();
  const allUsers = state.users.filter(d => d.delete !== true);
  const styles = useStylesForm();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const llenar = async (id) => {
    await getIdUser(dispatch, id);
  };

  const handleBack = () => {
    history.push('/home');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
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
        <TableContainer direction={'column'}>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Shark Username</TableCell>
              <TableCell>Player Level</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>
                <TableRow key={row.name} value={row.email}>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.shkUsername}</TableCell>
                  <TableCell>{row.playerLevel}</TableCell>
                  <TableCell>{row.country ? row.country : 'Not country assigned'}</TableCell>
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
            )}
          </TableBody>
          <TablePagination
          sx={{ color:"#454545" }}
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={allUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </TableContainer>
      </Box>
    </>
  );
}

export default AdminDashboard;
