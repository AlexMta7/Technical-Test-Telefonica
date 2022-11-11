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


//Función para el registro de nuevos clientes en la base de datos
//Funcionando al 100%
async function registrarCliente(){
        if(document.getElementById("txtLastName").value == "" || document.getElementById("txtName").value == "" ||
        document.getElementById("txtEmail").value == "" || document.getElementById("txtGender").value == ""){
            alert("Todos los datos son requeridos");
            location.reload();
        }else{
            let datoCliente = {};

            datoCliente.apellido = document.getElementById("txtLastName").value;
            datoCliente.nombre = document.getElementById("txtName").value;
            datoCliente.email = document.getElementById("txtEmail").value;
            datoCliente.genero = document.getElementById("txtGender").value;

            const request = await fetch('api/clients/', {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(datoCliente)
                  });

            alert("Cliente Ingresado con Éxito");
            location.href = "index.html";
        }
}

/********* Funciones para la parte de los Documentos del Cliente *********/

//Función para el registro de los documentos del cliente
//Funcionando al 100%
async function addDocuments(){
    if(document.getElementById("txtTypeD").value == "" || document.getElementById("txtNumDoc").value == ""){
        alert("Los Datos de los Documentos son Requeridos");
        document.getElementById("txtTypeD").value = "";
        document.getElementById("txtNumDoc").value = "";
    }else{
        let datoDocument = {};

        datoDocument.id_client = document.getElementById("txtIdC").value;
        datoDocument.document_name = document.getElementById("txtTypeD").value;
        datoDocument.document = document.getElementById("txtNumDoc").value;

        const request = await fetch('api/documents', {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(datoDocument)
                  });

        alert("Documento Añadido Exitosamente");
        location.href = "infoClient.html";
    }
}

//Función para el registro de las Direcciones del cliente
//Funcionando al 100%
async function addAddress(){
    if(document.getElementById("txtNameD").value == "" || document.getElementById("txtAddress").value == ""){
        alert("Los Datos de las Direcciones son Requeridos");
        document.getElementById("txtNameD").value = "";
        document.getElementById("txtAddress").value = "";
    }else{
        let datoAddress = {};

        datoAddress.id_client = document.getElementById("txtIdCl").value;
        datoAddress.name_address = document.getElementById("txtNameD").value;
        datoAddress.address = document.getElementById("txtAddress").value;

        const request = await fetch('api/addresses', {
                 method: 'POST',
                 headers: getHeaders(),
                 body: JSON.stringify(datoAddress)
           });

        alert("Dirección Añadida Exitosamente");
        location.href = "infoClient.html";
    }
}

/** PROGRAMACIÓN PARA LA PARTE DE LOS LOGS **/

async function getInfo(email, act){
      const request = await fetch('api/search/user/' + email, {
        method: 'GET',
        headers: getHeaders()
      });
      const userInfo = await request.json();

      for(let U of userInfo){
        let user = {};

        // crea un nuevo objeto `Date`
        var today = new Date();
        // `getDate()` devuelve el día del mes (del 1 al 31)
        var day = today.getDate();
        // `getMonth()` devuelve el mes (de 0 a 11)
        var month = today.getMonth() + 1;
        // `getFullYear()` devuelve el año completo
        var year = today.getFullYear();
        // se le da formato a la fecha de `YYYY/MM/DD`
        var date = `${year}/${month}/${day}`;

        // Se asigna el valor de la accion
        var action = act;

        user.id_usu = U.id_usu;
        user.action = action;
        user.date = date;

        const request = await fetch('api/logs', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(user)
        });

      }
}


async function getEmailUser(action){
    const email = localStorage.email;
    const ac = action;

    getInfo(email,action);
}