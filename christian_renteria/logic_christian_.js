// Initialize Leaflet map
// Initialize Leaflet map
let myMap = L.map("map", {
    center: [37.8, -96],
    zoom: 4
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Data for the example (replace this with your actual data)
  let data = [
    { state: 'California', lat: 36.7783, lon: -119.4179, year: 2020, beer: 1.5, wine: 0.5, spirits: 0.7 },
    { state: 'New York', lat: 40.7128, lon: -74.0060, year: 2020, beer: 1.2, wine: 0.7, spirits: 0.8 },
    // Add more data here
  ];
  
  // Function to update the bar chart
  function updateChart(data) {
    var ctx = document.getElementById('barChart').getContext('2d');
    var barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Beer', 'Wine', 'Spirits'],
        datasets: [{
          label: 'Per Capita Consumption',
          data: [data.beer, data.wine, data.spirits],
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
  
  // Add markers to the map
  data.forEach(function(d) {
    var marker = L.marker([d.lat, d.lon]).addTo(myMap);
    marker.bindPopup(`<b>${d.state}</b><br>Year: ${d.year}`);
    marker.on('click', function() {
      updateChart(d);
    });
  });
  
  // Example of heatmap integration if needed
  let heatArray = data.map(d => [d.lat, d.lon, d.beer + d.wine + d.spirits]);
  
  let heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(myMap);