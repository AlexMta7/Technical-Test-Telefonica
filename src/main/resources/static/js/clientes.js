// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarClientes();
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

/*Funcion que solicita los datos guardados de los clientes
  de forma asincrona.
*/
//Funcionando al 100%
async function cargarClientes(){
      const request = await fetch('api/clients', {
        method: 'GET',
        headers: getHeaders()
      });
      const clientes = await request.json();

      console.log(clientes);

      if(clientes == ""){
        let clienteHtml = '<tr><td></td><td></td><td>SIN</td><td>DATOS</td><td>DISPONIBLES</td><td></td></tr>';

          //Se crean las filas para los datos extraidos de la base de datos
          document.querySelector('#clientes tbody').outerHTML = clienteHtml;
      }else{
        let listadoHtml = '';

              //Se listan los datos para mostrarlos en forma ordenada en la tabla correspondiente
              for(let cliente of clientes){
               let btnEliminar = '<a href="#" onclick="eliminarCliente(' + cliente.id + ');" class="btn btn-icon btn-danger" title="Eliminar"><span class="tf-icons bx bx-trash"></span></a>';
               let btnModificar = '<button type="button" onclick="getInfoCliente(' + cliente.id + ')" class="btn btn-icon btn-info" data-bs-toggle="modal" data-bs-target="#modalScrollable" title="Modificar"><span class="tf-icons bx bx-pencil"></span></button>';
               let btnAddDocs = '<button type="button" onclick="getIdCliente(' + cliente.id + ')" class="btn btn-icon btn-primary" title="Agregar Documentos" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" aria-controls="offcanvasEnd"><span class="tf-icons bx bx-id-card"></span></button>';
               let btnAddAddr = '<button type="button" onclick="getIdCliente(' + cliente.id + ')" class="btn btn-icon btn-secondary" title="Agregar Direcciones" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd1" aria-controls="offcanvasEnd"><span class="tf-icons bx bx-home"></span></button>';

               let clienteHtml = '<tr><td>'+ cliente.id +'</td><td>' + cliente.nombre + '</td><td>' + cliente.apellido + '</td><td>'
               + cliente.genero + '</td><td>' + cliente.email + '</td><td>'
               + btnAddDocs + ' ' + btnAddAddr + ' ' + btnEliminar + ' ' + btnModificar + '</td></tr>';
                listadoHtml += clienteHtml;
              }

              //Se crean las filas para los datos extraidos de la base de datos
              document.querySelector('#clientes tbody').outerHTML = listadoHtml;
      }
}

//Función para eliminar registro de cliente por medio del Id
//Funcionando al 100%
async function eliminarCliente(id){

    if(!confirm('¿Desea eliminar este Cliente?')){
        return;
    }

    const request = await fetch('api/clients/' + id, {
            method: 'DELETE',
            headers: getHeaders()
          });
    getEmailUser("Eliminación del Cliente");
    alert("Registro con id: " + id + " eliminado exitosamente");
    location.reload();
}

//Función para mostrar la información del cliente en el Modal para poder Editarla
//Funcionando al 100%
async function getInfoCliente (id){
    const request = await fetch('api/clients/' + id, {
            method: 'GET',
            headers: getHeaders()
          });
          const clientes = await request.json();

        for(let clie of clientes){
            document.getElementById("txtName").value = clie.nombre;
            document.getElementById("txtLastName").value = clie.apellido;
            document.getElementById("txtGender").value = clie.genero;
            document.getElementById("txtEmail").value = clie.email;
            document.getElementById("txtId").value = clie.id;
        }
}

//Función para mostrar el id del cliente en el formulario para poder ingresar los documentos de identificacion
//Funcionando al 100%
async function getIdCliente(id){
    const request = await fetch('api/clients/' + id, {
                method: 'GET',
                headers: getHeaders()
              });
              const clientes = await request.json();

       for(let cli of clientes){
            document.getElementById("txtIdC").value = cli.id;
            document.getElementById("txtIdCl").value = cli.id;
       }
}

//Función para editar la información del cliente seleccionado
//Funcionando al 100%
async function editarCliente(){
    if(document.getElementById("txtLastName").value == "" || document.getElementById("txtName").value == "" || document.getElementById("txtGender").value == ""
    || document.getElementById("txtEmail").value == ""){
        alert("Todos los Datos son Requeridos");
    }else{
        let datosCliente = {};

        datosCliente.id = document.getElementById("txtId").value;
        datosCliente.apellido = document.getElementById("txtLastName").value;
        datosCliente.nombre = document.getElementById("txtName").value;
        datosCliente.genero = document.getElementById("txtGender").value;
        datosCliente.email = document.getElementById("txtEmail").value;

        console.log(datosCliente);

        const request = await fetch('api/client/', {
                    method: 'PUT',
                    headers: getHeaders(),
                    body: JSON.stringify(datosCliente)
          });
    }
}

/** BÚSQUEDA DE CLIENTE POR NOMBRE **/

async function getClientByName(name){

    const request = await fetch('api/search/client/' + name, {
        method: 'GET',
        headers: getHeaders()
  });
    const client_info = await request.json();

    if(client_info == ""){
            let docHtml2 = '<tr><td></td><td>NO</td><td>EXISTE</td><td>REGISTRO</td><td></td><td></td></tr>';

                              //Se crean las filas para los datos extraidos de la base de datos
                              document.querySelector('#clientes tbody').outerHTML = docHtml2;
        }else{
            let listHtml2 = '';

              //Se listan los datos para mostrarlos en forma ordenada en la tabla correspondiente
              for(let cli of client_info){
               let btnEliminar = '<a href="#" onclick="eliminarCliente(' + cli.id + ')" class="btn btn-icon btn-danger" title="Eliminar"><span class="tf-icons bx bx-trash"></span></a>';
               let btnModificar = '<button type="button" onclick="getInfoCliente(' + cli.id + ')" class="btn btn-icon btn-info" data-bs-toggle="modal" data-bs-target="#modalScrollable" title="Modificar"><span class="tf-icons bx bx-pencil"></span></button>';
               let btnAddDocs = '<button type="button" onclick="getIdCliente(' + cli.id + ')" class="btn btn-icon btn-primary" title="Agregar Documentos" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" aria-controls="offcanvasEnd"><span class="tf-icons bx bx-id-card"></span></button>';
               let btnAddAddr = '<button type="button" onclick="getIdCliente(' + cli.id + ')" class="btn btn-icon btn-secondary" title="Agregar Direcciones" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd1" aria-controls="offcanvasEnd"><span class="tf-icons bx bx-home"></span></button>';

               let clienteHtml = '<tr><td>'+ cli.id +'</td><td>' + cli.nombre + '</td><td>' + cli.apellido + '</td><td>'
               + cli.genero + '</td><td>' + cli.email + '</td><td>'
               + btnAddDocs + ' ' + btnAddAddr + ' ' + btnEliminar + ' ' + btnModificar + '</td></tr>';
               listHtml2 += clienteHtml;
              }

              //Se crean las filas para los datos extraidos de la base de datos
              document.querySelector('#clientes tbody').outerHTML = listHtml2;
        }
}

async function searchClientByName(){

    if(document.getElementById("txtSearch").value == ""){
        alert("Ingrese El Nombre Cliente A Buscar");

    }else{
        var val = document.getElementById("txtSearch").value;

        var str = val.toString();

        getClientByName(str);
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