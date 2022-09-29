import React from 'react'
import { Snackbar,
         Alert } from '@mui/material'   

const Notification = (props) => {
    const {notify, setNotify} = props;

    const handleClose = (event, reason) =>{
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
        open={notify.isOpen}
        autoHideDuration={3000}
        anchorOrigin={{vertical:'top', horizontal:'center'}}
        onClose={handleClose}
        >
            <Alert 
                severity={notify.type}
                onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification
