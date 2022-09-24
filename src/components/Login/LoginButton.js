import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const LoginButton = ({ submitCredentials }) => {
  return (
    <Grid item justifyContent="center" xs={3}>
      <Button fullWidth onClick={submitCredentials}>
        Log in
      </Button>
    </Grid>
  );
};


export default LoginButton;
