/** RESTRICCIÓN PARA LOS INPUTS DE BÚSQUEDA **/
form = document.querySelector('#formUser');

window.addEventListener("keydown", function() {
  form.txtSearchUser.addEventListener("keypress", onlyLetters, false);
});

//Solo permite introducir numeros.
function onlyLetters(e){
    var key = window.event ? e.which : e.keyCode;

    // El input que queremos validar
    const input = document.forms['formUser']['txtSearchUser'];

    //El div con el mensaje de advertencia:
    const message = document.getElementById('messageU');

      if (key > 47 && key < 58) {
       e.preventDefault();
       // rojo: no es valido
       input.style.borderColor = 'salmon'; // me parece que 'salmon' es un poco menos agresivo que 'red'
       // mostramos mensaje
       message.hidden = false;
      }else{
        // verde: si es valido
        input.style.borderColor = 'palegreen'; // 'palegreen' se ve mejor que 'green' en mi opinion
        // ocultamos mensaje
        message.hidden = true;
      }
}

/** FIN DE RESTRICCIÓN PARA EL INPUT DE BÚSQUEDA **/