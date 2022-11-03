/** RESTRICCIÓN PARA LOS INPUTS DE BÚSQUEDA **/

form = document.querySelector('#formSearch');

window.addEventListener("keydown", function() {
  form.txtSearchID.addEventListener("keypress", onlyNumbers, false);
});

//Solo permite introducir numeros.
function onlyNumbers(e){
    var key = window.event ? e.which : e.keyCode;

      if (key < 48 || key > 57) {
            e.preventDefault();
        }
}