import React, { useEffect } from "react";
import {
  Drawer,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";

import { NavLink, useHistory } from "react-router-dom";
import LogoImage from "../../assets/images/HPM_LOGO.jpeg";
import "./SideBar.css";
import { useAuthState } from "../../context";

const SideBar = ({ sidebarVisible, toggleSidebar }) => {
  const state = useAuthState();
  const role = state?.role ?? "";
  // console.log({ role });
  const history = useHistory();
  useEffect(() => {}, []);

  const checkSalesmanAccess = (role) => {
    if (role === "developer" || role === "director" || role === "salesman") {
      return true;
    }
    return false;
  };

  const checkAdminAccess = (role) => {
    if (
      role === "developer" ||
      role === "administrator" ||
      role === "director"
    ) {
      return true;
    }
    return false;
  };

  const checkDirectorAccess = (role) => {
    if (role === "developer" || role === "director") {
      return true;
    }
    return false;
  };

  return (
    <Drawer
      sx={{
        "& .MuiBackdrop-root	": { bgcolor: "transparent" },
        "& .MuiDrawer-paper": {
          bgcolor: "#848181",
          padding: "3% 2%",
          // width: "50%",
        },
      }}
      // containerStyle={{ height: "calc(100% - 64px)", top: 64 }}
      // docked={true}
      // zDepth={2}
      className="sidebar"
      // width={200}
      open={sidebarVisible}
      onClose={toggleSidebar}
    >
      <div className="logo-container">
        <NavLink
          to="/home"
          style={{
            textDecoration: "none",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={LogoImage} className="logo-img"></img>
        </NavLink>
      </div>
      <Stack sx={{ borderBottom: "1rem" }}>
        <NavLink
          to="/home"
          style={{
            textDecoration: "none",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            fontSize: "40px",
          }}
        >
          <MenuItem
            className="internal"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              fontSize: "40px",
            }}
          >
            <HomeIcon /> Home
          </MenuItem>
        </NavLink>
      </Stack>
  
    </Drawer>
  );
};

export default SideBar;