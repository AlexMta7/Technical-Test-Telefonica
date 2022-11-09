// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarInfoDocs();
  cargarInfoAddress();
});

function getHeaders(){
       return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
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

      if(docs == ""){
              let clienteHtml = '<tr><td></td><td>SIN</td><td>DATOS</td><td>DISPONIBLES</td><td></td></tr>';

                //Se crean las filas para los datos extraidos de la base de datos
                document.querySelector('#infoCliente tbody').outerHTML = clienteHtml;
      }else{

          let listHtml = '';

          //Se listan los datos para mostrarlos en forma ordenada en la tabla correspondiente
          for(let doc of docs){
           let btnDelete = '<button type="button" onclick="eliminarDoc(' + doc.id + ')" class="btn btn-icon btn-danger" title="Eliminar Documento"><span class="tf-icons bx bx-trash"></span></button>';
           let btnMod = '<button type="button" onclick="getInfoDoc(' + doc.id + ')" class="btn btn-icon btn-info" data-bs-toggle="modal" data-bs-target="#modalScrollableDoc" title="Modificar Documento"><span class="tf-icons bx bx-pencil"></span></button>';

           let docHtml = '<tr><td>'+ doc.id +'</td><td>' + doc.id_client + '</td><td>' + doc.document_name + '</td><td>'
           + doc.document +  '</td><td>' + btnDelete + ' ' + btnMod + '</td></tr>';
            listHtml += docHtml;
          }

          //Se crean las filas para los datos extraidos de la base de datos
          document.querySelector('#infoCliente tbody').outerHTML = listHtml;
      }
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

      if(addressC == ""){
            let docHtml = '<tr><td></td><td>SIN</td><td>DATOS</td><td>DISPONIBLES</td><td></td></tr>';

              //Se crean las filas para los datos extraidos de la base de datos
              document.querySelector('#infoAddress tbody').outerHTML = docHtml;
      }else{
          let listHtml = '';

          //Se listan los datos para mostrarlos en forma ordenada en la tabla correspondiente
          for(let ac of addressC){
           let btnDelete = '<a href="#" onclick="eliminarAdr(' + ac.id + ')" class="btn btn-icon btn-danger" title="Eliminar Dirección"><span class="tf-icons bx bx-trash"></span></a>';
           let btnMod = '<button type="button" onclick="getInfoDirec(' + ac.id + ')" class="btn btn-icon btn-info" data-bs-toggle="modal" data-bs-target="#modalScrollableDir" title="Modificar Dirección"><span class="tf-icons bx bx-pencil"></span></button>';

           let docHtml = '<tr><td>' + ac.id + '</td><td>'  + ac.id_client + '</td><td>'+ ac.name_address + '</td><td>' + ac.address +  '</td><td>'
            + btnDelete + ' ' + btnMod + '</td></tr>';
            listHtml += docHtml;
          }

          //Se crean las filas para los datos extraidos de la base de datos
          document.querySelector('#infoAddress tbody').outerHTML = listHtml;
      }
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
    const request = await fetch('api/address/client/' + id, {
            method: 'GET',
            headers: getHeaders()
          });
          const direcciones = await request.json();

        for(let dire of direcciones){
            document.getElementById("txtiDi").value = dire.id;
            document.getElementById("txtIdClie").value = dire.id_client;
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
    datoEditDir.name_address = document.getElementById("txtNameDi").value;
    datoEditDir.address = document.getElementById("txtAddr").value;

    const request = await fetch('api/address/client', {
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

    const request = await fetch('api/address/client/' + id, {
            method: 'DELETE',
            headers: getHeaders()
          });

    alert("Dirección con id: " + id + " eliminada exitosamente");
    location.reload();
}

async function getDocsClientByID(id){

    const request = await fetch('api/search/docs/client/' + id, {
                method: 'GET',
                headers: getHeaders()
              });
              const client = await request.json();

    console.log(client);

    if(client == ""){
        console.log("ERROR");

        let docHtml1 = '<tr><td></td><td> CLIENTE </td><td>SIN</td><td> DOCUMENTOS </td><td></td></tr>';

                          //Se crean las filas para los datos extraidos de la base de datos
                          document.querySelector('#infoCliente tbody').outerHTML = docHtml1;
    }else{
        let listHtml1 = '';

                  //Se listan los datos para mostrarlos en forma ordenada en la tabla correspondiente
                  for(let clis of client){
                   let btnDelete = '<button type="button" onclick="eliminarDoc(' + clis.id + ')" class="btn btn-icon btn-danger" title="Eliminar Documento"><span class="tf-icons bx bx-trash"></span></button>';
                   let btnMod = '<button type="button" onclick="getInfoDoc(' + clis.id + ')" class="btn btn-icon btn-info" data-bs-toggle="modal" data-bs-target="#modalScrollableDoc" title="Modificar Documento"><span class="tf-icons bx bx-pencil"></span></button>';

                   let docHtml1 = '<tr><td>'+ clis.id +'</td><td>' + clis.id_client + '</td><td>' + clis.document_name + '</td><td>'
                   + clis.document +  '</td><td>' + btnDelete + ' ' + btnMod + '</td></tr>';
                    listHtml1 += docHtml1;
                  }

                  //Se crean las filas para los datos extraidos de la base de datos
                  document.querySelector('#infoCliente tbody').outerHTML = listHtml1;
    }
}

async function getDirClientByID(id){

    const request = await fetch('api/search/address/client/' + id, {
                method: 'GET',
                headers: getHeaders()
              });
              const dir_client = await request.json();

    console.log(dir_client);

    if(dir_client == ""){
        console.log("ERROR");

        let docHtml2 = '<tr><td></td><td> CLIENTE </td><td>SIN</td><td> DIRECCIONES </td><td></td></tr>';

                          //Se crean las filas para los datos extraidos de la base de datos
                          document.querySelector('#infoAddress tbody').outerHTML = docHtml2;
    }else{
        let listHtml2 = '';

                  //Se listan los datos para mostrarlos en forma ordenada en la tabla correspondiente
                  for(let di of dir_client){
                   let btnDelete = '<button type="button" onclick="eliminarAdr(' + di.id + ')" class="btn btn-icon btn-danger" title="Eliminar Documento"><span class="tf-icons bx bx-trash"></span></button>';
                   let btnMod = '<button type="button" onclick="getInfoDirec(' + di.id + ')" class="btn btn-icon btn-info" data-bs-toggle="modal" data-bs-target="#modalScrollableDir" title="Modificar Dirección"><span class="tf-icons bx bx-pencil"></span></button>';

                   let docHtml2 = '<tr><td>'+ di.id +'</td><td>' + di.id_client + '</td><td>' + di.name_address + '</td><td>'
                   + di.address +  '</td><td>' + btnDelete + ' ' + btnMod + '</td></tr>';
                    listHtml2 += docHtml2;
                  }

                  //Se crean las filas para los datos extraidos de la base de datos
                  document.querySelector('#infoAddress tbody').outerHTML = listHtml2;
    }
}

async function searchClientByID(){

    if(document.getElementById("txtSearchID").value == ""){
        alert("Ingrese El ID Del Cliente A Buscar");
    }else{
        var val = document.getElementById("txtSearchID").value;

        getDocsClientByID(val);
        getDirClientByID(val);
    }
}