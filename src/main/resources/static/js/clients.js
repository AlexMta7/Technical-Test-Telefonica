
$(document).ready(function() {
    //Al iniciar la pagina llama al metodo
    getClients()
  //actualizarEmailUsuario()
});

  //Para devolver los Header
    function getHeaders(){
        return {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     //'Authorization':localStorage.token
                   };
    }

async function getClients(){
 const request = await fetch('api/clients', {
    method: 'GET',
    headers: getHeaders()
  });
  const clientes = await request.json();

console.log(clientes);
    let listHtml='';
    for (let client of clientes){
        let updateButton =  '<button type="button" onclick="" class="btn btn-icon btn-outline-primary">'
                         +  '   <span class="tf-icons bx bx-file"></span>'
                         +  '</button>';
        let deleteButton =  '<button type="button" onclick="deleteClient('+client.id+')" class="btn btn-icon btn-outline-danger">'
                         +  '   <span class="tf-icons bx bx-trash-alt"></span>'
                         +  '</button>';

        let clientHtml = '   <tr> '
                     +  '  <td>'+client.id+'</td>'
                     +  '  <td><strong>'+client.name+ ' ' +client.lastname+ '</strong></td>'
                     +  '  <td>'+client.email+'</td> '
                     +  '  <td>'+client.service+'</td>'
                     +  '  <td>'+updateButton+' ' +deleteButton+'</td>'
                     +  '</tr>';
        listHtml += clientHtml;
    }

    document.querySelector('#table_user tbody').outerHTML = listHtml;
}


async function deleteClient(id){

    if(!confirm('¿Desea eliminar el cliente?')){
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