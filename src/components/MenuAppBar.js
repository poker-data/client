import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { logout, useAuthDispatch, useAuthState } from "../Context";
import { useHistory } from "react-router-dom";
import "./MenuAppBar.css";
import AdminDashboard from "./users/AdminDashboard";
import { Drawer } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function MenuAppBar({ handleBtnClick }) {
  const dispatch = useAuthDispatch();
  const state = useAuthState();
  let seller = state?.user?.name ?? "";
  const avatar = state?.imageLink ? state.imageLink : null;

  // console.log(state);
  let history = useHistory();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);


  const handleBrandClick = () => {
    history.push("/home");
  };

  const handleGDClick = () => {
    history.push("/groups");
  };

  const handleTDClick = () => {
    history.push("/teamdashboard");
  };

  const handlePDClick = () => {
    history.push("/playerdashboard");
  };

  const handleRDClick = () => {
    history.push("/roomdashboard");
  };

  const showModal = () => {
    if (!modal) {
      setModal(true);
    } else {
      setModal(false);
    }
  };

  const handleUSClick = () => {
    showModal()
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 

  const handleSignOut = async () => {
    // console.log("logging out");
    await logout(dispatch);
    // console.log("sign out");
    // setAnchorEl(null);
  };

  const redirectOnSignOut = () => {
    history.push("/login");
  };


 

  const closeModal = () => {
    setModal(false);
  };
  React.useEffect(() => {
    if (state.user === "") {
      console.log("redirecting on sign out");
     // redirectOnSignOut();
    }
  }, []);
  
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ border: 1, borderColor:"black", bgcolor: "#000000", padding: "0.5% 0" }}>
        <Toolbar>
          <div onClick={handleBtnClick}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                "& svg": {
                  fontSize: "35px",
                  color: "#ebe9eb",
                  fill: "#ebe9eb",
                },
                mr: 2,
              }}
              onClick={() => setIsDrawerOpen(true)}
              >
              <MenuIcon />
              
            </IconButton>
            <Drawer 
            anchor = 'left'
            open={isDrawerOpen}
            onClose={()=> setIsDrawerOpen(false)}>

            <Box p={2} width='100%' height='100%' textAlign='center' role='presentation'
            sx={{ bgcolor: "#0a0b0c"}}
            
            >
                <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                "& svg": {
                  fontSize: "35px",
                  color: "#ebe9eb",
                  fill: "#ebe9eb",
                },
                mr: 2,
              }}
              onClick={() => setIsDrawerOpen(false)}
              >
              <KeyboardBackspaceIcon />
              
            </IconButton>
                <Typography
                  variant="h6"
                  component="div"
                  className="main-title"
                  sx={{
                    flexGrow: 1,
                    fontSize: "30px",
                    marginBottom: "4%",
                    borderBottom: 1,
                    borderColor: "#d3d3d3",
                    color:"#d3d3d3",
                    "@media screen and (max-width: 768px)": {
                      fontSize: "14px",
                    },
                  }}
                  onClick={handleBrandClick}
                  >
                Player Info
                </Typography>   

                <Typography
                variant="h6"
                component="div"
                className="main-title"
                sx={{
                  flexGrow: 1,
                  fontSize: "30px",
                  marginBottom: "4%",
                  borderBottom: 1,
                  borderColor: "#d3d3d3",
                  color:"#d3d3d3",
                  "@media screen and (max-width: 768px)": {
                    fontSize: "14px",
                  },
                }}
                onClick={handleGDClick}
                >
              Group Info
              </Typography>

              <Typography
                variant="h6"
                component="div"
                className="main-title"
                sx={{
                  flexGrow: 1,
                  fontSize: "30px",
                  marginBottom: "4%",
                  borderBottom: 1,
                  borderColor: "#d3d3d3",
                  color:"#d3d3d3",
                  "@media screen and (max-width: 768px)": {
                    fontSize: "14px",
                  },
                }}
                onClick={handlePDClick}
                >
              Player Dashboard
              </Typography>

              <Typography
                variant="h6"
                component="div"
                className="main-title"
                sx={{
                  flexGrow: 1,
                  fontSize: "30px",
                  marginBottom: "4%",
                  borderBottom: 1,
                  borderColor: "#d3d3d3",
                  color:"#d3d3d3",
                  "@media screen and (max-width: 768px)": {
                    fontSize: "14px",
                  },
                }}
                onClick={handleTDClick}
                >
              Team Dashboard
              </Typography>

              <Typography
                variant="h6"
                component="div"
                className="main-title"
                sx={{
                  flexGrow: 1,
                  fontSize: "30px",
                  marginBottom: "4%",
                  borderBottom: 1,
                  borderColor: "#d3d3d3",
                  color:"#d3d3d3",
                  "@media screen and (max-width: 768px)": {
                    fontSize: "14px",
                  },
                }}
                onClick={handleRDClick}
                >
              Room Dashboard
              </Typography>

              <Typography
                variant="h6"
                component="div"
                className="main-title"
                sx={{
                  flexGrow: 1,
                  fontSize: "30px",
                  marginBottom: "4%",
                  borderBottom: 1,
                  borderColor: "#d3d3d3",
                  color:"#d3d3d3",
                  "@media screen and (max-width: 768px)": {
                    fontSize: "14px",
                  },
                }}
                onClick={handleUSClick}
                >
              Users
              </Typography>

            </Box>
            </Drawer>
          </div>

          
          {auth && (
            <div className="avatar-container">
              <Typography>{seller}</Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{
                  "& svg": {
                    fontSize: "35px",
                    color: "black",
                    fill: "black",
                  },
                }}
                >
                <Avatar src={avatar} alt="PF" />
              </IconButton>
              <Menu
                id="acoount-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
    {modal ? (
        <AdminDashboard
          closeModal={closeModal}
        />
      ) : null}
          </>
  );
}