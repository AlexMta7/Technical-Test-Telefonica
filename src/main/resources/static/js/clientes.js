// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarClientes();
  //$('#clientes').DataTable();
});

function getHeaders(){
       return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': localStorage.token
        };
}

/*Funcion que solicita los datos guardados de los clientes
  de forma asincrona.
*/
//Funcionando al 100%
async function cargarClientes(){
      const request = await fetch('api/clientes', {
        method: 'GET',
        headers: getHeaders()
      });
      const clientes = await request.json();

      if(clientes == ""){
        let clienteHtml = '<tr><td></td><td></td><td>SIN</td><td>DATOS</td><td>DISPONIBLES</td><td></td></tr>';

          //Se crean las filas para los datos extraidos de la base de datos
          document.querySelector('#clientes tbody').outerHTML = clienteHtml;
      }else{
        let listadoHtml = '';

              //Se listan los datos para mostrarlos en forma ordenada en la tabla correspondiente
              for(let cliente of clientes){
               let btnEliminar = '<a href="#" onclick="eliminarCliente(' + cliente.id + ')" class="btn btn-icon btn-danger" title="Eliminar"><span class="tf-icons bx bx-trash"></span></a>';
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

    const request = await fetch('api/clientes/' + id, {
            method: 'DELETE',
            headers: getHeaders()
          });
    alert("Registro con id: " + id + " eliminado exitosamente");
    location.reload();
}

//Función para mostrar la información del cliente en el Modal para poder Editarla
//Funcionando al 100%
async function getInfoCliente (id){
    const request = await fetch('api/clientes/' + id, {
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
    const request = await fetch('api/cliente/' + id, {
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
    let datosCliente = {};

    datosCliente.id = document.getElementById("txtId").value;
    datosCliente.apellido = document.getElementById("txtLastName").value;
    datosCliente.nombre = document.getElementById("txtName").value;
    datosCliente.genero = document.getElementById("txtGender").value;
    datosCliente.email = document.getElementById("txtEmail").value;

    const request = await fetch('api/cliente/', {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(datosCliente)
              });
}

async function getClient(name){

    var na = name.toString();

    const request = await fetch('api/client/' + na, {
                method: 'GET',
                headers: getHeaders()
              });
              const client = await request.json();

    console.log(client);
}

async function searchClient(){

    var val = document.getElementById("txtSearch").value;

    getClient(val);

}
