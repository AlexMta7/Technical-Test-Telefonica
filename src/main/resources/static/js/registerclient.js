function getHeaders(){
       return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': localStorage.token
        };
}


//Función para el registro de nuevos clientes en la base de datos
//Funcionando al 100%
async function registrarCliente(){
    let datoCliente = {};

        datoCliente.apellido = document.getElementById("txtLastName").value;
        datoCliente.nombre = document.getElementById("txtName").value;
        datoCliente.email = document.getElementById("txtEmail").value;
        datoCliente.documento = document.getElementById("txtDocument").value;
        datoCliente.genero = document.getElementById("txtGender").value;

        const request = await fetch('api/clientes/', {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(datoCliente)
                  });

        alert("Cliente Ingresado con Éxito");
        location.reload();
}