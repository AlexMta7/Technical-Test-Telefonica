
$(document).ready(function () {
  //Al iniciar la pagina llama al metodo
  getUsers()
  userInfo()
});

// Información del usuario logueado
async function userInfo() {

  document.getElementById("lblEmail").innerHTML = localStorage.email;
  document.getElementById("lblUserName").innerHTML = localStorage.name;
  document.getElementById("lblUserRole").innerHTML = localStorage.role;
}

//Para devolver los Header
function getHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token
  };
}

async function getUsers() {
  const request = await fetch('api/users', {
    method: 'GET',
    headers: getHeaders()
  });

  const usuarios = await request.json();

  console.log(usuarios);
  console.log(usuarios.message);

  let tableData = '';

  //Si no hay token
  if (usuarios.message == "JWT String argument cannot be null or empty.") {
    document.querySelector('#table_user thead').outerHTML = '<div class="container border border-danger">You have to <a href="/login">log in</a> to access this data</div>';
    document.querySelector('#userInfo').outerHTML = '';
  }
  else if (usuarios == '') {
    // Si no hay datos
    let userHtml = '   <tr> '
      + '  <td>---</td>'
      + '  <td><strong>---</strong></td>'
      + '  <td>---</td> '
      + '  <td>---</td>'
      + '  <td>---</td>'
      + '</tr>'
      + '<div>No data available</div>';
    tableData += userHtml;
    document.querySelector('#table_user tbody').outerHTML = tableData;
  }
  else {
    // Si hay datos
    for (let user of usuarios) {
      let updateButton = '<button type="button" id="updateButton" onclick="getUser(' + user.id + ')" class="btn btn-icon btn-primary" data-bs-toggle="modal" data-bs-target="#modalCenter">'
        + '   <span class="tf-icons bx bx-edit"></span>'
        + '</button>';
      //TODO: AGREGAR AQUI EL METODO PARA LOG DE ELIMINAR
      let deleteButton = '<button type="button" onclick="deleteUser(' + user.id + ')" class="btn btn-icon btn-danger">'
        + '   <span class="tf-icons bx bx-trash-alt"></span>'
        + '</button>';
      let userHtml = '   <tr> '
        + '  <td>' + user.id + '</td>'
        + '  <td><strong>' + user.name + ' ' + user.lastname + '</strong></td>'
        + '  <td>' + user.email + '</td> '
        + '  <td>' + user.type + '</td>'
        + '  <td>' + updateButton + ' ' + deleteButton + '</td>'
        + '</tr>';
      tableData += userHtml;
    }
    document.querySelector('#table_user tbody').outerHTML = tableData;
  }
}

async function getUser(id) {
  const request = await fetch('api/users/' + id, {
    method: 'GET',
    headers: getHeaders()
  });

  const usuario = await request.json();

  console.log(usuario);
  document.getElementById("saveModalUser").innerHTML = "Update User";
  document.getElementById("saveModalUser").value = "Update User";
  document.getElementById("selectOption1").innerHTML = "ADMIN";
  document.getElementById("selectOption1").value = "ADMIN";
  document.getElementById("selectOption2").innerHTML = "NO_ADMIN";
  document.getElementById("selectOption2").value = "NO_ADMIN";

  for (user of usuario) {
    document.getElementById("txtModalId").value = user.id;
    document.getElementById("txtModalName").value = user.name;
    document.getElementById("txtModalLastname").value = user.lastname;
    document.getElementById("txtModalEmail").value = user.email;
    // document.getElementById("txtModalSecret").value = user.password;
    document.getElementById("selectOption0").innerHTML = user.type;
  }
}

async function deleteUser(id) {

  if (id == localStorage.user_id) {
    alert("Can't delete logged user");
    return;
  }
  else {

    if (!confirm('Do you want to delete the user?')) {
      //Con return se corta el flujo de la función
      return;
    }
    const request = await fetch('api/users/' + id, {
      method: 'DELETE',
      headers: getHeaders()
    });

    console.log(request);
    console.log(request.status);
    if (request.status == 500) {
      alert("Can't delete user");
      return;
    }
    // -------- LOG --------
    let log = {};
    log.user_id = localStorage.user_id;
    log.action = 'Deleted User: ' + id;
    console.log(log);

    const requestLog = await fetch('api/logs', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(log)
    });
    const responseLog = await requestLog.text();
    console.log(responseLog);
    // -------- LOG --------
  
    location.reload();
    alert("User Deleted");
  }
}

async function updateUser() {
  let user = {};
  user.id = document.getElementById("txtModalId").value;
  user.name = document.getElementById("txtModalName").value;
  user.lastname = document.getElementById("txtModalLastname").value;
  user.email = document.getElementById("txtModalEmail").value;
  user.type = document.getElementById("selectModalType").value;
  user.password = document.getElementById("txtModalSecret").value;

  const request = await fetch('api/users', {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(user)
  });
  const response = await request.text();
  console.log(response);
  if (response == 'OK') {
      // -------- LOG --------
      let log = {};
      log.user_id = localStorage.user_id;
      log.action = 'Updated User: ' + user.id;
      console.log(log);
  
      const requestLog = await fetch('api/logs', {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(log)
      });
      const responseLog = await requestLog.text();
      console.log(responseLog);
      // -------- LOG --------
    alert("User updated successfully");
    location.reload();
  }
  else {
    alert("Couldn't update user");
  }
}

async function getUserByName(email) {

  if (document.getElementByuser.id('txtSearch').value == '') {
    return;
  }
  else {
    //Capitaliza la primera letra
    email = email.trim().replace(/^\w/, (c) => c.toUpperCase());
    const requestEmail = await fetch('/api/username/' + email, {
      method: 'GET',
      headers: getHeaders()
    });

    const usuario = await requestEmail.json();
    console.log(usuario)
  }
}