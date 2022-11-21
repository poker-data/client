import React, { useState } from "react";
import { Dialog } from "@material-ui/core";
import { useStylesForm } from "./useStylesForm";
import MenuItem from "@mui/material/MenuItem";
import { Button, Grid, TextField, Stack, Box, FormControl, InputLabel, Select } from "@mui/material";
import { alertPassword } from "./Alerts";

const AdminDashboard = ({ closeModal }) => {
  const styles = useStylesForm();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
   /*  const body = {
      name: name,
      role: role,
      email: email,
      password: password,
    };
    // console.log(image)
    var data = new FormData(); */
    try {
      if (password.length < 11) {
        return alertPassword();
      }
     
    } catch (error) {
      // console.log(error);
    }
  };


  return (
    <>
      <Dialog disableEnforceFocus open >
        <Stack
          className={styles.title}
          sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          Editar usuario existente
        </Stack>
        <Box>
          <Grid container justifyContent="center" sx={{ flexDirection: "row" }} >
            <Grid item sx={{ padding: "1rem" }}   >
              <TextField
                spacing={{ xs: 8 }}
                label="Nombre"
                variant="filled"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item sx={{ padding: "1rem" }} >
              <TextField
                spacing={{ xs: 8 }}
                label="Email"
                variant="filled"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item container sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }} >
            <Grid item  justifyContent="center"  xs={10} md={5}>
             
                <FormControl fullWidth >
                  <InputLabel id="test-select-label">Rol</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="role"
                    label="Rol"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                  >
                    <MenuItem value={"dev"}>Dev</MenuItem>
                    <MenuItem value={"administrator"}>Administrator</MenuItem>
                    <MenuItem value={"player"}>Player</MenuItem>
                  </Select>
                </FormControl>
              
            </Grid>

            <Grid item sx={{ padding: "1rem" }}  >
              <TextField
                spacing={{ xs: 8 }}
                label="Password"
                variant="filled"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item container sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }} >
           
          </Grid>
          <Stack className={styles.buttonsContainer} sx={{ flexDirection: "row", justifyContent: "space-around" }} >
            <Grid className={styles.buttonL} >
              <Button onClick={closeModal}>
                Cancelar
              </Button>
            </Grid>
            <Grid className={styles.buttonR} >
              <Button
                disabled_={!name.length < 0 || !role.length < 0 || !email.length < 0 || !password.length < 0}
                onClick={handleSubmit}>
                Guardar
              </Button>
            </Grid>
          </Stack>

        </Box>
      </Dialog>
    </>
  );
};

export default AdminDashboard;
