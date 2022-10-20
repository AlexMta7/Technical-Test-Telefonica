// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarUsuarios();
  //$('#clientes').DataTable();
});

function getHeaders(){
       return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': localStorage.token
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

      let listadoHtml = '';

      //Se listan los datos para mostrarlos en forma ordenada en la tabla correspondiente
      for(let usu of usuarios){
       let botonEliminar = '<a href="#" onclick="eliminarCliente(' + usu.id + ')" class="btn btn-icon btn-danger"><span class="tf-icons bx bx-trash"></span></a>';
       let botonModificar = '<button onclick="getInfoCliente(' + usu.id + ')" class="btn btn-icon btn-info" data-bs-toggle="modal" data-bs-target="#modalScrollable"><span class="tf-icons bx bx-pencil"></span></button>';

       let usuarioHtml = '<tr><td>'+ usu.id +'</td><td>' + usu.nombre + '</td><td>' + usu.apellido + '</td><td>'
       + usu.email + '</td><td>'
       + usu.cargo + '</td><td>' + botonEliminar + ' ' + botonModificar +'</td></tr>'

        listadoHtml += usuarioHtml;
      }

      //Se crean las filas para los datos extraidos de la base de datos
      document.querySelector('#users tbody').outerHTML = listadoHtml;
}