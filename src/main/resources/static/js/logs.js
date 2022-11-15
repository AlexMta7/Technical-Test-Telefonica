
$(document).ready(function () {
    //Al iniciar la pagina llama al metodo
    getLogs()
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

async function getLogs() {
    const request = await fetch('api/logs', {
        method: 'GET',
        headers: getHeaders()
    });

    const logs = await request.json();

    //console.log(logs);

    let tableData = '';

    //Si no hay token
    if (logs.message == "JWT String argument cannot be null or empty.") {
        document.querySelector('#table_logs thead').outerHTML = '<div class="container border border-danger">You have to <a href="/login">log in</a> to access this data</div>';
        document.querySelector('#userInfo').outerHTML = '';
    }
    else if (logs == '') {
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
        document.querySelector('#table_logs tbody').outerHTML = tableData;
    }
    else {
        // Si hay datos
        for (let log of logs) {
            let updateButton = '<button type="button" id="updateButton" onclick="getUser(' + log.id + ')" class="btn btn-icon btn-primary" data-bs-toggle="modal" data-bs-target="#modalCenter">'
                + '   <span class="tf-icons bx bx-edit"></span>'
                + '</button>';
            let deleteButton = '<button type="button" onclick="deleteUser(' + log.id + ')" class="btn btn-icon btn-danger">'
                + '   <span class="tf-icons bx bx-trash-alt"></span>'
                + '</button>';
            let logHtml = '   <tr> '
                + '  <td>' + log.id + '</td>'
                + '  <td><strong><a data-bs-toggle="modal" data-bs-target="#modalUser" onclick="getUserLog(' + log.user_id + ')">' + log.user_id + '</a></strong></td>'
                + '  <td>' + log.action + '</td> '
                + '  <td>' + log.date + '</td>'
                // + '  <td>' + updateButton + ' ' + deleteButton + '</td>'
                + '</tr>';
            tableData += logHtml;
        }
        document.querySelector('#table_logs tbody').outerHTML = tableData;
    }
}

// TODO: OBTENER EL VALOR QUE CAMBIA DEPENDIENDO DEL BOTON EN ADD/UPDATE Y ESE PASAR COMO PARAMETRO EN ACTION
async function addLog(user_id,action) {
    let log = {};

    // crea un nuevo objeto `Date`
    let today = new Date();
    // `getDate()` devuelve el día del mes (del 1 al 31)
    let time = today.getTime();
    // `getDate()` devuelve el día del mes (del 1 al 31)
    let day = today.getDate();
    // `getMonth()` devuelve el mes (de 0 a 11)
    let month = today.getMonth() + 1;
    // `getFullYear()` devuelve el año completo
    let year = today.getFullYear();
    // se le da formato a la fecha de `YYYY/MM/DD//Time`
    let date = `${year}/${month}/${day}//${time}`;
    
    log.user_id = user_id;
    log.action = action;
    if (action == 'Add Client: ') {
        log.action = 'Added New Client';
    }
    
    // log.date = date;

    console.log(log);

    const request = await fetch('api/logs', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(log)
    });
    const response = await request.text();
    console.log(response);
}

//Muestra el usuario que realizó el log
async function getUserLog(id) {
    const request = await fetch('api/users/' + id, {
      method: 'GET',
      headers: getHeaders()
    });
  
    const usuario = await request.json();
  
    console.log(usuario);
    // document.getElementById("saveModalLog").innerHTML = "Ya veré que hace este boton";
  
    for (user of usuario) {
      document.getElementById("txtModalId").value = user.id;
      document.getElementById("txtModalName").value = user.name;
      document.getElementById("txtModalLastname").value = user.lastname;
      document.getElementById("txtModalEmail").value = user.email;
      // document.getElementById("txtModalSecret").value = user.password;
      document.getElementById("txtModalType").value = user.type;
    }
  }