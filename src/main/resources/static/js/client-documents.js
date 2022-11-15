
$(document).ready(function () {
  // getDocuments();
});

async function getDocuments(id) {
  console.log();
  const request = await fetch('api/docs/' + id, {
    method: 'GET',
    headers: getHeaders()
  });

  const documents = await request.json();

  console.log(documents);
  let inputHtml = '';

  document.querySelector('#input_docs div').outerHTML = '<div class="col mb-3"><label class="form-label">Documentos</label><div></div></div>';
  document.getElementById("modalLongTitle").innerHTML = document.querySelector('#table_user tbody tr strong').outerHTML + ', id: ';
  document.getElementById("modalLongTitleID").innerHTML = id;

  // Si no hay datos
  if (documents == '') {
    let data = '<div class="input-group col mb-3">'
      + '<input value="No data available" disabled></input>'
      + '</div>';
    inputHtml += data;
    document.querySelector('#input_docs div div').outerHTML = inputHtml;
  }
  else {
    let cont = 0;
    let cont2 = 1;
    let cont3 = 2;
    let cont4 = 3;
    let cont5 = 4;
    let cont6 = 5;
    let cont7 = 6;

    for (let docs of documents) {
      cont++;
      cont2 += 6;
      cont3 += 6;
      cont4 += 6;
      cont5 += 6;
      cont6 += 6;
      cont7 += 6;
      //console.log(cont);

      let data = '<div class="input-group col mb-3">'
        + '<input id="txtSecretID' + cont + '" class="dropdown-item" value="' + docs.id + '" disabled hidden></input>'
        + '<input id="txtSecretClientId" class="dropdown-item" value="' + id + '"  disabled hidden></input>'
        + '<button class="btn btn-primary dropdown-toggle" value="' + docs.type + '" id="btnDropDown' + cont + '" type="button" data-bs-toggle="dropdown" aria-expanded="false">'
        + '' + docs.type + ''
        + '</button>'
        + '<ul class="dropdown-menu" id="dropDown' + cont + '" style="">'
        + '<li><a id="dpType' + cont2 + '" class="dropdown-item" onclick="changeDP(document.getElementById(\'dpType' + cont2 + '\').innerHTML,' + cont + ')">DUI</a></li>'
        + '<li><a id="dpType' + cont3 + '" class="dropdown-item" onclick="changeDP(document.getElementById(\'dpType' + cont3 + '\').innerHTML,' + cont + ')">NIT</a></li>'
        + '<li><a id="dpType' + cont4 + '" class="dropdown-item" onclick="changeDP(document.getElementById(\'dpType' + cont4 + '\').innerHTML,' + cont + ')">ISSS</a></li>'
        + '<li><a id="dpType' + cont5 + '" class="dropdown-item" onclick="changeDP(document.getElementById(\'dpType' + cont5 + '\').innerHTML,' + cont + ')">Passport</a></li>'
        + '<li>'
        + '<hr class="dropdown-divider">'
        + '</li>'
        + '<li><input id="dpType' + cont6 + '" class="dropdown-item" onclick="changeDP(document.getElementById(\'dpType' + cont6 + '\').value,' + cont + ')" placeholder="Type an option"></input></li>'
        + '</ul>'
        + '<input type="text" id="txtDocument' + cont + '" class="form-control" value="' + docs.document + '" aria-label="Text input with dropdown button">'
        + '<button class="btn btn-primary tf-icons bx bxs-edit"  onclick="updateDoc(' + docs.id + ',' + cont + ')" type="button" aria-expanded="false">'
        + '</button>'
        + '<button class="btn btn-danger tf-icons bx bx-trash-alt"  onclick="deleteDoc(' + docs.id + ',\''+docs.type+'\')" type="button" aria-expanded="false">'
        + '</button>'
        + '</div>';
      inputHtml += data;

    }
    document.querySelector('#input_docs div div').outerHTML = inputHtml;
  }
}

/*Agrega un documento pasando como parametro un email*/
async function addDocument() {
  let doc = {};
  doc.id = '';
  doc.client_id = document.getElementById('txtInsertDocSecretClientId').value;
  doc.type = document.getElementById('btnDropDownInsertDoc').innerHTML;
  doc.document = document.getElementById('txtDocumentInsert').value;

  if (document.getElementById("btnDropDownInsertDoc").value == "") {
    alert("Please select a valid type of document");
    return;
  }

  if (document.getElementById('txtDocumentInsert').value == "") {
    alert("Please insert a valid document");
    return;
  }

  const request = await fetch('api/docs', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(doc)
  });

  const response = await request.text();
 
  console.log(response);
  if (response == 'OK') {
    // -------- LOG --------
    let log = {};
    log.user_id = localStorage.user_id;
    log.action = 'Document '+doc.type+' Added for Client: ' + doc.client_id;
    console.log(log);

    const requestLog = await fetch('api/logs', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(log)
    });
    const responseLog = await requestLog.text();
    console.log(responseLog);
    // -------- LOG --------
    alert("Document added successfully");
    document.getElementById('btnDropDownInsertDoc').innerHTML = "<i class='bx bx-file-blank bx-sm'></i>";
    document.getElementById("btnDropDownInsertDoc").value = "";
    document.getElementById('txtDocumentInsert').value = "";
  }
  else {
    alert("Couldn't add document");
  }
}

async function updateDoc(id, cont) {
  let docs = {};
  docs.id = id
  docs.client_id = document.getElementById("txtSecretClientId").value;
  docs.document = document.getElementById("txtDocument" + cont + "").value;
  docs.type = document.getElementById("btnDropDown" + cont + "").innerHTML;

  if (docs.type == "" || docs.document == "") {
    alert("Please fill all the inputs");
    return;
  }

  console.log();
  const request = await fetch('api/docs/', {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(docs)
  });

  const response = await request.text();

   // -------- LOG --------
   let log = {};
   log.user_id = localStorage.user_id;
   log.action = 'Document '+document.getElementById("btnDropDown" + cont + "").value+' Updated into '+docs.type+' for Client: ' + docs.client_id;
   console.log(log);

   const requestLog = await fetch('api/logs', {
     method: 'POST',
     headers: getHeaders(),
     body: JSON.stringify(log)
   });
   const responseLog = await requestLog.text();
   console.log(responseLog);
   // -------- LOG --------

  let inputHtml = '';
  let data = '<div class="input-group col mb-3">'
      + '</div>';
    inputHtml += data;
    document.querySelector('#input_docs div div').outerHTML = inputHtml;

  console.log(response);
  alert("Document updated");

  getDocuments(document.getElementById("modalLongTitleID").innerHTML);
}

async function deleteDoc(id,type) {

  if (!confirm('Do you want to delete document?')) {
    //Con return se corta el flujo de la función
    return;
  }

  const request = await fetch('api/docs/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  });

     // -------- LOG --------
     let log = {};
     log.user_id = localStorage.user_id;
     log.action = 'Document '+type+' Deleted for Client: ' + document.getElementById("modalLongTitleID").innerHTML;
     console.log(log);
 
     const requestLog = await fetch('api/logs', {
       method: 'POST',
       headers: getHeaders(),
       body: JSON.stringify(log)
     });
     const responseLog = await requestLog.text();
     console.log(responseLog);
     // -------- LOG --------

  document.querySelector('#input_docs div').outerHTML = '<div class="col mb-3"><label class="form-label">Documentos</label><div></div></div>';
  alert("Document deleted");
  let UserId = document.getElementById("modalLongTitleID").innerHTML;
  getDocuments(UserId);
}

// Asigan los valores del id a un lbl
function insertDocumentAtId(id) {
  document.getElementById('txtInsertDocSecretClientId').value = id;
  document.getElementById("modalLongTitle2").innerHTML = document.querySelector('#table_user tbody tr strong').outerHTML + ', id: ' + id;
}

/*Cambia el estado del boton cuando muestra los resultados de los documentos*/
function changeDP(name, numId) {
  document.getElementById('btnDropDown' + numId + '').innerHTML = name;
  // document.getElementById('btnDropDown' + numId + '').value = name;
}

/*Cambia el estado del boton para agregar documentos*/
function changeDDInsertDoc(name) {
  document.getElementById('btnDropDownInsertDoc').value = name;
  document.getElementById('btnDropDownInsertDoc').innerHTML = name;
}

/*Recarga la pagina */
function cleanModal() {
  location.reload();
}

