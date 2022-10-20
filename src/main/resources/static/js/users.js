
$(document).ready(function() {
    //Al iniciar la pagina llama al metodo
    getUsers()
    alert("Aquí toy")
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

async function getUsers(){
 const request = await fetch('api/users', {
    method: 'GET',
    headers: getHeaders()
  });
  const usuarios = await request.json();

console.log(usuarios);
    let listHtml='';
    for (let user of usuarios){
        let deleteButton =  '<button type="button" class="btn btn-icon btn-outline-danger">'
                         +  '   <span class="tf-icons bx bx-trash-alt"></span>'
                         +  '</button>';
        let userHtml = '   <tr> '
                     +  '  <td>'+user.id+'</td>'
                     +  '  <td><strong>'+user.name+ ' ' +user.lastname+ '</strong></td>'
                     +  '  <td>'+user.email+'</td> '
                     +  '  <td>'+user.type+'</td>'
                     +  '  <td>'+deleteButton+'</td>'
                     +  '</tr>';
        listHtml += userHtml;
    }

    document.querySelector('#table_user tbody').outerHTML = listHtml;
}