'use strict';

(function () {
  /**
   * Функция загрузки данных на сервер
   * Загружаем данные с формы
   * @param  {[object]} data    [Объект, который содержит данные с формы]
   * @param  {[function]} onLoad  [Функция, которая сработает при удачной загрузки]
   * @param  {[function]} onError [Функция, которая сработает при неудачной загрузке]
   */
  var upload = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  /**
   * Функция скачки данных с сервера
   * @param  {[function]} onLoad  [Функция, которая сработает при удачной загрузки]
   * @param  {[function]} onError [Функция, которая сработает при неудачной загрузке]
   */
  var download = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError('There is some ERROR');
    });

    xhr.send();
  };

  window.backend = {
    upload: upload,
    download: download
  };
})();
