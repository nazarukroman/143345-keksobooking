'use strict';

(function () {
  var filters = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');

  var housingTypeChangeHandler = function (evt) {
    var selectedValue = evt.currentTarget[evt.currentTarget.selectedIndex].value;

    filters.type = selectedValue;
  };

  var housingPriceChangeHandler = function (evt) {
    var selectedValue = evt.currentTarget[evt.currentTarget.selectedIndex].value;

    filters.price = selectedValue;
  };

  var housingRoomsChangeHandler = function (evt) {
    var selectedValue = evt.currentTarget[evt.currentTarget.selectedIndex].value;

    filters.rooms = selectedValue;
  };

  var housingGuestsChangeHandler = function (evt) {
    var selectedValue = evt.currentTarget[evt.currentTarget.selectedIndex].value;

    filters.rooms = selectedValue;
  };

  var housingFeaturesChangeHandler = function (evt) {
    var checkedValues = [];
    evt.currentTarget[evt.currentTarget.selectedIndex].value;

    filters.rooms = selectedValue;
  };


  housingType.addEventListener('change', housingTypeChangeHandler);
  housingPrice.addEventListener('change', housingPriceChangeHandler);
  housingRooms.addEventListener('change', housingRoomsChangeHandler);
  housingGuests.addEventListener('change', housingGuestsChangeHandler);
  housingFeatures.addEventListener('change', housingFeaturesChangeHandler);

  window.filters = {
    filters: filters,
  }
})();
