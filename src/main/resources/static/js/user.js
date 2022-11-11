// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarUsuarios();
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

/*Funcion que solicita los datos guardados de los usuarios
  de forma asincrona.
*/
//Funcionando al 100%
async function cargarUsuarios(){
      const request = await fetch('api/users', {
        method: 'GET',
        headers: getHeaders()
      });
      const usuarios = await request.json();


      if(usuarios == ""){
          let usuarioHtml = '<tr><td></td><td></td><td>SIN</td><td>DATOS</td><td>DISPONIBLES</td><td></td></tr>';

            //Se crean las filas para los datos extraidos de la base de datos
            document.querySelector('#users tbody').outerHTML = usuarioHtml;
      }else{
        let listadoHtml = '';

              //Se listan los datos para mostrarlos en forma ordenada en la tabla correspondiente
              for(let usu of usuarios){
               let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usu.id_usu + ')" class="btn btn-icon btn-danger"><span class="tf-icons bx bx-trash"></span></a>';
               let botonModificar = '<button onclick="getInfoUsuario(' + usu.id_usu + ')" class="btn btn-icon btn-info" data-bs-toggle="modal" data-bs-target="#modalScrollable"><span class="tf-icons bx bx-pencil"></span></button>';

               let usuarioHtml = '<tr><td>'+ usu.id_usu +'</td><td>' + usu.nom_usu + '</td><td>' + usu.ln_usu + '</td><td>'
               + usu.email_usu + '</td><td>'
               + usu.car_usu + '</td><td>' + botonEliminar + ' ' + botonModificar +'</td></tr>'

                listadoHtml += usuarioHtml;
              }

              //Se crean las filas para los datos extraidos de la base de datos
              document.querySelector('#users tbody').outerHTML = listadoHtml;
      }
}

//Función para mostrar la información del usuario en el Modal para poder Editarla
//Funcionando al 100%
async function getInfoUsuario (id){
    const request = await fetch('api/user/' + id, {
            method: 'GET',
            headers: getHeaders()
          });
          const usuarios = await request.json();


        for(let usua of usuarios){
            document.getElementById("txtName").value = usua.nom_usu;
            document.getElementById("txtLastName").value = usua.ln_usu;
            document.getElementById("txtType").value = usua.car_usu;
            //document.getElementById("txtPassword").value = usua.pass_usu;
            document.getElementById("txtEmail").value = usua.email_usu;
            document.getElementById("txtId").value = usua.id_usu;
        }
}

//Función para editar la información del usuario seleccionado
//Funcionando al 100%
async function editarUsuario(){
    if(document.getElementById("txtLastName").value == "" || document.getElementById("txtName").value == "" || document.getElementById("txtType").value == ""
    || document.getElementById("txtPassword").value == "" || document.getElementById("txtEmail").value == ""){
        alert("Todos los Datos son Requeridos. No fueron actualizados los datos");
    }else{
        let datosUsuario = {};

        datosUsuario.id_usu = document.getElementById("txtId").value;
        datosUsuario.ln_usu = document.getElementById("txtLastName").value;
        datosUsuario.nom_usu = document.getElementById("txtName").value;
        datosUsuario.car_usu = document.getElementById("txtType").value;
        datosUsuario.pass_usu = document.getElementById("txtPassword").value;
        datosUsuario.email_usu = document.getElementById("txtEmail").value;

        const request = await fetch('api/users/', {
                    method: 'PUT',
                    headers: getHeaders(),
                    body: JSON.stringify(datosUsuario)
                  });

        alert("Información Actualizada con Éxito");
        location.reload();
    }
}

//Función para eliminar registro de usuario por medio del Id
//Funcionando al 100%
async function eliminarUsuario(id){

    if(!confirm('¿Desea eliminar este Usuario?')){
        return;
    }

    const request = await fetch('api/users/' + id, {
            method: 'DELETE',
            headers: getHeaders()
          });

    getEmailUser('Eliminación de Usuario');
    alert("Registro con id: " + id + " eliminado exitosamente");
    location.reload();
}

/** BÚSQUEDA DE USUARIO POR NOMBRE **/

async function getUserByName(name){

    const request = await fetch('api/search/users/' + name, {
        method: 'GET',
        headers: getHeaders()
  });
    const user_info = await request.json();

    if(user_info == ""){
              let usuarioHtml = '<tr><td></td><td></td><td>NO</td><td>EXISTE</td><td>REGISTRO</td><td></td></tr>';

                //Se crean las filas para los datos extraidos de la base de datos
                document.querySelector('#users tbody').outerHTML = usuarioHtml;
          }else{
            let listadoHtml = '';

                  //Se listan los datos para mostrarlos en forma ordenada en la tabla correspondiente
                  for(let usu of user_info){
                   let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usu.id_usu + ')" class="btn btn-icon btn-danger"><span class="tf-icons bx bx-trash"></span></a>';
                   let botonModificar = '<button onclick="getInfoUsuario(' + usu.id_usu + ')" class="btn btn-icon btn-info" data-bs-toggle="modal" data-bs-target="#modalScrollable"><span class="tf-icons bx bx-pencil"></span></button>';

                   let usuarioHtml = '<tr><td>'+ usu.id_usu +'</td><td>' + usu.nom_usu + '</td><td>' + usu.ln_usu + '</td><td>'
                   + usu.email_usu + '</td><td>'
                   + usu.car_usu + '</td><td>' + botonEliminar + ' ' + botonModificar +'</td></tr>'

                    listadoHtml += usuarioHtml;
                  }

                  //Se crean las filas para los datos extraidos de la base de datos
                  document.querySelector('#users tbody').outerHTML = listadoHtml;
          }

}

async function searchUserByName(){

    if(document.getElementById("txtSearchUser").value == ""){
        alert("Ingrese El Nombre Del Usuario A Buscar");
    }else{
        var val = document.getElementById("txtSearchUser").value;

        var str = val.toString();

        getUserByName(str);
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
