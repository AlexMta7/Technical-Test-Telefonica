/**
 * UI Toasts
 */

'use strict';

(function () {
  // Bootstrap toasts example
  // --------------------------------------------------------------------
  const toastPlacementExample = document.querySelector('.toast-placement-ex'),
    toastPlacementBtn = document.querySelector('#showToastPlacement');
  let selectedType, selectedPlacement, toastPlacement;

  // Dispose toast when open another
  function toastDispose(toast) {
    if (toast && toast._element !== null) {
      if (toastPlacementExample) {
        toastPlacementExample.classList.remove(selectedType);
        DOMTokenList.prototype.remove.apply(toastPlacementExample.classList, selectedPlacement);
      }
      toast.dispose();
    }
  }
  // Placement Button click
  if (toastPlacementBtn) {
    toastPlacementBtn.onclick = function () {
      //Llama la función para la edición de los datos del cliente
      editarCliente();
      if (toastPlacement) {
        toastDispose(toastPlacement);
      }
      selectedType = document.querySelector('#selectTypeOpt').value;
      selectedPlacement = document.querySelector('#selectPlacement').value.split(' ');

      toastPlacementExample.classList.add(selectedType);
      DOMTokenList.prototype.add.apply(toastPlacementExample.classList, selectedPlacement);
      toastPlacement = new bootstrap.Toast(toastPlacementExample);
      toastPlacement.show();
    };
  }
})();

/* Termina de programar esta parte para la modificacion */
(function () {
  // Bootstrap toasts example
  // --------------------------------------------------------------------
  const toastPlacementExample = document.querySelector('.toast-placement-ex'),
    toastPlacementBtn = document.querySelector('#showToastPlacement1');
  let selectedType, selectedPlacement, toastPlacement;

  // Dispose toast when open another
  function toastDispose(toast) {
    if (toast && toast._element !== null) {
      if (toastPlacementExample) {
        toastPlacementExample.classList.remove(selectedType);
        DOMTokenList.prototype.remove.apply(toastPlacementExample.classList, selectedPlacement);
      }
      toast.dispose();
    }
  }
  // Placement Button click
  if (toastPlacementBtn) {
    toastPlacementBtn.onclick = function () {
      //Llama la función para la edición de los datos del cliente
      editarCliente();
      if (toastPlacement) {
        toastDispose(toastPlacement);
      }
      selectedType = document.querySelector('#selectTypeOpt1').value;
      selectedPlacement = document.querySelector('#selectPlacement1').value.split(' ');

      toastPlacementExample.classList.add(selectedType);
      DOMTokenList.prototype.add.apply(toastPlacementExample.classList, selectedPlacement);
      toastPlacement = new bootstrap.Toast(toastPlacementExample);
      toastPlacement.show();
    };
  }
})();