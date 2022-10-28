$(document).ready(function () {
    //Al iniciar la pagina llama al metodo
    getClients()
  //actualizarEmailUsuario()
});

async function deleteDocumentAddress(email) {

  const requestDocuments = await fetch('api/docs/delete/' + email, {
    method: 'DELETE',
    headers: getHeaders()
  });

  const requestAddresses = await fetch('api/address/delete/' + email, {
    method: 'DELETE',
    headers: getHeaders()
  });

  const responseDocuments = await requestDocuments.text();
  const responseAddresses = await requestAddresses.text();

  console.log(responseDocuments);
  console.log(responseAddresses);

  alert("Documents and Addresses of the user " + email + " were deleted");
  location.reload();
}