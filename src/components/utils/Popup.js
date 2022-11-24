import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding : theme.spacing(2),
        position: "absolute",
        top: theme.spacing(5)
    }
}))

export default function PopUp(props) {

  const classes = useStyles;
  const { title, children, openPopup, setOpenPopup } = props;
  return (
    <Dialog open={openPopup} maxWidth="md" classes={{paper: classes.dialogWrapper}}>
        <DialogTitle
        sx={{fontWeight:'bold', color:"#2debab", background:"#111315"}}>
            <div style={{display:'flex'}}>
            <Typography variant="h6" component="div" style={{flexGrow:1}}>
                {title}

            </Typography>
            <Button
            className="add" 
            variant="contained" 
            sx={{
            fontWeight: 'bold',
            border:1,
            borderColor:"#111315",
            backgroundColor:'#2debab',
            color: '#111315',
            fontFamily:"Barlow",
            "&:hover": {borderColor:"#111315", background:"#2debab"}
            }} 
            onClick={() => setOpenPopup(false)}>
            X
            </Button>
            </div>
        </DialogTitle>
        <DialogContent sx={{ background:"#111315"}}dividers>
            {children}
        </DialogContent>
    </Dialog>
  )
}
