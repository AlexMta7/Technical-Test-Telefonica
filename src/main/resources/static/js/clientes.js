// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarClientes();
  $('#clientes').DataTable();
});

function getHeaders(){
       return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': localStorage.token
        };
}

/*Funcion que solicita los datos guardadis de los usuarios
  de forma asincrona.
*/
//Funcionando al 100%
async function cargarClientes(){
      const request = await fetch('api/clientes', {
        method: 'GET',
        headers: getHeaders()
      });
      const clientes = await request.json();

      //console.log(clientes);

      let listadoHtml = '';

      //Se listan los datos para mostrarlos en forma ordenada en la tabla correspondiente
      for(let cliente of clientes){
       let botonEliminar = '<a href="#" onclick="eliminarCliente(' + cliente.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="bx bx-trash"></i></a>';
       let botonModificar = '<button onclick="getInfoCliente(' + cliente.id + ')" class="btn btn-info btn-circle btn-sm" data-toggle="modal" data-target="#ventanaModal"><i class="bx bx-pencil"></i></button>';

       //let telefonoTexto = (cliente.telefono == null || cliente.telefono == '') ? '-' : cliente.telefono;

       let clienteHtml = '<tr><td>'+ cliente.id +'</td><td>' + cliente.nombre + '</td><td>' + cliente.apellido + '</td><td>'
       + cliente.genero + '</td><td>'
       + cliente.documento + '</td><td>' + cliente.email +  '</td><td>' + botonEliminar + ' ' + botonModificar +'</td></tr>'

        listadoHtml += clienteHtml;
      }

      //Se crean las filas para los datos extraidos de la base de datos
      document.querySelector('#clientes tbody').outerHTML = listadoHtml;
}