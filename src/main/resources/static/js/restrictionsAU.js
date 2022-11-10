/** RESTRICCIONES PARA INGRESO DE DATOS DEL USUARIO **/
// La siguiente funcion valida el elemento input para el ingreso del Nombre del Cliente
form = document.querySelector('#formAU');

window.addEventListener("keydown", function() {
  form.txtName.addEventListener("keypress", onlyLetters, false);
});

//Solo permite introducir letras.
function onlyLetters(e){
    var key = window.event ? e.which : e.keyCode;

    // El input que queremos validar
    const input = document.forms['formAU']['txtName'];

    //El div con el mensaje de advertencia:
    const message = document.getElementById('messageAddNU');

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

// La siguiente funcion valida el elemento input para el ingreso del Apellido del Cliente
form1 = document.querySelector('#formAU');

window.addEventListener("keydown", function() {
  form1.txtLastName.addEventListener("keypress", onlyLettersLN, false);
});

//Solo permite introducir letras.
function onlyLettersLN(e){
    var key = window.event ? e.which : e.keyCode;

    // El input que queremos validar
    const input1 = document.forms['formAU']['txtLastName'];

    //El div con el mensaje de advertencia:
    const message1 = document.getElementById('messageAddLU');

      if (key > 47 && key < 58) {
       e.preventDefault();
       // rojo: no es valido
       input1.style.borderColor = 'salmon'; // me parece que 'salmon' es un poco menos agresivo que 'red'
       // mostramos mensaje
       message1.hidden = false;
      }else{
        // verde: si es valido
        input1.style.borderColor = 'palegreen'; // 'palegreen' se ve mejor que 'green' en mi opinion
        // ocultamos mensaje
        message1.hidden = true;
      }
}

// La siguiente funcion valida el elemento input del correo del cliente
    function validEmail() {
        // Variable que usaremos para determinar si el input es valido
          let isValid = false;

          // El input que queremos validar
          const input = document.forms['formAU']['txtEmail'];

          //El div con el mensaje de advertencia:
          const message = document.getElementById('messageAddCU');

          input.willValidate = false;

          // El tamaño maximo para nuestro input
          const maximo = 50;

          // El pattern que vamos a comprobar para el formato de correo
          const pattern = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$", 'i');

          // Primera validacion, si input esta vacio entonces no es valido
          if(!input.value) {
            isValid = false;
          } else {
            // Segunda validacion, si input es mayor que 35
            if(input.value.length > maximo) {
              isValid = false;
            } else {
              // Tercera validacion, si input contiene caracteres diferentes a los permitidos
              if(!pattern.test(input.value)){
              // Si queremos agregar letras acentuadas y/o letra ñ debemos usar
              // codigos de Unicode (ejemplo: Ñ: \u00D1  ñ: \u00F1)
                isValid = false;
              } else {
                // Si pasamos todas la validaciones anteriores, entonces el input es valido
                isValid = true;
              }
            }
          }

          //Ahora coloreamos el borde de nuestro input
            if(!isValid) {
              // rojo: no es valido
              input.style.borderColor = 'salmon'; // me parece que 'salmon' es un poco menos agresivo que 'red'
              // mostramos mensaje
              message.hidden = false;
            } else {
              // verde: si es valido
              input.style.borderColor = 'palegreen'; // 'palegreen' se ve mejor que 'green' en mi opinion
              // ocultamos mensaje;
              message.hidden = true;
            }

            // devolvemos el valor de isValid
            return isValid;
}

//Función para validar la correcta confirmacion del password
function validConfPass(){
    // Variable que usaremos para determinar si el input es valido
      let isValid = false;

      // El input que queremos validar
      const inputVal = document.forms['formAU']['txtConfirPassword'];

      // El input a comparar
      const inputCom = document.forms['formAU']['txtPassword'];

      //El div con el mensaje de advertencia:
      const message = document.getElementById('messageAddPU');

      inputVal.willValidate = false;

      // Primera validacion, si input esta vacio entonces no es valido
      if(inputVal.value == ""){
        isValid = false;
      }else{
        //Segunda validacion que ambos campos sean iguales
        if(inputVal.value != inputCom.value){
            isValid = false;
          } else {
            // Si pasamos todas la validaciones anteriores, entonces el input es valido
            isValid = true;
          }
      }

      //Ahora coloreamos el borde de nuestro input
      if(!isValid) {
        // rojo: no es valido
        inputVal.style.borderColor = 'salmon'; // me parece que 'salmon' es un poco menos agresivo que 'red'
        inputCom.style.borderColor = 'salmon'; // me parece que 'salmon' es un poco menos agresivo que 'red'
        // mostramos mensaje
        message.hidden = false;
      } else {
        // verde: si es valido
        inputVal.style.borderColor = 'palegreen'; // 'palegreen' se ve mejor que 'green' en mi opinion
        inputCom.style.borderColor = 'palegreen'; // 'palegreen' se ve mejor que 'green' en mi opinion
        // ocultamos mensaje;
        message.hidden = true;
      }

      // devolvemos el valor de isValid
      return isValid;

}

/** FIN DE RESTRICCIONES PARA INGRESO DE DATOS DEL USUARIO **/
