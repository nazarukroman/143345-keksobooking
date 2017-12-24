'use strict';

(function () {

  window.untils = {
    /**
  	 * Находим случайное число из диапазона
  	 * @method
  	 * @param  {[number]} min [Минимальный диапазон]
  	 * @param  {[number]} max [Максимальный диапазон]
  	 * @return {[number]} [Случайное число]
  	 */
    getRandomNumber: function (min, max) {
      return Math.round(min + Math.random() * (max + 1 - min));
    },

    /**
     * Находим случайное значение из массива
     * @method
     * @param  {[array]} array [Массив из которого выбираем значение]
     * @return {[string]} [Полученное значение из массива]
     */
    getRandomArrayValue: function (array) {
      var rand = Math.floor(Math.random() * array.length);
      var arrayValue = array[rand];
      return arrayValue;
    },

    /**
     * Находим массив случайной длины из массива features
     * @param  {[array]} features [Входной массив]-
     * @return {[array]} [Полученный массив]
     */
    getRandomFeatures: function (features) {
      var newFeatures = features.slice(window.untils.getRandomNumber(0, features.length - 2));
      return newFeatures;
    },

    /**
     * Находим случайный адресс
     * @param  {[number]} minX [Минимальная координата X]
     * @param  {[number]} maxX [Максимальная координата X]
     * @param  {[number]} minY [Минимальная координата Y]
     * @param  {[number]} maxY [Максимальная координата Y]
     * @return {[object]} [Возвращаем объект с координатами x, y]
     */
    getRandomAddress: function (minX, maxX, minY, maxY) {
      return {
        'x': window.untils.getRandomNumber(minX, maxX),
        'y': window.untils.getRandomNumber(minY, maxY)
      };
    }
  };
})();
