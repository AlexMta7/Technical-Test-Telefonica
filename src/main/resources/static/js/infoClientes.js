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
       let btnDelete = '<a href="#" onclick="#" class="btn btn-icon btn-danger" title="Eliminar Documento"><span class="tf-icons bx bx-trash"></span></a>';
       let btnMod = '<button type="button" onclick="getInfoDoc(' + doc.id + ')" class="btn btn-icon btn-info" data-bs-toggle="modal" data-bs-target="#modalScrollableDoc" title="Modificar Documento"><span class="tf-icons bx bx-pencil"></span></button>';

       let docHtml = '<tr><td>'+ doc.id +'</td><td>' + doc.id_client + '</td><td>' + doc.document_name + '</td><td>'
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
       let btnDelete = '<a href="#" onclick="#" class="btn btn-icon btn-danger" title="Eliminar Dirección"><span class="tf-icons bx bx-trash"></span></a>';
       let btnMod = '<button type="button" onclick="#" class="btn btn-icon btn-info"title="Modificar Dirección"><span class="tf-icons bx bx-pencil"></span></button>';

       let docHtml = '<tr><td>'+ ac.id +'</td><td>' + ac.id_client + '</td><td>' + ac.name_address + '</td><td>'
       + ac.address +  '</td><td>' + btnDelete + ' ' + btnMod + '</td></tr>';
        listHtml += docHtml;
      }

      //Se crean las filas para los datos extraidos de la base de datos
      document.querySelector('#infoAddress tbody').outerHTML = listHtml;
}

//Función para mostrar la información del cliente en el Modal para poder Editarla
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
            document.getElementById("txtTypeD").value = docu.document_name;
            document.getElementById("txtAddress").value = docu.document;
        }
}