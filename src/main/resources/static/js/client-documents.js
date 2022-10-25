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

async function getDocuments() {
    const request = await fetch('api/docs/alex@gmail.com', {
       method: 'GET',
       headers: getHeaders()
    });
  
     const documents = await request.json();
   
console.log(documents);
  let inputHtml = '';
  let cont = 0;
  let cont2 = 0;
  let cont3 = 0;
  let cont4 = 0;
  let cont5 = 0;
  let id = '';

  for (let docs of documents) {
    cont++;
    cont2++;
    cont3+=2;
    cont4+=3;
    cont5+=4;
    console.log(cont);
   
//  document.getElementById("btnDropDown"+cont+"").innerText = docs.type //EL boton
    
  //document.getElementById("txtModalClientSecret").value = docs.id;

  let data = '<div class="input-group col mb-3">'
           + '<button class="btn btn-outline-primary dropdown-toggle" value="'+docs.type+'" id="btnDropDown'+cont+'" type="button" data-bs-toggle="dropdown" aria-expanded="false">'
           + ' '+docs.type+''
           + '</button>'
           + '<ul class="dropdown-menu" id="dropDown'+cont+'" style="">'
           + '<li><a id="dpType'+cont2+'" class="dropdown-item" onclick="changeDP(document.getElementById("dpType1").innerHTML)">DUI</a></li>'
           + '<li><a id="dpType'+cont3+'" class="dropdown-item" onclick="changeDP(document.getElementById("dpType2").innerHTML)">NIT</a></li>'
           + '<li><a id="dpType'+cont4+'" class="dropdown-item" onclick="changeDP(document.getElementById("dpType3").innerHTML)">ISSS</a></li>'
           + '<li><a id="dpType'+cont5+'" class="dropdown-item" onclick="changeDP(document.getElementById("dpType4").innerHTML)">Passport</a></li>'
           + '<li>'
           + '<hr class="dropdown-divider">'
           + '</li>'
           + '<li><input id="dpType5" class="dropdown-item" onclick="changeDP(document.getElementById("dpType5").value)" placeholder="Type an option"></input></li>'
           + '</ul>'
           + '<input type="text" class="form-control" value="'+docs.document+'" aria-label="Text input with dropdown button">'
           + '</div>';
    inputHtml += data;
    
}
document.querySelector('#input_docs div div').outerHTML = inputHtml;
  
 
}

function addDocument() {
    let type = "";
    type = document.getElementById("btnDropDown").innerHTML;
    console.log(type);

 
    for (let client of clientes){
        let updateButton =  '<button type="button" id="updateButton" onclick="getClient('+client.id+')" class="btn btn-icon btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalCenter">'
                         +  '   <span class="tf-icons bx bx-edit"></span>'
                         +  '</button>';
        let deleteButton =  '<button type="button" id="deleteButton" onclick="deleteClient('+client.id+')" class="btn btn-icon btn-outline-danger">'
                         +  '   <span class="tf-icons bx bx-trash-alt"></span>'
                         +  '</button>';
        let documentButton =  '<button type="button" id="documentButton" onclick="getClient('+client.id+')" class="btn btn-icon btn-outline-success" data-bs-toggle="modal" data-bs-target="#modalLong">'
                         +  '   <span class="tf-icons bx bx-file"></span>'
                         +  '</button>';

        let clientHtml = '   <tr> '
                     +  '  <td>'+client.id+'</td>'
                     +  '  <td><strong>'+client.name+ ' ' +client.lastname+ '</strong></td>'
                     +  '  <td>'+client.email+'</td> '
                     +  '  <td>'+client.service+'</td>'
                     +  '  <td>'+updateButton+' '+documentButton+' '+deleteButton+'</td>'
                     +  '</tr>';
        listHtml += clientHtml;
    }

    document.querySelector('#table_docs div div').outerHTML = listHtml;
}

function changeDP(name) {
    document.getElementById('btnDropDown').innerHTML = name;
}

