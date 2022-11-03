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
        if(document.getElementById("txtLastName").value == "" || document.getElementById("txtName").value == "" ||
        document.getElementById("txtEmail").value == "" || document.getElementById("txtGender").value == ""){
            alert("Todos los datos son requeridos");
            location.reload();
        }else{
            let datoCliente = {};

            datoCliente.apellido = document.getElementById("txtLastName").value;
            datoCliente.nombre = document.getElementById("txtName").value;
            datoCliente.email = document.getElementById("txtEmail").value;
            datoCliente.genero = document.getElementById("txtGender").value;

            const request = await fetch('api/clientes/', {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(datoCliente)
                  });

            alert("Cliente Ingresado con Éxito");
            location.href = "index.html";
        }
}

/********* Funciones para la parte de los Documentos del Cliente *********/

//Función para el registro de los documentos del cliente
//Funcionando al 100%
async function addDocuments(){
    if(document.getElementById("txtTypeD").value == "" || document.getElementById("txtNumDoc").value == ""){
        alert("Los Datos de los Documentos son Requeridos");
        document.getElementById("txtTypeD").value = "";
        document.getElementById("txtNumDoc").value = "";
    }else{
        let datoDocument = {};

        datoDocument.id_client = document.getElementById("txtIdC").value;
        datoDocument.document_name = document.getElementById("txtTypeD").value;
        datoDocument.document = document.getElementById("txtNumDoc").value;

        const request = await fetch('api/documentos', {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(datoDocument)
                  });

        alert("Documento Añadido Exitosamente");
        location.href = "infoClient.html";
    }
}

//Función para el registro de las Direcciones del cliente
//Funcionando al 100%
async function addAddress(){
    if(document.getElementById("txtNameD").value == "" || document.getElementById("txtAddress").value == ""){
        alert("Los Datos de las Direcciones son Requeridos");
        document.getElementById("txtNameD").value = "";
        document.getElementById("txtAddress").value = "";
    }else{
        let datoAddress = {};

        datoAddress.id_client = document.getElementById("txtIdCl").value;
        datoAddress.name_address = document.getElementById("txtNameD").value;
        datoAddress.address = document.getElementById("txtAddress").value;

        const request = await fetch('api/direcciones', {
                 method: 'POST',
                 headers: getHeaders(),
                 body: JSON.stringify(datoAddress)
           });

        alert("Dirección Añadida Exitosamente");
        location.href = "infoClient.html";
    }
}