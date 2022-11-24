import React from "react";

import MenuAppBar from "../components/MenuAppBar";
import "./HomePage.css";
import Grid from '@mui/material/Grid';

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
      </Grid>
      
    </>
  );
}

export default HomePage;