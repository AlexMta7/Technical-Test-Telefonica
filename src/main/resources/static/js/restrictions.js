/** RESTRICCIÓN PARA EL INPUT DE BÚSQUEDA **/
form = document.querySelector('#myForm');

window.addEventListener("keydown", function() {
  form.txtSearch.addEventListener("keypress", onlyLetters, false);
});

//Solo permite introducir letras.
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

/** RESTRICCIÓN PARA FORMATO DE LOS DOCUMENTOS **/
// La siguiente funcion valida el elemento input
    function validar() {
      //Capturamos el valor del select
      const select = document.getElementById("txtTypeD").value;

      if(select == "DUI"){
        // Variable que usaremos para determinar si el input es valido
          let isValid = false;

          // El input que queremos validar
          const input = document.forms['formADoc']['txtNumDoc'];

          //El div con el mensaje de advertencia:
          const message = document.getElementById('messageDoc');

          input.willValidate = false;

          // El tamaño maximo para nuestro input
          const maximo = 10;

          // El pattern que vamos a comprobar
          const pattern = new RegExp('^[0-9]{8}-[0-9]{1}$', 'i');

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
      }else if(select == "NIT"){
        // Variable que usaremos para determinar si el input es valido
          let isValid = false;

          // El input que queremos validar
          const input = document.forms['formADoc']['txtNumDoc'];

          //El div con el mensaje de advertencia:
          const message = document.getElementById('messageDoc');

          input.willValidate = false;

          // El tamaño maximo para nuestro input
          const maximo = 17;

          // El pattern que vamos a comprobar
          const pattern = new RegExp('^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]{1}$', 'i');

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
      }else if(select == "PASAPORTE NACIONAL"){
        // Variable que usaremos para determinar si el input es valido
          let isValid = false;

          // El input que queremos validar
          const input = document.forms['formADoc']['txtNumDoc'];

          //El div con el mensaje de advertencia:
          const message = document.getElementById('messageDoc');

          input.willValidate = false;

          // El tamaño maximo para nuestro input
          const maximo = 9;

          // El pattern que vamos a comprobar
          const pattern = new RegExp('^[A-Z]{1}[0-9]{8}$', 'i');

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
      }else if(select == "PASAPORTE EXTRANJERO"){
        // Variable que usaremos para determinar si el input es valido
          let isValid = false;

          // El input que queremos validar
          const input = document.forms['formADoc']['txtNumDoc'];

          //El div con el mensaje de advertencia:
          const message = document.getElementById('messageDoc');

          input.willValidate = false;

          // El tamaño maximo para nuestro input
          const maximo = 9;

          // El pattern que vamos a comprobar
          const pattern = new RegExp('^[A-Z]{3}[0-9]{6}$', 'i');

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
      }else if(select == "SEGURO"){
        // Variable que usaremos para determinar si el input es valido
          let isValid = false;

          // El input que queremos validar
          const input = document.forms['formADoc']['txtNumDoc'];

          //El div con el mensaje de advertencia:
          const message = document.getElementById('messageDoc');

          input.willValidate = false;

          // El tamaño maximo para nuestro input
          const maximo = 9;

          // El pattern que vamos a comprobar
          const pattern = new RegExp('^[0-9]{9}$', 'i');

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

    }
/** FIN DE RESTRICCIÓN PARA FORMATO DE LOS DOCUMENTOS **/