let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
        center: [55.750309, 37.604184],
        zoom: 14,
        controls: []
    });

    const coords = [
        [55.748442, 37.603495],
        [55.758671, 37.583500],
        [55.742901, 37.580245],
        [55.757010, 37.620786]
    ];

    const myCollection = new ymaps.GeoObjectCollection({},{
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: "./../img/map/marker.png",
        iconImageSize: [58, 73],
        iconImageOffset: [-3, -42]
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);
    myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);