import React from "react";
import CustomInput from "./CustomInput";
import { Grid,Box, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginUser, useAuthDispatch } from "../../context";
import { useHistory } from "react-router-dom";
import logo from "../../assets/Asset29.png";

import "./LoginForm.css";

const LoginForm = () => {
  const [user, setUser] = React.useState("");
  const [error, setError] = React.useState("");
  const [showPassword, setShow] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const dispatch = useAuthDispatch();
  let history = useHistory();

  const handleClickShowPassword = () => {
    setShow(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitCredentials = async () => {
    //  console.log({ user, password });
    const credentials = {
      email: user.toLowerCase().trim(),
      // password: password.toLowerCase().trim(),
      password: password.trim(),
    };
    if (!user || !password) {
      setError("Favor de introducir usuario y contraseña");
    } else {
      try {
        setError("");
      //  console.log("credentials: ", credentials);
        let response = await loginUser(dispatch, credentials);
         //console.log("response: ", response.ok);
        // console.log(credentials);
        if (!response.ok) {
          setError("Usuario o contraseña incorrectos");
          return;
        }
        history.push("/tournaments");
      } catch (error) {
        setError("Usuario o contraseña incorrectos");
        //console.log(error);
      }
    }
  };

  const EndAdornment = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    );
  };

  return (
    <form className="form">
       

      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
        sx={{background: "#111315", color: "#ebe9eb" }}
      >
        <Box>
          <img src={logo} alt="Logo"/>

        </Box>
        

        <Grid container item justifyContent="center" xs={12}>
          <CustomInput
            type="text"
            label="Correo"
            handleChange={setUser}

          />
        </Grid>

        <Grid container item justifyContent="center" xs={12}>
          
        <CustomInput
            type={showPassword ? "text" : "password"}
            label="Contrasena"
            handleChange={setPassword}
            InputProps={{ endAdornment: <EndAdornment /> }}
          />
        </Grid>

        <Grid container item justifyContent="center" xs={12}>
          <Grid item justifyContent="center" xs={6} md={3}>
            <p className="error-text">{error}</p>
            <Button
              fullWidth
              onClick={submitCredentials}
              className="login-btn"
              sx={{fontSize: "20px",
              fontWeight: 'bold', 
              border: 1, 
              fontFamily:"Barlow",
              backgroundColor: '#2debab', 
              color: '#111315',
               "&:hover": {borderColor:"#2debab", background:"#2debab"} }}
            >
              Inicia Sesion
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
