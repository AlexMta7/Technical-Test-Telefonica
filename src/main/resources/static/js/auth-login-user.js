
$(document).ready(function () {
  //Al iniciar la pagina llama al metodo
  //actualizarEmailUsuario()
});

//Para devolver los Header
function getHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.token
  };
}

async function login() {
  let user = {};
  user.email = document.getElementById("txtEmail").value;
  user.password = document.getElementById("txtPassword").value;

  if (user.email == '' || user.password == '') {
    alert("Fill all the inputs");
    return;
  }

  const request = await fetch('api/login', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(user)
  });
  const response = await request.text();
  console.log(response);


  if (response != 'FAIL') {
    localStorage.token = response;
    localStorage.email = user.email;

    const requestEmail = await fetch('/api/user/' + localStorage.email , {
      method: 'GET',
      headers: getHeaders()
    });
  
    const usuario = await requestEmail.json();
    //console.log(usuario[0].name);
  
    localStorage.name = usuario[0].name + ' ' +usuario[0].lastname;
    localStorage.role = usuario[0].type;
    localStorage.user_id = usuario[0].id;

    // -------- LOG --------
    let log = {};
    log.user_id = localStorage.user_id;
    log.action = 'User Logged in: ' + localStorage.user_id;
    console.log(log);

    const requestLog = await fetch('api/logs', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(log)
    });
    const responseLog = await requestLog.text();
    console.log(responseLog);
    // -------- LOG --------

    alert("Login successfully.");
    window.location.href = "/clients";
  }
  else if (response == 'FAIL') {
    alert("Email or Password invalid");
  }


  // if (response != 'FAIL') {
  //   alert("Login successfully.");
  //   localStorage.token = response;
  //   localStorage.email = user.email;
  //   window.location.href="clients.html"
  // }
  // else if (response == 'FAIL') {
  //   alert("Email or Password invalid");
  // }
  // else if(response == 'User Doesn\'t Exist'){
  //   alert(response);
  // }
}

function logout() {
  localStorage.token = '';
  localStorage.email = '';
  localStorage.name = '';
  localStorage.role = '';
  localStorage.user_id = '';
}
