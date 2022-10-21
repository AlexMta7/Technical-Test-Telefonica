
$(document).ready(function() {
    //Al iniciar la pagina llama al metodo
  //actualizarEmailUsuario()
});

//Para devolver los Header
    function getHeaders(){
        return {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     //'Authorization':localStorage.token
                   };
    }

async function addUser(){
    let user = {};
    user.name = document.getElementById("txtName").value;
    user.lastname = document.getElementById("txtLastname").value;
    user.email = document.getElementById("txtEmail").value;
    user.password = document.getElementById("txtPassword").value;

    let repeatPassword = document.getElementById("txtRepeatPassword").value;

    if(user.name == "" && user.lastname == "" && user.email == "" && user.password == "" && repeatPassword == ""){
        alert("No puede ingresar un dato vació");
        location.reload();
        return;
    }
    else{
        user.type = "NO_ADMIN";
    }


    if(repeatPassword != user.password){
        alert("Las contraseñas no coinciden.")
        return;
    }

 const request = await fetch('api/users', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(user)
  });
  const response = await request.text();
  console.log(response);
  if (response == 'OK'){
            alert("Usuario ingresado correctamente");
  }
  else{
       alert("Usuario ya existe");
  }
  location.reload();
}


