/** RESTRICCIÓN PARA EL INPUT DE BÚSQUEDA **/
form = document.querySelector('#myForm');

window.addEventListener("keydown", function() {
  form.txtSearch.addEventListener("keypress", onlyLetters, false);
});

//Solo permite introducir numeros.
function onlyLetters(e){
    var key = window.event ? e.which : e.keyCode;

    // El pattern que vamos a comprobar
    const pattern = new RegExp('^[A-Z]+$', 'i');

    // El input que queremos validar
    const input = document.forms['myForm']['txtSearch'];

    //El div con el mensaje de advertencia:
    const message = document.getElementById('message');

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