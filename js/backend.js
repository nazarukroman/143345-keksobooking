'use strict';

(function () {
  var upload = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    })

    xhr.addEventListener('error', function () {
      onError('There is some ERROR');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  var download = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    })

    xhr.addEventListener('error', function () {
      onError('There is some ERROR');
    });

    xhr.send();
  };

  window.backend = {
    upload: upload,
    download: download
  }
})();
