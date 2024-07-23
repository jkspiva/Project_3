// Initialize Leaflet map
let myMap = L.map("map", {
    center: [37.8, -96],
    zoom: 4
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let stateData = {};
let allYears = new Set();
let currentYear = null;
let selectedState = null;
let pieChart = null;

// Load the CSV data
d3.csv("Alcohol_Consumption_US.csv").then(function(data) {
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
    currentYear = document.getElementById('yearSelect').value;
    updateMap();
    if (selectedState) {
        updateChart(selectedState, currentYear);
        confettiEffect(); // Trigger confetti effect
    }
}

// Function to update the map markers based on the selected year
function updateMap() {
    myMap.eachLayer(layer => {
        if (layer.options && (layer.options.pane === 'markerPane' || layer.options.pane === 'overlayPane')) {
            myMap.removeLayer(layer);
        }
    });

    Object.keys(stateData).forEach(state => {
        let stateYearData = stateData[state].find(d => d.year == currentYear);
        let latLon = getLatLon(state);
        if (latLon) {
            let marker = L.marker(latLon).addTo(myMap);
            marker.bindPopup(createPopupContent(state, stateYearData));
            marker.on('click', function() {
                selectedState = state;
                updateChart(state, currentYear);
                confettiEffect(); // Trigger confetti effect
            });
        }
    });
}

// Function to create popup content for a marker
function createPopupContent(state, stateYearData) {
    return `<b>${state}</b><br>Beer: ${stateYearData.beer}<br>Wine: ${stateYearData.wine}<br>Spirits: ${stateYearData.spirits}`;
}

// Function to update the pie chart based on the selected year and state
function updateChart(state, year) {
    let stateYearData = stateData[state].find(d => d.year == year);
    var ctx = document.getElementById('barChart').getContext('2d');
    if (pieChart) {
        pieChart.destroy();
    }

    // Update the state name above the chart
    document.getElementById('stateName').innerText = `Alcohol Consumption in ${state} (${year})`;

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Beer', 'Wine', 'Spirits'],
            datasets: [{
                label: `Per Capita Consumption in ${state} (${year})`,
                data: [stateYearData.beer, stateYearData.wine, stateYearData.spirits],
                backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            let total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
                            let value = tooltipItem.raw;
                            let percentage = ((value / total) * 100).toFixed(2);
                            return `${tooltipItem.label}: ${value} (${percentage}%)`;
                        }
                    }
                },
                datalabels: {
                    formatter: (value, ctx) => {
                        let total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                        let percentage = ((value / total) * 100).toFixed(2);
                        return `${percentage}%`;
                    },
                    color: '#fff',
                }
            }
        }
    });
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
        }
        
        // Function to trigger confetti effect
        function confettiEffect() {
        confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 }
        });
        }