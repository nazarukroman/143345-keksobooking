'use strict';

(function () {
  /**
   * Функция создает попап с сообщением
   * @param  {[string]} message [Сообщение об ошибке]
   */
  var onError = function (message) {
    var fragment = document.createDocumentFragment();
    var div = document.createElement('div');
    var p = document.createElement('p');
    var p1 = document.createElement('p');
    div.classList.add('error-message');
    div.style = 'position: fixed; z-index: 10; width: 200px; height: 80px; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #F4655E; color: #ffffff; text-align: center; border: 2px solid white';
    p.textContent = 'Что-то пошло не так';
    p1.textContent = message;
    div.appendChild(p);
    div.appendChild(p1);
    fragment.appendChild(div);
    window.map.mapSection.appendChild(fragment);
    window.setTimeout(function () {
      document.querySelector('.error-message').style = 'display: none;';
    }, 3000);
  };

  window.utils = {
    onError: onError
  };
})();
