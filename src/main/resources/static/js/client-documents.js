$(document).ready(function() {
    //Al iniciar la pagina llama al metodo
  getDocument();
});

async function getClient(id) {
    const request = await fetch('api/clients/'+id, {
       method: 'GET',
       headers: getHeaders()
     });
     const cliente = await request.json();
   
console.log(cliente);
document.getElementById("saveModal").innerHTML = "Update";  

for(client of cliente){
  document.getElementById("txtModalId").value = client.id;
  document.getElementById("txtModalName").value = client.name;
  document.getElementById("txtModalLastname").value = client.lastname;
  document.getElementById("txtModalEmail").value = client.email;
  document.getElementById("txtModalService").value =   client.service;
}
}

async function getDocument(id) {
    const request = await fetch('api/clients/'+id, {
       method: 'GET',
       headers: getHeaders()
     });
     const cliente = await request.json();
   
console.log(cliente);
document.getElementById("saveModal").innerHTML = "Update";  

for(client of cliente){
  document.getElementById("txtModalId").value = client.id;
  document.getElementById("txtModalName").value = client.name;
  document.getElementById("txtModalLastname").value = client.lastname;
  document.getElementById("txtModalEmail").value = client.email;
  document.getElementById("txtModalService").value =   client.service;
}
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

    document.querySelector('#table_user tbody').outerHTML = listHtml;
}

function changeDP(name) {
    document.getElementById('btnDropDown').innerHTML = name;
}

