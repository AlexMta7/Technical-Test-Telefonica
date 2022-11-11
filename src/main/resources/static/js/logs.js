
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

    const usuarios = await request.json();

    console.log(usuarios);

    let tableData = '';

    //Si no hay token
    if (usuarios.message == "JWT String argument cannot be null or empty.") {
        document.querySelector('#table_logs thead').outerHTML = '<div class="container border border-danger">You have to <a href="/login">log in</a> to access this data</div>';
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
        document.querySelector('#table_logs tbody').outerHTML = tableData;
    }
    else {
        // Si hay datos
        for (let user of usuarios) {
            let updateButton = '<button type="button" id="updateButton" onclick="getUser(' + user.id + ')" class="btn btn-icon btn-primary" data-bs-toggle="modal" data-bs-target="#modalCenter">'
                + '   <span class="tf-icons bx bx-edit"></span>'
                + '</button>';
            let deleteButton = '<button type="button" onclick="deleteUser(' + user.id + ')" class="btn btn-icon btn-danger">'
                + '   <span class="tf-icons bx bx-trash-alt"></span>'
                + '</button>';
            let userHtml = '   <tr> '
                + '  <td>' + user.id + '</td>'
                + '  <td><strong>' + user.user_id + ' ' + user.lastname + '</strong></td>'
                + '  <td>' + user.action + '</td> '
                + '  <td>' + user.date + '</td>'
                // + '  <td>' + updateButton + ' ' + deleteButton + '</td>'
                + '</tr>';
            tableData += userHtml;
        }
        document.querySelector('#table_logs tbody').outerHTML = tableData;
    }
}

// TODO: ARREGLAR ESTO PARA VERLO EN EL FRONT
async function addLog(user_id,action) {
    let log = {};
    // log.name = document.getElementById("txtName").value;
    // log.lastname = document.getElementById("txtLastname").value;
    // log.email = document.getElementById("txtEmail").value;
    // log.password = document.getElementById("txtPassword").value;

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
    log.action = action
    log.date = date;

    console.log(log);

    const request = await fetch('api/logs', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(log)
    });
    const response = await request.json();
    console.log(response);

    // if (response == 'OK') {
    //     alert("User added successfully.");
    //     location.reload();
    // }
    // else {
    //     alert("User already exist.");
    // }
}