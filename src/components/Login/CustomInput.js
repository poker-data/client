import React from "react";
// import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export default function CustomInput({ label, handleChange, type, InputProps }) {
  const handleTextChange = (event) => {
    handleChange(event.target.value);
  };
 
  return (
    <Grid item justifyContent="center" xs={8} md={3}>
      <TextField
        required
        type={type}
        label={label}
        fullWidth
      //  InputProps={InputProps ? InputProps : null}
      sx={{
        input: {
          color: "black",
          background: "#fff"
        }
      }}
        onChange={handleTextChange}
      />
    </Grid>
  );
}
