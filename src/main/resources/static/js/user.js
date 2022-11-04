// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarUsuarios();
  //$('#clientes').DataTable();
});

function getHeaders(){
       return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        };
}

/*Funcion que solicita los datos guardados de los usuarios
  de forma asincrona.
*/
//Funcionando al 100%
async function cargarUsuarios(){
      const request = await fetch('api/usuarios', {
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
    const request = await fetch('api/usuarios/' + id, {
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

        const request = await fetch('api/usuarios/', {
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

    const request = await fetch('api/usuarios/' + id, {
            method: 'DELETE',
            headers: getHeaders()
          });
    alert("Registro con id: " + id + " eliminado exitosamente");
    location.reload();
}

/** BÚSQUEDA DE USUARIO POR NOMBRE **/

async function getUserByName(name){

    const request = await fetch('api/search/usuarios/' + name, {
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
