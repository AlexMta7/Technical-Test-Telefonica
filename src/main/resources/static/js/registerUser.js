// Call the dataTables jQuery plugin
$(document).ready(function() {
  //$('#clientes').DataTable();
  getUserInfo(localStorage.email);
});

function getHeaders(){
       return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        };
}

// Búsqueda de información del Usuario Logueado por medio del correo por el cual
// inicio sesión
async function getUserInfo(email){
      const request = await fetch('api/search/user/' + email, {
        method: 'GET',
        headers: getHeaders()
      });
      const user = await request.json();

      if(user == ""){
          document.getElementById("userName").innerHTML = "Usuario No Logueado";
      }else{
              for(let U of user){
                document.getElementById("userName").innerHTML = U.nom_usu + " " + U.ln_usu;
                document.getElementById("typeUser").innerHTML = U.car_usu;
              }
      }
}

//Función para el registro de nuevos usuarios en la base de datos
//Funcionando al 100%
async function registrarUsuario(){
    if(document.getElementById("txtLastName").value == "" || document.getElementById("txtName").value == "" || document.getElementById("txtEmail").value == ""
    || document.getElementById("txtPassword").value == "" || document.getElementById("txtType").value == ""){
        alert("Todos los datos son requeridos");
        location.reload();
    }else if(document.getElementById("txtPassword").value != document.getElementById("txtConfirPassword").value){
        alert("ERROR: Las contraseñas no coinciden");
        document.getElementById("txtPassword").value = "";
        document.getElementById("txtConfirPassword").value = "";
    }else{
         let datoUsuario = {};

             datoUsuario.ln_usu = document.getElementById("txtLastName").value;
             datoUsuario.nom_usu = document.getElementById("txtName").value;
             datoUsuario.email_usu = document.getElementById("txtEmail").value;
             datoUsuario.pass_usu = document.getElementById("txtPassword").value;
             datoUsuario.car_usu = document.getElementById("txtType").value;

             const request = await fetch('api/users/', {
                         method: 'POST',
                         headers: getHeaders(),
                         body: JSON.stringify(datoUsuario)
                       });

             alert("Usuario Ingresado con Éxito");
             location.href = "user.html";
        }
    }