import React from "react";
import CustomInput from "./CustomInput";
import { Grid, Button, InputAdornment, IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { loginUser, useAuthDispatch } from "../../Context";
import { useHistory } from "react-router-dom";

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
        history.push("/home");
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
        sx={{background: "#ebe9eb", borderRadius: 1, color: "#ebe9eb" }}
      >
        <p
          className="title_text"
          style={{ color: "black"}}
          
        >
          <strong>Login</strong>
        </p>

        <Grid container item justifyContent="center" xs={12}>
          <CustomInput
            type={"text"}
            label={"Correo de usuario"}
            handleChange={setUser}
           
          />
        </Grid>

        <Grid container item justifyContent="center" xs={12}>
          
        <CustomInput
            type={showPassword ? "text" : "password"}
            label={"contrasena"}
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
              sx={{fontSize: "20px",fontWeight: 'bold', border: 1, borderColor: "#454545", backgroundColor: '#454545', color: '#ebe9eb' }}
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
