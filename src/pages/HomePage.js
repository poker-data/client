import React from "react";

import MenuAppBar from "../components/MenuAppBar";
import "./HomePage.css";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";

function HomePage() {
 //console.log("token", userToken);
  const [sidebarVisible, setSidebarVisible] = React.useState(false);

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
      <Grid container spacing={3} sx={{ marginLeft: "2%", marginTop: "2%" }}>
        <Box>
          <img src="../assets/Full.png"/>

        </Box>
      </Grid>
      
    </>
  );
}

export default HomePage;