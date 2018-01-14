'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var setImage = function (fileChooser, callback) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var similars = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (similars) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          callback(reader.result);
        });

        reader.readAsDataURL(file);
      }
    });
  };

  window.loadPhoto = {
    setImage: setImage
  };
})();
