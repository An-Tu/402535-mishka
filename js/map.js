ymaps.ready(init);
var myMap, myPlacemark;

function init(){
  myMap = new ymaps.Map("map", {
    center: [59.936574, 30.321619],
    zoom: 16,
    controls: ["zoomControl"]
  });

  myPlacemark = new ymaps.Placemark([59.936574, 30.321619], {
    hintContent: 'Мишка',
    balloonContent: 'Милые штучки ручной работы для дома',
    iconLayout: 'default#image',
    iconImageHref: '/build/img/icon-map-pin.svg',
    iconImageSize: [66, 100],
    iconImageOffset: [-3, -42]
  });

  myMap.geoObjects.add(myPlacemark);
}
