var map = document.querySelector('.map');
var flats = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде']
var types = ['flat', 'house', 'bungalo'];
var facilities = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var times = ['12:00', '13:00', '14:00'];

/**
 * Находим случайное число из диапазона
 * @method
 * @param  {[number]} min [Минимальный диапазон]
 * @param  {[number]} max [Максимальный диапазон]
 * @return {[number]} [Случайное число]
 */
var randomNumber = function (min, max) {
  return Math.round(min + Math.random() * (max + 1 - min));
};

/**
 * Находим случайное значение из массива
 * @method
 * @param  {[array]} array [Массив из которого выбираем значение]
 * @return {[string]} [Полученное значение из массива]
 */
var randomArrayValue = function (array) {
  var rand = Math.floor(Math.random() * array.length);
  var arrayValue = array[rand];
  return arrayValue;
};

/**
 * Выбираем из массива flats случайное значение
 * проверяем чтобы такого значения не было в объекте offer у ключа title
 * @method
 * @return {[string]} [Возвращаем значение из массива]
 */
var randomTitle = function () {
  for (var i = 0; i < similarAdverts.length; i++) {
    var randomTitleValue = randomArrayValue(flats);
    if (similarAdverts[i].offer.title == randomTitleValue) {
      randomTitleValue = randomArrayValue(flats);
    } else {
      randomTitleValue = randomArrayValue(flats)
    }
    return randomTitleValue;
  }
};

var similarAdverts = [
  {
      'author': {
        'avatar': 'img/avatars/user' + '0' + randomNumber(1, 8) + '.png'
      },

      'offer': {
        'title': randomTitle(),
        'address': 'location.x, location.y',
        'price': randomNumber(1000, 1000000),
        'type': randomArrayValue(types),
        'rooms': randomNumber(1, 5),
        'guests': randomNumber(5, 50),
        'checkin': randomArrayValue(times),
        'checkout': randomArrayValue(times),
        'features': randomArrayValue(facilities),
        'description': '',
        'photos': []
      },

      'location': {
        'x': randomNumber(300, 900),
        'y': randomNumber(100, 500)
      }
  },

  {
      'author': {
        'avatar': 'img/avatars/user' + '0' + randomNumber(1, 8) + '.png'
      },

      'offer': {
        'title': randomTitle(),
        'address': 'location.x, location.y',
        'price': randomNumber(1000, 1000000),
        'type': randomArrayValue(types),
        'rooms': randomNumber(1, 5),
        'guests': randomNumber(5, 50),
        'checkin': randomArrayValue(times),
        'checkout': randomArrayValue(times),
        'features': randomArrayValue(facilities),
        'description': '',
        'photos': []
      },

      'location': {
        'x': randomNumber(300, 900),
        'y': randomNumber(100, 500)
      }
  },

  {
      'author': {
        'avatar': 'img/avatars/user' + '0' + randomNumber(1, 8) + '.png'
      },

      'offer': {
        'title': randomTitle(),
        'address': 'location.x, location.y',
        'price': randomNumber(1000, 1000000),
        'type': randomArrayValue(types),
        'rooms': randomNumber(1, 5),
        'guests': randomNumber(5, 50),
        'checkin': randomArrayValue(times),
        'checkout': randomArrayValue(times),
        'features': randomArrayValue(facilities),
        'description': '',
        'photos': []
      },

      'location': {
        'x': randomNumber(300, 900),
        'y': randomNumber(100, 500)
      }
  },

  {
      'author': {
        'avatar': 'img/avatars/user' + '0' + randomNumber(1, 8) + '.png'
      },

      'offer': {
        'title': randomTitle(),
        'address': 'location.x, location.y',
        'price': randomNumber(1000, 1000000),
        'type': randomArrayValue(types),
        'rooms': randomNumber(1, 5),
        'guests': randomNumber(5, 50),
        'checkin': randomArrayValue(times),
        'checkout': randomArrayValue(times),
        'features': randomArrayValue(facilities),
        'description': '',
        'photos': []
      },

      'location': {
        'x': randomNumber(300, 900),
        'y': randomNumber(100, 500)
      }
  },

  {
      'author': {
        'avatar': 'img/avatars/user' + '0' + randomNumber(1, 8) + '.png'
      },

      'offer': {
        'title': randomTitle(),
        'address': 'location.x, location.y',
        'price': randomNumber(1000, 1000000),
        'type': randomArrayValue(types),
        'rooms': randomNumber(1, 5),
        'guests': randomNumber(5, 50),
        'checkin': randomArrayValue(times),
        'checkout': randomArrayValue(times),
        'features': randomArrayValue(facilities),
        'description': '',
        'photos': []
      },

      'location': {
        'x': randomNumber(300, 900),
        'y': randomNumber(100, 500)
      }
  },

  {
      'author': {
        'avatar': 'img/avatars/user' + '0' + randomNumber(1, 8) + '.png'
      },

      'offer': {
        'title': randomTitle(),
        'address': 'location.x, location.y',
        'price': randomNumber(1000, 1000000),
        'type': randomArrayValue(types),
        'rooms': randomNumber(1, 5),
        'guests': randomNumber(5, 50),
        'checkin': randomArrayValue(times),
        'checkout': randomArrayValue(times),
        'features': randomArrayValue(facilities),
        'description': '',
        'photos': []
      },

      'location': {
        'x': randomNumber(300, 900),
        'y': randomNumber(100, 500)
      }
  },

  {
      'author': {
        'avatar': 'img/avatars/user' + '0' + randomNumber(1, 8) + '.png'
      },

      'offer': {
        'title': randomTitle(),
        'address': 'location.x, location.y',
        'price': randomNumber(1000, 1000000),
        'type': randomArrayValue(types),
        'rooms': randomNumber(1, 5),
        'guests': randomNumber(5, 50),
        'checkin': randomArrayValue(times),
        'checkout': randomArrayValue(times),
        'features': randomArrayValue(facilities),
        'description': '',
        'photos': []
      },

      'location': {
        'x': randomNumber(300, 900),
        'y': randomNumber(100, 500)
      }
  },

  {
      'author': {
        'avatar': 'img/avatars/user' + '0' + randomNumber(1, 8) + '.png'
      },

      'offer': {
        'title': randomTitle(),
        'address': 'location.x, location.y',
        'price': randomNumber(1000, 1000000),
        'type': randomArrayValue(types),
        'rooms': randomNumber(1, 5),
        'guests': randomNumber(5, 50),
        'checkin': randomArrayValue(times),
        'checkout': randomArrayValue(times),
        'features': randomArrayValue(facilities),
        'description': '',
        'photos': []
      },

      'location': {
        'x': randomNumber(300, 900),
        'y': randomNumber(100, 500)
      }
  }
];

map.classList.remove('map--faded');