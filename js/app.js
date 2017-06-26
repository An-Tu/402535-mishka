'use strict';

(function () {

  var mainMenuToggler = document.querySelector('.main-nav__toggler');
  var wrapper = document.querySelector('.main-nav__wrapper_hidden');
  var btnOpenModal = document.querySelector('.btn_best-week') || document.querySelector('.btn_create-process');
  var cartModal = document.querySelectorAll('.catalog-item__cart-img');
  var btnCloseModal = document.querySelector('.btn_form');
  var modalWindow = document.querySelector('.modal-window');
  var mainLogo = document.querySelector('.page-header__logo');

  wrapper.classList.remove('main-nav__wrapper_no-js');
  mainMenuToggler.classList.remove('main-nav__toggler_no-js');
  mainLogo.classList.remove('page-header__logo_no-js');

  mainMenuToggler.addEventListener('click', function (evt) {
    evt.target.classList.toggle('main-nav__toggler_unactive');
    evt.target.classList.toggle('main-nav__toggler_active');
    wrapper.classList.toggle('main-nav__wrapper_hidden');
  });

  if (btnOpenModal) {
    btnOpenModal.addEventListener('click', function (evt) {
      evt.preventDefault();
      modalWindow.classList.remove('modal-window_hidden');

      btnCloseModal.addEventListener('click', addToCart);
    });
  }

  if (cartModal) {
    for (var i = 0; i < cartModal.length; i++) {
      cartModal[i].addEventListener('click', function (evt) {
        evt.preventDefault();
        modalWindow.classList.remove('modal-window_hidden');

        btnCloseModal.addEventListener('click', addToCart);
      });
    }
  }

  function addToCart(evt) {
    evt.preventDefault();
    modalWindow.classList.add('modal-window_hidden');
    btnCloseModal.removeEventListener('click', addToCart);
  }

})();
