// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarInfoDocs();
  cargarInfoAddress();
});

function getHeaders(){
       return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': localStorage.token
        };
}

/*Funcion que solicita informacion a detalle guardada de los clientes
  de forma asincrona.
*/
//Funcionando al 100%
async function cargarInfoDocs(){
      const request = await fetch('api/docs/clients', {
        method: 'GET',
        headers: getHeaders()
      });
      const docs = await request.json();

      let listHtml = '';

      //Se listan los datos para mostrarlos en forma ordenada en la tabla correspondiente
      for(let doc of docs){
       let btnDelete = '<button type="button" onclick="eliminarDoc(' + doc.id + ')" class="btn btn-icon btn-danger" title="Eliminar Documento"><span class="tf-icons bx bx-trash"></span></button>';
       let btnMod = '<button type="button" onclick="getInfoDoc(' + doc.id + ')" class="btn btn-icon btn-info" data-bs-toggle="modal" data-bs-target="#modalScrollableDoc" title="Modificar Documento"><span class="tf-icons bx bx-pencil"></span></button>';

       let docHtml = '<tr><td>'+ doc.id +'</td><td>' + doc.id_client + '</td><td>'  + doc.name_client + '</td><td>' + doc.document_name + '</td><td>'
       + doc.document +  '</td><td>' + btnDelete + ' ' + btnMod + '</td></tr>';
        listHtml += docHtml;
      }

      //Se crean las filas para los datos extraidos de la base de datos
      document.querySelector('#infoCliente tbody').outerHTML = listHtml;
}


/*Funcion que solicita informacion de las direcciones de los clientes
  de forma asincrona.
*/
//Funcionando al 100%
async function cargarInfoAddress(){
      const request = await fetch('api/address/clients', {
        method: 'GET',
        headers: getHeaders()
      });
      const addressC = await request.json();

      let listHtml = '';

      //Se listan los datos para mostrarlos en forma ordenada en la tabla correspondiente
      for(let ac of addressC){
       let btnDelete = '<a href="#" onclick="eliminarAdr(' + ac.id + ')" class="btn btn-icon btn-danger" title="Eliminar Dirección"><span class="tf-icons bx bx-trash"></span></a>';
       let btnMod = '<button type="button" onclick="getInfoDirec(' + ac.id + ')" class="btn btn-icon btn-info" data-bs-toggle="modal" data-bs-target="#modalScrollableDir" title="Modificar Dirección"><span class="tf-icons bx bx-pencil"></span></button>';

       let docHtml = '<tr><td>' + ac.id + '</td><td>'  + ac.id_client + '</td><td>' + ac.name_client + '</td><td>'
       + ac.name_address + '</td><td>' + ac.address +  '</td><td>' + btnDelete + ' ' + btnMod + '</td></tr>';
        listHtml += docHtml;
      }

      //Se crean las filas para los datos extraidos de la base de datos
      document.querySelector('#infoAddress tbody').outerHTML = listHtml;
}

//Función para mostrar la información de documentos del cliente en el Modal para poder Editarla
//Funcionando al 100%
async function getInfoDoc(id){
    const request = await fetch('api/docs/client/' + id, {
            method: 'GET',
            headers: getHeaders()
          });
          const documentos = await request.json();

        for(let docu of documentos){
            document.getElementById("txtId").value = docu.id;
            document.getElementById("txtIdCli").value = docu.id_client;
            document.getElementById("txtNaC").value = docu.name_client;
            document.getElementById("txtTypeD").value = docu.document_name;
            document.getElementById("txtDocument").value = docu.document;
        }
}

//Función para editar la información de documentos del cliente seleccionado
//Funcionando al 100%
async function editarDoc(){
    let datoEditDoc = {};

    datoEditDoc.id = document.getElementById("txtId").value;
    datoEditDoc.id_client = document.getElementById("txtIdCli").value;
    datoEditDoc.name_client = document.getElementById("txtNaC").value;
    datoEditDoc.document_name = document.getElementById("txtTypeD").value;
    datoEditDoc.document = document.getElementById("txtDocument").value;

    const request = await fetch('api/docs/client', {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(datoEditDoc)
              });
}

//Función para mostrar la información de direcciones del cliente en el Modal para poder Editarla
//Funcionando al 100%
async function getInfoDirec(id){
    const request = await fetch('api/direc/client/' + id, {
            method: 'GET',
            headers: getHeaders()
          });
          const direcciones = await request.json();

        for(let dire of direcciones){
            document.getElementById("txtiDi").value = dire.id;
            document.getElementById("txtIdClie").value = dire.id_client;
            document.getElementById("txtNaCl").value = dire.name_client;
            document.getElementById("txtNameDi").value = dire.name_address;
            document.getElementById("txtAddr").value = dire.address;
        }
}

//Función para editar la información de documentos del cliente seleccionado
//Funcionando al 100%
async function editarDire(){
    let datoEditDir = {};

    datoEditDir.id = document.getElementById("txtiDi").value;
    datoEditDir.id_client = document.getElementById("txtIdClie").value;
    datoEditDir.name_client = document.getElementById("txtNaCl").value;
    datoEditDir.name_address = document.getElementById("txtNameDi").value;
    datoEditDir.address = document.getElementById("txtAddr").value;

    const request = await fetch('api/dire/client', {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(datoEditDir)
              });
}

//Función para eliminar registro de Documento por medio del Id
//Funcionando al 100%
async function eliminarDoc(id){

    if(!confirm('¿Desea eliminar este Documento?')){
            return;
        }

    const request = await fetch('api/docs/client/' + id, {
            method: 'DELETE',
            headers: getHeaders()
          });

    alert("Documento con id: " + id + " eliminado exitosamente");
    location.reload();
}

//Función para eliminar registro de Dirección por medio del Id
//Funcionando al 100%
async function eliminarAdr(id){

    if(!confirm('¿Desea eliminar esta Dirección?')){
            return;
        }

    const request = await fetch('api/direc/client/' + id, {
            method: 'DELETE',
            headers: getHeaders()
          });

    alert("Dirección con id: " + id + " eliminada exitosamente");
    location.reload();
}