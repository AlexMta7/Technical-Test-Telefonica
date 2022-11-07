/** RESTRICCIÓN PARA EL INPUT DE BÚSQUEDA **/
form = document.querySelector('#formSearch');

window.addEventListener("keydown", function() {
  form.txtSearchID.addEventListener("keypress", onlyNumbers, false);
});

//Solo permite introducir numeros.
function onlyNumbers(e){
    var key = window.event ? e.which : e.keyCode;

    // El input que queremos validar
    const input = document.forms['formSearch']['txtSearchID'];

    //El div con el mensaje de advertencia:
    const message = document.getElementById('message1');

      if (key < 48 || key > 57) {
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