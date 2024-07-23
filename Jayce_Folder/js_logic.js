let map = L.map('map').setView([37.8, -96], 4);

let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.geoJson(statesData).addTo(map);

function getColor(d) {
    return d > 6 ? '#800026' :
           d > 5  ? '#BD0026' :
           d > 4  ? '#E31A1C' :
           d > 3  ? '#FC4E2A' :
           d > 2   ? '#FD8D3C' :
           d > 1   ? '#FEB24C' :
           d > 0   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(statesData, {style: style}).addTo(map);