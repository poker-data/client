import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core';

export  function UseForm(initialFieldValues, validateOnChange = false, validate) {

    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({})


    
    const handleInputChange = e => {
        const { name, value} = e.target
        setValues({
            ...values,
            [name]:value
        })
        if(validateOnChange)
        validate({[name]:value})
    }

    
    return {
        values,
        setValues,
        handleInputChange,
        errors,
        setErrors
    }
}

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiFormControl-root': {
        width: '80%',
        margin: theme.spacing(0.5)
      }
    }
  }))


export function Form(props) {

    const classes = useStyles();
    const {children, ...other} = props;

    return (

    <form className={classes.root} autoComplete='off' { ...other }>
        {props.children}
    </form>
    )
}
