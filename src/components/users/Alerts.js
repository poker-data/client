import swal from 'sweetalert';
import { logicalDeleteUser } from '../../context/actions';

export const alertAddUser = ({ addNewUser , newUser , history, })=>{
  // console.log(addNewUser);
  // console.log(newUser);

  swal({
    title: "Agregar usuario nuevo?",
    buttons: ["Cancelar", "Aceptar"],
   
    
   }).then((result) => {
    //  console.log(result)
    if (result) {
      addNewUser(newUser, history);
     
      swal({text: "El usuario ha sido agregado",icon: "success",timmer:"1000", buttons: false });
 
      // console.log("adddd")
    }
    else{
      swal({text: "El usuario no ha sido agregado"});
    }
  })
};

export const alertEditUser = ({ modifyUserBy_id , index, body, history,uploadImgBy_id, data, setImageState })=>{
    swal({
      title: "Editar el usuario?",
      buttons: ["Cancelar", "Aceptar"],
     }).then((result) => {
      //  console.log(result)
      if (result) {
        // console.log("edittttt")
        modifyUserBy_id(index , body, history);
        // uploadImgBy_id(index , data).then(res => {
        //   res.status === 200 ? setImageState(true) : setImageState(false)
        // })
        swal({text: "El usuario ha sido modificado",icon: "success",timmer:"1000", buttons: false });
      
       
      }
      else{
        swal({text: "El usuario no ha sido modificado"});
      }
    })
  };

export const alertDeleteUser = ( dispatch, index)=>{
     swal({
        title: "Eliminar el usuario elegido?",
        buttons: ["Cancelar", "Aceptar"],
        }).then((result) => {
        // console.log(result)
        if (result) {
          logicalDeleteUser(dispatch, index);
          swal({text: "El usuario ha sido eliminado",icon: "success",timmer:"1000", buttons: false });           
        }
        else{
            swal({text: "El usuario no ha sido eliminado"});
        }
        })
}

export const alertPassword=()=>{
  swal({
    title: "Contraseña demasiado corta",
    text: "Ingrese una contraseña de mas de 8 caracteres",
    icon: "error",
    button: "Aceptar",
  });
}

export const alertRegister=()=>{
  swal({
    title: "Usuario creado.",
    text: "Usuario registrado con exito!",
    icon: "success",
    button: "Aceptar",
  });
}

export const alertEmailExist=()=>{
  swal({
    title: "Error",
    text: "El email seleccionado ya existe.",
    icon: "error",
    button: "Aceptar",
  });
}

export const alertEdit=()=>{
  swal({
    title: "Edited User.",
    text: "User successfully edited!",
    icon: "success",
    button: "Accept",
  });
}

export const alertDelete=()=>{
  swal({
    title: "Usuario Eliminado.",
    text: "Usuario eliminado correctamente.",
    icon: "success",
    button: "Aceptar",
  });
}

export const genericErrorAlert=(title,subtitle)=>{
  swal({
    title: title,
    text: subtitle,
    icon: "error",
    button: "Aceptar",
  });
}

