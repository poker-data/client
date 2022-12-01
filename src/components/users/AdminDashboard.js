import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button, TablePagination, TextField } from '@mui/material';
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
import MenuAppBar from '../MenuAppBar';
import Popup from '../utils/Popup';
import swal from 'sweetalert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { alertDelete, alertDeleteUser } from './Alerts';

function AdminDashboard() {
  const history = useHistory();
  const state = useAuthState();
  const dispatch = useAuthDispatch();
  const allUsers = state.users;
  const styles = useStylesForm();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const [search, setSearch] = useState();

  useEffect(async () => {
    await getUsers(dispatch);
    if (usuarios.length === 0) {
      setUsuarios(allUsers);
    } else if (usuarios.length > allUsers.length) {
      setUsuarios(allUsers);
    }
  }, [allUsers]);

  const [usuarios, setUsuarios] = useState(allUsers);


  const createUser = () => {
    history.push('/usercreate');
  };

  const fill = async (id) => {
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

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    filter(e.target.value);
    setPage(0);
  };

  const filter = (searchTerm) => {
    var searchResult = allUsers.filter((e) => {
      if (
        e.name
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        e.email
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return e;
      }
    });
    setUsuarios(searchResult);
  };

  const toggleSidebar = () => {
    if (!sidebarVisible) {
      setSidebarVisible(true);
    } else {
      setSidebarVisible(false);
    }
  };
  return (
    <>
      <MenuAppBar handleBtnClick={toggleSidebar} />

      <Box
        backgroundColor={'#111315'}
        display="grid"
        alignItems="center"
        justifyContent="center"
      >
        <Box sx={{ background: '#111315' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              float: 'left',
              '& svg': {
                fontSize: '35px',
                color: '#ebe9eb',
                fill: '#ebe9eb',
              },
            }}
            onClick={handleBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <TextField
            sx={{
              margin: '2%',
              background: '#d3d3d3',
              borderRadius: 2,
            }}
            id="outlined-basic"
            label="Buscar"
            variant="outlined"
            value={search}
            onChange={(e) => handleInputChange(e)}
          />
          <Button
            sx={{
              float: 'right',
              fontWeight: 'bold',
              border: 1,
              borderColor: '#2debab',
              margin: '1%',
              backgroundColor: '#2debab',
              color: '#111315',
              fontFamily: 'Barlow',
              '&:hover': { borderColor: '#2debab', background: '#2debab' },
            }}
            onClick={createUser}
          >
            Nuevo Usuario
          </Button>
        </Box>
        <TableContainer sx={{ background: '#d3d3d3' }} direction={'column'}>
          <TableHead style={{ backgroundColor: '#d3d3d3', height: 50 }}>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  color: '#111315',
                  fontFamily: 'Barlow',
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  color: '#111315',
                  fontFamily: 'Barlow',
                }}
              >
                Usuario App
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  color: '#111315',
                  fontFamily: 'Barlow',
                }}
              >
                Usuario Shark
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  color: '#111315',
                  fontFamily: 'Barlow',
                }}
              >
                Nivel Jugador
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  color: '#111315',
                  fontFamily: 'Barlow',
                }}
              >
                Zona
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  color: '#111315',
                  fontFamily: 'Barlow',
                }}
              >
                Admin
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  color: '#111315',
                  fontFamily: 'Barlow',
                }}
              >
                Eliminar
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  color: '#111315',
                  fontFamily: 'Barlow',
                }}
              >
                Editar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row._id} value={row.email}>
                  <TableCell sx={{ color: '#111315', fontFamily: 'Barlow' }}>
                    {row.email}
                  </TableCell>
                  <TableCell sx={{ color: '#111315', fontFamily: 'Barlow' }}>
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ color: '#111315', fontFamily: 'Barlow' }}>
                    {row.shkUsername}
                  </TableCell>
                  <TableCell sx={{ color: '#111315', fontFamily: 'Barlow' }}>
                    {row.playerLevel}
                  </TableCell>
                  <TableCell sx={{ color: '#111315', fontFamily: 'Barlow' }}>
                    {row.country ? row.country : 'No hay pais asignado'}
                  </TableCell>
                  <TableCell sx={{ color: '#111315', fontFamily: 'Barlow' }}>
                    {!row.admin ? 'No' : 'Si'}
                  </TableCell>
                  <TableCell sx={{ color: '#111315', fontFamily: 'Barlow' }}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => alertDeleteUser(dispatch, row._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ color: '#111315' }}>
                    <Link to={`/useredit/${row._id}`}>
                      <IconButton
                        aria-label="delete"
                        onClick={() => fill(row._id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TablePagination
            sx={{
              color: '#454545',
              backgroundColor: '#d3d3d3',
              fontFamily: 'Barlow',
            }}
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={usuarios.length}
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
