// Initialize Leaflet map
let myMap = L.map("map").setView([37.8, -96], 4);

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(myMap);

// Define global variables for data
let stateData = {};
let allYears = new Set();
let currentYear = null;
let selectedState = null;

// Load the CSV data
d3.csv("alc.csv").then(function(data) {
    // Process data
    data.forEach(d => {
        if (!stateData[d.State]) {
            stateData[d.State] = [];
        }
        stateData[d.State].push({
            year: +d.Year,
            beer: +d["Beer (Per capita consumption)"],
            wine: +d["Wine (Per capita consumption)"],
            spirits: +d["Spirits (Per capita consumption)"]
        });
        allYears.add(+d.Year);
    });

    // Populate the year dropdown
    const yearSelect = document.getElementById('yearSelect');
    allYears = Array.from(allYears).sort();
    allYears.forEach(year => {
        let option = document.createElement('option');
        option.value = year;
        option.text = year;
        yearSelect.add(option);
    });

    // Set the default year
    currentYear = allYears[0];
    yearSelect.value = currentYear;

    // Update map and chart for the default year
    updateMapAndChart();
});

// Function to update the map and chart based on the selected year
function updateMapAndChart() {
    currentYear = +document.getElementById('yearSelect').value; // Convert to number
    updateMap();
    if (selectedState) {
        updateChart(selectedState, currentYear);
    }
}

// Function to update the map markers and heatmap based on the selected year
function updateMap() {
    // Clear existing markers and heatmap
    Object.keys(stateData).forEach(state => {
        let stateYearData = stateData[state].find(d => d.year === currentYear);
        if (stateYearData) {
            let latLng = getLatLon(state);
            if (latLng) {
                // Add marker to map
                let marker = L.marker(latLng).addTo(myMap);
                marker.bindPopup(createPopupContent(state, stateYearData));
                marker.on('click', function() {
                    selectedState = state;
                    updateChart(selectedState, currentYear);
                });
            }
        }
    });

    // Create heatArray for heatmap layer
    let heatArray = Object.keys(stateData).map(state => {
        let stateYearData = stateData[state].find(d => d.year === currentYear);
        let latLng = getLatLon(state);
        return latLng ? [latLng[0], latLng[1], stateYearData ? stateYearData.beer + stateYearData.wine + stateYearData.spirits : 0] : null;
    }).filter(item => item !== null);

    // Add heatmap layer to map
    let heat = L.heatLayer(heatArray, {
        radius: 20,
        blur: 35
    }).addTo(myMap);
}

// Function to create popup content for a marker
function createPopupContent(state, stateYearData) {
    return `<b>${state}</b><br>Beer: ${stateYearData.beer}<br>Wine: ${stateYearData.wine}<br>Spirits: ${stateYearData.spirits}`;
}

// Function to update the bar chart based on selected state and year
function updateChart(state, year) {
    let stateYearData = stateData[state].find(d => d.year === year);
    if (stateYearData) {
        // Update chart data
        let ctx = document.getElementById('barChart').getContext('2d');
        let barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Beer', 'Wine', 'Spirits'],
                datasets: [{
                    label: 'Per Capita Consumption',
                    data: [stateYearData.beer, stateYearData.wine, stateYearData.spirits],
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}

// Function to return the latitude and longitude for a given state
function getLatLon(state) {
    let stateLatLon = {
        'Alabama': [32.806671, -86.791130],
        'Alaska': [61.370716, -152.404419],
        'Arizona': [33.729759, -111.431221],
        'Arkansas': [34.969704, -92.373123],
        'California': [36.116203, -119.681564],
        'Colorado': [39.059811, -105.311104],
        'Connecticut': [41.597782, -72.755371],
        'Delaware': [39.318523, -75.507141],
        'Florida': [27.766279, -81.686783],
        'Georgia': [33.040619, -83.643074],
        'Hawaii': [21.094318, -157.498337],
        'Idaho': [44.240459, -114.478828],
        'Illinois': [40.349457, -88.986137],
        'Indiana': [39.849426, -86.258278],
        'Iowa': [42.011539, -93.210526],
        'Kansas': [38.526600, -96.726486],
        'Kentucky': [37.668140, -84.670067],
        'Louisiana': [31.169546, -91.867805],
        'Maine': [44.693947, -69.381927],
        'Maryland': [39.063946, -76.802101],
        'Massachusetts': [42.230171, -71.530106],
        'Michigan': [43.326618, -84.536095],
        'Minnesota': [45.694454, -93.900192],
        'Mississippi': [32.741646, -89.678696],
        'Missouri': [38.456085, -92.288368],
        'Montana': [46.921925, -110.454353],
        'Nebraska': [41.125370, -98.268082],
        'Nevada': [38.313515, -117.055374],
        'New Hampshire': [43.452492, -71.563896],
        'New Jersey': [40.298904, -74.521011],
        'New Mexico': [34.840515, -106.248482],
        'New York': [42.165726, -74.948051],
        'North Carolina': [35.630066, -79.806419],
        'North Dakota': [47.528912, -99.784012],
        'Ohio': [40.388783, -82.764915],
        'Oklahoma': [35.565342, -96.928917],
        'Oregon': [44.572021, -122.070938],
        'Pennsylvania': [40.590752, -77.209755],
        'Rhode Island': [41.680893, -71.511780],
        'South Carolina': [33.856892, -80.945007],
        'South Dakota': [44.299782, -99.438828],
        'Tennessee': [35.747845, -86.692345],
        'Texas': [31.054487, -97.563461],
        'Utah': [40.150032, -111.862434],
        'Vermont': [44.045876, -72.710686],
        'Virginia': [37.769337, -78.169968],
        'Washington': [47.400902, -121.490494],
        'West Virginia': [38.491226, -80.954456],
        'Wisconsin': [44.268543, -89.616508],
        'Wyoming': [42.755966, -107.302490]
    };
    return stateLatLon[state];