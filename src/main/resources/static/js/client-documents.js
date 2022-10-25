$(document).ready(function() {
  //   //Al iniciar la pagina llama al metodo
  // getDocuments();
});

// async function getClient(id) {
//     const request = await fetch('api/clients/'+id, {
//        method: 'GET',
//        headers: getHeaders()
//      });
//      const documents = await request.json();
   
// console.log(documents);
// document.getElementById("saveModal").innerHTML = "Update";  

// for(docs of documents){
//   document.getElementById("txtModalId").value = docs.id;
//   document.getElementById("txtModalName").value = docs.cliente_id;
//   document.getElementById("txtModalLastname").value = docs.type;
//   document.getElementById("txtModalEmail").value = docs.document;
// }
// }

async function getDocuments(email) { 
  console.log();
    const request = await fetch('api/docs/'+email, {
       method: 'GET',
       headers: getHeaders()
    });
  
     const documents = await request.json();
   
console.log(documents);
  let inputHtml = '';
  let cont = 0;
  let cont2 = 1;
  let cont3 = 2;
  let cont4 = 3;
  let cont5 = 4;
  let cont6 = 5;
  let cont7 = 6;

  for (let docs of documents) {
    cont++;
    cont2+=6;
    cont3+=6;
    cont4+=6;
    cont5+=6;
    cont6+=6;
    cont7+=6;
    console.log(cont);

    let data = '<div class="input-group col mb-3">'
           + '<input id="txtSecretID'+cont+'" class="dropdown-item" value="' + docs.id + '" disabled hidden></input>'
           +'<input id="txtSecretEmail" class="dropdown-item" value="'+email+'"  disabled hidden></input>'
           + '<button class="btn btn-outline-primary dropdown-toggle" value="'+docs.type+'" id="btnDropDown'+cont+'" type="button" data-bs-toggle="dropdown" aria-expanded="false">'
           + ''+docs.type+''
           + '</button>'
           + '<ul class="dropdown-menu" id="dropDown'+cont+'" style="">'
           + '<li><a id="dpType'+cont2+'" class="dropdown-item" onclick="changeDP(document.getElementById(\'dpType'+cont2+'\').innerHTML,'+cont+')">DUI</a></li>'
           + '<li><a id="dpType'+cont3+'" class="dropdown-item" onclick="changeDP(document.getElementById(\'dpType'+cont3+'\').innerHTML,'+cont+')">NIT</a></li>'
           + '<li><a id="dpType'+cont4+'" class="dropdown-item" onclick="changeDP(document.getElementById(\'dpType'+cont4+'\').innerHTML,'+cont+')">ISSS</a></li>'
           + '<li><a id="dpType'+cont5+'" class="dropdown-item" onclick="changeDP(document.getElementById(\'dpType'+cont5+'\').innerHTML,'+cont+')">Passport</a></li>'
           + '<li>'
           + '<hr class="dropdown-divider">'
           + '</li>'
           + '<li><input id="dpType'+cont6+'" class="dropdown-item" onclick="changeDP(document.getElementById(\'dpType'+cont6+'\').value,'+cont+')" placeholder="Type an option"></input></li>'
           + '</ul>'
           + '<input type="text" id="txtDocument'+cont+'" class="form-control" value="'+docs.document+'" aria-label="Text input with dropdown button">'
           + '<button class="btn btn-outline-primary tf-icons bx bxs-edit"  onclick="updateDoc('+docs.id+','+cont+')" type="button" aria-expanded="false">'
      + '</button>'
      + '<button class="btn btn-outline-danger tf-icons bx bx-trash-alt"  onclick="deleteDoc('+docs.id+')" type="button" aria-expanded="false">'
           + '</button>'
           + '</div>';
    inputHtml += data;
    
  }
  // console.log(inputHtml);
    document.querySelector('#input_docs div div').outerHTML = inputHtml;
 
}

function addButton() {
  let data = '<div class="input-group col mb-3">'
           + '<button class="btn btn-outline-primary dropdown-toggle" value="" id="btnDropDown" type="button" data-bs-toggle="dropdown" aria-expanded="false">'
          
           + '</button>'
           + '<ul class="dropdown-menu" id="dropDown" style="">'
           + '<li><a id="dpType" class="dropdown-item" onclick="changeDP(document.getElementById(dpType).innerHTML)">DUI</a></li>'
           + '<li><a id="dpType" class="dropdown-item" onclick="changeDP(document.getElementById(dpType).innerHTML)">NIT</a></li>'
           + '<li><a id="dpType" class="dropdown-item" onclick="changeDP(document.getElementById(dpType).innerHTML)">ISSS</a></li>'
           + '<li><a id="dpType" class="dropdown-item" onclick="changeDP(document.getElementById(dpType).innerHTML)">Passport</a></li>'
           + '<li>'
           + '<hr class="dropdown-divider">'
           + '</li>'
           + '<li><input id="dpType5" class="dropdown-item" onclick="changeDP(document.getElementById("dpType5").value)" placeholder="Type an option"></input></li>'
           + '</ul>'
    + '<input type="text" class="form-control" value="" aria-label="Text input with dropdown button">'
    + '</div>';
    document.querySelector('#input_docs div div').outerHTML = data;
  
}

function addDocument() {
    let type = "";
    type = document.getElementById("btnDropDown").innerHTML;
    console.log(type);
}

async function updateDoc(id,cont) {

  let docs = {};
  docs.id = id
  docs.client_id = document.getElementById("txtSecretEmail").value;
  docs.document = document.getElementById("txtDocument"+cont+"").value;
  docs.type = document.getElementById("btnDropDown"+cont+"").innerHTML;

  console.log();
  const request = await fetch('api/docs/', {
     method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(docs)
  });

  const response = await request.text();
  console.log(response);
}


async function deleteDoc(id){

  if(!confirm('Do you want to delete document?')){
          //Con return se corta el flujo de la función
          return;
      }

  const request = await fetch('api/docs/' + id, {
      method: 'DELETE',
      headers: getHeaders()
    });
      location.reload();

  alert("Document deleted");
}

function changeDP(name,numId) {
    document.getElementById('btnDropDown'+numId+'').innerHTML = name;
}

function cleanModal() {
  location.reload();
  // document.querySelector("#input_docs div").outerHTML = '<div class="col mb-3">'
  // +'<label class="form-label">Documentos</label>'
  // + '</div>';
}

