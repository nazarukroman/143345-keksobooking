'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT_TIME = 10000;
  var SUCCESS_STATUS = 200;
  /**
   * Функция для запроса на сервер
   * @param  {[function]} onLoad  [Функция, которая сработает при удачной загрузки]
   * @param  {[function]} onError [Функция, которая сработает при неудачной загрузке]
   * @return {[XMLHttpRequest]} [XMLHttpRequest]
   */
  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ошибки: ' + xhr.status + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_TIME;

    return xhr;
  };

  window.backend = {
    upload: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    download: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    }
  };
})();
