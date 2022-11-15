$(document).ready(function () {
});

async function getAddresses(id) {
  console.log();
  const request = await fetch('api/address/' + id, {
    method: 'GET',
    headers: getHeaders()
  });

  const addresses = await request.json();

  console.log(addresses);
  let inputHtml = '';

  document.querySelector('#input_address').outerHTML = '<div class="col mb-3" id="input_address">'
    + '<label  class="form-label" > Direcciones</label> '
    + '<div></div >'
    + '</div> ';
  document.getElementById("modalLongTitle").innerHTML = document.querySelector('#table_user tbody tr strong').outerHTML + ', id: ';
  document.getElementById("modalLongTitleID").innerHTML = id;


  //Si no hay datos
  if (addresses == '') {
    let data = '<div class="input-group col mb-3">'
      + '<input value="No data available" disabled></input>'
      + '</div>';
    inputHtml += data;
    document.querySelector('#input_address div').outerHTML = inputHtml;
  }
  else {
    let cont = 0;
    let cont2 = 1;
    let cont3 = 2;
    let cont4 = 3;
    let cont5 = 4;
    let cont6 = 5;
    let cont7 = 6;

    for (let addre of addresses) {
      cont++;
      cont2 += 6;
      cont3 += 6;
      cont4 += 6;
      cont5 += 6;
      cont6 += 6;
      cont7 += 6;
      //console.log(cont);

      let data = '<div class="input-group col mb-3">'
        + '<input id="txtSecretIDAddress' + cont + '" class="dropdown-item" value="' + addre.id + '" disabled hidden></input>'
        + '<input id="txtSecretClientId" class="dropdown-item" value="' + id + '"  disabled hidden></input>'
        + '<button class="btn btn-primary dropdown-toggle" value="' + addre.type + '" id="btnDropDownAddress' + cont + '" type="button" data-bs-toggle="dropdown" aria-expanded="false">'
        + '' + addre.type + ''
        + '</button>'
        + '<ul class="dropdown-menu" id="dropDownAddress' + cont + '" style="">'
        + '<li><a id="dpTypeAddres' + cont2 + '" class="dropdown-item" onclick="changeDDAddress(document.getElementById(\'dpTypeAddres' + cont2 + '\').innerHTML,' + cont + ')">Casa</a></li>'
        + '<li><a id="dpTypeAddres' + cont3 + '" class="dropdown-item" onclick="changeDDAddress(document.getElementById(\'dpTypeAddres' + cont3 + '\').innerHTML,' + cont + ')">Trabajo</a></li>'
        + '<li><a id="dpTypeAddres' + cont4 + '" class="dropdown-item" onclick="changeDDAddress(document.getElementById(\'dpTypeAddres' + cont4 + '\').innerHTML,' + cont + ')">Oficina</a></li>'
        + '<li><a id="dpTypeAddres' + cont5 + '" class="dropdown-item" onclick="changeDDAddress(document.getElementById(\'dpTypeAddres' + cont5 + '\').innerHTML,' + cont + ')">Departamento</a></li>'
        + '<li>'
        + '<hr class="dropdown-divider">'
        + '</li>'
        + '<li><input id="dpTypeAddress' + cont6 + '" class="dropdown-item" onclick="changeDDAddress(document.getElementById(\'dpTypeAddress' + cont6 + '\').value,' + cont + ')" placeholder="Type an option"></input></li>'
        + '</ul>'
        + '<input type="text" id="txtAddress' + cont + '" class="form-control" value="' + addre.address + '" aria-label="Text input with dropdown button">'
        + '<button class="btn btn-primary tf-icons bx bxs-edit"  onclick="updateAddress(' + addre.id + ',' + cont + ')" type="button" aria-expanded="false">'
        + '</button>'
        + '<button class="btn btn-danger tf-icons bx bx-trash-alt"  onclick="deleteAddress(' + addre.id + ',\'' + addre.type + '\')" type="button" aria-expanded="false">'
        + '</button>'
        + '</div>';
      inputHtml += data;

    }
    document.querySelector('#input_address div').outerHTML = inputHtml;
  }
}

async function addAddress() {
  let address = {};
  address.id = '';
  address.client_id = document.getElementById('txtInsertAddressSecretClientId').value;
  address.type = document.getElementById('btnDropDownInsertAddress').innerHTML;
  address.address = document.getElementById('txtAddressInsert').value;

  if (document.getElementById("btnDropDownInsertAddress").value == "") {
    alert("Please select a valid type of Address");
    return;
  }

  if (document.getElementById('txtAddressInsert').value == "") {
    alert("Please insert a valid address");
    return;
  }

  const request = await fetch('api/address', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(address)
  });

  const response = await request.text();

  console.log(response);
  if (response == 'OK') {
    // -------- LOG --------
    let log = {};
    log.user_id = localStorage.user_id;
    log.action = 'Address ' + address.type + ' Added for Client: ' + address.client_id;
    console.log(log);

    const requestLog = await fetch('api/logs', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(log)
    });
    const responseLog = await requestLog.text();
    console.log(responseLog);
    // -------- LOG --------
    alert("Address added successfully");
    document.getElementById('btnDropDownInsertAddress').innerHTML = "<i class='bx bx-file-blank bx-sm'></i>";
    document.getElementById("btnDropDownInsertAddress").value = "";
    document.getElementById('txtAddressInsert').value = "";
  }
  else {
    alert("Couldn't add the address");
  }
}

async function updateAddress(id, cont) {
  let address = {};
  address.id = id
  address.client_id = document.getElementById("txtSecretClientId").value;
  address.type = document.getElementById("btnDropDownAddress" + cont + "").innerHTML;
  address.address = document.getElementById("txtAddress" + cont + "").value;

  if (address.type == "" || address.address == "") {
    alert("Please fill all the inputs");
    return;
  }

  console.log(address);
  const request = await fetch('api/address/', {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(address)
  });

  const response = await request.text();

  // -------- LOG --------
  let log = {};
  log.user_id = localStorage.user_id;
  log.action = 'Address ' + document.getElementById("btnDropDownAddress" + cont + "").value + ' Updated into ' + address.type + ' for Client: ' + address.client_id;
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
  document.querySelector('#input_address div').outerHTML = inputHtml;

  console.log(response);
  alert("Address updated");
  getAddresses(document.getElementById("modalLongTitleID").innerHTML);
}

async function deleteAddress(id, type) {

  if (!confirm('Do you want to delete the address?')) {
    //Con return se corta el flujo de la función
    return;
  }

  const request = await fetch('api/address/' + id, {
    method: 'DELETE',
    headers: getHeaders()
  });

  // -------- LOG --------
  let log = {};
  log.user_id = localStorage.user_id;
  log.action = 'Address ' + type + ' Deleted for Client: ' + document.getElementById("modalLongTitleID").innerHTML;
  console.log(log);

  const requestLog = await fetch('api/logs', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(log)
  });
  const responseLog = await requestLog.text();
  console.log(responseLog);
  // -------- LOG --------
  document.querySelector('#input_address').outerHTML = '<div class="col mb-3" id="input_address">'
    + '<label  class="form-label" > Direcciones</label> '
    + '<div></div >'
    + '</div> ';
  alert("Address deleted");
  let UserId = document.getElementById("modalLongTitleID").innerHTML;
  getAddresses(UserId);
}

function insertAddressAtId(id) {
  document.getElementById('txtInsertAddressSecretClientId').value = id;
  document.getElementById("modalLongTitle2").innerHTML = document.querySelector('#table_user tbody tr strong').outerHTML + ', id: ' + id;
}

function changeDDAddress(name, numId) {
  document.getElementById('btnDropDownAddress' + numId + '').innerHTML = name;
}

function changeDDInsertAddress(name) {
  document.getElementById('btnDropDownInsertAddress').value = name;
  document.getElementById('btnDropDownInsertAddress').innerHTML = name;
}