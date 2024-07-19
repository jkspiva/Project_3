// Initialize the map
let fostermap = L.map('map',{
    center: [37.8, -96],
    zoom: 4
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(fostermap);

// Load the GeoJSON data for US states
let statesData = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/ACS-ED_2014-2018_Economic_Characteristics_FL.geojson";

// Function to style the GeoJSON features
d3.json(statesData).then(function(data) {
    // Create a new choropleth layer.
    L.choropleth(data, {
        // Define which property in the features to use.
        valueProperty: 'DP03_16E',
        // Set the color scale.
        scale: ['#ffffb2', '#b10026'],
        // The number of breaks in the step range
        steps: 10,
        // q for quartile, e for equidistant, k for k-means
        mode: 'q',
        style: {
            color: '#fff',
            weight: 1,
            fillOpacity: 0.8
        },
        // Binding a popup to each layer
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<strong>" + feature.properties.NAME + "</strong><br /><br />Estimated employed population with children age 6-17: " +
                feature.properties.DP03_16E + "<br /><br />Estimated Total Income and Benefits for Families: $" + feature.properties.DP03_75E);
        }
    }).addTo(fostermap);
});