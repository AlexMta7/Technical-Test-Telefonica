
$(document).ready(function () {
  //Al iniciar la pagina llama al metodo
  //actualizarEmailUsuario()
});

//Para devolver los Header
function getHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'Authorization':localStorage.token
  };
}

async function login() {
  let user = {};
  user.email = document.getElementById("txtEmail").value;
  user.password = document.getElementById("txtPassword").value;

  const request = await fetch('api/login', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(user)
  });
  const response = await request.text();
  console.log(response);
  if (response == 'OK') {
    alert("Login successfully.");
    window.location.href="clients.html"
  }
  else if (response == 'FAIL') {
    alert("Email or Password invalid");
  }
  else if(response == 'User Doesn\'t Exist'){
    alert(response);
  }
}