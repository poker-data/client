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
        sx={{fontWeight:'bold'}}>
            <div style={{display:'flex'}}>
            <Typography variant="h6" component="div" style={{flexGrow:1}}>
                {title}

            </Typography>
            <Button
            className="add" 
            variant="contained" 
            sx={{fontWeight: 'bold', border:1, borderColor:"black", backgroundColor:'#2debab', color:'black'}} 
            onClick={() => setOpenPopup(false)}>
            X
            </Button>
            </div>
        </DialogTitle>
        <DialogContent dividers>
            {children}
        </DialogContent>
    </Dialog>
  )
}
