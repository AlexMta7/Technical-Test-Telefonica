function getHeaders(){
       return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': localStorage.token
        };
}

//Función para el registro de nuevos usuarios en la base de datos
//Funcionando al 100%
async function registrarUsuario(){
    let datoUsuario = {};

        datoUsuario.ln_usu = document.getElementById("txtLastName").value;
        datoUsuario.nom_usu = document.getElementById("txtName").value;
        datoUsuario.email_usu = document.getElementById("txtEmail").value;
        datoUsuario.pass_usu = document.getElementById("txtPassword").value;
        datoUsuario.car_usu = document.getElementById("txtType").value;

        const request = await fetch('api/usuarios/', {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(datoUsuario)
                  });

        alert("Usuario Ingresado con Éxito");
        location.reload();
}