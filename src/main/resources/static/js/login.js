// Call the dataTables jQuery plugin
$(document).ready(function() {
    //On ready
});

async function iniciarSesion(){
      let datos = {};
      datos.email_usu = document.getElementById("txtEmail").value;
      datos.pass_usu = document.getElementById("txtPassword").value;

      const request = await fetch('api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)

      });

      const respuesta = await request.text();

      if(respuesta != 'FAIL'){
        localStorage.token = respuesta;
        localStorage.email = datos.email_usu;
        window.location.href = 'index.html'
      }else{
        alert("Las credenciales son incorrectas. Por favor intente nuevamente.");
        location.reload();
      }
}

//Elimino los datos almacenados en el LocalStorage
function Logout(){
    localStorage.clear();
    window.location.href = 'login.html';
}