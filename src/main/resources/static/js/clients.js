
$(document).ready(function () {
  //Al iniciar la pagina llama al metodo
  //getClients()
  emailUser()
});

function emailUser() {
  document.getElementById("lblEmail").innerHTML = localStorage.email
}

//Para devolver los Header
function getHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token
  };
}

// Obtiene un solo cliente
async function getClient(id) {
  const request = await fetch('api/clients/' + id, {
    method: 'GET',
    headers: getHeaders()
  });
  const cliente = await request.json();

  console.log(cliente);
  document.getElementById("saveModal").innerHTML = "Update";
  document.getElementById("lblModalClient").innerHTML = "Update Client";

  for (client of cliente) {
    document.getElementById("txtModalId").value = client.id;
    document.getElementById("txtModalName").value = client.name;
    document.getElementById("txtModalLastname").value = client.lastname;
    document.getElementById("txtModalEmail").value = client.email;
    document.getElementById("txtModalService").value = client.service;
  }
}

// Obtiene a todos los clientes
async function getClients() {
  const request = await fetch('api/clients', {
    method: 'GET',
    headers: getHeaders()
  });
  const clientes = await request.json();

  console.log(clientes);
  if (clientes == '') {
    let clientHtml = '   <tr> '
      + '  <td>----</td>'
      + '  <td><strong>----</strong></td>'
      + '  <td>----</td> '
      + '  <td>----</td>'
      + '  <td>----</td>'
      + '</tr>'
      + '<div>No data available</div>';
    let noData = clientHtml;
    document.querySelector('#table_user tbody').outerHTML = noData;
  }
  else {
    let listHtml = '';
    for (let client of clientes) {
      let updateButton = '<button type="button" id="updateButton" onclick="getClient(' + client.id + ')" class="btn btn-icon btn-primary" data-bs-toggle="modal" data-bs-target="#modalCenter">'
        + '   <span class="tf-icons bx bx-edit"></span>'
        + '</button>';
      let deleteButton = '<button type="button" id="deleteButton" onclick="deleteClient(' + client.id + ')" class="btn btn-icon btn-danger">'
        + '   <span class="tf-icons bx bx-trash-alt"></span>'
        + '</button>';
      let findButton = '<button type="button" id="findButton" onclick="getDocuments(\'' + client.id + '\');getAddresses(\'' + client.id + '\')" class="btn btn-icon btn-success" data-bs-toggle="modal" data-bs-target="#modalLong">'
        + '   <span class="tf-icons bx bx-search-alt"></span>'
        + '</button>';

      let documentButton = '<button type="button" id="documentButton" onclick="insertDocumentAtId(\'' + client.id + '\');insertAddressAtId(\'' + client.id + '\')" class="btn btn-icon btn-success" data-bs-toggle="modal" data-bs-target="#modalIngresoDoc">'
        + '   <span class="tf-icons bx bx-file"></span>'
        + '</button>';

      let clientHtml = '   <tr> '
        + '  <td>' + client.id + '</td>'
        + '  <td><strong>' + client.name + ' ' + client.lastname + '</strong></td>'
        + '  <td>' + client.email + '</td> '
        + '  <td>' + client.service + '</td>'
        + '  <td>' + updateButton + ' ' + findButton + ' ' + documentButton + ' ' + deleteButton + '</td>'
        + '</tr>';
      listHtml += clientHtml;
    }

    document.querySelector('#table_user tbody').outerHTML = listHtml;
  }
}

// Actualiza o agrega un cliente dependiendo del botón que se seleccione
async function updateClient() {
  let client = {};
  let method = "";
  if (document.getElementById("txtModalId").value != "") {
    method = 'PUT';
    client.id = document.getElementById("txtModalId").value;
  }
  else {
    method = 'POST';
  }
  client.name = document.getElementById("txtModalName").value;
  client.lastname = document.getElementById("txtModalLastname").value;
  client.email = document.getElementById("txtModalEmail").value;
  client.service = document.getElementById("txtModalService").value;


  const request = await fetch('api/clients', {
    method: method,
    headers: getHeaders(),
    body: JSON.stringify(client)
  });
  const response = await request.text();
  console.log(response);

  if (method == 'PUT') {
    if (response == 'OK') {
      alert("Client updated successfully");
      location.reload();
    }
    else {
      alert("Couldn't update client");
    }
  }
  else if (method == 'POST') {
    if (response == 'OK') {
      alert("Client added successfully");
      location.reload();
    }
    else {
      alert("Client already exists");
    }
  }
}

async function deleteClient(id) {

  if (!confirm('Do you want to delete client?')) {
    //Con return se corta el flujo de la función
    return;
  }

  const request = await fetch('api/clients/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  });
  location.reload();

  alert("Client deleted");
}

//Changes the name of the button depending on what button is clicked on
function modifyModalAdd() {
  document.getElementById("saveModal").innerHTML = "Add";
  document.getElementById("lblModalClient").innerHTML = "Add Client";

  document.getElementById("txtModalId").value = "";
  document.getElementById("txtModalName").value = "";
  document.getElementById("txtModalLastname").value = "";
  document.getElementById("txtModalEmail").value = "";
  document.getElementById("txtModalService").value = "";
}


