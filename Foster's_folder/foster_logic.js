// Initialize the map
let fostermap = L.map('map').setView([37.8, -96], 4);

// Add OpenStreetMap tiles as the base layer
let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(fostermap);

// Load the GeoJSON data for US states
let statesData = 'https://leafletjs.com/examples/choropleth/us-states.geojson';

// Function to style the GeoJSON features
function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: 'blue' 
    };
}

// Create a GeoJSON layer with style
L.geoJson(statesData, {
    style: style
}).addTo(fostermap);