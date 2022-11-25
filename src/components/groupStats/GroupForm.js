import { FormControl, Grid, TextField, Paper, Button } from '@mui/material';
import React from 'react';
import { Box } from '@mui/system';
import { UseForm, Form } from '../playerStats/UseForm';

const initialFieldValues = {
   groupName:'',
}


export default function GroupForm (props) {

    const {addGroup} = props
    
    UseForm();
    
    const validate = (fieldValues = values ) => {
        let temp = { ...errors } 
        if ('shkName' in fieldValues)
            temp.shkName = fieldValues.shkName ? "" : "Debe proporcionar un usuario de Sharkscope."
        if ('groupName' in fieldValues)
            temp.groupName = fieldValues.groupName ? "" : "Debe proporcionar el nombre del grupo."
            setErrors({
                ...temp
            })
            if(fieldValues == values)
                return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange
    } = UseForm(initialFieldValues, true, validate)

   
 


    const handleSubmit = e =>{

        e.preventDefault();

        if(validate())
    
        addGroup(values);
        

        }
        
    

  return (
      <Paper sx={{ background:"#111315", borderRadius: 1, margin: '5px 5px', maxWidth: 450}}>
          <Form onSubmit={handleSubmit}>
            <Grid container>
                    <Grid item xs={6}>
                    <TextField
                            autoComplete="off"
                            size="small"
                            type="text" 
                            variant="outlined"
                            label="Nombre del Grupo"
                            name="shkName"
                            sx={{background:"#ffffff", borderRadius: 1}}
                            value={values.shkName ? values.shkName : ''}
                            onChange = {handleInputChange}
                            {...(errors.shkName & {error:true})}
                            {...errors.error}
                            helperText={errors.shkName}
                        />
                        <TextField
                            autoComplete="off"
                            size="small"
                            type="text" 
                            variant="outlined"
                            label="Nombre Identificativo"
                            name="groupName"
                            sx={{background:"#ffffff", borderRadius: 1}}
                            value={values.groupName}
                            onChange = {handleInputChange}
                            {...(errors.name & {error:true})}
                            {...errors.error}
                            helperText={errors.groupName}
                        />
                    </Grid>                   
                    <Grid item xs={6}>
                        <Box sx={{ width: 240 }}>
                        <FormControl fullWidth>
                        {/* <InputLabel>Sala</InputLabel>
                                <Select
                                size='small'
                                label='Room'
                                name='room'
                                value={values.room}
                                onChange = {handleInputChange}>
                                
                                    <MenuItem value=''>None</MenuItem>
                                    {
                                        roomOptions.map(
                                            item => (<MenuItem key={item.id} value={item.room}>{item.room}</MenuItem>)
                                        )
                                    }
                                </Select> */}
                            </FormControl>
                        </Box>
                    </Grid>
            </Grid>
            
            <Button 
              type="submit"
              className="add-player" 
              variant="contained" 
              sx={{
                fontWeight: 'bold',
                border:1,
                borderColor:"black",
                margin: "3%",
                backgroundColor:'#2debab',
                color: '#111315',
                fontFamily:"Barlow",
                "&:hover": {borderColor:"#111315", background:"#2debab"}}}
          >AGREGAR</Button>
      </Form>
      </Paper>
  )
}